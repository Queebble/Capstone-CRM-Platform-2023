import React, { useState } from "react";
import {
  Button,
  Typography,
  useTheme,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import DeleteDevPlan from "scenes/profile/DeleteDevPlan";

// Define the DeleteDevelopmentPlanButton component that will render a button to delete a specific development plan.
const DeleteDevelopmentPlanButton = ({ data, index }) => {
  // Access the current theme properties using Material-UI's useTheme hook.
  const theme = useTheme();
  // useState hook to manage the visibility state of the deletion form.
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Handler to display the deletion form when the delete button is clicked.
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  // Handler to hide the deletion form.
  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  // Render the delete button and the deletion form (when applicable).
  return (
    <Box>
      {/* Icon button to trigger the display of the deletion form. */}
      <IconButton
        onClick={handleButtonClick}
        color={theme.palette.textoffblack.default}
        edge="end"
      >
        <RemoveCircleOutlineRoundedIcon />
      </IconButton>

      {/* Conditional rendering of the deletion form based on isFormVisible state. */}
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
          {/* Your content for the box */}
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
              {/* Heading for the deletion form. */}
              <Typography
                component="h1"
                variant="h4"
                align="center"
                marginBottom="-40px"
              >
                Delete Development Plan
              </Typography>

              {/* The DeleteDevPlan component which might be the actual form or mechanism to delete. It takes the data, close form handler, and index as props. */}
              <DeleteDevPlan
                data={data}
                handleFormClose={handleFormClose}
                index={index}
              />

              {/* Button to close/hide the deletion form. */}
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

// Export the DeleteDevelopmentPlanButton component for use in other parts of the application.
export default DeleteDevelopmentPlanButton;
