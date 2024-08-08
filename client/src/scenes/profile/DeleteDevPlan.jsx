import React from "react";
import { toast } from "react-toastify";
import { Box, Container, Button, CircularProgress } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik, Form } from "formik";
import devPlanValidationSchema from "./Forms/devPlanValidationSchema";
import devPlanFormModel from "./Forms/devPlanFormModel";
import { usePostDeleteDevelopmentPlanMutation } from "state/api";
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

export default function DeleteDevPlan({ data, index, handleFormClose }) {
  const currentValidationSchema = devPlanValidationSchema; // Current validation schema
  const dispatch = useDispatch(); // Redux dispatch function
  const [deleteDevelopmentPlanMutation] =
    usePostDeleteDevelopmentPlanMutation(); // Mutation hook for deleting development plan
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

  // Function to delete a development plan
  async function deleteDevPlan(values) {
    try {
      console.log(data.token);
      const { data: updatedUserData } = await deleteDevelopmentPlanMutation({
        _id: data._id, // Assuming data._id is available in props
        index: index,
        token: token, // Assuming data.token is available in props
      });
      // Check if the deletion was successful and the user data was updated
    } catch (error) {
      console.error("Error creating development plan:", error);
      toast.error("Failed to create development plan");
    }
  }

  // Function to submit the form
  async function _submitForm(values, actions) {
    await deleteDevPlan(values);
    toast.success("Development plan deleted successfully");
    actions.setSubmitting(false);
    handleFormClose();
  }

  // Function to handle form submission
  async function _handleSubmit(values, actions) {
    await _submitForm(values, actions);
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

  // Initialize form field values from the provided data
  const initialValues = {
    goal: data?.developmentPlans?.[index]?.goal || "",
    action: data?.developmentPlans?.[index]?.action || "",
    successMeasure: data?.developmentPlans?.[index]?.successMeasure || "",
    status: data?.developmentPlans?.[index]?.status || "",
    startDate: data?.developmentPlans?.[index]?.startDate
      ? new Date(data?.developmentPlans?.[index]?.startDate)
      : null,
    endDate: data?.developmentPlans?.[index]?.endDate
      ? new Date(data?.developmentPlans?.[index]?.endDate)
      : null,
    notes: data?.developmentPlans?.[index]?.notes || "",
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
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField
                            name={action.name}
                            label={action.label}
                            fullWidth
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField
                            name={successMeasure.name}
                            label={successMeasure.label}
                            fullWidth
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <SelectField
                            name={status.name}
                            label={status.label}
                            data={statuses}
                            fullWidth
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          {/* Use DatePicker for start date */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disabled={true}
                              format="DD/MM/YYYY"
                              name={startDate.name}
                              label={startDate.label}
                              value={dayjs(
                                data?.developmentPlans?.[index]?.startDate
                              )} // Set the initial value
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
                              disabled={true}
                              format="DD/MM/YYYY"
                              name={endDate.name}
                              label={endDate.label}
                              value={dayjs(
                                data?.developmentPlans?.[index]?.endDate
                              )} // Set the initial value
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
                            disabled={true}
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
                          Delete Development Plan
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
