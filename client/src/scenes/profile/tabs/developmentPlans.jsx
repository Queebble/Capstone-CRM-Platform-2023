import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import React from "react";
import DevPlans from "./DevelopmentPlansComponents/devPlans";

// Define a functional component called DevelopmentPlans that takes userEmail as a parameter
const DevelopmentPlans = (userEmail) => {
  const theme = useTheme(); // Getting the current theme from Material-UI

  // Check if the screen size is mobile (min-width: 1100px) using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");

  return (
    <Box
      backgroundColor={theme.palette.white.default}
      gridColumn={isNonMobileScreens ? "span 8" : "span 2"} // Adjust gridColumn for mobile screens
      gridRow="span 4"
      sx={{
        boxShadow:
          "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)", // Adding a box shadow
        borderRadius: "0.55rem", // Applying border radius
        overflowY: "scroll", // Adding scroll overflow for the content
      }}
    >
      <Box p="10px 20px 20px 20px">
        {/* Render the DevPlans component and pass userEmail as a prop */}
        <DevPlans userEmail={userEmail} />
      </Box>
    </Box>
  );
};

export default DevelopmentPlans;
