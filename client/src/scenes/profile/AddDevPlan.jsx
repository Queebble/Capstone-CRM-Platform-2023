import React from "react";
import { toast } from "react-toastify";
import { Box, Container, Button, CircularProgress } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik, Form } from "formik";
import devPlanValidationSchema from "./Forms/devPlanValidationSchema";
import devPlanFormModel from "./Forms/devPlanFormModel";
import { usePostAddDevelopmentPlanMutation } from "state/api";
import { useDispatch, useSelector } from "react-redux";
import { updateUser as updateUserState } from "state/redux/actions";
import dayjs from "dayjs";
import { Grid, Typography } from "@mui/material";
import InputField from "components/FormFields/InputField";
import SelectField from "components/FormFields/SelectedField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const { formId, formField } = devPlanFormModel; // Form ID and form field definitions

export default function AddDevPlan({ data, handleFormClose }) {
  const currentValidationSchema = devPlanValidationSchema; // Current validation schema
  const [addDevelopmentPlanMutation] = usePostAddDevelopmentPlanMutation(); // Mutation hook for adding development plan
  const user = useSelector((state) => state.global.user); // Get user data from Redux store
  const token = useSelector((state) => state.global.token); // Get token data from Redux store

  // Array of development plan statuses
  const statuses = [
    {
      value: "In Progress",
      label: "In Progress",
    },
    {
      value: "Completed",
      label: "Completed",
    },
    {
      value: "On Hold",
      label: "On Hold",
    },
    {
      value: "Not Started",
      label: "Not Started",
    },
  ];

  // Function to add a development plan
  async function addDevPlan(values) {
    try {
      // Call the mutation to add a development plan
      const { data: updatedUserData } = await addDevelopmentPlanMutation({
        _id: data._id, // Assuming data._id is available in props
        goal: values.goal,
        action: values.action,
        successMeasure: values.successMeasure,
        status: values.status,
        startDate: values.startDate,
        endDate: values.endDate,
        notes: values.notes,
        token: token, // Assuming data.token is available in props
      });
    } catch (error) {
      console.error("Error creating development plan:", error);
      toast.error("Failed to create development plan"); // Display an error toast message
    }
  }

  // Function to submit the form
  async function _submitForm(values, actions) {
    await addDevPlan(values); // Add development plan
    toast.success("Development plan created successfully"); // Display a success toast message
    actions.setSubmitting(false); // Set form submitting state to false
    handleFormClose(); // Close the form
  }

  // Function to handle form submission
  async function _handleSubmit(values, actions) {
    await _submitForm(values, actions); // Submit the form
  }

  const {
    formField: {
      goal,
      action,
      successMeasure,
      status,
      startDate,
      endDate,
      notes,
    },
  } = devPlanFormModel; // Form field definitions

  // Initialize form field values
  const initialValues = {
    goal: "",
    action: "",
    successMeasure: "",
    status: "",
    startDate: null,
    endDate: null,
    notes: "",
  };

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
              initialValues={initialValues}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form id={formId}>
                  <Box
                    sx={{
                      overflowY: "scroll",
                      maxHeight: "600px",
                      paddingRight: "10px",
                    }}
                  >
                    <React.Fragment>
                      <Grid container spacing={2} paddingTop="5px">
                        <Grid item xs={12}>
                          <InputField
                            name={goal.name}
                            label={goal.label}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField
                            name={action.name}
                            label={action.label}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField
                            name={successMeasure.name}
                            label={successMeasure.label}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <SelectField
                            name={status.name}
                            label={status.label}
                            data={statuses}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={4}>
                          {/* Use DatePicker for start date */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              format="DD/MM/YYYY"
                              name={startDate.name}
                              label={startDate.label}
                              slotProps={<InputField fullWidth />}
                              onChange={(newDate) => {
                                setFieldValue(startDate.name, newDate.toDate()); // Update the form values
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                          {/* Use DatePicker for end date */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              format="DD/MM/YYYY"
                              name={endDate.name}
                              label={endDate.label}
                              slotProps={<InputField fullWidth />}
                              onChange={(newDate) => {
                                setFieldValue(endDate.name, newDate.toDate()); // Update the form values
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                          <InputField
                            name={notes.name}
                            label={notes.label}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  </Box>
                  <FlexBetween
                    sx={{
                      marginTop: "16px",
                      "div:only-child": {
                        marginLeft: "auto",
                      },
                    }}
                  >
                    <Box>
                      {isSubmitting ? (
                        <CircularProgress size={24} />
                      ) : (
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Create Plan
                        </Button>
                      )}
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
