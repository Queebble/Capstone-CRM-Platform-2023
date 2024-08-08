// Import React and necessary components/libraries
import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import TabNav from "components/TabNav";
import PersonalDetails from "./tabs/personaldetails";
import CompletedAssessmentsTable from "components/Tables/CompletedAssessmentsTable";
import PendingAssessmentsTable from "components/Tables/PendingAssessmentsTable";
import DevelopmentPlans from "./tabs/developmentPlans";
import { Email } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMemberQuery, useGetReportsQuery } from "state/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import PendingAssessmentsWidget from "components/Tables/Widgets/PendingAssessmentsWidget";
import CompletedAssessmentsWidget from "components/Tables/Widgets/CompletedAssessmentsWidget";
import ProfileStyleChart from "components/ExampleNivoCharts&Data/ProfileStyleChart";

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
const computeStyleGroup = (discData) => {
  return discData.map((discData) => {
    const percentages = discData.responseData.pages[0].fields[0].field_data;
    return {
      discValues: percentages,
      styleGroup: getStyleGroup(percentages),
    };
  });
};

// Component responsible for fetching and displaying reports
function ReportFetcher({ passwords, finxsAccessCode, defaultChartValues }) {
  const [discData, setDiscData] = useState(null);
  const [styleGroup, setStyleGroup] = useState([]);
  const { data: reportData } = useGetReportsQuery({
    passwords: JSON.stringify(passwords),
    access_code: finxsAccessCode,
    report: "AUS_Percentages",
    lang: "ENG",
  });

  useEffect(() => {
    if (reportData?.reports.length > 0) {
      setDiscData(reportData.reports);
    }
  }, [reportData]);

  useEffect(() => {
    if (discData) {
      setStyleGroup(computeStyleGroup(discData));
    }
  }, [discData]);

  return styleGroup.length > 0 ? (
    <ProfileStyleChart styleGroup={styleGroup} />
  ) : (
    <ProfileStyleChart styleGroup={defaultChartValues} />
  );
}

// Profile component definition
const Profile = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("0");
  const [finxsToken, setFinxsToken] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [authInProgress, setAuthInProgress] = useState(false);
  const theme = useTheme();

  // Fetch user data from Redux store
  const currentUser = useSelector((state) => state.global.user);

  // Get selected user's email from URL parameters
  const selectedUser = useParams();
  const email = selectedUser.email ? selectedUser.email : currentUser.email;

  // Get authentication token and access code from Redux store
  const token = useSelector((state) => state.global.token);
  const finxsAccessCode = useSelector(
    (state) => state.global.finxs_access_code
  );

  // Fetch member data from the backend using useGetMemberQuery hook
  const { data, isLoading } = useGetMemberQuery({ email, token });

  var pendingAssessments = 0;
  var completedAssessments = 0;
  const completed = [];

  // Extract passwords and calculate completed and pending assessments
  const passwords =
    data?.assessments?.map((assessment) => {
      if (assessment.completed) {
        completedAssessments += 1;
        completed.push(assessment);
      } else {
        pendingAssessments += 1;
      }
      return assessment.password;
    }) || [];

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
      password: assessment.password,
    })
  );

  // Function to handle the refresh button click and initiate authentication
  const handleButtonClick = async () => {
    setAuthInProgress(true);
    await finxsAuth();
  };

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

  // Use another useEffect to call handleCheckPasswordStatuses when passwords change
  useEffect(() => {
    if (finxsToken && passwords.length > 0) {
      handleCheckPasswordStatuses(
        finxsToken,
        finxsAccessCode,
        passwords,
        data?._id,
        rerender,
        setRerender,
        setAuthInProgress
      );
    }
  }, [finxsToken]);

  // Check if the screen size is non-mobile (min-width: 1100px) using MUI's useMediaQuery hook
  const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");

  // Default chart values when no data is available
  const defaultChartValues = [
    {
      discValues: {
        D: "0%",
        I: "0%",
        S: "0%",
        C: "0%",
      },
      styleGroup: "DISC",
    },
  ];

  // Array containing navigation details for each tab
  const nav = [
    {
      text: "Personal Details",
      index: "0",
      display: (
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
              <PersonalDetails userEmail={email} />
              <DevelopmentPlans userEmail={email} />
              {/* StatWidgets */}
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={theme.palette.white.default}
                p="1rem"
                borderRadius="0.55rem"
                boxShadow={
                  "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)"
                }
              >
                <Typography paddingBottom="10px">
                  Natural Behaviour Style Chart
                </Typography>
                {filteredAssessments.length > 0 ? (
                  <ReportFetcher
                    passwords={filteredAssessments}
                    finxsAccessCode={finxsAccessCode}
                    defaultChartValues={defaultChartValues}
                  />
                ) : (
                  <ProfileStyleChart styleGroup={defaultChartValues} />
                )}
              </Box>
              <PendingAssessmentsWidget
                gridColumn={isNonMobileScreens ? "span 4" : "span 1"} // Adjust gridColumn for mobile screens
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
              <CompletedAssessmentsWidget
                gridColumn={isNonMobileScreens ? "span 4" : "span 1"} // Adjust gridColumn for mobile screens
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
            </Box>
          </Box>
        </Slide>
      ), // PersonalDetails component
    },
    {
      text: "Assessments",
      index: "1",
      display: (
        <Slide direction="right" in={activeTab === "0"} timeout={400}>
          <Box m="1.5rem 1rem">
            <Box
              display="grid"
              gridTemplateColumns="1fr"
              gridAutoRows="110px"
              gap="20px"
              key={rerender}
            >
              <Button
                onClick={handleButtonClick}
                sx={{
                  position: "absolute",
                  mt: "-40px",
                  mr: "41px",
                  right: "0",
                  backgroundColor: theme.palette.white.default,
                }}
              >
                {authInProgress ? (
                  <CircularProgress size={20} color="primary" />
                ) : (
                  <RefreshIcon
                    sx={{ color: theme.palette.primaryblue.default }}
                  />
                )}
              </Button>
              <PendingAssessmentsTable
                userEmail={email}
                gridColumn="span 1" // Make TeamsTable occupy all columns
                gridRow="span 4"
              />

              <CompletedAssessmentsTable
                userEmail={email}
                gridColumn="span 1" // Make TeamsTable occupy all columns
                gridRow="span 4"
              />
            </Box>
          </Box>
        </Slide>
      ), // Assessments component
    },
  ];

  // Render TabNav component passing the activeTab state and navigation details as props
  return <TabNav activeTab={activeTab} navHeaders={nav} />;
};

export default Profile;
