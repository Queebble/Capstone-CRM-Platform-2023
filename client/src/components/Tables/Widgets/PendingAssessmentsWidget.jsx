import React from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import FlexBetween from "../../FlexBetween";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// The PendingAssessmentsWidget component is designed to display a statistic widget,
// specifically for pending assessments.
const PendingAssessmentsWidget = ({ gridColumn, gridRow, data }) => {
  // Access theme settings using the useTheme hook from Material-UI.
  // This helps in maintaining consistent styling across the application.
  const theme = useTheme();

  // Render the widget.
  return (
    <Box
      gridColumn={gridColumn}
      gridRow={gridRow}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem" // Padding to give space inside the widget.
      flex="1 1 100%" // Ensures widget takes up the full width and height of its container.
      backgroundColor={theme.palette.white.default} // Set the widget's background color using the theme.
      borderRadius="0.55rem" // Gives the widget rounded corners.
      boxShadow="0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)" // Apply a subtle shadow to give the widget depth.
    >
      {/* Widget's header containing the title and an icon. */}
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.textoffblack.default }} // Using the theme for consistent text color.
        >
          Pending Assessments
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

      {/* Display the count of pending assessments.
         If data isn't available and isn't 0, display a loading spinner. */}
      <Typography
        variant="h1"
        fontWeight="600"
        justifyContent="center"
        sx={{ color: theme.palette.textoffblack.default }}
      >
        {!data && data !== 0 ? <CircularProgress /> : data}
      </Typography>

      {/* A section providing additional context about the data. */}
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.textoffblack.default }}
        >
          <strong>{data}</strong> assessment(s) pending.
        </Typography>
      </FlexBetween>
    </Box>
  );
};

// Export the component to make it available for other parts of the application.
export default PendingAssessmentsWidget;
