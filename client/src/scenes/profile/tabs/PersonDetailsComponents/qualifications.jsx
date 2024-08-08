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
import EditQualificationsButton from "components/EditQualificationsButton";

// Define a functional component called Qualifications that takes userEmail as a parameter
const Qualifications = (userEmail) => {
  const theme = useTheme(); // Getting the current theme from Material-UI
  const email = userEmail.userEmail.userEmail; // Extracting the userEmail property
  const token = useSelector((state) => state.global.token); // Accessing token data from Redux store
  const { data } = useGetMemberQuery({ email, token }); // Fetching data using a custom hook

  // State variable to store qualifications data
  const [qualifications, setQualifications] = useState(
    data?.qualifications?.map((entry) => entry.qualification)
  );

  // useEffect to update state variables when data changes
  useEffect(() => {
    // Check if data has been fetched and update state variables when it arrives
    if (data) {
      setQualifications(
        data?.qualifications?.map((entry) => entry.qualification)
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
            Qualifications
          </Typography>
          <Box style={{ marginTop: "-5px" }}>
            {/* todo replace button with edit employment history button */}
            <EditQualificationsButton data={data} />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mb: "5px" }} />
      <Box>
        {qualifications?.map((qualifications, index) => (
          <Typography key={index}>{qualifications}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default Qualifications;
