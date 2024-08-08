import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "./TableComponents/DataGridCustomToolbar";
import { useGetTeamsQuery } from "state/api";
import { useSelector } from "react-redux";
import AddTeamsButton from "./TableComponents/AddTeamsButton";
import { Link } from "react-router-dom";
import RemoveTeamsButton from "./TableComponents/RemoveTeamsButton";

{
  /* The TeamsTable component displays a table of teams using the DataGrid component from MUI.
 It fetches data from the backend using the useGetTeamsQuery hook. The table columns are defined
 in the teamsColumns array. The table is styled using Material-UI's sx prop, which allows applying
 custom styles for various elements within the DataGrid. Additionally, the component uses the 
 DataGridCustomToolbar component to customize the toolbar of the DataGrid. */
}

// Define the TeamsTable component
const TeamsTable = ({ gridColumn, gridRow, refetchTotalTeams }) => {
  // Get the current theme
  const theme = useTheme();
  const TableName = "Teams List";

  // Define state variables to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [rerender, setRerender] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Access the token from the global Redux store
  const token = useSelector((state) => state.global.token);
  const user = useSelector((state) => state.global.user);
  const organisationID = user.organisationID;

  // Fetch teams data from the backend using the useGetTeamsQuery hook
  const { data, isLoading, isFetching } = useGetTeamsQuery(
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
    refetchTotalTeams();
    setRerender(!rerender);
  };

  const handleRowSelection = (selection) => {
    setSelectedRows(selection);

    if (selection.length > 0) {
      const selectedRow = data.teams.find((row) => row._id === selection[0]);
      if (selectedRow) {
        const { name } = selectedRow;
        setTeamName(name);
      }
    }
  };

  // Define columns for the Teams table
  const teamsColumns = [
    {
      field: "name",
      headerName: "Team Name",
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/team/${params.row.name}`}>{params.value}</Link>
      ),
    },
    {
      field: "teamLeaders",
      headerName: "Team Leader(s)",
      flex: 1,
      valueGetter: (entry) => {
        // Concatenate team leader names for display
        return `${entry.row.teamLeaders.map(
          (teamLeader) => " " + teamLeader.name
        )}`;
      },
      // Wrap the cell content with a Link component
      renderCell: (params) => (
        <div className="team-leaders-cell">
          {params.row.teamLeaders.map((teamLeader, index) => (
            <div key={index}>
              <Link to={`/profile/${teamLeader.email}`}>{teamLeader.name}</Link>
            </div>
          ))}
        </div>
      ),
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.4,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 0.5,
    },
    {
      field: "size",
      headerName: "Size",
      flex: 0.25,
    },
  ];

  // Render the TeamsTable component
  return (
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
      {/* Render the DataGrid component with the fetched teams data */}
      <DataGrid
        loading={isLoading || isFetching || !data}
        getRowId={(row) => row._id}
        rows={(data && data.teams) || []}
        columns={teamsColumns}
        checkboxSelection
        onSelectionModelChange={handleRowSelection}
        rowCount={(data && data.total) || 0}
        rowsPerPageOptions={[20, 50, 100]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        sortingMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        components={{ Toolbar: DataGridCustomToolbar }}
        componentsProps={{
          toolbar: {
            TableName,
            searchInput,
            setSearchInput,
            setSearch,
            ButtonAdd: <AddTeamsButton handleRerender={handleRerender} />,
            ButtonRemove: (
              <RemoveTeamsButton
                rows={selectedRows}
                handleRerender={handleRerender}
                teamName={teamName}
              />
            ),
          },
        }}
        localeText={{
          // Customize the "No rows" message here
          noRowsLabel: "No teams",
        }}
        getRowHeight={() => "auto"}
      />
    </Box>
  );
};

// Export the TeamsTable component as the default export
export default TeamsTable;
