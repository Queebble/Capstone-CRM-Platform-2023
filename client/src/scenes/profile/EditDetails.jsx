import React, { useState } from "react";
import { toast } from "react-toastify";
import { Box, Container, Button, CircularProgress } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { Formik, Form } from "formik";
import ChangeDetailsForm from "./Forms/changeDetailsForm";
import detailsValidationSchema from "./Forms/detailsValidationSchema";
import detailsFormModel from "./Forms/detailsFormModel";
import { usePostUpdateUserMutation } from "../../state/api";
import { useDispatch, useSelector } from "react-redux";
import { updateUser as updateUserState } from "state/redux/actions";
import DropZone from "components/DropZone";

const { formId, formField } = detailsFormModel; // Form ID and form field definitions

export default function UpdateUser({ data, handleFormClose }) {
  const currentValidationSchema = detailsValidationSchema[0]; // Current validation schema
  const dispatch = useDispatch(); // Redux dispatch function
  const [updateUserMutation] = usePostUpdateUserMutation(); // Mutation hook for updating user
  const user = useSelector((state) => state.global.user); // Get user data from Redux store

  // Define state for the uploaded image
  const [uploadedImage, setUploadedImage] = useState(user.profileImage);

  // Callback function to set the uploaded image
  const handleImageUpload = (image) => {
    setUploadedImage(image);
  };

  async function updateUser(values) {
    try {
      console.log(values);
      const { data: updatedUserData } = await updateUserMutation({
        _id: data._id, // Assuming data._id is available in props
        name: values.firstName + " " + values.lastName,
        email: data.email,
        title: values.title,
        city: values.city,
        position: values.position,
        profileImage: uploadedImage,
        team: data.team,
        token: data.token, // Assuming data.token is available in props
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  }

  // Call the updateUser function when you want to update the user
  // For example, when a form is submitted
  async function _submitForm(values, actions) {
    await updateUser(values);
    toast.success("User updated successfully");
    if (user.email == values.userEmail) {
      const updatedUser = {
        ...user, // Copy all properties from the original object
        name: values.firstName + " " + values.lastName,
        email: data.email,
        title: values.title,
        city: values.city,
        position: values.position,
        profileImage: uploadedImage,
      };
      dispatch(updateUserState(updatedUser));
    }
    actions.setSubmitting(false);
    handleFormClose();
  }

  async function _handleSubmit(values, actions) {
    await _submitForm(values, actions);
  }

  const {
    formField: { firstName, lastName, title, city, position, profileImage },
  } = detailsFormModel; // Form field definitions

  const fullName = data.name; // Get the full name from the data object
  const [firstNameValue, lastNameValue] = fullName.split(" "); // Split into first name and last name

  // Use the 'data' prop to initialize the 'initialValues' object
  const initialValues = {
    [firstName.name]: firstNameValue,
    [lastName.name]: lastNameValue,
    [title.name]: data.title,
    [city.name]: data.city,
    [position.name]: data.position,
    [profileImage.name]: data.profileImage,
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
              {({ isSubmitting }) => (
                <Form id={formId}>
                  <Box
                    sx={{
                      overflowY: "scroll",
                      maxHeight: "600px",
                      paddingRight: "10px",
                    }}
                  >
                    <ChangeDetailsForm formField={formField} />
                    <DropZone
                      className="dropZone"
                      onImageUpload={handleImageUpload}
                    />
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
                          Update
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
