import React from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import FlexBetween from "../../FlexBetween";
import GroupsIcon from "@mui/icons-material/Groups";

// Define the TotalTeamsWidget component
const TotalTeamsWidget = ({ data }) => {
  // Access the current theme settings using the useTheme hook from Material-UI.
  const theme = useTheme();

  // Render the component
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.white.default}
      borderRadius="0.55rem"
      boxShadow="0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)"
    >
      {/* Header showing the widget's title and an icon */}
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.textoffblack.default }}
        >
          Total Teams
        </Typography>
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
          <GroupsIcon
            sx={{
              backgroundColor: theme.palette.uigreen.default,
              color: theme.palette.white.default,
              fontSize: "26px",
            }}
          />
        </Box>
      </FlexBetween>

      {/* Display the total number of teams. If data is not present, a loading spinner is shown. */}
      <Typography
        variant="h1"
        fontWeight="600"
        justifyContent="center"
        sx={{ color: theme.palette.textoffblack.default }}
      >
        {!data ? <CircularProgress /> : data?.totalTeams}
      </Typography>

      {/* Additional information about the total number of teams in the organization */}
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.textoffblack.default }}
        >
          Total of <strong>{data?.totalTeams}</strong> team(s) in this
          organization
        </Typography>
      </FlexBetween>
    </Box>
  );
};

// Export the component for use elsewhere in the application.
export default TotalTeamsWidget;
