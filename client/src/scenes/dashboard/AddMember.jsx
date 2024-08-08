import React, { useState } from "react";
import { toast } from "react-toastify";
import { Box, Container, Button, CircularProgress } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AddMemberForm from "./Forms/addMemberForm";
import validationSchema from "./MemberFormModel/validationSchema";
import memberFormModel from "./MemberFormModel/memberFormModel";
import formInitialValues from "./MemberFormModel/formInitialValues";

const { formId, formField } = memberFormModel;

// Asynchronous function to register a user
const register = async (values, onSubmitProps, user, selectedTeam) => {
  // PASSWORD GENERATOR
  const newPassword = "password";
  const team = selectedTeam == "" ? "-" : selectedTeam;
  // data objects containing the formatted field values
  const userData = {
    organisationID: user.organisationID,
    name: values.firstName + " " + values.lastName,
    email: values.userEmail,
    password: newPassword,
    team: team,
    title: values.title,
    city: values.city,
    position: values.position,
    role: "member",
  };

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

// Function to check if the user already exists in the system.
const fetchExist = async (email) => {
  const fetchUserExists = await fetch(
    `${process.env.REACT_APP_BASE_URL}/client/member/check/${email}`
  );

  const userExists = await fetchUserExists.json();

  return { userExists };
};

// Main component to add a member
export default function AddMember({ handleRender }) {
  const navigate = useNavigate();
  const currentValidationSchema = validationSchema[0];
  const user = useSelector((state) => state.global.user);
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleTeamChange = (newTeam) => {
    setSelectedTeam(newTeam); // Update selected members
  };

  async function _submitForm(values, actions) {
    // Now we can check the existence and perform the appropriate action
    const { userExists } = await fetchExist(values.userEmail);

    if (!userExists.exists) {
      await register(values, actions, user, selectedTeam);
      actions.setSubmitting(false);
      toast.success("Succesfully Added New Member!");
      navigate(`/home`);
    } else {
      toast.error("Failed: Member already exists.");
      actions.resetForm();
    }
  }

  async function _handleSubmit(values, actions) {
    await _submitForm(values, actions);
    handleRender();
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
          <React.Fragment>
            <Formik
              initialValues={formInitialValues}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form id={formId}>
                  <AddMemberForm
                    formField={formField}
                    onTeamChange={handleTeamChange}
                  />
                  <FlexBetween
                    sx={{
                      marginTop: "16px",
                      "div:only-child": {
                        marginLeft: "auto",
                      },
                    }}
                  >
                    <Box>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Add
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
