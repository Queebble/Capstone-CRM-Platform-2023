import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Toastify import to help with error messages
import "react-toastify/dist/ReactToastify.css"; // Toastify styling
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Team from "scenes/team";
import Profile from "scenes/profile";
import Assessments from "scenes/assessments";
import SignIn from "scenes/login";
import RegisterPage from "scenes/login/registerPage";
import BehaviouralAnalysis from "scenes/assessments/behaviouralAnalysis";

// Main App component
function App() {
  // Create and memoize the theme based on themeSettings
  const theme = useMemo(() => createTheme(themeSettings()));
  // Check if the user is authenticated (token exists in global state)
  const isAuth = Boolean(useSelector((state) => state.global.token));
  // Get user data from the global state using the useSelector hook
  const user = useSelector((state) => state.global.user);

  return (
    <div className="app">
      <BrowserRouter>
        {/* Wrap the entire app in ThemeProvider to apply the custom theme */}
        <ThemeProvider theme={theme}>
          {/* Apply CSS baseline to normalize default styles */}
          <CssBaseline />
          {/* Add the ToastContainer component to help with pop up messages */}
          <ToastContainer />
          <Routes>
            {/* Define routes for different pages */}
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<RegisterPage />} />
            {/* If the user is authenticated, display the Layout, else redirect to the sign-in page */}
            <Route
              element={isAuth && user ? <Layout /> : <Navigate to="/sign_in" />}
            >
              {/* Define nested routes within the Layout */}
              {/* Redirect from the root to "/home" */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              {/* Dashboard page - if member is logged in redirect to profile */}
              <Route
                path="/home"
                element={
                  isAuth && (user.leader != "No" || user.owner != "No") ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/profile" />
                  )
                }
              />
              {/* Route for default profile */}
              <Route
                path="/profile"
                element={isAuth ? <Profile /> : <Navigate to="/sign_in" />}
              />
              {/* Profile page */}
              <Route
                path="/profile/:email"
                element={isAuth ? <Profile /> : <Navigate to="/sign_in" />}
              />
              {/* Team page - if member is logged in redirect to profile */}
              <Route
                path="/team"
                element={
                  isAuth && (user.leader != "No" || user.owner != "No") ? (
                    <Team />
                  ) : (
                    <Navigate to="/profile" />
                  )
                }
              />
              <Route
                path="/team/:name"
                element={isAuth ? <Team /> : <Navigate to="/sign_in" />}
              />
              {/* Assessments page - if member is logged in redirect to profile */}
              <Route
                path="/assessments"
                element={
                  isAuth && (user.leader != "No" || user.owner != "No") ? (
                    <Assessments />
                  ) : (
                    <Navigate to="/profile" />
                  )
                }
              />
              {/* Assessment page for behavioural analysis - if member is logged in redirect to profile */}
              <Route
                path="/behaviouralAnalysis"
                element={
                  isAuth && (user.leader != "No" || user.owner != "No") ? (
                    <BehaviouralAnalysis />
                  ) : (
                    <Navigate to="/profile" />
                  )
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
