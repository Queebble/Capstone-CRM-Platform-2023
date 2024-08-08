import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

// Define the GetReportButton component which takes in an assessment prop.
export const GetReportButton = ({ assessment }) => {
  // Retrieve the finxs_access_code from the Redux state.
  const finxsAccessCode = useSelector(
    (state) => state.global.finxs_access_code
  );

  // Asynchronous function for user authentication to get a token.
  const finxsAuth = async () => {
    try {
      // Fetch request for authentication.
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/finxs/auth`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );

      // If the response is okay, retrieve and return the token from the response.
      if (savedUserResponse.ok) {
        const responseData = await savedUserResponse.json();
        return responseData.token;
      } else {
        console.log("Authentication request failed");
      }
    } catch (error) {
      console.error("Error while authenticating:", error);
    }
  };

  // Asynchronous function to handle the retrieval of reports using the token.
  const handleGetReports = async (finxsToken) => {
    try {
      // Define the reportInfo object for the API endpoint.
      const reportInfo = {
        password: assessment.password,
        token: finxsToken,
        access_code: finxsAccessCode,
        report: "Standard Behavioural Assessment Report",
        lang: "ENG",
      };

      // Construct the download link for the report.
      const downloadLink = `https://finxs.com/api/dpa/passwords/report?auth_token=${reportInfo.token}&access_code=${reportInfo.access_code}&password=${reportInfo.password}&report_name=${reportInfo.report}&report_language=${reportInfo.lang}`;

      // Create a hidden anchor tag (<a>) to simulate downloading a file.
      const a = document.createElement("a");
      a.href = downloadLink;
      a.download = "BehaviouralAssessmentReport.pdf"; // Set a desired filename for the downloaded file.
      document.body.appendChild(a);

      // Programmatically click the anchor tag to trigger the download.
      a.click();

      // Remove the anchor tag from the DOM after triggering the download.
      document.body.removeChild(a);
    } catch (error) {
      // Notify the user about the error in the downloading process.
      toast.error(`There was an error downloading PDF: ${error.message}.`);
    }
  };

  // Define the event handler for the button click.
  const handleClick = async () => {
    // Authenticate to get the token.
    const finxsToken = await finxsAuth();
    // Trigger the report download process using the obtained token.
    handleGetReports(finxsToken);
  };

  // Render the "Get Report" button.
  return (
    <div>
      <Button onClick={handleClick}>Get Report</Button>
    </div>
  );
};
