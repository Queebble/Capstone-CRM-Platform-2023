import React from "react";
import { useTheme, Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

{
  /* Renders a tab-based navigation using Material-UI's TabList, Tab, 
and TabPanel components. The component accepts the activeTab prop, 
which determines the initially active tab. The navHeaders prop is 
an array of objects containing the tab labels (text) and their 
corresponding content (display). The appearance of the tabs, such as 
text color, background color, and tab indicator color, is determined 
by the current theme provided by Material-UI. */
}

// Define the TabNav component, which displays a tab-based navigation
const TabNav = ({ activeTab, navHeaders }) => {
  // Access the current theme using MUI's useTheme hook
  const theme = useTheme();

  // State variable to track the active tab
  const [value, setValue] = React.useState(activeTab);

  // Function to handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Render the TabNav component
  return (
    <TabContext value={value}>
      <Box
        sx={{
          borderTop: 1,
          borderColor: theme.palette.background.default, // Set the border color based on the theme
          bgcolor: theme.palette.white.default, // Set the background color based on the theme
        }}
      >
        {/* TabList to display the navigation headers */}
        <TabList
          variant="scrollable" // Enable scrollable tabs if the number of tabs exceeds the available space
          TabIndicatorProps={{
            sx: { backgroundColor: theme.palette.primaryblue.default }, // Set the tab indicator color based on the theme
          }}
          onChange={handleChange} // Call the handleChange function when a tab is clicked
          sx={{
            boxShadow:
              "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)", // Add a box shadow to the TabList
            height: "52px", // Set the height of the TabList
          }}
        >
          {navHeaders.map(({ text, index }) => {
            // Loop through the navigation headers and render a Tab component for each header
            return (
              <Tab
                label={text} // Set the tab label text
                value={index} // Set the value of the tab to its corresponding index
                key={index} // Use the index as the key for the Tab component
                to={`/tab=${index}`}
                sx={{
                  typography: theme.typography.h3, // Set the typography of the tab text based on the theme
                  textTransform: "none", // Disable text transformation (e.g., uppercase)
                  "&.Mui-selected": {
                    color: theme.palette.primaryblue.default, // Set the tab text color when it is selected
                    fontWeight: "600", // Set the font weight of the tab text when it is selected
                  },
                }}
              />
            );
          })}
        </TabList>
      </Box>
      {/* Render the corresponding TabPanel for each navigation header */}
      {navHeaders.map(({ index, display }) => (
        <TabPanel value={index} key={index}>
          {display} {/* Render the content associated with the current tab */}
        </TabPanel>
      ))}
    </TabContext>
  );
};

// Export the TabNav component as the default export
export default TabNav;
