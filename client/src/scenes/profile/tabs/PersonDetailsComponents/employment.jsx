import React, { useState, useEffect } from "react";
import { Box, useTheme, Typography, IconButton, Divider } from "@mui/material";
import { useGetMemberQuery } from "state/api";
import { useSelector } from "react-redux";
import EditEmploymentButton from "components/EditEmploymentButton";

// Function to format a date string
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Define a functional component called Employment that takes userEmail as a parameter
const Employment = (userEmail) => {
  const theme = useTheme(); // Getting the current theme from Material-UI
  const email = userEmail.userEmail.userEmail; // Extracting the userEmail property
  const token = useSelector((state) => state.global.token); // Accessing token data from Redux store
  const { data } = useGetMemberQuery({ email, token }); // Fetching data using a custom hook

  // State variable to store employment data
  const [employment, setEmployment] = useState(
    data?.employmentHistory?.map((entry) => ({
      employer: entry.employer,
      position: entry.position,
      startDate: entry.startDate,
      endDate: entry.endDate,
    }))
  );

  // useEffect to update state variables when data changes
  useEffect(() => {
    // Check if data has been fetched and update state variables when it arrives
    if (data) {
      setEmployment(
        data?.employmentHistory?.map((entry) => ({
          employer: entry.employer,
          position: entry.position,
          startDate: formatDate(entry.startDate), // Format start date
          endDate: formatDate(entry.endDate), // Format end date
        }))
      );
    }
  }, [data]); // Re-run this effect when data changes

  return (
    <Box>
      <Box mb="5px">
        <Box
          display="flex"
          justifyContent="space-between"
          margin="10px 10px -5px 0px"
        >
          <Typography variant="h3" color={theme.palette.textoffblack.default}>
            Employment
          </Typography>
          <Box style={{ marginTop: "-5px" }}>
            {/* todo replace button with edit employment history button */}
            <EditEmploymentButton data={data} />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mb: "5px" }} />
      <Box>
        <Box>
          <table style={{ width: "100%", textAlign: "left" }}>
            <tbody>
              <tr>
                <th>
                  <Typography
                    variant="h5"
                    color={theme.palette.fadedtext.default}
                  >
                    Employer
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h5"
                    color={theme.palette.fadedtext.default}
                  >
                    Position
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h5"
                    color={theme.palette.fadedtext.default}
                  >
                    Start Date
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h5"
                    color={theme.palette.fadedtext.default}
                  >
                    End Date
                  </Typography>
                </th>
              </tr>
              {employment?.map((employment, index) => (
                <tr key={index}>
                  <td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography noWrap>{employment.employer}</Typography>
                  </td>
                  <td
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography noWrap>{employment.position}</Typography>
                  </td>
                  <td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography noWrap>{employment.startDate}</Typography>
                  </td>
                  <td
                    style={{
                      maxWidth: "100px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Typography noWrap>{employment.endDate}</Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
};

export default Employment;
