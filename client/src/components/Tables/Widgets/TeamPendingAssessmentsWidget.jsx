import React from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import FlexBetween from "../../FlexBetween";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// The TeamPendingAssessmentsWidget component displays a widget
// that shows the number of pending assessments for a team.
const TeamPendingAssessmentsWidget = ({ data, gridColumn, gridRow }) => {
  // Access the current theme settings using the useTheme hook provided by Material-UI.
  // This will be used for consistent styling throughout the component.
  const theme = useTheme();

  // Render the component.
  return (
    <Box
      gridColumn={gridColumn} // Define the grid column position based on prop.
      gridRow={gridRow} // Define the grid row position based on prop.
      minWidth="200px" // Ensure a minimum width for the widget.
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem" // Padding to separate the internal content from the widget boundaries.
      flex="1 1 100%" // Fill available space in its container.
      backgroundColor={theme.palette.white.default} // Background color from the theme.
      borderRadius="0.55rem" // Rounded corners.
      boxShadow="0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)" // Subtle shadow for aesthetic depth.
    >
      {/* Widget header displaying the title and icon. */}
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.textoffblack.default }} // Text color from the theme.
        >
          Pending Assessments
        </Typography>
        {/* Container for the book icon which symbolizes assessments. */}
        <Box
          sx={{
            width: "30px",
            height: "30px",
            borderRadius: "5px",
            backgroundColor: theme.palette.uigreen.default,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MenuBookRoundedIcon
            sx={{
              backgroundColor: theme.palette.uigreen.default,
              color: theme.palette.white.default,
              fontSize: "26px",
            }}
          />
        </Box>
      </FlexBetween>

      {/* Display the number of pending assessments.
         If data isn't available and isn't 0, show a loading spinner. */}
      <Typography
        variant="h1"
        fontWeight="600"
        justifyContent="center"
        sx={{ color: theme.palette.textoffblack.default }}
      >
        {!data && data !== 0 ? <CircularProgress /> : data}
      </Typography>

      {/* Contextual information about the displayed data. */}
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.textoffblack.default }}
        >
          Team has <strong>{data}</strong> assessment(s) pending.
        </Typography>
      </FlexBetween>
    </Box>
  );
};

// Export the component for use elsewhere in the application.
export default TeamPendingAssessmentsWidget;
