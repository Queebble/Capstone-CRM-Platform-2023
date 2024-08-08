import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
  Link,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setFinxsToken } from "state/redux/reducer";
// Creates a reusable AssessmentCard component that takes several props to display information about an assessment.

// Define the AssessmentCard component, receiving props to display assessment details.
const AssessmentCard = ({ name, timeToComplete, description, url }) => {
  // Access theme properties using the Material-UI useTheme hook.
  const theme = useTheme();
  // Obtain the navigate function from the React Router DOM's hook.
  const navigate = useNavigate();
  // Hook for dispatching Redux actions.
  const dispatch = useDispatch();

  // Asynchronous function to authenticate and fetch the Finxs token.
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
        // Dispatch the setFinxsToken action to save the token in Redux state.
        dispatch(
          setFinxsToken({
            finxs_token: responseData.token,
          })
        );
      } else {
        console.log("Authentication request failed");
      }
    } catch (error) {
      console.error("Error while authenticating:", error);
    }
  };

  // Helper function to help with navigation to route
  const handleNavigation = () => {
    navigate(`/behaviouralAnalysis`);
    finxsAuth();
  };

  return (
    // Render a card component with specified styles.
    <Card
      sx={{
        maxWidth: "400px",
        boxShadow:
          "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)",
        backgroundImage: "none",
        backgroundColor: theme.palette.white.default,
        borderRadius: "0.55rem",
        cursor: "pointer",
      }}
      onClick={() => {
        handleNavigation();
      }}
    >
      {/* Display the pendingAssessments count and an icon on the top left. */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AssessmentOutlinedIcon
          sx={{
            color: theme.palette.textoffblack.default,
            backgroundColor: theme.palette.uigreen.default,
            borderRadius: "4px",
            fontSize: "50px",
            margin: "15px 0px 0px 15px",
          }}
        />
      </Box>

      {/* Render the assessment name, timeToComplete, and description */}
      <CardContent>
        <Typography
          variant="h3"
          color={theme.palette.textoffblack.default}
          gutterBottom
        >
          {name}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          color={theme.palette.fadedtext.default}
        >
          {/* Display the timeToComplete with an icon */}
          <AccessTimeOutlinedIcon
            sx={{
              color: theme.palette.fadedtext.default,
              fontSize: "20px",
              marginRight: "4px",
              marginBottom: "-4px",
            }}
          />
          {timeToComplete}
        </Typography>

        <Typography
          sx={{ marginTop: "6px" }}
          variant="h4"
          color={theme.palette.textoffblack.default}
        >
          {description}
        </Typography>
      </CardContent>

      {/* Add a link to learn more about the assessment */}
      <a
        href={url}
        target="_blank"
        onClick={(e) =>
          e.stopPropagation()
        } /* stopPropagation makes it so the onclick from the card is not triggered. */
      >
        <Typography
          variant="h5"
          sx={{ textDecoration: "underline", zIndex: "999" }}
          display="inline"
          color={theme.palette.primaryblue.default}
          marginLeft="15px"
        >
          Learn More
        </Typography>
      </a>

      {/* Display "Continue" text with a right arrow icon */}
      <Box sx={{ display: "flex", justifyContent: "right", margin: "15px" }}>
        <Typography
          sx={{}}
          variant="h3"
          color={theme.palette.textoffblack.default}
        >
          Continue
        </Typography>
        <ArrowForwardIosOutlinedIcon
          sx={{
            color: theme.palette.textoffblack.default,
            borderRadius: "4px",
            fontSize: "25px",
            marginTop: "2px",
          }}
        />
      </Box>
    </Card>
  );
};

// Export the AssessmentCard component to make it available for other modules to use.
export default AssessmentCard;
