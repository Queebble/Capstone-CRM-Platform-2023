import React, { useState } from "react";
import { Box, useTheme, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTeamMembersQuery } from "state/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TeamMembersGridToolbar from "./TableComponents/TeamMembersGridToolbar";
import RemoveTeamMembersButton from "./TableComponents/RemoveTeamMembersButton";

{
  /* The TeamMembersTable component displays a table of teams using the DataGrid component from MUI.
 It fetches data from the backend using the useGetTeamsQuery hook. The table columns are defined
 in the teamsColumns array. The table is styled using Material-UI's sx prop, which allows applying
 custom styles for various elements within the DataGrid. Additionally, the component uses the 
 DataGridCustomToolbar component to customize the toolbar of the DataGrid. */
}

// Define the TeamMembersTable component
const TeamMembersTable = ({
  gridColumn,
  gridRow,
  orgID,
  teamName,
  refetchTeamData,
  refetchAssessmentData,
}) => {
  // Get the current theme
  const theme = useTheme();
  const TableName = "Team Members";
  // Define state variables to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [rerender, setRerender] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);

  const token = useSelector((state) => state.global.token);

  // Fetch teams data from the backend using the useGetTeamsQuery hook
  const {
    data,
    isLoading,
    refetch: refetchTeam,
  } = useGetTeamMembersQuery(
    {
      page,
      pageSize,
      sort: JSON.stringify(sort),
      token,
      rerender,
      orgID,
      teamName,
    },
    { refetchOnMountOrArgChange: true }
  );
  const handleRerender = () => {
    setRerender(!rerender);
  };

  const handleRowSelection = (selection) => {
    setSelectedRows(selection);
  };

  // Define columns for the Teams table
  const teamMemberColumns = [
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
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/profile/${params.row.email}`}>{params.value}</Link>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "city",
      headerName: "City",
      flex: 0.3,
    },
    {
      field: "position",
      headerName: "Position",
      flex: 0.5,
    },
    {
      field: "pendingAssessments",
      headerName: "Assessments Pending",
      flex: 0.4,
    },
    {
      field: "completedAssessments",
      headerName: "Assessments Completed",
      flex: 0.4,
    },
  ];

  // Render the TeamsTable component
  return (
    <Box
      gridColumn={gridColumn}
      gridRow={gridRow}
      sx={{
        // Styles for the TeamsTable container
        boxSadow:
          "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)",
        // Styling for the DataGrid component
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
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={(data && data.teamMembers) || []}
        columns={teamMemberColumns}
        checkboxSelection
        onSelectionModelChange={handleRowSelection}
        rowCount={(data && data?.teamMembers.length) || 0}
        rowsPerPageOptions={[20, 50, 100]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        sortingMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        components={{ Toolbar: TeamMembersGridToolbar }}
        componentsProps={{
          toolbar: {
            TableName,
            handleRerender,
            orgID,
            teamName,
            refetchTeamData,
            refetchAssessmentData,
            RemoveButton: (
              <RemoveTeamMembersButton
                rows={selectedRows}
                handleRerender={handleRerender}
                orgID={orgID}
                teamName={teamName}
                refetchTeam={refetchTeam}
                refetchTeamData={refetchTeamData}
                refetchAssessmentData={refetchAssessmentData}
              />
            ),
          },
        }}
        localeText={{
          // Customize the "No rows" message here
          noRowsLabel: "No members in team",
        }}
      />
    </Box>
  );
};

// Export the TeamMembersTable component as the default export
export default TeamMembersTable;
