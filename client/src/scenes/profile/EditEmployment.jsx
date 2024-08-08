import React from "react";
import { toast } from "react-toastify";
import { Box, Grid, Container, Button, CircularProgress } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import InputField from "components/FormFields/InputField";
import { Formik, Form, FieldArray } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import employmentFormModel from "./Forms/employmentFormModel";
import employmentValidationSchema from "./Forms/employmentValidationSchema";
import dayjs from "dayjs";
import { usePostUpdateEmploymentMutation } from "../../state/api";

const { formId, formField } = employmentFormModel; // Form ID and form field definitions

export default function UpdateEmployment({ data, handleFormClose }) {
  const currentValidationSchema = employmentValidationSchema; // Current validation schema

  const [updateEmploymentMutation] = usePostUpdateEmploymentMutation(); // Mutation hook for updating employment history

  async function updateEmployment(values) {
    try {
      // Update each employment entry
      const employmentHistory = values.employmentHistory.map((entry) => {
        const { employer, position, startDate, endDate } = entry;
        return {
          employer: employer,
          position: position,
          startDate: startDate,
          endDate: endDate,
        };
      });

      const { data: updatedEmploymentData } = await updateEmploymentMutation({
        _id: data._id,
        employmentHistory: employmentHistory,
        token: data.token,
      });

      toast.success("Employment updated successfully");
    } catch (error) {
      console.error("Error updating Employment:", error);
      toast.error("Failed to update Employment");
    }
  }

  // Call the updateEmployment function when you want to update the user
  const submitForm = async (values, actions) => {
    // Assuming updateEmployment returns a promise
    await updateEmployment(values);
    // Handle the error appropriately, and display an error message
    actions.setSubmitting(false);
    handleFormClose();
  };

  const initialValues = {
    employmentHistory:
      data.employmentHistory.length > 0
        ? data.employmentHistory.map((entry) => ({
            employer: entry.employer || "",
            position: entry.position || "",
            startDate: entry.startDate ? new Date(entry.startDate) : null,
            endDate: entry.endDate ? new Date(entry.endDate) : null,
          }))
        : [],
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
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidationSchema}
            onSubmit={submitForm}
          >
            {({ isSubmitting, values }) => (
              <Form id={formId}>
                <FieldArray
                  name="employmentHistory"
                  render={(arrayHelpers) => (
                    <Box
                      sx={{
                        overflowY: "scroll",
                        maxHeight: "600px",
                        paddingRight: "10px",
                      }}
                    >
                      {values.employmentHistory.map((entry, index) => (
                        <Box key={index}>
                          <Grid container spacing={2} mb={3} mt={1}>
                            <Grid item xs={12}>
                              <InputField
                                name={`employmentHistory[${index}].employer`}
                                label={`Employer`}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <InputField
                                name={`employmentHistory[${index}].position`}
                                label={`Position`}
                                fullWidth
                              />
                            </Grid>

                            <Grid item xs={6}>
                              {/* Use DatePicker for start date */}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  format="DD/MM/YYYY"
                                  name={`employmentHistory[${index}].startDate`}
                                  label={`Start Date`}
                                  value={dayjs(entry.startDate)}
                                  onChange={(date) => {
                                    // Use the date parameter to update the value
                                    arrayHelpers.replace(index, {
                                      ...entry,
                                      startDate: date,
                                    });
                                  }}
                                  slotProps={<InputField fullWidth />}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                              {/* Use DatePicker for end date */}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  format="DD/MM/YYYY"
                                  name={`employmentHistory[${index}].endDate`}
                                  label={`End Date`}
                                  value={dayjs(entry.endDate)}
                                  onChange={(date) => {
                                    // Use the date parameter to update the value
                                    arrayHelpers.replace(index, {
                                      ...entry,
                                      endDate: date,
                                    });
                                  }}
                                  slotProps={<InputField fullWidth />}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Button
                              sx={{ margin: "10px 0px -10px 17px" }}
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // Remove the grid on click
                              variant="outlined" // You can style the button as needed
                              color="error" // Customize the button color
                            >
                              Remove Employment
                            </Button>
                          </Grid>
                        </Box>
                      ))}

                      {/* Add Employment button */}
                      <FlexBetween gap="200px">
                        <Button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              employer: "",
                              position: "",
                              startDate: "",
                              endDate: "",
                            })
                          }
                        >
                          Add Employment
                        </Button>

                        {/* Update button */}

                        {!isSubmitting && (
                          <Button
                            disabled={isSubmitting}
                            type="submit"
                            variant="contained"
                            color="primary"
                          >
                            Update
                          </Button>
                        )}
                        {isSubmitting && <CircularProgress size={24} />}
                      </FlexBetween>
                    </Box>
                  )}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </React.Fragment>
  );
}
