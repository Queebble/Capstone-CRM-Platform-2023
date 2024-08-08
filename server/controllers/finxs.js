// Import necessary modules and models
import Members from "../models/Members.js";
import fetch from "node-fetch";

// Function for authenticating with the FinxS API
export const finxsAuth = async (req, res) => {
  try {
    // Send a POST request to authenticate with FinxS API
    const response = await fetch("https://finxs.com/api/sign_in", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: process.env.FINXS_USERNAME,
        password: process.env.FINXS_PASSWORD,
      }),
    });

    // Check if the authentication response is successful
    if (response.ok) {
      const responseData = await response.json();
      // Check if the session is active and send a response accordingly
      if (responseData.session_active) {
        const token = responseData.token;
        res.json({ success: true, token: token });
      } else {
        res.json({ success: false, message: "Authentication failed" });
      }
    } else {
      // Handle authentication request failure
      res.json({ success: false, message: "Authentication request failed" });
    }
  } catch (error) {
    // Handle any errors that occur during authentication
    console.error("Error Authenticating with FinxS API:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// Function for generating passwords through the FinxS API
export const generatePasswords = async (req, res) => {
  try {
    // Send a POST request to generate passwords
    const response = await fetch(
      "https://finxs.com/api/dpa/passwords/generate",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(req.body),
      }
    );

    // Check if the password generation response is successful
    if (response.ok) {
      const responseData = await response.json();
      // Check if the password generation was successful and return the response data
      if (responseData.success) {
        return res.status(200).json(responseData);
      } else {
        throw new Error(responseData.message || "Password generation failed");
      }
    } else {
      // Handle password generation request failure
      throw new Error("Password generation request failed");
    }
  } catch (error) {
    // Handle any errors that occur during password generation
    console.error("Error generating passwords:", error);
    throw new Error("An error occurred while generating passwords");
  }
};

// Function for checking the statuses of generated passwords through the FinxS API
export const checkPasswordStatuses = async (req, res) => {
  try {
    // Create a query string for passwords
    const queryStringPasswords = req.body.passwords
      .map((password) => `passwords[]=${password}`)
      .join("&");

    // Send a POST request to check password statuses
    const response = await fetch(
      `https://finxs.com/api/dpa/passwords/show_statuses?auth_token=${req.body.auth_token}&access_code=${req.body.access_code}&${queryStringPasswords}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    // Check if the password status check response is successful
    if (response.ok) {
      const responseData = await response.json();
      // Check if the password status check was successful and return the response data
      if (responseData.success) {
        return res.status(200).json(responseData);
      } else {
        throw new Error(responseData.message || "Password status check failed");
      }
    } else {
      // Handle password status check request failure
      throw new Error("Password status check request failed");
    }
  } catch (error) {
    // Handle any errors that occur during password status check
    console.error("Error checking password statuses:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while checking password statuses",
    });
  }
};

// Function for adding assessments to members
export const addAssessments = async (req, res) => {
  try {
    const data = req.body; // Assuming you send an array of member and assessment data in the request body
    if (data.length > 0) {
      for (const { memberId, assessmentData } of data) {
        // Find the member by ID
        const member = await Members.findById(memberId);

        if (!member) {
          return res
            .status(404)
            .json({ message: `Member with ID ${memberId} not found` });
        }

        // Add the new assessment entry to the assessments array
        member.assessments.push(assessmentData);

        // Save the updated member
        await member.save();
      }

      return res
        .status(200)
        .json({ message: "Assessments added to members successfully" });
    } else {
      // Handle case where no members were selected for assessment addition
      return res
        .status(500)
        .json({ message: "No Members Selected. Failed to Add Assessments" });
    }
  } catch (error) {
    // Handle any errors that occur during assessment addition
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Function for updating assessment completion statuses for members
export const updateAssessments = async (req, res) => {
  try {
    const memberId = req.body.member;
    const passwords = req.body.passwords;
    // Find the member by memberId and assessment by assessmentId
    const member = await Members.findById(memberId);
    if (!member) {
      throw new Error("Member not found");
    }

    // Iterate through the assessments to update
    for (const password of passwords) {
      const assessment = member.assessments.find(
        (a) => a.password.toString() === password.value
      );
      if (!assessment) {
        console.error(
          `Assessment with password ${password} not found for member ${memberId}`
        );
        continue; // Skip this assessment and continue with the next one
      }

      // Update the completed field of the assessment
      assessment.completed = password.completed;
      if (password.completed === true && assessment.completionDate === null) {
        assessment.completionDate = new Date();
      }
    }

    // Save the updated member document
    await member.save();

    return res
      .status(200)
      .json({ message: "Assessments added to members successfully" });
  } catch (error) {
    // Handle any errors that occur during assessment completion status update
    console.error("Error updating assessment completed status:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get reports for members
export const getReport = async (req, res) => {
  try {
    // Authenticate with the FinxS API
    const response = await fetch("https://finxs.com/api/sign_in", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        username: process.env.FINXS_USERNAME,
        password: process.env.FINXS_PASSWORD,
      }),
    });

    // Check if the authentication was successful
    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.token;

      const passwords = JSON.parse(req.query.passwords);
      const access_code = req.query.access_code;
      const report = req.query.report;
      const lang = req.query.lang;

      // Create an array of promises to fetch reports for each member's password
      const reportPromises = passwords.map(async (member) => {
        const response = await fetch(
          `https://finxs.com/api/dpa/passwords/report?auth_token=${token}&access_code=${access_code}&password=${member.password}&report_name=${report}&report_language=${lang}`,
          {
            headers: {
              "content-type": "application/json",
            },
            method: "GET",
          }
        );

        // Check if the report request was successful
        if (response.ok) {
          const responseData = await response.json();
          return {
            memberName: member.memberName,
            responseData,
          };
        } else {
          // Handle errors if the report request fails
          throw new Error(
            `Failed to generate percentages for ${member.memberName}`
          );
        }
      });

      // Wait for all report promises to resolve and return the reports
      const reports = await Promise.all(reportPromises);
      return res.status(200).json({ success: true, reports });
    } else {
      // Handle errors if the authentication request fails
      throw new Error("Authentication request failed");
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error generating percentages:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating percentages",
    });
  }
};
