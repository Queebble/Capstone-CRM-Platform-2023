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
import EditDetails from "scenes/profile/EditDetails";

// Creating the EditDetailsButton component that will render a button and, when clicked, shows an edit details form.
const EditDetailsButton = ({ data }) => {
  // Accessing the theme using the useTheme hook for styling purposes.
  const theme = useTheme();
  // useState hook to manage the visibility state of the edit form.
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to show the edit form.
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  // Function to hide the edit form.
  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  // Returning the JSX to render the component.
  return (
    <Box>
      {/* Render the edit icon button; when clicked, the edit form will be displayed. */}
      <IconButton
        onClick={handleButtonClick}
        color={theme.palette.textoffblack.default}
        edge="end"
      >
        <EditRoundedIcon />
      </IconButton>

      {/* If the form visibility state is true, then render the form inside a modal overlay. */}
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
              {/* Displaying the title of the edit form. */}
              <Typography
                component="h1"
                variant="h4"
                align="center"
                marginBottom="-40px"
              >
                Edit Details
              </Typography>

              {/* Rendering the actual edit details form and passing necessary data and callbacks. */}
              <EditDetails data={data} handleFormClose={handleFormClose} />

              {/* Button to close the modal edit form. */}
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

// Exporting the EditDetailsButton component for use in other parts of the application.
export default EditDetailsButton;
