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
import EditEmployment from "scenes/profile/EditEmployment";

// Define the EditEmploymentButton component.
const EditEmploymentButton = ({ data }) => {
  // Retrieve the current theme for styling.
  const theme = useTheme();

  // State management for form visibility using the useState hook.
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to show the edit form when the button is clicked.
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  // Function to hide the edit form.
  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  // Component JSX.
  return (
    <Box>
      {/* Render the edit icon button. When clicked, it'll display the edit employment form. */}
      <IconButton
        onClick={handleButtonClick}
        color={theme.palette.textoffblack.default}
        edge="end"
      >
        <EditRoundedIcon />
      </IconButton>

      {/* Check if form should be visible. If true, display a modal-like structure for editing employment details. */}
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
          {/* Container for the form content. */}
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
              {/* Title for the edit employment form. */}
              <Typography
                component="h1"
                variant="h4"
                align="center"
                marginBottom="-40px"
              >
                Edit Employment
              </Typography>

              {/* Rendering the actual employment editing form and passing necessary data and callbacks. */}
              <EditEmployment data={data} handleFormClose={handleFormClose} />

              {/* Button to close the employment editing form. */}
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

// Export the EditEmploymentButton component for use in other parts of the application.
export default EditEmploymentButton;
