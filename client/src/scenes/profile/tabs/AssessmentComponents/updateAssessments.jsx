import React, { useState, useEffect } from "react";
import { useGetMemberQuery } from "state/api"; // Importing an API query hook
import { useSelector } from "react-redux"; // Importing Redux's useSelector

// Define a function component called UpdateAssessments that takes several parameters
const UpdateAssessments = (userEmail, finxsAccessCode, token, finxsToken) => {
  // Access the token from the Redux store using useSelector
  const email = userEmail.userEmail; // Extracting the userEmail property

  // Define a function to update password statuses for a user
  const handleUpdatePasswordStatuses = async (userID, passwordStatus) => {
    try {
      // Create an object with user and password status information
      const updateInfo = {
        member: userID,
        passwords: passwordStatus,
      };
      // Make a POST request to update password statuses
      await fetch(`${process.env.REACT_APP_BASE_URL}/finxs/updateAssessments`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(updateInfo),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // Define a function to check password statuses for a user
  const handleCheckPasswordStatuses = async (
    finxsToken,
    finxsAccessCode,
    passwords,
    userID
  ) => {
    try {
      // Create an object with authentication and password information
      const requestInfo = {
        auth_token: finxsToken,
        access_code: finxsAccessCode,
        passwords: passwords,
      };

      // Make a POST request to check password statuses
      const passwordStatusesResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/finxs/checkPasswords`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(requestInfo),
        }
      );

      // Check if the response is successful
      if (passwordStatusesResponse.ok) {
        try {
          // Parse the response data
          const passwordStatusesData = await passwordStatusesResponse.json();
          if (passwordStatusesData.success) {
            // Map password statuses to a new format and update them
            const newPasswordStatuses = passwordStatusesData.statuses.map(
              (password) => {
                if (password.password_status === "NotUsed") {
                  return {
                    value: password.value,
                    completed: false,
                  };
                } else if (password.password_status === "Used") {
                  return {
                    value: password.value,
                    completed: true,
                  };
                } else {
                  return {
                    value: password.value,
                    completed: null,
                  };
                }
              }
            );
            await handleUpdatePasswordStatuses(userID, newPasswordStatuses);
          } else {
            // Handle any potential errors here
          }
        } catch (jsonError) {
          // Handle JSON parsing errors
        }
      }
    } catch (error) {
      // Handle general errors
    }
  };

  // Fetch members data from the backend using useGetMembersQuery hook
  const { data, isLoading } = useGetMemberQuery(
    // Pass query parameters and options to the hook
    { email, token },
    { refetchOnMountOrArgChange: true }
  );

  // Extract assessments and passwords from the fetched data
  const assessments =
    data?.assessments?.map((assessment) => {
      if (assessment.completed === false) {
        return assessment;
      }
    }) || [];

  const passwords =
    data?.assessments?.map((assessment) => {
      return assessment.password;
    }) || [];

  // Use useEffect to call handleCheckPasswordStatuses when finxsToken and passwords change
  useEffect(() => {
    if (finxsToken && passwords.length > 0) {
      handleCheckPasswordStatuses(
        finxsToken,
        finxsAccessCode,
        passwords,
        data?._id
      );
    }
  }, [finxsToken]);
};

export default UpdateAssessments;
