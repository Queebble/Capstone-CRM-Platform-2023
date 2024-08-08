import React from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import FlexBetween from "../../FlexBetween";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// The TeamCompletedAssessmentsWidget component is designed to display a statistic widget
// representing the number of assessments completed by a team.
const TeamCompletedAssessmentsWidget = ({ data, gridColumn, gridRow }) => {
  // Access theme settings using the useTheme hook from Material-UI.
  // This provides consistent styling based on a centralized theme.
  const theme = useTheme();

  // Render the widget.
  return (
    <Box
      gridColumn={gridColumn} // Determine grid column based on props.
      gridRow={gridRow} // Determine grid row based on props.
      minWidth="200px" // Ensure the widget never shrinks beyond this width.
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem" // Padding to space out content inside the widget.
      flex="1 1 100%" // Ensure widget takes up the full width and height of its container.
      backgroundColor={theme.palette.white.default} // Use theme for consistent background color.
      borderRadius="0.55rem" // Rounded corners for aesthetics.
      boxShadow="0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)" // A subtle shadow for depth.
    >
      {/* Widget's header containing title and an icon. */}
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.textoffblack.default }} // Use theme for consistent text color.
        >
          Completed Assessments
        </Typography>
        {/* Container for the book icon. */}
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
          {/* The book icon symbolizing assessments. */}
          <MenuBookRoundedIcon
            sx={{
              backgroundColor: theme.palette.uigreen.default,
              color: theme.palette.white.default,
              fontSize: "26px",
            }}
          />
        </Box>
      </FlexBetween>

      {/* Display the count of completed assessments by the team.
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
          Team has completed <strong>{data}</strong> assessment(s).
        </Typography>
      </FlexBetween>
    </Box>
  );
};

// Export the component for use elsewhere in the application.
export default TeamCompletedAssessmentsWidget;
