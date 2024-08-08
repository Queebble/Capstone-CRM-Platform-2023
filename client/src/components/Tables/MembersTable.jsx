import React, { useState } from "react";
import { Box, useTheme, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMembersQuery } from "state/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddMemberButton from "./TableComponents/AddMemberButton";
import RemoveMemberButton from "./TableComponents/RemoveMemberButton";
import DataGridCustomToolbar from "./TableComponents/DataGridCustomToolbar";

{
  /* The MembersTable component displays a table of teams using the DataGrid component from MUI.
 It fetches data from the backend using the useGetMembersQuery hook. The table columns are defined
 in the teamsColumns array. The table is styled using Material-UI's sx prop, which allows applying
 custom styles for various elements within the DataGrid. Additionally, the component uses the 
 DataGridCustomToolbar component to customize the toolbar of the DataGrid. */
}

// Define the MembersTable component
const MembersTable = ({
  gridColumn,
  gridRow,
  refetchTotalMembers,
  refetchTeamSizes,
}) => {
  // Access the current theme
  const theme = useTheme();
  const TableName = "Members List";

  // State variables to be sent to the backend

  const [page, setPage] = useState(0); // Current page number
  const [pageSize, setPageSize] = useState(20); // Number of items to display per page
  const [sort, setSort] = useState({}); // Sorting configuration
  const [search, setSearch] = useState(""); // Search query
  const [searchInput, setSearchInput] = useState(""); // Input for search
  const [rerender, setRerender] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);

  // Access the token from the Redux store using useSelector
  const token = useSelector((state) => state.global.token);
  const user = useSelector((state) => state.global.user);
  const organisationID = user.organisationID;

  // Fetch members data from the backend using useGetMembersQuery hook
  const { data, isLoading } = useGetMembersQuery(
    {
      page,
      pageSize,
      sort: JSON.stringify(sort),
      search,
      token,
      rerender,
      organisationID,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleRerender = () => {
    refetchTotalMembers();
    refetchTeamSizes();
    setRerender(!rerender);
  };

  const handleRowSelection = (selection) => {
    setSelectedRows(selection);
  };

  // Define columns configuration for the data grid
  const membersColumns = [
    {
      field: "profileImage",
      headerName: "Profile",
      flex: 0.2,
      renderCell: (params) => (
        <div style={{ margin: "auto" }}>
          <Avatar alt="Profile" src={params.row.profileImage} />
        </div>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 0.2,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.7,
      // Wrap the cell content with a Link component
      renderCell: (params) => (
        <Link to={`/profile/${params.row.email}`}>{params.value}</Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.4,
    },
    {
      field: "position",
      headerName: "Position",
      flex: 1,
    },
    {
      field: "team",
      headerName: "Team",
      flex: 0.5,
      renderCell: (params) =>
        params.row.team != "-" ? (
          <Link to={`/team/${params.row.team}`}>{params.value}</Link>
        ) : (
          "-"
        ),
    },
  ];

  return (
    // Styling for the container box
    <Box
      gridColumn={gridColumn}
      gridRow={gridRow}
      sx={{
        boxSadow:
          "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)",
        // Styles for the data grid and its components
        "& .MuiDataGrid-root": {
          border: "none",
          fontSize: "1rem",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-toolbarContainer": {
          backgroundColor: theme.palette.white.default,
          borderRadius: "7px 7px 0px 0px",
          boxShadow:
            "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.white.default,
          color: theme.palette.textoffblack.default,
          borderBottom: "none",
          borderRadius: "0px",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.white.default,
        },
        "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
          width: "0.4em",
        },
        "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
          background: theme.palette.white.default,
        },
        "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "4px",
        },
        "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.white.default,
          color: theme.palette.textoffblack.default,
          borderTop: "none",
          borderRadius: "0px 0px 7px 7px",
          boxShadow:
            "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.textoffblack.default} !important`,
        },
      }}
    >
      {/* Render the DataGrid component */}
      <DataGrid
        loading={isLoading || !data}
        getRowId={(row) => row._id} // Function to retrieve unique IDs for each row
        rows={(data && data.members) || []} // Data to be displayed in the grid
        columns={membersColumns} // Column configuration for the grid
        checkboxSelection // Enable checkbox selection
        onSelectionModelChange={handleRowSelection}
        rowCount={(data && data.total) || 0} // Total number of rows (used for pagination)
        rowsPerPageOptions={[20, 50, 100]} // Options for rows per page dropdown
        pagination // Enable pagination
        page={page} // Current page number
        pageSize={pageSize} // Number of items to display per page
        paginationMode="server" // Enable server-side pagination
        sortingMode="server" // Enable server-side sorting
        onPageChange={(newPage) => setPage(newPage)} // Handle page change event
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // Handle rows per page change event
        onSortModelChange={(newSortModel) => setSort(...newSortModel)} // Handle sorting change event
        components={{ Toolbar: DataGridCustomToolbar }} // Use a custom toolbar component
        componentsProps={{
          toolbar: {
            TableName,
            searchInput,
            setSearchInput,
            setSearch,
            ButtonAdd: <AddMemberButton handleRerender={handleRerender} />,
            ButtonRemove: (
              <RemoveMemberButton
                rows={selectedRows}
                handleRerender={handleRerender}
              />
            ),
          }, // Pass props to the custom toolbar component
        }}
        localeText={{
          // Customize the "No rows" message here
          noRowsLabel: "No Members",
        }}
      />
    </Box>
  );
};

// Export the MembersTable component as the default export
export default MembersTable;
