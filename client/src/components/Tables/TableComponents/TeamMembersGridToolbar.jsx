import React from "react";
import { Search } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";
import AddMembersButton from "./AddMembersButton";
import RemoveTeamMembersButton from "./RemoveTeamMembersButton";

/* 
The TeamMembersGridToolbar component is a flexible and reusable toolbar component
that can be used with a Material-UI data grid. It provides functionality for column
selection, density selection, data export, and search using a search input field
and a search icon button.
*/

// Define the DataGridCustomToolbar component, which receives search-related props.
const TeamMembersGridToolbar = ({
  TableName,
  handleRerender,
  orgID,
  teamName,
  refetchTeamData,
  RemoveButton,
  refetchAssessmentData,
}) => {
  // Check if the screen size is mobile(min-width: 900px) using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();

  // Render the container for the custom toolbar.
  return (
    <GridToolbarContainer>
      {/* Use a custom FlexBetween component to arrange elements horizontally. */}
      <FlexBetween width="100%">
        {/* Display the table name */}
        <Typography
          color={theme.palette.textoffblack.default}
          variant="h4"
          ml="12px"
        >
          {TableName}
        </Typography>
        {/* Group the Remove and Add members buttons together */}
        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {RemoveButton}
          <AddMembersButton
            handleRerender={handleRerender}
            orgID={orgID}
            teamName={teamName}
            refetchTeamData={refetchTeamData}
            refetchAssessmentData={refetchAssessmentData}
          />
        </Box>
        {/* Conditional rendering based on screen size */}
        {isNonMobileScreens ? (
          <FlexBetween ml="10px">
            {/* Display buttons for column selection and density selection. */}
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
          </FlexBetween>
        ) : (
          <FlexBetween>
            {/* Display empty box for when screen becomes too small */}
          </FlexBetween>
        )}
      </FlexBetween>
    </GridToolbarContainer>
  );
};

// Export the DataGridCustomToolbar component to make it available for other modules to use.
export default TeamMembersGridToolbar;
