import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useTheme } from "@mui/material/styles";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import OrganisationForm from "./Forms/orgForm";
import UserForm from "./Forms/userForm";
import validationSchema from "./FormModel/validationSchema";
import registerFormModel from "./FormModel/registerFormModel";
import formInitialValues from "./FormModel/formInitialValues";
import TalentInsightLogoWhite from "assets/TalentInsightLogoWhite.jpeg";

// Defining the steps in the registration process
const steps = ["Register Organisation", "Register User"];
const { formId, formField } = registerFormModel;

// Function to render specific form content based on the step
function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <OrganisationForm formField={formField} />;
    case 1:
      return <UserForm formField={formField} />;
    default:
      return <div>Not Found</div>;
  }
}

// Asynchronous function to register a user
const register = async (values, onSubmitProps) => {
  // data objects containing the formatted field values
  const orgData = {
    ABN: values.ABN,
    name: values.orgName,
    email: values.orgEmail,
    phoneNumber: values.phoneNumber,
    address: {
      street: values.streetAddress,
      suburb: values.suburb,
      postcode: values.postcode,
      state: values.state,
    },
  };

  const userData = {
    organisationID: values.ABN,
    name: values.firstName + " " + values.lastName,
    email: values.userEmail,
    password: values.password,
    title: values.title,
    city: values.city,
    position: values.position,
    owner: "Yes",
    role: "orgowner",
  };

  // Making API calls to register an organisation and a user
  const savedOrgResponse = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/registerOrganisation`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(orgData),
    }
  );

  // Make a POST request to register the user
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/registerUser`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(userData), // Sets the body of the request to sign-up form values
    }
  );
};

// Check if a user or organisation already exists based on email and ABN
const fetchExist = async (email, abn) => {
  const fetchUserExists = await fetch(
    `${process.env.REACT_APP_BASE_URL}/client/member/check/${email}`
  );

  const fetchOrgExists = await fetch(
    `${process.env.REACT_APP_BASE_URL}/client/organisation/check/${abn}`
  );

  const userExists = await fetchUserExists.json();
  const orgExists = await fetchOrgExists.json();

  return { userExists, orgExists };
};

export default function RegisterPage() {
  // State and other hooks for form and UI control
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  async function _submitForm(values, actions) {
    // Now we can check the existence and perform the appropriate action
    const { userExists, orgExists } = await fetchExist(
      values.userEmail,
      values.ABN
    );

    if (!userExists.exists && !orgExists.exists) {
      await register(values, actions);
      actions.setSubmitting(false);
      toast.success("Succesfully Registered!");
      navigate(`/sign_in`);
    } else {
      toast.error(
        "Registration Failed: Organisation ABN or User Email Address already exists."
      );
      setActiveStep(0);
      actions.resetForm();
    }
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  // Rendering the form and the UI
  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="100%"
        sx={{
          background: theme.palette.white.default,
          height: "100%",
          paddingTop: "1px",
        }}
      >
        <Container component="main" maxWidth="sm">
          {/* Form Section */}
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              alt="profile"
              src={TalentInsightLogoWhite}
              display="flex"
              justifyContent="center"
              height="170px"
            />
            <Typography component="h1" variant="h4" align="center">
              Register
            </Typography>
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                margin: "20px 0px 20px 0px",
                width: "100%",
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              <Formik
                initialValues={formInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form id={formId}>
                    {_renderStepContent(activeStep)}

                    <FlexBetween
                      sx={{
                        marginTop: "16px",
                        "div:only-child": {
                          marginLeft: "auto",
                        },
                      }}
                    >
                      {activeStep !== 0 && (
                        <Button onClick={_handleBack}>Back</Button>
                      )}
                      <Box>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          {isLastStep ? "Register" : "Next"}
                        </Button>
                        {isSubmitting && <CircularProgress size={24} />}
                      </Box>
                    </FlexBetween>
                  </Form>
                )}
              </Formik>
            </React.Fragment>
            <Typography
              variant="body2"
              padding="10px 0px 0px 0px"
              onClick={() => {
                navigate(`/sign_in`);
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
              Already have an account? Log in
            </Typography>
          </Box>
        </Container>
      </Container>
    </React.Fragment>
  );
}
