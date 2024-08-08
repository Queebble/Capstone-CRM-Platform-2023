import React from "react";
import { toast } from "react-toastify";
import { Box, Grid, Container, Button, CircularProgress } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import InputField from "components/FormFields/InputField";
import { Formik, Form, FieldArray } from "formik";
import qualificationFormModel from "./Forms/qualificationFormModel";
import qualificationValidationSchema from "./Forms/qualificationValidationSchema";
import { usePostUpdateQualificationMutation } from "../../state/api";

const { formId, formField } = qualificationFormModel; // Form ID and form field definitions

export default function UpdateQualification({ data, handleFormClose }) {
  const currentValidationSchema = qualificationValidationSchema; // Current validation schema

  const [updateQualificationMutation] = usePostUpdateQualificationMutation(); // Mutation hook for updating qualifications

  async function updateQualification(values) {
    try {
      const qualifications = values.qualifications.map((entry) => {
        const { qualification } = entry;
        return {
          qualification: qualification,
        };
      });

      const { data: updatedQualificationData } =
        await updateQualificationMutation({
          _id: data._id,
          qualifications: qualifications,
          token: data.token,
        });

      toast.success("Qualifications updated successfully");
    } catch (error) {
      console.error("Error updating Qualifications:", error);
      toast.error("Failed to update Qualifications");
    }
  }

  const submitForm = async (values, actions) => {
    await updateQualification(values);
    // Handle the error appropriately, and display an error message
    actions.setSubmitting(false);
    handleFormClose();
  };

  const initialValues = {
    qualifications:
      data.qualifications.length > 0
        ? data.qualifications.map((entry) => ({
            qualification: entry.qualification || "",
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
                  name="qualifications"
                  render={(arrayHelpers) => (
                    <Box
                      sx={{
                        overflowY: "scroll",
                        maxHeight: "600px",
                        paddingRight: "10px",
                      }}
                    >
                      {values.qualifications.map((entry, index) => (
                        <Box key={index}>
                          <Grid container spacing={2} mb={3} mt={1}>
                            <Grid item xs={12}>
                              <InputField
                                name={`qualifications[${index}].qualification`}
                                label={`Qualification`}
                                fullWidth
                              />
                            </Grid>
                            <Button
                              sx={{ margin: "10px 0px -10px 17px" }}
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // Remove the grid on click
                              variant="outlined" // You can style the button as needed
                              color="error" // Customize the button color
                            >
                              Remove Qualification
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
                          Add Qualification
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
