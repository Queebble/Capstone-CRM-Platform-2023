import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetTeamAssessmentsQuery } from "state/api";
import AssessmentGridToolbar from "./TableComponents/AssessmentGridToolbar";
import { GetReportButton } from "./TableComponents/GetReportButton";

{
  /* The TeamCompletedAssessmentsTable component displays a table of teams using the DataGrid component from MUI.
 It fetches data from the backend using the useGetMembersQuery hook. The table columns are defined
 in the teamsColumns array. The table is styled using Material-UI's sx prop, which allows applying
 custom styles for various elements within the DataGrid. Additionally, the component uses the 
 DataGridCustomToolbar component to customize the toolbar of the DataGrid. */
}

// Define the TeamCompletedAssessmentsTable component
const TeamCompletedAssessmentsTable = ({ gridColumn, gridRow, abn, name }) => {
  // Access the current theme
  const theme = useTheme();
  const TableName = "Team's Completed Assessments";

  const user = useSelector((state) => state.global.user);
  const orgID = abn ? abn : user.organisationID;
  const teamName = name ? name : user.team;
  const token = useSelector((state) => state.global.token); // Accessing token data from Redux store
  const { data, isLoading } = useGetTeamAssessmentsQuery(
    {
      token,
      teamName,
      orgID,
    },
    { refetchOnMountOrArgChange: true }
  );

  const completedAssessments = data?.completedAssessments;

  // Define columns configuration for the data grid
  const assessmentColumns = [
    {
      field: "memberName",
      headerName: "Member Name",
      flex: 0.7,
      // Wrap the cell content with a Link component
      renderCell: (params) => (
        <Link to={`/profile/${params.row.memberEmail}`}>{params.value}</Link>
      ),
    },
    {
      field: "memberEmail",
      headerName: "Member Email",
      flex: 1,
    },
    {
      field: "assessmentName",
      headerName: "Assessment Name",
      flex: 1,
    },
    {
      field: "assignedDate",
      headerName: "Assigned Date",
      flex: 0.5,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "completionDate",
      headerName: "Completed Date",
      flex: 0.5,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      field: "assignedBy",
      headerName: "Assigned By",
      flex: 1,
      valueGetter: (entry) => {
        // Concatenate team leader names for display
        return `${entry.row.assignedBy.name}`;
      },
    },
    {
      field: "pdfResults",
      headerName: "Report",
      flex: 1.5,
      renderCell: (entry) => <GetReportButton assessment={entry.row} />,
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
        getRowId={(row) => row.password} // Function to retrieve unique IDs for each row
        rows={completedAssessments || []} // Data to be displayed in the grid
        columns={assessmentColumns} // Column configuration for the grid
        rowsPerPageOptions={[20, 50, 100]} // Options for rows per page dropdown
        pagination // Enable pagination
        components={{ Toolbar: AssessmentGridToolbar }} // Use a custom toolbar component
        componentsProps={{
          toolbar: {
            TableName,
          }, // Pass props to the custom toolbar component
        }}
        localeText={{
          // Customize the "No rows" message here
          noRowsLabel: "No assessments completed",
        }}
      />
    </Box>
  );
};

// Export the TeamCompletedAssessmentsTable component as the default export
export default TeamCompletedAssessmentsTable;
