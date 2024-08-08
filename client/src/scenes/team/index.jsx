import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
} from "@mui/material";
import TeamPendingAssessmentsTable from "components/Tables/TeamPendingAssessmentsTable";
import TeamCompletedAssessmentsTable from "components/Tables/TeamCompletedAssessmentsTable";
import TabNav from "components/TabNav";
import { Email } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import { useSelector } from "react-redux";
import {
  useGetMemberQuery,
  useGetTeamQuery,
  useGetMembersByEmailQuery,
  useGetTeamAssessmentsQuery,
  useGetReportsQuery,
} from "state/api";
import { useParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import TeamDetails from "./tabs/teamDetails";
import TeamMembersTable from "components/Tables/TeamMembersTable";
import TeamPendingAssessmentsWidget from "components/Tables/Widgets/TeamPendingAssessmentsWidget";
import TeamCompletedAssessmentsWidget from "components/Tables/Widgets/TeamCompletedAssessmentsWidget";
import DiamondMap from "components/ExampleNivoCharts&Data/DiamondMap";

{
  /* The Dashboard component is a multi-tab dashboard that renders different content based on the selected tab.
 It imports various components, including MembersTable, TeamsTable, TabNav, StatWidget, ExampleNivoLineChart,
 ExampleNivoPieChart, and their respective data.
 
 The component uses Material-UI's Slide, useTheme, and useMediaQuery hooks to apply slide animation and responsive
 layout adjustments based on the current theme and screen size. The tab navigation and content rendering are managed
 through the activeTab state variable, which is updated when a tab is clicked. The content for each tab is defined as
 JSX elements in the nav array and passed to the TabNav component for display. */
}

// Function to update password statuses in the backend
const handleUpdatePasswordStatuses = async (userID, passwordStatus) => {
  try {
    const updateInfo = {
      member: userID,
      passwords: passwordStatus,
    };
    // Send a POST request to update password statuses
    await fetch(`${process.env.REACT_APP_BASE_URL}/finxs/updateAssessments`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(updateInfo),
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Function to check and update password statuses
const handleCheckPasswordStatuses = async (
  finxsToken,
  finxsAccessCode,
  passwords,
  userID,
  rerender,
  setRerender,
  setAuthInProgress
) => {
  try {
    const requestInfo = {
      auth_token: finxsToken,
      access_code: finxsAccessCode,
      passwords: passwords,
    };

    // Send a POST request to check password statuses
    const passwordStatusesResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/finxs/checkPasswords`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(requestInfo),
      }
    );

    if (passwordStatusesResponse.ok) {
      try {
        const passwordStatusesData = await passwordStatusesResponse.json();
        if (passwordStatusesData.success) {
          // Map and update password statuses
          const newPasswordStatuses = passwordStatusesData.statuses.map(
            (password) => {
              if (password.password_status === "NotUsed") {
                return {
                  value: password.value,
                  completed: false,
                };
              } else if (password.password_status === "Used") {
                return {
                  value: password.value,
                  completed: true,
                };
              } else {
                return {
                  value: password.value,
                  completed: null,
                };
              }
            }
          );
          await handleUpdatePasswordStatuses(userID, newPasswordStatuses);
          setAuthInProgress(false);
          setRerender(!rerender);
        }
      } catch (jsonError) {}
    }
  } catch (error) {}
};

// Function to determine the dominant style group based on percentages
const getStyleGroup = (percentages) => {
  const styles = ["D", "I", "S", "C"];

  // Convert percentages into an array of tuples for sorting
  const sortable = styles.map((style) => [
    style,
    parseInt(percentages[style].slice(0, -1)),
  ]);

  // Remove styles with 0% percentage
  const nonZeroSortable = sortable.filter((tuple) => tuple[1] !== 0);

  // Sort tuples by percentage, then original order in "styles" for tiebreakers
  nonZeroSortable.sort((a, b) => {
    if (a[1] === b[1]) return styles.indexOf(a[0]) - styles.indexOf(b[0]);
    return b[1] - a[1]; // Sort in descending order
  });

  // Extract style letters from sorted tuples
  return nonZeroSortable.map((item) => item[0]).join("");
};

// Function to compute the dominant style group for a set of data
const computeStyleGroups = (members) => {
  return members.map((member) => {
    const percentages = member.responseData.pages[0].fields[0].field_data;
    return {
      memberName: member.memberName,
      styleGroup: getStyleGroup(percentages),
    };
  });
};

// Component responsible for fetching and displaying reports
function ReportFetcher({ passwords, finxsAccessCode }) {
  const [members, setMembers] = useState(null);
  const [styleGroups, setStyleGroups] = useState([]);
  const { data: reportData } = useGetReportsQuery({
    passwords: JSON.stringify(passwords),
    access_code: finxsAccessCode,
    report: "AUS_Percentages",
    lang: "ENG",
  });

  useEffect(() => {
    if (reportData?.reports.length > 0) {
      setMembers(reportData.reports);
    }
  }, [reportData]);

  useEffect(() => {
    if (members) {
      setStyleGroups(computeStyleGroups(members));
    }
  }, [members]);

  return (
    <DiamondMap members={styleGroups} /> // Render DiamondMap when not loading
  );
}

// Dashboard component definition
const Team = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("0");
  const [finxsToken, setFinxsToken] = useState(null);
  const [rerender, setRerender] = useState(false);
  const theme = useTheme();

  // Fetch user data from Redux store
  const currentUser = useSelector((state) => state.global.user);

  // Get selected team's name from URL parameters
  const selectedTeam = useParams();
  const email = currentUser.email;

  // Get authentication token and access code from Redux store
  const token = useSelector((state) => state.global.token);
  const finxsAccessCode = useSelector(
    (state) => state.global.finxs_access_code
  );

  // Fetch member data from the backend using useGetMemberQuery hook
  const { data, isLoading } = useGetMemberQuery(
    { email, token },
    { refetchOnMountOrArgChange: true }
  );

  const abn = data?.organisationID;
  const teamName = selectedTeam.name ? selectedTeam.name : data?.team;

  // Fetch team data from the backend using useGetTeamQuery hook
  const { data: teamData, refetch: refetchTeamData } = useGetTeamQuery(
    {
      abn,
      teamName,
      token,
      rerender,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Extract team members' email addresses
  var teamEmails =
    teamData?.team?.members?.map((member) => {
      return member.email;
    }) || [];

  // Fetch team members' data from the backend using useGetMembersByEmailQuery hook
  const { data: teamMembers } = useGetMembersByEmailQuery(
    { teamEmails, token },
    { refetchOnMountOrArgChange: true }
  );

  // Fetch team assessments data from the backend using useGetTeamAssessmentsQuery hook
  const { data: assessmentData, refetch: refetchAssessmentData } =
    useGetTeamAssessmentsQuery(
      {
        token,
        teamName,
        orgID: abn,
      },
      { refetchOnMountOrArgChange: true }
    );

  // Calculate completed and pending assessments counts
  const completedAssessments = assessmentData?.completedAssessments?.length;
  const pendingAssessments = assessmentData?.incompleteAssessments?.length;

  const completed = assessmentData?.completedAssessments || [];

  // Sort assessments by assignedDate in descending order
  const sortedAssessments = [...completed].sort(
    (a, b) => new Date(b.assignedDate) - new Date(a.assignedDate)
  );

  // Create a map to hold the latest assessment for each member
  const latestAssessmentsMap = new Map();

  sortedAssessments.forEach((assessment) => {
    if (!latestAssessmentsMap.has(assessment.memberEmail)) {
      latestAssessmentsMap.set(assessment.memberEmail, assessment);
    }
  });

  // Convert the map values to an array to get the filtered list and extract only memberName and password
  const filteredAssessments = Array.from(latestAssessmentsMap.values()).map(
    (assessment) => ({
      memberName: assessment.memberName,
      password: assessment.password,
    })
  );

  // Check if the screen size is non-mobile (min-width: 1100px) using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");

  // Use useEffect to call handleCheckPasswordStatuses when finxsToken or teamMembers change
  useEffect(() => {
    if (finxsToken && teamMembers?.length > 0) {
      for (const member of teamMembers) {
        if (member.assessments.length > 0) {
          const passwords =
            member.assessments.map((assessment) => assessment.password) || [];
          // Call handleCheckPasswordStatuses for each team member
          handleCheckPasswordStatuses(
            finxsToken,
            finxsAccessCode,
            passwords,
            member._id,
            rerender,
            setRerender
          );
        }
      }
    }
  }, [finxsToken]);

  // Function to authenticate with the backend
  const finxsAuth = async () => {
    try {
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/finxs/auth`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
        }
      );

      if (savedUserResponse.ok) {
        const responseData = await savedUserResponse.json();
        setFinxsToken(responseData.token);
      } else {
        console.log("Authentication request failed");
      }
    } catch (error) {
      console.error("Error while authenticating:", error);
    }
  };

  // Define navigation data for the tabs
  const nav = [
    {
      text: "Team Details",
      index: "0",
      display:
        currentUser.team === "-" ? (
          <Box
            m="1.5rem 1rem"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.white.default,
                borderRadius: "0.55rem",
                padding: "1rem",
                textAlign: "center",
                boxShadow:
                  "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)",
              }}
            >
              <Typography variant="h2" textAlign="center">
                Please join a team to view this page
              </Typography>
            </Box>
          </Box>
        ) : (
          // Slide component to apply slide animation when tab changes
          <Slide direction="right" in={activeTab === "0"} timeout={400}>
            <Box m="1.5rem 1rem">
              <Box
                display="grid"
                gridTemplateColumns="repeat(15, 1fr)"
                gridAutoRows="200px" // Change gridAutoRows to "auto" to adjust row height dynamically
                gap="20px" // Adjust gap based on screen size
                sx={{
                  "& > div": {
                    gridColumn: isNonMobileScreens ? undefined : "span 15", // Adjust the grid layout for mobile screens
                  },
                }}
              >
                <TeamDetails
                  data={teamData}
                  gridColumn="span 3" // Adjust gridColumn for mobile screens
                  gridRow="span 2"
                />

                <TeamPendingAssessmentsWidget
                  gridColumn="span 2" // Adjust gridColumn for mobile screens
                  gridRow="span 1"
                  data={pendingAssessments}
                  icon={
                    <Email
                      sx={{
                        color: theme.palette.uigreen.default,
                        fontSize: "26px",
                      }}
                    />
                  }
                />

                {/* TeamsTable */}
                <TeamMembersTable
                  gridColumn="span 10" // Adjust gridColumn for mobile screens
                  gridRow="span 5" // Set the number of rows to "auto" for dynamic height
                  orgID={abn}
                  teamName={teamName}
                  refetchTeamData={refetchTeamData}
                  refetchAssessmentData={refetchAssessmentData}
                />

                <TeamCompletedAssessmentsWidget
                  gridColumn="span 2" // Adjust gridColumn for mobile screens
                  gridRow="span 1"
                  data={completedAssessments}
                  icon={
                    <Email
                      sx={{
                        color: theme.palette.uigreen.default,
                        fontSize: "26px",
                      }}
                    />
                  }
                />
                <Box
                  gridColumn="span 5"
                  gridRow="span 3"
                  backgroundColor={theme.palette.white.default}
                  p="1.5rem"
                  borderRadius="0.55rem"
                  boxShadow={
                    "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)"
                  }
                >
                  <Typography paddingBottom="10px">Team DISC Chart</Typography>

                  <ReportFetcher
                    passwords={filteredAssessments}
                    finxsAccessCode={finxsAccessCode}
                  />
                </Box>
              </Box>
            </Box>
          </Slide>
        ),
    },
    {
      text: "Teams Assessments",
      index: "1",
      display:
        currentUser.team === "-" ? (
          <Box
            m="1.5rem 1rem"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.white.default,
                borderRadius: "0.55rem",
                padding: "1rem",
                textAlign: "center",
                boxShadow:
                  "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)",
              }}
            >
              <Typography variant="h2" textAlign="center">
                Please join a team to view this page
              </Typography>
            </Box>
          </Box>
        ) : (
          <Slide direction="right" in={activeTab === "0"} timeout={400}>
            <Box m="1.5rem 1rem">
              <Box
                display="grid"
                gridTemplateColumns="1fr"
                gridAutoRows="110px"
                gap="20px"
                key={rerender}
              >
                <TeamPendingAssessmentsTable
                  gridColumn="span 1" // Make TeamsTable occupy all 12 columns
                  gridRow="span 4"
                  abn={abn}
                  name={teamName}
                />
                <TeamCompletedAssessmentsTable
                  gridColumn="span 1" // Make TeamsTable occupy all 12 columns
                  gridRow="span 4"
                  abn={abn}
                  name={teamName}
                />
              </Box>
            </Box>
          </Slide>
        ), // Assessments component
    },
  ];

  // Render the TabNav component with the active tab and navigation headers
  return <TabNav activeTab={activeTab} navHeaders={nav} />;
};

// Export the Dashboard component as the default export
export default Team;
