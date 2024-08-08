import React, { useState } from "react";
import { Box, useTheme, useMediaQuery, Typography } from "@mui/material";
import MembersTable from "../../components/Tables/MembersTable";
import TeamsTable from "../../components/Tables/TeamsTable";
import TabNav from "components/TabNav";
import TotalMembersWidget from "components/Tables/Widgets/TotalMembersWidget";
import TotalTeamsWidget from "components/Tables/Widgets/TotalTeamsWidget";
import AssessmentsPieChart from "components/ExampleNivoCharts&Data/AssessmentsPieChart";
import Slide from "@mui/material/Slide";
import {
  useGetTotalMembersQuery,
  useGetTotalTeamsQuery,
  useGetTeamSizesQuery,
} from "state/api";
import { useSelector } from "react-redux";
import TeamSizeBarChart from "components/ExampleNivoCharts&Data/TeamSizeBarChart";

{
  /* The Dashboard component is a multi-tab dashboard that renders different content based on the selected tab.
 It imports various components, including MembersTable, TeamsTable, TabNav, StatWidget, ExampleNivoLineChart,
 ExampleNivoPieChart, and their respective data.
 
 The component uses Material-UI's Slide, useTheme, and useMediaQuery hooks to apply slide animation and responsive
 layout adjustments based on the current theme and screen size. The tab navigation and content rendering are managed
 through the activeTab state variable, which is updated when a tab is clicked. The content for each tab is defined as
 JSX elements in the nav array and passed to the TabNav component for display. */
}

// Define the Dashboard component
const Dashboard = () => {
  // State variable to track the active tab
  const [activeTab, setActiveTab] = useState("0");
  const theme = useTheme();

  // Check if the screen size is mobile(min-width: 1400px) using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width: 1400px)");

  // Access the token from the global Redux store
  const token = useSelector((state) => state.global.token);
  const user = useSelector((state) => state.global.user);
  const organisationID = user.organisationID;

  // Fetch members data from the backend using useGetMembersQuery hook
  const { data: totalMembers, refetch: refetchTotalMembers } =
    useGetTotalMembersQuery(
      {
        token,
        organisationID,
      },
      { refetchOnMountOrArgChange: true }
    );

  // Fetch members data from the backend using useGetMembersQuery hook
  const { data: totalTeams, refetch: refetchTotalTeams } =
    useGetTotalTeamsQuery(
      {
        token,
        organisationID,
      },
      { refetchOnMountOrArgChange: true }
    );

  // Fetch members data from the backend using useGetMembersQuery hook
  const { data: teamSizes, refetch: refetchTeamSizes } = useGetTeamSizesQuery(
    {
      token,
      organisationID,
    },
    { refetchOnMountOrArgChange: true }
  );
  // Define navigation data for the tabs
  const nav = [
    {
      text: "Members",
      index: "0",
      display: (
        // Slide component to apply slide animation when tab changes
        <Slide direction="right" in={activeTab === "0"} timeout={400}>
          <Box m="1.5rem 1rem">
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="200px"
              gap="20px"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreens ? undefined : "span 12", // Adjust the grid layout for mobile screens
                },
              }}
            >
              {/* MembersTable */}
              <MembersTable
                gridColumn="span 8" // Make MembersTable occupy all 12 columns
                gridRow="span 3" // Set the number of rows the MembersTable should span
                refetchTotalMembers={refetchTotalMembers}
                refetchTeamSizes={refetchTeamSizes}
              />
              {/* NivoPieChart */}
              <Box
                gridColumn="span 4"
                gridRow="span 3"
                backgroundColor={theme.palette.white.default}
                p="1.5rem"
                borderRadius="0.55rem"
                boxShadow={
                  "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)"
                }
              >
                <Typography>Assessments - Completed vs Pending</Typography>
                <AssessmentsPieChart />
              </Box>
              <TotalMembersWidget data={totalMembers} />
              <Box
                gridColumn="span 10"
                gridRow="span 2"
                backgroundColor={theme.palette.white.default}
                p="1rem"
                borderRadius="0.55rem"
                boxShadow={
                  "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)"
                }
              >
                <TeamSizeBarChart data={teamSizes} />
              </Box>
              <TotalTeamsWidget data={totalTeams} />
            </Box>
          </Box>
        </Slide>
      ),
    },
    {
      text: "Teams",
      index: "1",
      display: (
        // Slide component to apply slide animation when tab changes
        <Slide direction="right" in={activeTab === "0"} timeout={400}>
          <Box m="1.5rem 1rem">
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="200px"
              gap="20px"
              sx={{
                "& > div": {
                  gridColumn: isNonMobileScreens ? undefined : "span 12", // Adjust the grid layout for mobile screens
                },
              }}
            >
              {/* TeamsTable */}
              <TeamsTable
                gridColumn="span 12" // Make MembersTable occupy all 12 columns
                gridRow="span 5" // Set the number of rows the MembersTable should span
                refetchTotalTeams={refetchTotalTeams}
              />
            </Box>
          </Box>
        </Slide>
      ),
    },
  ];

  // Render the TabNav component with the active tab and navigation headers
  return <TabNav activeTab={activeTab} navHeaders={nav} />;
};

// Export the Dashboard component as the default export
export default Dashboard;
