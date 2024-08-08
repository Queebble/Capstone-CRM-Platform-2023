import { ResponsiveBar } from "@nivo/bar"; // Component to render responsive bar charts

// Define the TeamSizeBarChart component
const TeamSizeBarChart = ({ data }) => {
  // Create an empty array to store processed chart data
  const chartData = [];

  // Process and structure the data for the chart
  // If 'data' and 'teams' exist in the provided data, map through each team
  data?.teams?.map((team) => {
    // Push each team's name and size to the chartData array
    chartData.push({ TeamName: team.name, value: team.size });
  });

  // Render the ResponsiveBar component
  return (
    <ResponsiveBar
      data={chartData} // Processed data to be visualized
      keys={["value"]} // Key to extract bar values
      indexBy="TeamName" // Index data by team name
      margin={{ top: 5, right: 10, bottom: 38, left: 30 }} // Margins for the chart
      colors={{ scheme: "accent" }} // Color scheme
      padding={0.1} // Space between bars
      enableGridX={false} // Disable horizontal grid lines
      enableGridY={true} // Enable vertical grid lines
      minValue={0} // Minimum value on the Y-axis
      // Maximum value on the Y-axis. Defaults to 0 if largestTeamSize doesn't exist
      maxValue={data?.largestTeamSize || 0}
      valueScale={{ type: "linear" }} // Scaling type for values
      indexScale={{ type: "band", round: true }} // Scaling type for indexes (team names)
      theme={{ textColor: "#90909F" }} // Theme configurations
      axisTop={null} // Disable top axis
      axisRight={null} // Disable right axis
      borderRadius={"0.55rem"} // Border radius for bars
      // Configuration for the bottom axis
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 32,
        legend: "Team Sizes",
      }}
      // Configuration for the left axis
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12} // Minimum width threshold to skip label
      labelSkipHeight={12} // Minimum height threshold to skip label
      // Configuration for bar label colors
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 10]],
      }}
      // Legend configurations
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover", // Hover effect for legend items
              style: {
                itemOpacity: 1, // On hover, set item opacity to 1
              },
            },
          ],
        },
      ]}
      role="application" // Accessibility role for the chart
      ariaLabel="DISC bar chart" // ARIA label for the chart
      // Dynamic ARIA label for each bar
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " Value " + e.indexValue
      }
    />
  );
};

// Export the TeamSizeBarChart component for use in other parts of the application
export default TeamSizeBarChart;
