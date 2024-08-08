import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {
  IconButton,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationImportantRoundedIcon from "@mui/icons-material/NotificationImportantRounded";

// Styling for the AppBar using Material-UI's styled function
const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["240", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["240", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Define the Navbar component - this is the bar on the top of the page - exists on every view
const Navbar = ({ title, user, isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Check if there are pending assessments
  const hasPendingAssessments = user?.assessments?.some(
    (assessment) => !assessment.completed
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = () => {
    navigate("/profile"); // Navigate to the "/profile" route when the button is clicked
  };

  // Extracting user profile to separate component for better organisation and usability
  const UserProfile = ({ user }) => {
    const theme = useTheme();
    const navigate = useNavigate(); // Get the navigation function from React Router DOM's useNavigate hook

    const handleProfileClick = () => {
      navigate("/profile"); // Navigate to the "/profile" route when the button is clicked
    };
    return (
      <Button
        // this will be a button to profile page eventually
        onClick={handleProfileClick} // Call the handleProfileClick function when the button is clicked
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textTransform: "none",
          gap: "1rem",
        }}
      >
        <Avatar
          src={user.profileImage} // Assuming profilePicture is base64 encoded JPEG
        />
        <Box textAlign="left">
          <Typography
            fontWeight="bold"
            fontSize="0.85rem"
            sx={{ color: theme.palette.textoffblack.default }}
          >
            {user.name}
          </Typography>
          <Typography
            fontSize="0.75rem"
            sx={{ color: theme.palette.textoffblack.default }}
          >
            {user.city}
          </Typography>
        </Box>
      </Button>
    );
  };

  return (
    <AppBar
      sx={{
        position: "static",
        boxShadow: "none",
        background: theme.palette.white.default,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* Left side of navbar */}
        <FlexBetween>
          <IconButton
            color={theme.palette.textoffblack.default}
            aria-label="open drawer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            edge="start"
            sx={{
              marginRight: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h3"
            fontWeight="600"
            textTransform="capitalize"
            color={theme.palette.textoffblack.default}
          >
            {pathname.substring(1)}
          </Typography>
        </FlexBetween>

        {/* Right side of navbar*/}
        <FlexBetween gap="1.5rem">
          <IconButton
            id="basic-button"
            aria-controls={open ? "Notification-Menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {hasPendingAssessments ? ( // Check if there are pending assessments
              <NotificationImportantRoundedIcon // Display the important notification icon
                sx={{
                  fontSize: "30px",
                  color: "#FF6961",
                }}
              />
            ) : (
              <NotificationsIcon
                sx={{
                  fontSize: "30px",
                  color: theme.palette.fadedtext.default,
                }}
              />
            )}
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {hasPendingAssessments ? ( // Check if there are pending assessments
              <MenuItem onClick={handleNotificationClick}>
                Pending Assessment!
              </MenuItem>
            ) : (
              <MenuItem onClick={handleClose}>No Notifications</MenuItem>
            )}
          </Menu>
          {/* Right side of navbar - user profile from above separate component*/}
          <UserProfile user={user} />
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

// Export the Navbar component as the default export
export default Navbar;
