import React from "react";
import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebars/Sidebar";
import MemberSidebar from "components/Sidebars/MemberSidebar";
import MobileSidebar from "components/Sidebars/MobileSidebar";
import MemberMobileSidebar from "components/Sidebars/MemberMobileSidebar";
import { useGetMemberQuery } from "state/api";

{
  /* The Layout component represents the overall layout of the application. 
 It renders the sidebar, navbar, and the content area. The isNonMobile
 variable determines if the current screen size is non-mobile or mobile,
 and based on this, it renders either the Sidebar or MobileSidebar component.
 The component also fetches member data using the useGetMemberQuery hook from
 the API. The Navbar component is rendered at the top of the content area, and
 the actual content of the current route is rendered using the Outlet component
 from react-router-dom. */
}

// Define the Layout component
const Layout = () => {
  // Use the useMediaQuery hook to check if the screen size is non-mobile (min-width: 800px)
  const isNonMobile = useMediaQuery("(min-width: 800px)");

  // State to control the visibility of the sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Get user data from the global state using the useSelector hook
  const user = useSelector((state) => state.global.user);
  const token = useSelector((state) => state.global.token);

  // Fetch member data using the useGetMemberQuery from the API
  const { data } = useGetMemberQuery(user, token);

  // Render the Layout component
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100">
      {user.leader === "No" && user.owner === "No" ? (
        /* Conditionally render Sidebar based on the users role */
        /* Conditionally render Sidebar based on the screen size */
        isNonMobile ? (
          // Render Sidebar for non-mobile screens
          <MemberSidebar
            user={data || {}}
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        ) : (
          // Render MemberMobileSidebar for mobile screens
          <MemberMobileSidebar
            user={data || {}}
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )
      ) : /* Conditionally render Sidebar based on the screen size */
      isNonMobile ? (
        // Render Sidebar for non-mobile screens
        <Sidebar
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      ) : (
        // Render MobileSidebar for mobile screens
        <MobileSidebar
          user={data || {}}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}

      {/* Main content area */}
      <Box flexGrow={1}>
        {/* Render the Navbar component */}
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Render the content of the current route */}
        <Outlet />
      </Box>
    </Box>
  );
};

// Export the Layout component as the default export
export default Layout;
