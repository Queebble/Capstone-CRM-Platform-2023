import React, { useState } from "react";
import { Button, Typography, useTheme, Box, Container } from "@mui/material";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import { toast } from "react-toastify";

// Function to handle the removal of team members.
const removeTeamMember = async (rows, orgID, teamName, refetchTeam) => {
  // Format the data to be sent in the request.
  const requestData = {
    orgID: orgID,
    teamName: teamName,
    memberIDs: rows,
  };

  // Making a POST request to remove team members.
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/removeTeamMembers`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(requestData),
    }
  );

  // Check the response and display appropriate toast notifications.
  if (savedUserResponse) {
    toast.success("Members successfully removed from team!");
    refetchTeam();
  } else {
    toast.error("Error occurred: members could not be removed from team");
  }
};

// Main component to render the Remove Team Members button and associated modal.
const RemoveTeamMembersButton = ({
  rows,
  handleRerender,
  orgID,
  teamName,
  refetchTeam,
  refetchTeamData,
  refetchAssessmentData,
}) => {
  const theme = useTheme();
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to handle button click - toggle the visibility of the confirmation modal.
  const handleButtonClick = () => {
    rows.length !== 0 ? setIsFormVisible(true) : setIsFormVisible(false);
  };

  // Function to handle the removal of selected team members.
  const handleRemoveMembers = async () => {
    await removeTeamMember(rows, orgID, teamName, refetchTeam);
    refetchTeamData();
    setIsFormVisible(false);
    refetchAssessmentData();
    handleRerender();
  };

  // Render the button and the confirmation modal.
  return (
    <Box sx={{ margin: "0px 20px 0px auto" }}>
      <Button
        onClick={handleButtonClick}
        startIcon={
          <PersonRemoveAlt1OutlinedIcon
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
          Remove Members
        </Typography>
      </Button>

      {/* Conditional rendering of the confirmation modal */}
      {isFormVisible && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            component="main"
            maxWidth="sm"
            style={{
              backgroundColor: "#fff",
              padding: "0px 20px 20px 20px",
              borderRadius: "0.55rem",
            }}
          >
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ marginTop: 6 }}>
                <Typography variant="h4">
                  Are you sure you want to remove these members?
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: "10px",
                  }}
                >
                  <Button
                    onClick={() => setIsFormVisible(false)}
                    sx={{ marginTop: "12px" }}
                  >
                    No
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleRemoveMembers}
                    sx={{ marginTop: "10px" }}
                  >
                    Yes
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default RemoveTeamMembersButton;
