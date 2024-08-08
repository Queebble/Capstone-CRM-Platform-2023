import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useSelector } from "react-redux";
import { useGetAssessmentsQuery } from "state/api";
import { Typography, Box, useTheme } from "@mui/material";

// Define the functional component ExampleNivoPieChart that accepts data as a prop
const AssessmentsPieChart = () => {
  const theme = useTheme();

  // Access the token from the Redux store using useSelector
  const token = useSelector((state) => state.global.token);
  const user = useSelector((state) => state.global.user);
  const organisationID = user.organisationID;

  // Fetch members data from the backend using useGetAssessmentsQuery hook
  const { data } = useGetAssessmentsQuery(
    {
      token,
      organisationID,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Extract data for pending and completed assessments
  const pendingAssessments = data?.pendingAssessments;
  const completedAssessments = data?.completedAssessments;

  // Define data for the pie chart
  const ChartData = [
    {
      id: "pending",
      label: "Pending",
      value: pendingAssessments,
      valueColor: "#FF6961", // Color for pending assessments
    },
    {
      id: "completed",
      label: "Completed",
      value: completedAssessments,
      valueColor: "#77DD77", // Color for completed assessments
    },
  ];

  // Return the ResponsivePie component with various props for customizing the pie chart
  return pendingAssessments !== 0 && completedAssessments !== 0 ? (
    <ResponsivePie
      // Pass the data for the pie chart
      data={ChartData}
      // Set margins for the chart
      margin={{ top: 40, right: 85, bottom: 80, left: 95 }}
      // Set the inner radius of the pie chart (creates a donut chart with a hole in the center)
      innerRadius={0.5}
      // Set the padding angle between sectors of the pie chart
      padAngle={0.7}
      // Set the corner radius of the sectors in the pie chart
      cornerRadius={3}
      // Set the outer radius offset for active sectors
      activeOuterRadiusOffset={8}
      // Set the width of the border around the sectors
      borderWidth={1}
      // Set the border color for the sectors (darker shade of the sector color)
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      colors={(pie) => pie.data.valueColor}
      // Configure link labels between arcs (skip angle, color, and thickness)
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      // Configure arc labels (skip angle and text color)
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      // Configure legends for the chart
      legends={[
        {
          anchor: "bottom", // Set the anchor position of the legend
          direction: "row", // Set the direction of the legend items (row-wise)
          justify: false, // Set to false for unevenly sized legend items
          translateX: 0, // Set the horizontal translation of the legend
          translateY: 56, // Set the vertical translation of the legend
          itemsSpacing: 0, // Set the spacing between legend items
          itemWidth: 100, // Set the width of each legend item
          itemHeight: 18, // Set the height of each legend item
          itemTextColor: "#999", // Set the text color of the legend items
          itemDirection: "left-to-right", // Set the direction of legend item layout
          itemOpacity: 1, // Set the opacity of the legend items
          symbolSize: 18, // Set the size of the legend symbols (circles)
          symbolShape: "circle", // Set the shape of the legend symbols
          effects: [
            {
              on: "hover", // Set the trigger event for the effects (hover)
              style: {
                itemTextColor: "#000", // Set the text color of legend items on hover
              },
            },
          ],
        },
      ]}
    />
  ) : (
    // Display a message if there are no pending or completed assessments
    <Box>
      <Typography variant="h2">
        There are no pending or completed assessments to be shown!
      </Typography>
    </Box>
  );
};

// Export the ExampleNivoPieChart component as the default export
export default AssessmentsPieChart;
