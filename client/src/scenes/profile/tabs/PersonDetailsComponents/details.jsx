import React, { useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Typography,
  styled,
  TextField,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import { useGetMemberQuery } from "state/api";
import { useSelector } from "react-redux";
import EditDetailsButton from "components/EditDetailsButton";

// Define a functional component called Details that takes userEmail as a parameter
const Details = (userEmail) => {
  const theme = useTheme(); // Getting the current theme from Material-UI
  const email = userEmail.userEmail.userEmail; // Extracting the userEmail property
  const token = useSelector((state) => state.global.token); // Accessing token data from Redux store
  const { data } = useGetMemberQuery({ email, token }); // Fetching data using a custom hook

  // State variables for controlling edit mode and edited values
  const [title, setTitle] = useState(data?.title);
  const [name, setName] = useState(data?.name);
  const [currentEmail, setCurrentEmail] = useState(data?.email);
  const [team, setTeam] = useState(data?.team);
  const [city, setCity] = useState(data?.city);
  const [position, setPosition] = useState(data?.position);
  const [reportsTo, setReportsTo] = useState(data?.reportsTo[0]?.memberName);

  // useEffect to update state variables when data changes
  useEffect(() => {
    // Check if data has been fetched and update state variables when it arrives
    if (data) {
      setTitle(data.title || "");
      setName(data.name || "");
      setCurrentEmail(data.email || "");
      setTeam(data.team || "");
      setCity(data.city || "");
      setPosition(data.position || "");
      setReportsTo(data?.reportsTo[0]?.memberName || "");
    }
  }, [data]); // Re-run this effect when data changes

  return (
    <Box>
      <Box>
        <Avatar
          src={data?.profileImage}
          sx={{ height: "150px", width: "150px", margin: "12px auto" }}
        />
      </Box>

      <Box mb="5px">
        <Box
          display="flex"
          justifyContent="space-between"
          margin="10px 10px -5px 0px"
        >
          <Typography variant="h3" color={theme.palette.textoffblack.default}>
            {data?.name}
          </Typography>
          <Box style={{ marginTop: "-5px" }}>
            <EditDetailsButton data={data} />
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mb: "5px" }} />
      <Box>
        <table>
          <tbody>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Title
                </Typography>
              </td>
              <td>
                <Typography noWrap>{title}</Typography>
              </td>
            </tr>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Name
                </Typography>
              </td>
              <td>
                <Typography noWrap>{name}</Typography>
              </td>
            </tr>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Work Email
                </Typography>
              </td>
              <td>
                <Typography noWrap>{currentEmail}</Typography>
              </td>
            </tr>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Team
                </Typography>
              </td>
              <td>
                <Typography noWrap>{team}</Typography>
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
                <Typography noWrap>{city}</Typography>
              </td>
            </tr>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Position
                </Typography>
              </td>
              <td>
                <Typography noWrap>{position}</Typography>
              </td>
            </tr>
            <tr>
              <td className="tableHeader">
                <Typography
                  variant="h5"
                  color={theme.palette.fadedtext.default}
                >
                  Reports To
                </Typography>
              </td>
              <td>
                <Typography noWrap>{reportsTo}</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default Details;
