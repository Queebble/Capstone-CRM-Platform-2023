import React, { useState } from "react";
import { segmentInfo } from "./segmentInfo";
import { dummyMarkers } from "./dummyData";
import { Box, Typography, Button } from "@mui/material";
import useMeasure from "react-use-measure";
import { animated, useSpring, useResize } from "@react-spring/web";
import FlexBetween from "components/FlexBetween";

// Define coordinates for different segments of a diamond
const discCoordinates = [
  { key: "D", x: 475, y: 25 },
  { key: "I", x: 475, y: 475 },
  { key: "S", x: 25, y: 475 },
  { key: "C", x: 25, y: 25 },

  { key: "DC", x: 350, y: 30 },
  { key: "DI", x: 470, y: 150 },
  { key: "DS", x: 305, y: 195 },
  { key: "DIC", x: 385, y: 160 },
  { key: "DIS", x: 415, y: 215 },
  { key: "DSI", x: 355, y: 225 },
  { key: "DCS", x: 285, y: 90 },
  { key: "DSC", x: 275, y: 145 },
  { key: "DCI", x: 340, y: 125 },

  { key: "ID", x: 470, y: 350 },
  { key: "IS", x: 350, y: 470 },
  { key: "IC", x: 305, y: 305 },
  { key: "IDS", x: 385, y: 340 },
  { key: "ICD", x: 355, y: 275 },
  { key: "IDC", x: 415, y: 285 },
  { key: "ISD", x: 340, y: 375 },
  { key: "ICS", x: 275, y: 355 },
  { key: "ISC", x: 285, y: 410 },

  { key: "CS", x: 30, y: 150 },
  { key: "CD", x: 150, y: 30 },
  { key: "CI", x: 195, y: 195 },
  { key: "CDI", x: 215, y: 90 },
  { key: "CSI", x: 85, y: 215 },
  { key: "CIS", x: 145, y: 225 },
  { key: "CSD", x: 115, y: 160 },
  { key: "CDS", x: 160, y: 125 },
  { key: "CID", x: 225, y: 145 },

  { key: "SI", x: 150, y: 470 },
  { key: "SC", x: 30, y: 350 },
  { key: "SD", x: 195, y: 305 },
  { key: "SID", x: 215, y: 410 },
  { key: "SIC", x: 160, y: 375 },
  { key: "SCI", x: 115, y: 340 },
  { key: "SCD", x: 85, y: 285 },
  { key: "SDI", x: 225, y: 355 },
  { key: "SDC", x: 145, y: 275 },
];

// Function to calculate marker coordinates based on the segment and number of markers
function getMarkerCoordinates(segment, numMarkers) {
  const MAX_MARKERS = 10; // change if needed
  if (numMarkers > MAX_MARKERS) {
    throw new Error(`Maximum of ${MAX_MARKERS} markers allowed.`);
  }

  const segments = segmentInfo;

  const seg = segments[segment];
  if (!seg) {
    throw new Error(`Invalid segment: ${segment}`);
  }

  // Calculate marker positions based on the number of markers and the segment boundaries
  // Here we just distribute them around the center of the segment for simplicity
  const positions = [];
  for (let i = 0; i < numMarkers; i++) {
    const angle = ((2 * Math.PI) / numMarkers) * i;
    const x = seg.centerX + seg.boundary * Math.cos(angle);
    const y = seg.centerY + seg.boundary * Math.sin(angle);
    positions.push({ x, y });
  }

  return positions;
}

