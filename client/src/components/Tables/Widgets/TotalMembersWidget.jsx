import React from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import FlexBetween from "../../FlexBetween";
import GroupsIcon from "@mui/icons-material/Groups";

// The TotalMembersWidget component displays the total number of members and the number of members not in a team.
const TotalMembersWidget = ({ data }) => {
  // Access the current theme settings using the useTheme hook from Material-UI.
  // This provides access to the theme's color palette and other properties.
  const theme = useTheme();

  // Render the component
  return (
    <Box
      gridColumn="span 2" // Span across 2 grid columns.
      gridRow="span 1" // Span across 1 grid row.
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem" // Apply padding to the box.
      flex="1 1 100%" // Set flex properties to ensure it fills its container.
      backgroundColor={theme.palette.white.default} // Set the background color based on the theme's palette.
      borderRadius="0.55rem" // Rounded corners for aesthetics.
      boxShadow="0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)" // Add a subtle shadow for visual depth.
    >
      {/* Header displaying the title of the widget and an icon */}
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.textoffblack.default }} // Text color based on the theme.
        >
          Total Members
        </Typography>
        <Box
          sx={{
            width: "30px",
            height: "30px",
            borderRadius: "5px",
            backgroundColor: theme.palette.uigreen.default, // Icon background color.
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GroupsIcon
            sx={{
              backgroundColor: theme.palette.uigreen.default,
              color: theme.palette.white.default, // Icon color.
              fontSize: "26px", // Size of the icon.
            }}
          />
        </Box>
      </FlexBetween>

      {/* Display the total number of members. If data is not present, show a loading spinner. */}
      <Typography
        variant="h1"
        fontWeight="600"
        justifyContent="center"
        sx={{ color: theme.palette.textoffblack.default }}
      >
        {!data ? <CircularProgress /> : data?.total}
      </Typography>

      {/* Provide additional information about members not in a team */}
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.textoffblack.default }}
        >
          <strong>{data?.teamlessTotal}</strong> member(s) not in a team.
        </Typography>
      </FlexBetween>
    </Box>
  );
};

// Export the component for use elsewhere in the application.
export default TotalMembersWidget;
