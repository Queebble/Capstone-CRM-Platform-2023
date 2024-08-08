import React, { useState } from "react";
import { Button, Typography, useTheme, Box, Container } from "@mui/material";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import { toast } from "react-toastify";
import { usePostRemoveTeamMutation } from "state/api";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "state/redux/actions";

// Component to handle removal of teams
const RemoveTeamsButton = ({ rows, handleRerender, teamName }) => {
  const theme = useTheme();

  // Local state to handle visibility of the confirmation form
  const [isFormVisible, setIsFormVisible] = useState(false);

  // API mutation hook to post a team removal request
  const [postRemoveTeam] = usePostRemoveTeamMutation();

  // Fetch current user data from Redux store
  const currentUser = useSelector((state) => state.global.user);
  const dispatch = useDispatch();

  // Asynchronous function to remove a team
  const removeTeam = async (rows) => {
    // Make a POST request to remove the team
    const savedUserResponse = await postRemoveTeam(rows);

    let updatedUser; // Declare updatedUser variable outside the if block

    if (savedUserResponse) {
      toast.success("Selected teams have been deleted!");

      // Check if the team to be removed is the current user's team
      if (teamName == currentUser.team) {
        updatedUser = {
          ...currentUser, // Copy all properties from the original user
          team: "-", // Update the "team" property to a placeholder value
        };
      }
      // Dispatch an action to update the user's data in the Redux store
      dispatch(updateUser(updatedUser));
    } else {
      toast.error("Error occurred: teams could not be deleted");
    }
  };

  // Handle button click and decide form visibility based on row count
  const handleButtonClick = () => {
    rows.length !== 0 ? setIsFormVisible(true) : setIsFormVisible(false);
  };

  // Handle the actual removal of teams and related actions
  async function handleRemoveTeams() {
    await removeTeam(rows);
    setIsFormVisible(false);
    handleRerender();
  }

  return (
    // Render the button and, if necessary, the confirmation form
    <Box
      sx={{
        margin: "0px 20px 0px auto",
      }}
    >
      <Button
        onClick={handleButtonClick}
        startIcon={
          <PersonRemoveAlt1RoundedIcon
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
          Remove Team
        </Typography>
      </Button>

      {/* Display confirmation form when isFormVisible is true */}
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  marginTop: 6,
                }}
              >
                <Typography variant="h4">
                  Are you sure you want to delete these teams?
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
                    onClick={handleRemoveTeams}
                    sx={{
                      marginTop: "10px",
                    }}
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

// Export the component for usage in other parts of the application
export default RemoveTeamsButton;
