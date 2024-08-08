import React from "react";
import { Button, Typography, useTheme, Box } from "@mui/material";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Define the BookAssessmentsButton component.
const BookAssessmentsButton = ({ selectedRows }) => {
  // Access the theme from Material-UI's useTheme hook.
  const theme = useTheme();

  // Read from Redux state.
  const user = useSelector((state) => state.global.user);
  const finxsToken = useSelector((state) => state.global.finxs_token);
  const finxsAccessCode = useSelector(
    (state) => state.global.finxs_access_code
  );

  // Get the count of selected rows (or users to generate passwords for).
  const numberOfPasswords = selectedRows.length;

  // Async function to request the generation of passwords.
  const handleGeneratePasswords = async () => {
    try {
      if (numberOfPasswords > 0) {
        // Request payload.
        const requestInfo = {
          auth_token: finxsToken,
          number_of_passwords: numberOfPasswords,
          access_code: finxsAccessCode,
        };

        // API call to generate passwords.
        const generatedPasswordsResponse = await fetch(
          `${process.env.REACT_APP_BASE_URL}/finxs/passwords`,
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(requestInfo),
          }
        );

        // Handle the API response.
        if (generatedPasswordsResponse.ok) {
          const generatedPasswordsData =
            await generatedPasswordsResponse.json();
          if (generatedPasswordsData.success) {
            return generatedPasswordsData.passwords;
          } else {
            console.error(generatedPasswordsData.message);
          }
        } else {
          console.error("Failed to generate passwords");
        }
      } else {
        // If no users were selected, show a toast error.
        toast.error(
          "Failed to book assessments. Please select at least 1 person for booking."
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Async function to book assessments.
  const handleAddAssessments = async (assessments) => {
    try {
      // API call to book assessments.
      const addAssessmentReponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/finxs/addAssessments`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(assessments),
        }
      );

      // Handle the API response.
      if (addAssessmentReponse.status === 200) {
        toast.success(
          "Assessments have been successfully booked for selected members!"
        );
      } else {
        console.error(addAssessmentReponse.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // The main function that is executed when the "Book Assessment" button is clicked.
  const handleBookAssessments = async () => {
    // Generate passwords.
    const passwords = await handleGeneratePasswords();

    // Map the selected rows (or users) to their respective assessments.
    const assessments = selectedRows.map((memberId, index) => ({
      memberId: memberId,
      assessmentData: {
        assessmentName: "Behavioural Analysis",
        password: passwords[index].value,
        link: passwords[index].link,
        assignedBy: user.email,
      },
    }));

    // Book the assessments.
    await handleAddAssessments(assessments);
  };

  // Render the "Book Assessment" button.
  return (
    <Box
      sx={{
        margin: "0px 20px 0px auto",
      }}
    >
      <Button
        onClick={handleBookAssessments}
        startIcon={
          <MenuBookRoundedIcon
            sx={{ color: theme.palette.textoffblack.default }}
          />
        }
        sx={{
          textTransform: "none",
          borderRadius: "15px",
          borderColor: theme.palette.textoffblack.default,
        }}
      >
        <Typography variant="h5" color={theme.palette.textoffblack.default}>
          Book Assessment
        </Typography>
      </Button>
    </Box>
  );
};

// Export the BookAssessmentsButton component.
export default BookAssessmentsButton;
