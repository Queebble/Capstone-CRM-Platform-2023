import React, { useState } from "react";
import {
  Button,
  Typography,
  useTheme,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddDevPlan from "scenes/profile/AddDevPlan";

// Define the AddDevelopmentPlanButton component
const AddDevelopmentPlanButton = ({ data }) => {
  // Get the current theme settings using the useTheme hook
  const theme = useTheme();

  // Define a state variable to determine if the development plan form is visible
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Handler to show the development plan form when the button is clicked
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  // Handler to close/hide the development plan form
  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  // Render the component
  return (
    <Box>
      {/* Button to trigger the visibility of the development plan form */}
      <IconButton
        onClick={handleButtonClick}
        color={theme.palette.textoffblack.default}
        edge="end"
      >
        <AddCircleOutlineRoundedIcon />
      </IconButton>

      {/* Conditional rendering of the form based on isFormVisible state */}
      {isFormVisible && (
        <Box
          // Overlay style to show the form in a modal-like manner
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
          {/* Modal container */}
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
              {/* Title of the modal */}
              <Typography
                component="h1"
                variant="h4"
                align="center"
                marginBottom="-40px"
              >
                Add Development Plan
              </Typography>

              {/* Render the development plan form component */}
              <AddDevPlan data={data} handleFormClose={handleFormClose} />

              {/* Button to close the modal */}
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

// Export the AddDevelopmentPlanButton component
export default AddDevelopmentPlanButton;