function DiamondMap({ members }) {
  // Count the occurrences of each style group
  const styleGroupCounts = {};

  members.forEach((member) => {
    const styleGroup = member.styleGroup;

    if (!styleGroupCounts[styleGroup]) {
      styleGroupCounts[styleGroup] = {
        count: 0,
        memberNames: [],
      };
    }

    styleGroupCounts[styleGroup].count += 1;
    styleGroupCounts[styleGroup].memberNames.push(member.memberName);
  });

  // Generate the marker coordinates for each member based on style group
  const markerCoordinates = [];

  Object.entries(styleGroupCounts).forEach(([styleGroup, data]) => {
    // Calculate marker positions and assign member names to coordinates
    const count = data.count;
    const memberNames = data.memberNames;

    const coords = getMarkerCoordinates(styleGroup, count);

    coords.forEach((coord, idx) => {
      // Assign the member name to the coordinate
      if (memberNames[idx]) {
        coord.memberName = memberNames[idx];
      }

      markerCoordinates.push(coord);
    });
  });

  // Set up state variables for cursor position, tooltip, and legend visibility
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showKeys, setShowKeys] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
  });

  // Event handler for tracking cursor position on mouse move
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  };

  // Use Spring animations to transition between dimensions and tooltip positions
  const [ref, { width }, { height }] = useMeasure();
  const diamondProps = useSpring({
    width,
    height,
    maxHeight: "500px",
    config: { tension: 300, friction: 26 },
  });
  const legendProps = useSpring({
    width,
    height,
    maxHeight: "140px",
    maxWidth: "500px",
    margin: "0px auto 0px auto",
    config: { tension: 300, friction: 26 },
  });
  const toolTipProps = useSpring({
    position: "absolute",
    backgroundColor: "#FFFFFF",
    padding: "5px 10px",
    borderRadius: "0.10rem",
    whiteSpace: "nowrap",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    top: cursorPosition.y + -40 + "px",
    left: cursorPosition.x + "px",
    zIndex: 999,
    config: { tension: 300, friction: 26 },
  });

  return (
    <div
      style={{
        height: "100%",
        width: "99.5%",
        boxSizing: "inherit",
        display: "block",
      }}
      ref={ref}
      onMouseMove={handleMouseMove} // Track cursor position
    >
      <Box style={{ position: "relative" }}>
        <animated.svg style={diamondProps} viewBox="0 0 500 500" role="img">
          {/* Main Diamond */}
          <polygon
            points="0,0 500,0 500,500 0,500"
            fill="none"
            stroke="#dddddd"
          />

          {/* Horizontal and Vertical Divider Lines */}
          <line x1="250" y1="0" x2="250" y2="500" stroke="#dddddd" />
          <line x1="0" y1="250" x2="500" y2="250" stroke="#dddddd" />
          {/* Diagonal Divider Lines */}
          <line x1="62.5" y1="62.5" x2="162.5" y2="162.5" stroke="#dddddd" />
          <line x1="337.5" y1="162.5" x2="437.5" y2="62.5" stroke="#dddddd" />
          <line x1="337.5" y1="337.5" x2="437.5" y2="437.5" stroke="#dddddd" />
          <line x1="162.5" y1="337.5" x2="62.5" y2="437.5" stroke="#dddddd" />
          {/* Inner Divider Lines */}
          <line x1="162.5" y1="162.5" x2="208.5" y2="162.5" stroke="#dddddd" />
          <line x1="162.5" y1="162.5" x2="162.5" y2="208.5" stroke="#dddddd" />
          <line x1="337.5" y1="162.5" x2="337.5" y2="208.5" stroke="#dddddd" />
          <line x1="337.5" y1="162.5" x2="291.5" y2="162.5" stroke="#dddddd" />
          <line x1="337.5" y1="337.5" x2="337.5" y2="291.5" stroke="#dddddd" />
          <line x1="337.5" y1="337.5" x2="291.5" y2="337.5" stroke="#dddddd" />
          <line x1="162.5" y1="337.5" x2="208.5" y2="337.5" stroke="#dddddd" />
          <line x1="162.5" y1="337.5" x2="162.5" y2="291.5" stroke="#dddddd" />

          <line
            x1="118.75"
            y1="312.25"
            x2="118.75"
            y2="187.75"
            stroke="#dddddd"
          />
          <line
            x1="381.25"
            y1="312.25"
            x2="381.25"
            y2="187.75"
            stroke="#dddddd"
          />
          <line
            x1="187.75"
            y1="118.75"
            x2="312.25"
            y2="118.75"
            stroke="#dddddd"
          />
          <line
            x1="187.75"
            y1="381.25"
            x2="312.25"
            y2="381.25"
            stroke="#dddddd"
          />
          {/* Diamond Dividers */}
          <polygon
            points="0,125 125,0 375,0 500,125 500,375 375,500 125,500 0,375"
            fill="none"
            stroke="#dddddd"
          />
          {/* Diamond Dividers */}
          <polygon
            points="60,160 160,60 340,60 440,160 440,340 340,440 160,440 60,340"
            fill="none"
            stroke="#dddddd"
          />
          {/* Triangle Dividers */}
          <polygon
            points="250,250 160,60 340,60"
            fill="none"
            stroke="#dddddd"
          />
          <polygon
            points="250,250 440,160 440,340"
            fill="none"
            stroke="#dddddd"
          />
          <polygon
            points="250,250 340,440 160,440"
            fill="none"
            stroke="#dddddd"
          />
          <polygon
            points="250,250 60,340 60,160"
            fill="none"
            stroke="#dddddd"
          />
          {/* Triangle Corners */}
          <polygon points="0,0 125,0 0,125" fill="#5078aa" stroke="none" />
          <polygon points="500,0 375,0 500,125" fill="#FF6961" stroke="none" />
          <polygon
            points="500,500 500,375 375,500"
            fill="#fffa82"
            stroke="none"
          />
          <polygon points="0,500 0,375 125,500" fill="#77DD77" stroke="none" />

          <circle
            cx="250" // x-coordinate of the center
            cy="250" // y-coordinate of the center
            r="20" // radius of the circle
            fill="white" // white fill
            stroke="#DDDDDD" // stroke color
            strokeWidth="2" // stroke width
          />

          <text
            x={475}
            y={25}
            fontSize="24px"
            textAnchor="middle"
            dy="0.4em"
            fill="black"
          >
            D
          </text>
          <text
            x={475}
            y={475}
            fontSize="24px"
            textAnchor="middle"
            dy="0.4em"
            fill="black"
          >
            I
          </text>
          <text
            x={25}
            y={475}
            fontSize="24px"
            textAnchor="middle"
            dy="0.4em"
            fill="black"
          >
            S
          </text>
          <text
            x={25}
            y={25}
            fontSize="24px"
            textAnchor="middle"
            dy="0.4em"
            fill="black"
          >
            C
          </text>

          {/* Map the markerCoordinates to display them as little red dots on the SVG */}
          {markerCoordinates.map((coord, index) => (
            <circle
              key={index} // using index as key here, but try to find a more unique identifier if possible
              cx={coord.x}
              cy={coord.y}
              r="6" // radius of the dot, adjust as needed
              fill="black"
              opacity="50%"
              onMouseEnter={() => {
                setTooltip({
                  visible: true,
                  content: coord.memberName,
                });
              }}
              onMouseLeave={() => {
                setTooltip({ ...tooltip, visible: false });
              }}
            />
          ))}

          {/* Map the discCoordinates to overlay the keys */}
          {showKeys &&
            discCoordinates.slice(4).map((coord) => (
              <text
                key={coord.key}
                x={coord.x}
                y={coord.y}
                fontSize="18px"
                textAnchor="middle"
                dy="0.4em"
                fill="black"
              >
                {coord.key}
              </text>
            ))}
        </animated.svg>
        <animated.div style={legendProps}>
          <FlexBetween>
            <Button onClick={() => setShowKeys(!showKeys)}>
              Toggle Legend
            </Button>
            <Box display="flex" gap="10px">
              <span
                style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "black",
                  opacity: "50%",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              <Typography>People</Typography>
            </Box>
            <Typography
              style={{ color: "#999999", textDecoration: "underline" }}
            >
              <a
                target="_blank"
                href="https://talentinsightsolutions.com.au/assessments-and-reports/extended-disc-assessments/"
              >
                Learn More
              </a>
            </Typography>
          </FlexBetween>
        </animated.div>

        {tooltip.visible && (
          <animated.div style={toolTipProps}>
            <Typography variant="h6">{tooltip?.content}</Typography>
          </animated.div>
        )}
      </Box>
    </div>
  );
}

export default DiamondMap;
