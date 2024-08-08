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

{
  /* The DataGridCustomToolbar component is a flexible and reusable toolbar component
 that can be used with a Material-UI data grid. It provides functionality for column
 selection, density selection, data export, and search using a search input field
 and a search icon button. */
}

// Define the DataGridCustomToolbar component, which receives search-related props.
const DataGridCustomToolbar = ({
  TableName,
  searchInput,
  setSearchInput,
  setSearch,
  ButtonAdd,
  ButtonRemove,
}) => {
  // Check if the screen size is mobile(min-width: 900px) using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();

  return (
    // Render the container for the custom toolbar.
    <GridToolbarContainer>
      {/* Use a custom FlexBetween component to arrange elements horizontally. */}
      <FlexBetween width="100%">
        <Typography
          color={theme.palette.textoffblack.default}
          variant="h4"
          ml="12px"
        >
          {TableName}
        </Typography>
        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          {ButtonRemove}
          {ButtonAdd}
        </Box>

        {/* Implement a search input field with a search button. */}
        <TextField
          label="Search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          // Set the searchInput state when the user types in the search field.
          onChange={(e) => setSearchInput(e.target.value)}
          // When the user presses Enter, trigger the search and reset the input field.
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setSearch(searchInput);
              setSearchInput("");
            }
          }}
          // Bind the searchInput value to the text field to reflect the current search input.
          value={searchInput}
          variant="standard"
          InputProps={{
            // Add an adornment with a search icon at the end of the text field.
            endAdornment: (
              <InputAdornment position="end">
                {/* Add a clickable search icon button. */}
                <IconButton
                  onClick={() => {
                    setSearch(searchInput); // Trigger the search with the current input.
                    setSearchInput(""); // Reset the search input field.
                  }}
                >
                  <Search /> {/* Use the Search icon from Material-UI. */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isNonMobileScreens ? (
          <FlexBetween ml="10px">
            {/* Display buttons for column selection, density selection, and export. */}
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
          </FlexBetween>
        ) : (
          <FlexBetween>
            {/* Display empty box for when screen becomes to small */}
          </FlexBetween>
        )}
      </FlexBetween>
    </GridToolbarContainer>
  );
};

// Export the DataGridCustomToolbar component to make it available for other modules to use.
export default DataGridCustomToolbar;
