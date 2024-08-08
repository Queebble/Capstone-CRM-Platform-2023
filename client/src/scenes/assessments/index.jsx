import React from "react";
import { Box, Grid, useMediaQuery } from "@mui/material"; // Step 1: Import Grid component from MUI
import AssessmentCard from "components/AssessmentCard";
import Slide from "@mui/material/Slide";

// Define the Assessments component
const Assessments = () => {
  // Use the useMediaQuery hook to check if the screen size is non-mobile (min-width: 1000px)
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  // Render the Assessments component
  return (
    <Slide direction="right" in={true} timeout={400}>
      <Box
        p="24px" // replicate padding from tabs
        m="1.5rem 1rem"
      >
        {/* Container for the AssessmentCards */}
        {/* Step 2: Conditionally apply CSS Grid layout */}
        {isNonMobile ? ( // If the screen size is non-mobile, use flex layout
          <Box mt="20px" display="flex" gap="20px" justifyContent="center">
            {/* Render AssessmentCard components */}
            <AssessmentCard
              name={"Behavioural Analysis Assessment"}
              timeToComplete={"15 minutes to complete"}
              description={"Make better business decisions with confidence"}
              url={
                "https://talentinsightsolutions.com.au/assessments-and-reports/extended-disc-assessments/"
              }
            />
          </Box>
        ) : (
          // If the screen size is mobile, use grid layout
          <Grid
            container
            mt="20px"
            spacing={2} // Set the spacing between grid items
            justifyContent="center"
          >
            {/* Render AssessmentCard components */}
            <Grid item>
              <AssessmentCard
                pendingAssessments={"1 Assessment Pending"}
                name={"Behavioural Analysis Assessment"}
                timeToComplete={"15 minutes to complete"}
                description={"Make better business decisions with confidence"}
                url={
                  "https://talentinsightsolutions.com.au/assessments-and-reports/extended-disc-assessments/"
                }
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Slide>
  );
};

// Export the Assessments component as the default export
export default Assessments;
