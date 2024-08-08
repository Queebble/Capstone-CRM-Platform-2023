import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Details from "./PersonDetailsComponents/details";
import Responsibilites from "./PersonDetailsComponents/responsibilites";
import Qualifications from "./PersonDetailsComponents/qualifications";
import Employment from "./PersonDetailsComponents/employment";

const PersonalDetails = (userEmail) => {
  const theme = useTheme(); // Getting the current theme from Material-UI

  // Check if the screen size is mobile (min-width: 1100px) using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");

  return (
    <Box
      gridColumn={isNonMobileScreens ? "span 4" : "span 2"} // Adjust gridColumn for mobile screens
      gridRow="span 3"
      backgroundColor={theme.palette.white.default}
      sx={{
        boxShadow:
          "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)", // Adding a box shadow
        borderRadius: "0.55rem", // Applying border radius
        overflowY: "scroll", // Adding scroll overflow for the content
        minWidth: "340px", // Setting a minimum width
      }}
    >
      <Box p="10px 20px 20px 20px">
        {/* Render the Details, Responsibilities, Qualifications, and Employment components */}
        <Details userEmail={userEmail} />
        <Responsibilites userEmail={userEmail} />
        <Qualifications userEmail={userEmail} />
        <Employment userEmail={userEmail} />
      </Box>
    </Box>
  );
};

export default PersonalDetails;
