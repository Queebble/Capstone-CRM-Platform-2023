const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

{
  /* Creates a custom styled component called FlexBetween using Material-UI's styled function.
 The component is based on the Box component and applies CSS styles to create a flex container
 with justifyContent: "space-between" and alignItems: "center" properties. It can be used to 
easily create a layout where the child elements are distributed evenly with maximum space between
 them along the main axis (horizontally) and aligned to the center along the cross-axis (vertically).*/
}

// Define a new styled component called FlexBetween, which extends the Box component
const FlexBetween = styled(Box)({
  // Styling for the FlexBetween component using inline CSS-in-JS
  display: "flex", // Set the display to flex, making it a flex container
  justifyContent: "space-between", // Items inside the container will be evenly distributed along the main axis with maximum space between them
  alignItems: "center", // Align items to the center along the cross-axis

  // Additional styles can be added here as needed.
  // For example, you can add padding, margin, background-color, etc.
});

// Export the FlexBetween component to make it available for use in other modules
export default FlexBetween;
