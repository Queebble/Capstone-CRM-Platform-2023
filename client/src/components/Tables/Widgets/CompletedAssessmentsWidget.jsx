import React from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import FlexBetween from "../../FlexBetween";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

// The CompletedAssessmentsWidget component is responsible for displaying a statistic widget,
// specifically for completed assessments.
const CompletedAssessmentsWidget = ({ gridColumn, gridRow, data }) => {
  // Access the current theme settings using MUI's useTheme hook for styling consistency.
  const theme = useTheme();

  // Render the main content of the StatWidget component.
  return (
    <Box
      gridColumn={gridColumn}
      gridRow={gridRow}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem" // Provide padding to the widget.
      flex="1 1 100%" // Ensure the widget expands to fill its container.
      backgroundColor={theme.palette.white.default} // Set the background color using the theme.
      borderRadius="0.55rem" // Round the corners for aesthetic appeal.
      boxShadow="0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)" // Apply a subtle shadow to elevate the widget.
    >
      {/* This is the header of the widget, displaying the title and an icon. */}
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.textoffblack.default }} // Text color is taken from the theme.
        >
          Completed Assessments
        </Typography>
        {/* Icon container */}
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
          {/* Display a book icon inside the box. */}
          <MenuBookRoundedIcon
            sx={{
              backgroundColor: theme.palette.uigreen.default,
              color: theme.palette.white.default,
              fontSize: "26px",
            }}
          />
        </Box>
      </FlexBetween>

      {/* Display the count of completed assessments or a loading indicator if data is not available. */}
      <Typography
        variant="h1"
        fontWeight="600"
        justifyContent="center"
        sx={{ color: theme.palette.textoffblack.default }}
      >
        {!data && data !== 0 ? <CircularProgress /> : data}
      </Typography>

      {/* Provide additional details on the count of completed assessments. */}
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.textoffblack.default }}
        >
          <strong>{data}</strong> assessment(s) completed.
        </Typography>
      </FlexBetween>
    </Box>
  );
};

// The CompletedAssessmentsWidget component is exported for use in other parts of the application.
export default CompletedAssessmentsWidget;
