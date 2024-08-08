import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import TalentInsightHeader from "assets/TalentInsightHeader.jpeg";
import Drawer from "@mui/material/Drawer";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

{
  /* creates a mobile sidebar menu using Material-UI components and styles. The sidebar
 can be opened/closed using the isSidebarOpen prop. It contains a header with a logo,
 a list of navigation items with icons, and options to contact the support team or sign out.
 The active navigation item is highlighted based on the current URL. The sidebar can be
 permanently displayed (e.g., for mobile) or hidden when not needed (e.g., for desktop). */
}

// Define navigation items with text and corresponding icons
const navItems = [
  {
    text: "Profile",
    icon: <PersonRoundedIcon sx={{ fontSize: "2rem" }} />,
  },
];

// Define the width of the drawer
const drawerWidth = 250;

// Styling for the header of the drawer
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// Styling for the opened state of the drawer
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

// Custom styling for the drawer
const CustomDrawer = styled(Drawer)(({ theme }) => ({
  backgroundColor: theme.palette.primaryblue.default,
  ...openedMixin(theme),
  "& .MuiDrawer-paper": openedMixin(theme),
}));

// Define the MobileSidebar component
const MemberMobileSidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  // Get the current pathname from React Router DOM's useLocation hook
  const { pathname } = useLocation();
  // State variable to keep track of the active navigation item
  const [active, setActive] = useState(
    pathname === "/" ? "home" : pathname.slice(1)
  );
  // Get the navigation function from React Router DOM's useNavigate hook
  const navigate = useNavigate();
  // Access the current theme using MUI's useTheme hook
  const theme = useTheme();

  return (
    <Box zIndex="998">
      {/* Render the custom styled drawer */}
      <CustomDrawer variant="persistent" open={isSidebarOpen}>
        {/* Drawer header with logo and close button */}
        <DrawerHeader>
          <Box
            component="img"
            alt="profile"
            src={TalentInsightHeader} // Assuming this image file is a valid image source
            height="48px"
            display="flex"
            justifyContent="center"
            sx={{ objectFit: "cover", margin: "auto" }}
          />
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon
                sx={{ fontSize: "30px", color: theme.palette.white.default }}
              />
            ) : (
              <ChevronRightIcon
                sx={{ fontSize: "30px", color: theme.palette.white.default }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        {/* List of navigation items */}
        <List>
          {navItems.map(({ text, icon }) => {
            const lcText = text.toLowerCase();

            return (
              <ListItem key={text} disablePadding>
                {/* List item button with an onClick handler to navigate to the corresponding page */}
                <ListItemButton
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                  }}
                  sx={{
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    "&:hover": {
                      backgroundColor: theme.palette.sidebarHover.default,
                    },
                  }}
                >
                  {/* Highlight the active item with a background color */}
                  {active === lcText && (
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
                  )}
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
      </CustomDrawer>
    </Box>
  );
};

// Export the MobileSidebar component as the default export
export default MemberMobileSidebar;
