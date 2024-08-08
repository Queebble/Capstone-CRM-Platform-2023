import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import TalentInsightHeader from "assets/TalentInsightHeader.jpeg";
import TalentInsightLogo from "assets/TalentInsightLogo.jpeg";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

/* creates a sidebar menu using Material-UI components and styles. The sidebar
 can be opened/closed using the isSidebarOpen prop. It contains a header with a logo,
 a list of navigation items with icons, and options to contact the support team or sign out.
 The active navigation item is highlighted based on the current URL. The sidebar can be
 permanently displayed (e.g., for desktop) or hidden when not needed (e.g., for mobile). */

// Define navigation items with text and corresponding icons
const navItems = [
  {
    text: "Profile",
    icon: <PersonRoundedIcon sx={{ fontSize: "2rem" }} />,
  },
];

// Define the width of the sidebar/drawer
const drawerWidth = 250;

// Styling for the opened state of the sidebar/drawer
const openedMixin = (theme) => ({
  width: drawerWidth,
  color: theme.palette.white.default,
  backgroundColor: theme.palette.primaryblue.default,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// Styling for the closed state of the drawer
const closedMixin = (theme) => ({
  color: theme.palette.white.default,
  backgroundColor: theme.palette.primaryblue.default,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// Styling for the header of the drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Styling for the custom drawer using Material-UI's styled function
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Define the Sidebar component
// Properties passed in are from the layout index.js page
const MemberSidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation(); // Use this to grab the path that user is currently at
  // State variable to keep track of the active navigation item - which page is user currently at
  const [active, setActive] = useState(
    pathname === "/" ? "home" : pathname.slice(1)
  );
  const navigate = useNavigate(); // Get the navigation function from React Router DOM's useNavigate hook
  const theme = useTheme(); // Access the current theme using MUI's useTheme hook

  // Helper function to help with navigation to route
  const handleNavigation = (route) => {
    navigate(`/${route}`);
    setActive(route.toLowerCase());
  };

  /* from YT vid: anytime the pathname changes, set the active value to the current page
  useEffect(() => {
    setActive(pathname.substring(1))
  }, [pathname]) */

  return (
    <Box zIndex="998">
      {/* Render the custom styled drawer */}
      <Drawer variant="permanent" open={isSidebarOpen}>
        {/* Drawer header with logo */}
        <DrawerHeader>
          {/* Render different logos based on the open/closed state of the sidebar */}
          {isSidebarOpen ? (
            <Box
              component="img"
              alt="profile"
              src={TalentInsightHeader}
              height="48px"
              display="flex"
              justifyContent="center"
              sx={{ objectFit: "cover", margin: "auto" }}
            />
          ) : (
            <Box
              component="img"
              alt="profile"
              src={TalentInsightLogo}
              height="56px"
              display="flex"
              justifyContent="center"
              sx={{ objectFit: "cover", margin: "auto" }}
            />
          )}
        </DrawerHeader>
        {/* List of navigation items */}
        <List>
          {navItems.map(({ text, icon }) => {
            const lcText = text.toLowerCase();

            return (
              <ListItem key={text} disablePadding>
                {/* List item button with an onClick handler to navigate to the corresponding page */}
                <ListItemButton
                  onClick={() => handleNavigation(lcText)}
                  sx={{
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    "&:hover": {
                      backgroundColor: theme.palette.sidebarHover.default,
                    },
                  }}
                >
                  {/* Highlight the active item with a background color */}
                  <Box
                    sx={{
                      backgroundColor: theme.palette.white.default,
                      width: "0.2rem",
                      height: "2.4rem",
                      borderRadius: "1px",
                      position: "absolute",
                      marginLeft: "-16px",
                    }}
                  />

                  {/* Render the icon for the navigation item */}
                  <ListItemIcon
                    sx={{
                      ml: isSidebarOpen ? "1.5rem" : "auto",
                      color: theme.palette.white.default,
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {/* Render the text for the navigation item */}
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "1.2rem",
                      fontWeight: active === lcText ? "900" : "100", // Set the fontWeight conditionally based on active status
                    }}
                    primary={text}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          {/* Divider with color from the theme */}
          <Divider
            color={theme.palette.sidebaruispacer.default}
            sx={{ margin: "0px 15px 0px 15px", borderRadius: "1px" }}
          />
          {/* "Contact Us" navigation item */}
          <ListItem key={"Contact Us"} disablePadding>
            {/* List item button with an onClick handler to open the Contact Us link */}
            <ListItemButton
              onClick={() => {
                window.open("https://talentinsightsolutions.com.au/contact/");
              }}
              sx={{
                paddingTop: "16px",
                paddingBottom: "16px",
                "&:hover": {
                  backgroundColor: theme.palette.sidebarHover.default,
                },
              }}
            >
              {/* Icon for the "Contact Us" navigation item */}
              <ListItemIcon
                sx={{
                  ml: isSidebarOpen ? "1.5rem" : "auto",
                  color: theme.palette.white.default,
                }}
              >
                <LocalPhoneRoundedIcon sx={{ fontSize: "2rem" }} />
              </ListItemIcon>
              {/* Text for the "Contact Us" navigation item */}
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  fontWeight: "100",
                }}
                primary={"Contact Us"}
              />
            </ListItemButton>
          </ListItem>
          {/* Divider with color from the theme */}
          <Divider
            color={theme.palette.sidebaruispacer.default}
            sx={{ margin: "0px 15px 0px 15px", borderRadius: "1px" }}
          />
          {/* "Sign Out" navigation item */}
          <ListItem key={"Sign Out"} disablePadding>
            {/* List item button with an onClick handler to navigate to the "Sign In" page */}
            <ListItemButton
              onClick={() => {
                navigate(`/sign_in`);
              }}
              sx={{
                paddingTop: "12px",
                paddingBottom: "12px",
                "&:hover": {
                  backgroundColor: theme.palette.sidebarHover.default,
                },
              }}
            >
              {/* Icon for the "Sign Out" navigation item */}
              <ListItemIcon
                sx={{
                  ml: isSidebarOpen ? "1.5rem" : "auto",
                  color: theme.palette.white.default,
                }}
              >
                <LogoutRoundedIcon sx={{ fontSize: "2rem" }} />
              </ListItemIcon>
              {/* Text for the "Sign Out" navigation item */}
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  fontWeight: "100",
                }}
                primary={"Sign Out"}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

// Export the Sidebar component as the default export
export default MemberSidebar;
