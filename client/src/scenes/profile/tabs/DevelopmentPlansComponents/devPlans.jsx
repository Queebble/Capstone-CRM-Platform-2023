import React, { useState, useEffect } from "react";
import { Box, useTheme, Typography, IconButton, Divider } from "@mui/material";
import { useGetMemberQuery } from "state/api";
import { useSelector } from "react-redux";
import AddDevelopmentPlanButton from "components/AddDevelopmentPlanButton";
import EditDevelopmentPlanButton from "components/EditDevelopmentPlanButton";
import DeleteDevelopmentPlanButton from "components/DeleteDevelopmentPlanButton";

// Helper function to format a date string or provide a default value
const formatDate = (dateString) => {
  if (!dateString) {
    return "Not specified";
  }

  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Define a functional component called DevPlans that takes userEmail as a parameter
const DevPlans = (userEmail) => {
  const theme = useTheme(); // Getting the current theme from Material-UI
  const email = userEmail.userEmail.userEmail; // Extracting the userEmail property
  const token = useSelector((state) => state.global.token); // Accessing token data from Redux store
  const { data } = useGetMemberQuery({ email, token }); // Fetching data using a custom hook

  // Initialize developmentPlans state with formatted data from the API response
  const [developmentPlans, setDevelopmentPlans] = useState(
    data?.developmentPlans?.map((entry) => ({
      action: entry.action,
      endDate: entry.endDate,
      goal: entry.goal,
      notes: entry.notes,
      startDate: entry.startDate,
      status: entry.status,
      successMeasure: entry.successMeasure,
    }))
  );

  // useEffect to update the developmentPlans state when data changes
  useEffect(() => {
    // Check if data has been fetched and update state variables when it arrives
    if (data) {
      setDevelopmentPlans(
        data?.developmentPlans?.map((entry) => ({
          action: entry.action,
          endDate: formatDate(entry.endDate), // Format end date
          goal: entry.goal,
          notes: entry.notes,
          startDate: formatDate(entry.startDate), // Format start date
          status: entry.status,
          successMeasure: entry.successMeasure,
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
            My Development Plans
          </Typography>
          <Box style={{ marginTop: "-5px" }}>
            <AddDevelopmentPlanButton data={data} />
          </Box>
        </Box>
      </Box>
      <Divider />

      <Box>
        {developmentPlans?.map((plan, index) => (
          <React.Fragment key={index}>
            <Box pt="5px" pb="5px">
              <Box display="flex" justifyContent="flex-end" marginRight="10px">
                <Box marginRight="15px">
                  <EditDevelopmentPlanButton data={data} index={index} />
                </Box>
                <DeleteDevelopmentPlanButton data={data} index={index} />
              </Box>
              <table
                style={{
                  width: "95%",
                  tableLayout: "fixed",
                  marginTop: "-40px",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "25%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={theme.palette.fadedtext.default}
                      >
                        Goal
                      </Typography>
                    </td>
                    <td
                      style={{
                        width: "75%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography>{plan.goal}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "25%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={theme.palette.fadedtext.default}
                      >
                        Action
                      </Typography>
                    </td>
                    <td
                      style={{
                        width: "75%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography>{plan.action}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "25%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography
                        variant="h5"
                        noWrap
                        color={theme.palette.fadedtext.default}
                      >
                        Success Measure
                      </Typography>
                    </td>
                    <td
                      style={{
                        width: "75%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography>{plan.successMeasure}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "25%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={theme.palette.fadedtext.default}
                      >
                        Start Date
                      </Typography>
                    </td>
                    <td
                      style={{
                        width: "75%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography>{plan.startDate}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "25%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={theme.palette.fadedtext.default}
                      >
                        End Date
                      </Typography>
                    </td>
                    <td
                      style={{
                        width: "75%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography>{plan.endDate || "Not specified"}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "25%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={theme.palette.fadedtext.default}
                      >
                        Status
                      </Typography>
                    </td>
                    <td
                      style={{
                        width: "75%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography>{plan.status}</Typography>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "25%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography
                        variant="h5"
                        color={theme.palette.fadedtext.default}
                      >
                        Notes
                      </Typography>
                    </td>
                    <td
                      style={{
                        width: "75%",
                        verticalAlign: "top",
                        whiteSpace: "normal",
                      }}
                    >
                      <Typography>{plan.notes}</Typography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
            <Divider />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default DevPlans;
