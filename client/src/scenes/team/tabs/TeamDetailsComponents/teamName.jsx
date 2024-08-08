import React from "react";
import { Box, useTheme, Typography } from "@mui/material";

const TeamName = ({ data }) => {
  const theme = useTheme();
  const teamData = data?.team;

  return (
    <Box>
      <Box mb="5px">
        <Box
          display="flex"
          justifyContent="space-between"
          margin="10px 10px -5px 0px"
        >
          <Typography variant="h3" color={theme.palette.textoffblack.default}>
            {teamData?.name}
          </Typography>
        </Box>
      </Box>

      <Box>
        <table>
          <tbody>
            <tr>
              <td className="tableHeader" style={{ verticalAlign: "top" }}>
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Team Leaders
                </Typography>
              </td>
              <td>
                {teamData?.teamLeaders.map((leader, index) => (
                  <Typography key={index}>{leader.name}</Typography>
                ))}
              </td>
            </tr>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Department
                </Typography>
              </td>
              <td>
                <Typography noWrap>{teamData?.department}</Typography>
              </td>
            </tr>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Location
                </Typography>
              </td>
              <td>
                <Typography noWrap>{teamData?.city}</Typography>
              </td>
            </tr>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Team Size
                </Typography>
              </td>
              <td>
                <Typography noWrap>{teamData?.size}</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default TeamName;
