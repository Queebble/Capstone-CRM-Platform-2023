import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import TalentInsightLogoWhite from "assets/TalentInsightLogoWhite.jpeg";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLogin } from "state/redux/reducer";
import { toast } from "react-toastify";

{
  /* The SignIn component is a sign-in form that uses Formik for form management and yup
 for form validation. It has fields for email and password, and upon successful sign-in,
 it navigates the user to the home page. */
}

// Component to display copyright information
function Copyright() {
  const theme = useTheme();
  return (
    <Typography
      variant="body2"
      color={theme.palette.fadedtext.default}
      align="center"
      paddingTop="20px"
    >
      {"Copyright © "}
      <Link color="inherit" href="" target="_blank">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Define the validation schema for the login form
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// Define the initial values for the login form
const initialValuesLogin = {
  email: "",
  password: "",
};

// Asynchronous function to handle the login process
const login = async (values, onSubmitProps, navigate, dispatch) => {
  // Sends a post request to the server login route
  const loggedInResponse = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values), // Sets the body of the request to login form values
    }
  );
  const Response = await loggedInResponse.json();

  // Dispatch setLogin to set the user and token states upon successful login.
  if (loggedInResponse.status === 200) {
    dispatch(
      setLogin({
        user: Response.user,
        token: Response.token,
      })
    );
    // Navigates to the home page.
    navigate(`/home`);
  } else {
    // Display the error message in a toast
    toast.error(
      `${Response.msg} Please try signing in again or if you are not a registered user, please sign up`
    );
    console.log(Response);
  }
};

// Define the SignIn component
export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();

  // Define the function to handle the form submission
  const handleFormSubmit = async (values, onSubmitProps) => {
    await login(values, onSubmitProps, navigate, dispatch);
  };

  // Render the SignIn component
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.white.default,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "30px",
          marginBottom: "-40px",
        }}
      >
        <img alt="profile" src={TalentInsightLogoWhite} height="140px" />
      </Box>
      <Container component="main" maxWidth="100%">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            helperText,
            setFieldValue,
            resetForm,
          }) => (
            // Set submit handler for form and encoding type for form data
            <form onSubmit={handleSubmit} encType="application/json">
              <Container component="main" maxWidth="sm">
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h3" margin="20px">
                    Sign in
                  </Typography>
                  {/* Input field for email */}
                  <TextField
                    margin="normal"
                    required // Prevents form submittion without valid email entry
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email} // Error handling & display for invalid email entry
                  />
                  {/* Input field for password */}
                  <TextField
                    margin="normal"
                    required // Prevents form submittion without a password
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {/* Sign-in button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ marginTop: 3, marginBottom: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    {/* Link for forgot password */}
                    <Grid item xs>
                      {/*                       <Typography
                        variant="body2"
                        onClick={() => {
                          navigate(`/`);
                        }}
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "#1976d2",
                          "&:hover": {
                            color: "#1976d2",
                          },
                        }}
                      >
                        Forgot password?
                      </Typography> */}
                    </Grid>
                    {/* Link to sign-up page */}
                    <Grid item>
                      <Typography
                        variant="body2"
                        onClick={() => {
                          navigate(`/sign_up`);
                        }}
                        sx={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "#1976d2",
                          "&:hover": {
                            color: "#1976d2",
                          },
                        }}
                      >
                        Don't have an account? Sign Up
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                {/* Display copyright information */}
                <Copyright />
                {/* Test buttons for different user types */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: 10,
                    marginBottom: 2,
                    backgroundColor: theme.palette.fadedtext.default,
                  }}
                  // Hard-coded form submittion for easy-access login during development
                  onClick={() => {
                    handleFormSubmit(
                      (values = {
                        email: "kranstead0@narod.ru",
                        password: "password",
                      })
                    );
                  }}
                >
                  Org Owner Test
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: 3,
                    marginBottom: 2,
                    backgroundColor: theme.palette.fadedtext.default,
                  }}
                >
                  Team Leader Test
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: 3,
                    backgroundColor: theme.palette.fadedtext.default,
                  }}
                  onClick={() => {
                    handleFormSubmit(
                      (values = {
                        email: "stevie_oscar@hotmail.com",
                        password: "password",
                      })
                    );
                  }}
                >
                  Member Test
                </Button>
              </Container>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}
