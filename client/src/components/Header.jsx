import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

// Define a functional component called Header which takes two props: title and subtitle
const Header = ({ title, subtitle }) => {
  // Access the current theme using useTheme() hook from Material-UI
  const theme = useTheme();

  return (
    <Box>
      {/* Typography component to display the title */}
      <Typography
        variant="h2" // Use heading variant h2
        color={theme.palette.textoffblack.default} // Set the text color from the theme's palette
        fontWeight="bold" // Set the font weight to bold
        sx={{ mb: "5px" }} // Apply custom styles using the sx prop (in this case, set margin-bottom to 5px)
      >
        {title} {/* Display the value of the title prop */}
      </Typography>
      {/* Typography component to display the subtitle */}
      <Typography
        variant="h5" // Use heading variant h5
        color={theme.palette.textoffblack.default} // Set the text color from the theme's palette
      >
        {subtitle} {/* Display the value of the subtitle prop */}
      </Typography>
    </Box>
  );
};

// Export the Header component to make it available for use in other modules
export default Header;
