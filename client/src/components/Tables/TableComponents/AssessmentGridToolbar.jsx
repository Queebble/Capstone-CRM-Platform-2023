import React from "react";
import { useMediaQuery, Typography, useTheme } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "components/FlexBetween";

/* The AssessmentGridToolbar component is a custom toolbar designed to be used with
   Material-UI's data grid. It offers functionality such as column selection, density 
   selection, and searching. */

const AssessmentGridToolbar = ({ TableName }) => {
  // Using Material-UI's useMediaQuery hook to determine if the screen size
  // meets the condition of being a non-mobile screen (min-width: 1200px)
  const isNonMobileScreens = useMediaQuery("(min-width: 1200px)");

  // Access the current theme using Material-UI's useTheme hook
  const theme = useTheme();

  return (
    // The container that holds the entire custom toolbar
    <GridToolbarContainer>
      {/* FlexBetween component is used to place its child elements at either end of the container */}
      <FlexBetween width="100%">
        {/* Typography component to display the table name */}
        <Typography
          color={theme.palette.textoffblack.default}
          variant="h4"
          ml="12px"
        >
          {TableName}
        </Typography>

        {/* Conditional rendering based on screen size */}
        {isNonMobileScreens ? (
          // For non-mobile screens, display column selection and density selector buttons
          <FlexBetween ml="10px">
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
          </FlexBetween>
        ) : (
          // For smaller screens, render an empty box as a placeholder (or any other design decision for mobile views)
          <FlexBetween>{/* Empty space */}</FlexBetween>
        )}
      </FlexBetween>
    </GridToolbarContainer>
  );
};

// Export the AssessmentGridToolbar component to make it available for use in other parts of the application
export default AssessmentGridToolbar;
