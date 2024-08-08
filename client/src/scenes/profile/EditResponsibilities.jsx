import React from "react";
import { toast } from "react-toastify";
import { Box, Grid, Container, Button, CircularProgress } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import InputField from "components/FormFields/InputField";
import { Formik, Form, FieldArray } from "formik";
import responsibilityFormModel from "./Forms/responsibilityFormModel";
import responsibilityValidationSchema from "./Forms/responsibilityValidationSchema";
import { usePostUpdateResponsibilityMutation } from "../../state/api";

const { formId, formField } = responsibilityFormModel; // Form ID and form field definitions

export default function UpdateResponsbility({ data, handleFormClose }) {
  const currentValidationSchema = responsibilityValidationSchema; // Current validation schema

  const [updateResponsibilitiesMutation] =
    usePostUpdateResponsibilityMutation(); // Mutation hook for updating responsibilities

  async function updateResponsibility(values) {
    try {
      const responsibilities = values.responsibilities.map((entry) => {
        const { responsibility } = entry;
        return {
          responsibility: responsibility,
        };
      });

      const { data: updatedResponsibilitiesData } =
        await updateResponsibilitiesMutation({
          _id: data._id,
          responsibilities: responsibilities,
          token: data.token,
        });

      toast.success("Responsibilities updated successfully");
    } catch (error) {
      console.error("Error updating Responsibilities:", error);
      toast.error("Failed to update Responsibilities");
    }
  }

  const submitForm = async (values, actions) => {
    await updateResponsibility(values);
    // Handle the error appropriately, and display an error message
    actions.setSubmitting(false);
    handleFormClose();
  };

  const initialValues = {
    responsibilities:
      data.responsibilities.length > 0
        ? data.responsibilities.map((entry) => ({
            responsibility: entry.responsibility || "",
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
                  name="responsibilities"
                  render={(arrayHelpers) => (
                    <Box
                      sx={{
                        overflowY: "scroll",
                        maxHeight: "600px",
                        paddingRight: "10px",
                      }}
                    >
                      {values.responsibilities.map((entry, index) => (
                        <Box key={index}>
                          <Grid container spacing={2} mb={3} mt={1}>
                            <Grid item xs={12}>
                              <InputField
                                name={`responsibilities[${index}].responsibility`}
                                label={`Responsibility`}
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
                              Remove Responsibility
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
                          Add Responsibility
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
