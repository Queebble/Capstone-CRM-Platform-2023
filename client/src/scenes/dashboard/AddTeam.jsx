import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import AddTeamForm from "./Forms/addTeamForm";
import AddTeamMemberForm from "./Forms/AddTeamMemberForm";
import teamFormModel from "./TeamFormModel/teamFormModel";
import validationSchema from "./TeamFormModel/validationSchema";
import formInitialValues from "./TeamFormModel/formInitialValues";
import { usePostCreateTeamMutation } from "state/api";
import { updateUser } from "state/redux/actions";

// Define steps for the stepper component
const steps = ["Create Team", "Add Members"];
const { formId, formField } = teamFormModel;

// Render content based on the active step
function _renderStepContent(
  step,
  handleMembersChange,
  handleTeamLeadersChange
) {
  switch (step) {
    case 0:
      return <AddTeamForm formField={formField} />;
    case 1:
      return (
        <AddTeamMemberForm
          onMembersChange={handleMembersChange}
          onTeamLeadersChange={handleTeamLeadersChange}
        />
      );
    default:
      return <div>Not Found</div>;
  }
}

// Function to check if the team already exists
const fetchExist = async (teamName, abn) => {
  console.log(teamName, abn);
  const fetchTeamExists = await fetch(
    `${process.env.REACT_APP_BASE_URL}/client/check/${abn}/${teamName}`
  );

  const teamExists = await fetchTeamExists.json();

  return { teamExists };
};

// Main component to add a team
export default function AddTeam({ handleRender }) {
  // Local state management
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[0];
  const isLastStep = activeStep === steps.length - 1;
  const user = useSelector((state) => state.global.user);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeamLeaders, setSelectedTeamLeaders] = useState([]);
  const [postCreateTeam] = usePostCreateTeamMutation();
  const dispatch = useDispatch();

  // Asynchronous function to register a user
  const createTeam = async (
    values,
    onSubmitProps,
    user,
    selectedMembers,
    selectedTeamLeaders
  ) => {
    // Check if user.email matches any selected team leader or member's email
    const userIsTeamLeader = selectedTeamLeaders.some(
      (leader) => leader.email === user.email
    );
    const userIsMember = selectedMembers.some(
      (member) => member.email === user.email
    );

    const teamMembers = selectedMembers.map((member) => member.email);
    const teamLeaders = selectedTeamLeaders.map((leader) => leader.email);

    // Create a payload with the user's data
    const userData = {
      organisationID: user.organisationID,
      name: values.teamName,
      city: values.city,
      department: values.department,
      teamLeaders: teamLeaders,
      members: teamMembers,
    };
    // API call to create a new team
    const savedUserResponse = await postCreateTeam(userData);

    // Update the user's team if they are a team leader or member
    if (userIsTeamLeader || userIsMember) {
      const updatedUser = {
        ...user, // Copy all properties from the original object
        team: values.teamName, // Replace the "team" property with the new team name
      };
      // Dispatch an action to update the user's data in the Redux state
      dispatch(updateUser(updatedUser));
    }
  };

  // Update selected members list
  const handleMembersChange = (newMembers) => {
    setSelectedMembers(newMembers);
  };

  // Update selected team leaders list
  const handleTeamLeadersChange = (newTeamLeaders) => {
    setSelectedTeamLeaders(newTeamLeaders);
  };

  // Function to submit the form
  async function _submitForm(values, actions) {
    const { teamExists } = await fetchExist(
      values.teamName,
      user.organisationID
    );

    if (!teamExists.exists) {
      await createTeam(
        values,
        actions,
        user,
        selectedMembers,
        selectedTeamLeaders
      );
      actions.setSubmitting(false);
      toast.success("Successfully Created New Team!");
      actions.resetForm();
    } else {
      toast.error("Failed: Team already exists.");
      actions.resetForm();
    }
  }

  // Handle form submission
  async function _handleSubmit(values, actions) {
    if (isLastStep) {
      await _submitForm(values, actions);
      handleRender();
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  // Go back to the previous step
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
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
          <Typography component="h1" variant="h4" align="center">
            Create New Team
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
                  {_renderStepContent(
                    activeStep,
                    handleMembersChange,
                    handleTeamLeadersChange
                  )}

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
        </Box>
      </Container>
    </React.Fragment>
  );
}
