import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import TeamName from "./TeamDetailsComponents/teamName";

const TeamDetails = ({ data, gridColumn, gridRow }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1100px)");
  return (
    <Box
      gridColumn={gridColumn}
      gridRow={gridRow}
      backgroundColor={theme.palette.white.default}
      sx={{
        boxShadow:
          "0px 3.890000104904175px 18.469999313354492px 0px rgba(0, 99, 231, 0.06)",
        borderRadius: "0.55rem",
        minWidth: "300px",
      }}
    >
      <Box p="10px 20px 20px 20px">
        <TeamName data={data} />
      </Box>
    </Box>
  );
};

export default TeamDetails;
