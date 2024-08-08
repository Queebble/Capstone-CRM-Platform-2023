import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMemberQuery } from "state/api";
import { useSelector } from "react-redux";
import AssessmentGridToolbar from "./TableComponents/AssessmentGridToolbar";

{
  /* The PendingAssessmentsTable component displays a table of teams using the DataGrid component from MUI.
 It fetches data from the backend using the useGetMembersQuery hook. The table columns are defined
 in the teamsColumns array. The table is styled using Material-UI's sx prop, which allows applying
 custom styles for various elements within the DataGrid. Additionally, the component uses the 
 DataGridCustomToolbar component to customize the toolbar of the DataGrid. */
}

// Define the PendingAssessmentsTable component
const PendingAssessmentsTable = ({ userEmail, gridColumn, gridRow }) => {
  // Access the current theme
  const theme = useTheme();
  const TableName = "Pending Assessments";

  // Access the token from the Redux store using useSelector
  const token = useSelector((state) => state.global.token);
  const email = userEmail;
  const [rerender, setRerender] = useState(false);

  const finxsAccessCode = useSelector(
    (state) => state.global.finxs_access_code
  );

  // Fetch members data from the backend using useGetMembersQuery hook
  const { data, isLoading } = useGetMemberQuery(
    { email, token, rerender },
    { refetchOnMountOrArgChange: true }
  ); // Fetching data using a custom hook

  const assessments =
    data?.assessments?.map((assessment) => {
      if (assessment.completed === false) {
        return assessment;
      }
    }) || [];

  const validAssessments = assessments.filter(
    (assessment) => assessment && assessment._id
  );

  // Define columns configuration for the data grid
  const assessmentColumns = [
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
      field: "assignedBy",
      headerName: "Assigned By",
      flex: 1,
      valueGetter: (entry) => {
        // Concatenate team leader names for display
        return `${entry.row.assignedBy.name}`;
      },
    },
    {
      field: "link",
      headerName: "Assessment Link",
      flex: 2,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          {params.value}
        </a>
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
        getRowId={(row) => row.password} // Function to retrieve unique IDs for each row
        rows={validAssessments || []} // Data to be displayed in the grid
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
          noRowsLabel: "No assessments pending",
        }}
      />
    </Box>
  );
};

// Export the PendingAssessmentsTable component as the default export
export default PendingAssessmentsTable;
