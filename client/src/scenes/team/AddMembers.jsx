import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";

import AddTeamMemberForm from "scenes/dashboard/Forms/AddTeamMemberForm";
import { useGetMemberQuery } from "state/api";

// Asynchronous function to register a user
const addTeamMembers = async (
  selectedMembers,
  selectedTeamLeaders,
  orgID,
  teamName
) => {
  const teamMembers = selectedMembers.map((member) => member.email);
  const teamLeaders = selectedTeamLeaders.map((leader) => leader.email);

  // data objects containing the formatted field values
  const requestData = {
    orgID: orgID,
    teamName: teamName,
    teamLeaders: teamLeaders,
    members: teamMembers,
  };

  // Make a POST request to register the user
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/addTeamMembers`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(requestData), // Sets the body of the request to sign-up form values
    }
  );
};

const AddMembers = ({ handleRender, orgID, teamName }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeamLeaders, setSelectedTeamLeaders] = useState([]);

  const handleMembersChange = (newMembers) => {
    setSelectedMembers(newMembers); // Update selected members
  };

  const handleTeamLeadersChange = (newTeamLeaders) => {
    setSelectedTeamLeaders(newTeamLeaders); // Update selected members
  };

  async function _submitForm(values, actions) {
    if (selectedMembers.length === 0 && selectedTeamLeaders.length === 0) {
      toast.error(
        "Please select team members or team leaders before submitting."
      );
    } else {
      await addTeamMembers(
        selectedMembers,
        selectedTeamLeaders,
        orgID,
        teamName
      );
      actions.setSubmitting(false);
      toast.success("Successfully added members to the team!");
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
              initialValues={{
                // Other form values
                selectedMembers: [], // Provide an initial dummy value
                selectedTeamLeaders: [], // Provide an initial dummy value
              }}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <AddTeamMemberForm
                    onMembersChange={handleMembersChange}
                    onTeamLeadersChange={handleTeamLeadersChange}
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
                        Add Members
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
};

export default AddMembers;
