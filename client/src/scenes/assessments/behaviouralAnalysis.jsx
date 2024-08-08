import React from "react";
import { Box } from "@mui/material";
import AssessmentsBookingTable from "components/Tables/AssessmentsBookingTable";
import Slide from "@mui/material/Slide";

// Defining the BehaviouralAnalysis component.
const BehaviouralAnalysis = () => {
  return (
    // Slide component from MUI is used to create a sliding transition effect.
    <Slide direction="right" in={true} timeout={400}>
      <Box
        p="24px" // replicate padding from tabs
        m="1.5rem 1rem"
        display="grid"
        gridAutoRows="200px"
        gap="20px"
      >
        {/* 
          AssessmentsBookingTable component:
          - This table will be rendered inside the grid container.
          - `gridColumn` and `gridRow` properties determine the position 
            and span of the table inside the grid.
        */}
        <AssessmentsBookingTable
          gridColumn="span 12" // Make TeamsTable occupy all 12 columns
          gridRow="span 5" // Set the number of rows the TeamsTable should span
        />
      </Box>
    </Slide>
  );
};

export default BehaviouralAnalysis;
