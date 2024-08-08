import React, { useState } from "react";
import { Button, Typography, useTheme, Box, Container } from "@mui/material";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AddTeam from "scenes/dashboard/AddTeam";

// Define the 'AddTeamsButton' component
const AddTeamsButton = ({ handleRerender }) => {
  // Use Material-UI's 'useTheme' hook to access the current theme
  const theme = useTheme();

  // Define a state to manage the visibility of the form
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Define a handler function to update the form visibility and re-render parent
  const handleRender = () => {
    setIsFormVisible(false);
    handleRerender();
  };

  // Define a handler function to make the form visible on button click
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  return (
    // A Box container to wrap the button
    <Box
      sx={{
        margin: "0px 20px 0px auto",
      }}
    >
      {/* A Button to trigger the 'Add Team' form */}
      <Button
        onClick={handleButtonClick}
        startIcon={
          <PersonAddAlt1RoundedIcon
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
          Add Team
        </Typography>
      </Button>

      {/* Conditional rendering of the form based on its visibility state */}
      {isFormVisible && (
        // Overlay Box that covers the entire screen with a semi-transparent black background
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
          {/* Main Container for the form */}
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
              {/* Include the 'AddTeam' component, passing necessary props */}
              <AddTeam handleRender={handleRender} />

              {/* Button to close the form */}
              <Button
                onClick={() => setIsFormVisible(false)}
                sx={{ marginTop: "10px" }}
              >
                Close Box
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

// Export the 'AddTeamsButton' component as the default export
export default AddTeamsButton;
