import { ResponsiveRadar } from "@nivo/radar";

const styleColorMapping = {
  D: "#ff6961", // Red color for D
  I: "#ffef00", // Green color for I
  S: "#77dd77", // Blue color for S
  C: "#5078aa", // Dark Blue for C
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ProfileStyleChart = ({ styleGroup }) => {
  const data = Object.entries(styleGroup[0].discValues).map(
    ([style, percentage]) => {
      return {
        style: style,
        percentage: parseInt(percentage, 10),
      };
    }
  );

  const dominantStyle = styleGroup[0].styleGroup.charAt(0);

  return (
    <ResponsiveRadar
      data={data || []}
      keys={["percentage"]}
      indexBy="style"
      valueFormat=">-.2f"
      margin={{ top: 45, right: 80, bottom: 80, left: 80 }}
      borderColor={{ from: "color" }}
      gridShape="linear"
      gridLabelOffset={24}
      maxValue={styleGroup[0].styleGroup === "DISC" ? 100 : "auto"}
      dotSize={10}
      dotBorderWidth={2}
      colors={styleColorMapping[dominantStyle]} // Use the determined color
      blendMode="multiply"
      motionConfig="wobbly"
      gridLevels="3"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default ProfileStyleChart;
