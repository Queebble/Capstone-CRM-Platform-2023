import React, { useState } from "react";
import {
  Button,
  Typography,
  useTheme,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditResponsibilities from "scenes/profile/EditResponsibilities";

// Defining the EditResponsibilitiesButton component.
const EditResponsibilitiesButton = ({ data }) => {
  // Using the current theme for styling purposes.
  const theme = useTheme();

  // Setting up local state to manage the visibility of the form using useState.
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to display the edit form when the button is clicked.
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  // Function to hide the edit form.
  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  // JSX for the component.
  return (
    <Box>
      {/* Button to initiate the editing process. On click, it displays the edit responsibilities form. */}
      <IconButton
        onClick={handleButtonClick}
        color={theme.palette.textoffblack.default}
        edge="end"
      >
        <EditRoundedIcon />
      </IconButton>

      {/* Conditional rendering: If isFormVisible is true, display a modal-like structure for editing responsibilities. */}
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
          {/* Main container for the form content. */}
          <Container
            component="main"
            maxWidth="sm"
            style={{
              backgroundColor: "#fff",
              padding: "20px",
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
              {/* Title of the edit responsibilities form. */}
              <Typography
                component="h1"
                variant="h4"
                align="center"
                marginBottom="-40px"
              >
                Edit Responsibilities
              </Typography>

              {/* Rendering the actual responsibilities editing form, passing down necessary data and callbacks. */}
              <EditResponsibilities
                data={data}
                handleFormClose={handleFormClose}
              />

              {/* Button to close the responsibilities editing form. */}
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

// Exporting the EditResponsibilitiesButton component for use in other parts of the application.
export default EditResponsibilitiesButton;
