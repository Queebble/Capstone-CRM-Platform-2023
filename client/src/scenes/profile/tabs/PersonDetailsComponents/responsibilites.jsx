import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  styled,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import { useGetMemberQuery } from "state/api";
import { useSelector } from "react-redux";
import EditResponsibilitiesButton from "components/EditResponsibilitiesButton";

// Define a functional component called Responsibilites that takes userEmail as a parameter
const Responsibilites = (userEmail) => {
  const theme = useTheme(); // Getting the current theme from Material-UI
  const email = userEmail.userEmail.userEmail; // Extracting the userEmail property
  const token = useSelector((state) => state.global.token); // Accessing token data from Redux store
  const { data } = useGetMemberQuery({ email, token }); // Fetching data using a custom hook

  // State variable to store responsibilities data
  const [responsibilities, setResponsibilities] = useState(
    data?.responsibilities?.map((entry) => entry.responsibility)
  );

  // useEffect to update state variables when data changes
  useEffect(() => {
    // Check if data has been fetched and update state variables when it arrives
    if (data) {
      setResponsibilities(
        data?.responsibilities?.map((entry) => entry.responsibility)
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
            Responsibilities
          </Typography>
          <Box style={{ marginTop: "-5px" }}>
            {/* todo replace button with edit employment history button */}
            <EditResponsibilitiesButton data={data} />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mb: "5px" }} />
      <Box>
        {responsibilities?.map((responsibilities, index) => (
          <Typography key={index}>{responsibilities}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Responsibilites;
