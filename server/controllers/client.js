import Members from "../models/Members.js";
import Teams from "../models/Teams.js";
import Organisations from "../models/Organisations.js";
import jwt from "jsonwebtoken";

/* GET MEMBER BY TOKEN - Controller function for getting a member by token */
export const getMemberByToken = async (req, res) => {
  try {
    const { token = "" } = req.query;
    const id = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode the token

    const member = await Members.findById(id.id).select("-password"); // Find the member with the provided email in the database
    res.status(200).json(member); // Return the member object in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET MEMBER BY EMAIL - Controller function for getting a member by email */
export const getMember = async (req, res) => {
  try {
    // Set email param from the request body
    const { email } = req.params;
    const member = await Members.findOne({ email: email }).select("-password"); // Find the member with the provided email in the database

    // Manually populate the reportsTo field based on email addresses
    for (const assessment of member.assessments) {
      const assigneeEmail = assessment.assignedBy;
      const assignedBy = await Members.findOne({
        email: assigneeEmail,
      }).select("name");
      assessment.assignedBy = assignedBy;
    }

    res.status(200).json(member); // Return the member object in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET MEMBERS BY EMAILS - Controller function for getting members by emails */
export const getMembersByEmails = async (req, res) => {
  try {
    // Extract the array of emails from the request query
    const { teamEmails } = req.query;

    // Split the comma-separated string into an array of emails
    const emailArray = teamEmails.split(",");

    // Create an array to store member objects
    const memberObjects = [];

    // Loop through each email in teamEmails and find the corresponding member
    for (const email of emailArray) {
      const member = await Members.findOne({ email }).select("-password");
      if (member) {
        memberObjects.push(member);
      }
    }

    res.status(200).json(memberObjects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* GET MEMBERS - Controller function for getting members with pagination, sorting, and search functionality */
export const getMembers = async (req, res) => {
  try {
    // Set pagination, sorting and search params provided by the request.
    const {
      page = 1,
      pageSize = 20,
      sort = null,
      search = "",
      organisationID = "",
    } = req.query;

    // Function to generate the sort query based on the provided sort parameter
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // Find members that match the search criteria, applying pagination and sorting
    const members = await Members.find({
      organisationID: organisationID, // Filter by the organization ID
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { name: { $regex: new RegExp(search, "i") } },
        { email: { $regex: new RegExp(search, "i") } },
        { city: { $regex: new RegExp(search, "i") } },
        { position: { $regex: new RegExp(search, "i") } },
        { team: { $regex: new RegExp(search, "i") } },
      ],
    })
      .select("-password") // Exclude the password field from the results
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    // Manually populate the reportsTo field based on email addresses
    for (const member of members) {
      const reportsToEmails = member.reportsTo;
      const reportsToMembers = await Members.find({
        email: { $in: reportsToEmails },
      })
        .select("name")
        .select("email");
      member.reportsTo = reportsToMembers;
    }

    // Count total members that match the search criteria (without pagination)
    const total = await Members.countDocuments({
      organisationID: organisationID, // Filter by the organization ID
      $or: [
        { title: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
        { team: { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).json({ members, total }); // Return the members array and total count in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET MEMBERS - Controller function for getting members with pagination, sorting, and search functionality */
export const getOrganisationAssessments = async (req, res) => {
  try {
    // Set pagination, sorting and search params provided by the request.
    const { organisationID = "" } = req.query;

    // Find members that match the search criteria, applying pagination and sorting
    const members = await Members.find({
      organisationID: organisationID, // Filter by the organization ID
    });

    var pendingAssessments = 0;
    var completedAssessments = 0;
    // Format the members' information to include only relevant fields
    members.map(({ assessments }) => {
      if (assessments && assessments.length > 0) {
        for (const assessment of assessments) {
          if (assessment.completed) {
            completedAssessments += 1;
          } else {
            pendingAssessments += 1;
          }
        }
      }
    });

    res.status(200).json({ pendingAssessments, completedAssessments }); // Return the members array and total count in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET TOTAL MEMBERS - Controller function for getting the total number of members in an organisation */
export const getTotalMembers = async (req, res) => {
  try {
    const { organisationID = "" } = req.query;

    // Count total members in the organization
    const total = await Members.countDocuments({
      organisationID: organisationID, // Filter by the organization ID
    });

    // Count total members in the organization
    const teamlessTotal = await Members.countDocuments({
      organisationID: organisationID, // Filter by the organization ID
      team: "-",
    });

    res.status(200).json({ total, teamlessTotal }); // Return the total count in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET TOTAL TEAMS - Controller function for getting the total number of teams in an organisation */
export const getTotalTeams = async (req, res) => {
  try {
    const { organisationID = "" } = req.query;

    // Count total teams in the organization
    const totalTeams = await Teams.countDocuments({
      organisationID: organisationID, // Filter by the organization ID
    });

    res.status(200).json({ totalTeams }); // Return the total count in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET TEAM NAMES AND SIZES - Controller function for getting the team name and size within an organisation */
export const getTeamSizes = async (req, res) => {
  try {
    const { organisationID = "" } = req.query;

    // Find all teams within the specified organization and project only the name and size fields
    const teams = await Teams.find(
      { organisationID: organisationID },
      { name: 1, size: 1, _id: 0 }
    );

    // Find the largest team size using the $max operator
    const largestTeamSize = Math.max(...teams.map((team) => team.size), 0);

    res.status(200).json({ teams, largestTeamSize }); // Return the team names and sizes within the specified organization
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET MEMBERS - Controller function for getting members with pagination, sorting, and search functionality */
export const getTeamlessMembers = async (req, res) => {
  try {
    // Set pagination, sorting and search params provided by the request.
    const { organisationID = "" } = req.query;

    // Find members that match the search criteria, applying pagination and sorting
    const members = await Members.find({
      organisationID: organisationID, // Filter by the organization ID
      team: "-",
    }).select("-password"); // Exclude the password field from the results

    // Count total members that match the search criteria (without pagination)
    const total = await Members.countDocuments({
      organisationID: organisationID, // Filter by the organization ID
      team: "-",
    });

    res.status(200).json({ members, total }); // Return the members array and total count in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET TEAMS - Controller function for getting teams with pagination, sorting, and search functionality */
export const getTeams = async (req, res) => {
  try {
    // Set pagination, sorting and search params provided by the request.
    const {
      page = 1,
      pageSize = 20,
      sort = null,
      search = "",
      organisationID = "",
    } = req.query;

    // Function to generate the sort query based on the provided sort parameter
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // Find teams that match the search criteria, applying pagination and sorting
    const teams = await Teams.find({
      organisationID: organisationID, // Filter by the organization ID
      $or: [
        { name: { $regex: new RegExp(search, "i") } },
        { city: { $regex: new RegExp(search, "i") } },
        { department: { $regex: new RegExp(search, "i") } },
        { "teamLeaders.name": { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    // Manually populate the reportsTo field based on email addresses
    for (const team of teams) {
      const teamLeaders = team.teamLeaders;
      const members = team.members;
      const teamLeaderData = await Members.find({
        email: { $in: teamLeaders },
      })
        .select("name")
        .select("email");
      const memberData = await Members.find({
        email: { $in: members },
      })
        .select("name")
        .select("email");
      team.teamLeaders = teamLeaderData;
      team.members = memberData;
    }

    // Count total teams that match the search criteria (without pagination)
    const total = await Teams.countDocuments({
      organisationID: organisationID, // Filter by the organization ID
      $or: [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { "teamLeaders.name": { $regex: search, $options: "i" } },
      ],
    });

    res.status(200).json({ teams, total }); // Return the teams array and total count in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET MEMBERS OF A TEAM - Controller function for getting members of a team by team ID */
export const getTeamMembers = async (req, res) => {
  try {
    // Set pagination, sorting, and search params provided by the request.
    const {
      page = 1,
      pageSize = 20,
      sort = null,
      teamName = "",
      orgID = "",
    } = req.query;
    const sortParsed = JSON.parse(sort);

    // Find the team based on the provided organization ID and team name
    const team = await Teams.findOne({
      organisationID: orgID,
      name: teamName,
    });

    const members = team.members;
    const memberData = await Members.find({
      email: { $in: members },
    });
    team.members = memberData;

    // Format the members' information to include only relevant fields
    const teamMembers = team.members
      .map(
        ({
          _id,
          name,
          email,
          title,
          city,
          position,
          assessments,
          profileImage,
        }) => {
          var pendingAssessments = 0;
          var completedAssessments = 0;

          if (assessments && assessments.length > 0) {
            for (const assessment of assessments) {
              if (assessment.completed) {
                completedAssessments += 1;
              } else {
                pendingAssessments += 1;
              }
            }
          }
          return {
            _id,
            name,
            email,
            title,
            city,
            position,
            pendingAssessments,
            completedAssessments,
            profileImage,
          };
        }
      )
      .sort((a, b) => {
        // Compare two elements based on the field specified in the sort parameter
        const sortField = sortParsed?.field;
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue < bValue) {
          return sortParsed.sort === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
          return sortParsed.sort === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      })
      .slice(page * pageSize, (page + 1) * pageSize);

    res.status(200).json({ teamMembers }); // Return the formatted members array in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET ASSESSMENTS OF TEAM MEMBERS - Controller function for getting assessments of team members by team name and organization ID */
export const getTeamMemberAssessments = async (req, res) => {
  try {
    // Extract the team name and organization ID from the query parameters
    const { teamName, orgID } = req.query;

    // Find the team based on the provided team name and organization ID
    const team = await Teams.findOne({
      name: teamName,
      organisationID: orgID,
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Find all members that belong to the team
    const members = await Members.find({
      team: team.name,
      organisationID: team.organisationID,
    });

    // Prepare two arrays to store completed and incomplete member assessments
    const completedAssessments = [];
    const incompleteAssessments = [];

    // Iterate through each member and retrieve their assessments
    for (const member of members) {
      const assessments = member.assessments || []; // Assuming assessments is an array field in the MemberSchema

      // Manually populate the reportsTo field based on email addresses
      for (const assessment of assessments) {
        const assigneeEmail = assessment.assignedBy;
        const assignedBy = await Members.findOne({
          email: assigneeEmail,
        }).select("name");
        assessment.assignedBy = assignedBy;
      }

      // Format the assessments' information to include only relevant fields
      const formattedAssessments = assessments.map(
        ({
          assessmentName,
          completed,
          link,
          assignedBy,
          assignedDate,
          password,
          completionDate,
          pdfResults,
        }) => {
          return {
            assessmentName,
            completed,
            link,
            assignedBy,
            assignedDate,
            completionDate,
            password,
            pdfResults,
            memberName: member.name,
            memberEmail: member.email,
          };
        }
      );

      // Split assessments into completed and incomplete arrays
      formattedAssessments.forEach((assessment) => {
        if (assessment.completed) {
          completedAssessments.push(assessment);
        } else {
          incompleteAssessments.push(assessment);
        }
      });
    }

    res.status(200).json({
      completedAssessments,
      incompleteAssessments,
    }); // Return the formatted completed and incomplete assessments in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET ORGANISATION BY ID - Controller function for getting an organization by ID */
export const getOrganisation = async (req, res) => {
  try {
    const { abn } = req.params;
    const organisation = await Organisations.findOne({ ABN: abn }); // Find the organization with the provided ID in the database
    res.status(200).json(organisation); // Return the organization object in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* GET ORGANISATIONS - Controller function for getting all organizations */
export const getOrganisations = async (req, res) => {
  try {
    const organisations = await Organisations.find(); // Find all organizations in the database
    res.status(200).json(organisations); // Return the organizations array in the response
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* CHECK ORGANISATION BY ID - Controller function for checking an organization by ID */
export const checkOrganisation = async (req, res) => {
  try {
    const { abn } = req.params;

    const organisation = await Organisations.findOne({ ABN: abn }); // Find the organization with the provided ID in the database
    if (organisation) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* CHECK MEMBER BY EMAIL - Controller function for checking a member by email */
export const checkMember = async (req, res) => {
  try {
    // Set email param from the request body
    const { email } = req.params;
    const member = await Members.findOne({ email: email }); // Find the member with the provided email in the database
    if (member) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* CHECK MEMBER BY EMAIL - Controller function for checking a member by email */
export const getTeam = async (req, res) => {
  try {
    const abn = req.query.abn;
    const teamName = req.query.teamName;

    const team = await Teams.findOne({
      organisationID: abn,
      name: teamName,
    }); // Find the member with the provided email in the database
    if (team) {
      const teamLeaders = team.teamLeaders;
      const members = team.members;
      const teamLeaderData = await Members.find({
        email: { $in: teamLeaders },
      })
        .select("name")
        .select("email");
      const memberData = await Members.find({
        email: { $in: members },
      })
        .select("name")
        .select("email");
      team.teamLeaders = teamLeaderData;
      team.members = memberData;

      return res.status(200).json({ exists: true, team: team });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};

/* CHECK MEMBER BY EMAIL - Controller function for checking a member by email */
export const checkTeam = async (req, res) => {
  try {
    const abn = req.params.abn;
    const teamName = req.params.team;
    const team = await Teams.findOne({
      organisationID: abn,
      name: teamName,
    }); // Find the member with the provided email in the database
    if (team) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(404).json({ message: error.message }); // Handle any errors that occur during the process
  }
};
