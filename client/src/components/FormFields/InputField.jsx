import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@mui/material";

// Define the InputField component
export default function InputField(props) {
  // Destructure props to separate 'errorText' and other passed properties
  const { errorText, ...rest } = props;

  // Use the useField hook from Formik to manage field state and meta information
  // 'field' provides value, onChange, and onBlur. 'meta' provides error, touched, etc.
  const [field, meta] = useField(props);

  // Define a function to render helper text for the field
  function _renderHelperText() {
    // Use 'at' from lodash to safely extract 'touched' and 'error' properties from 'meta'
    const [touched, error] = at(meta, "touched", "error");

    // If the field has been touched and there's an error, return the error message
    if (touched && error) {
      return error;
    }
  }

  // Render a TextField from Material-UI
  return (
    <TextField
      type="text" // By default, set the input type as 'text'
      // Set the error prop if the field is touched and there's an error
      error={meta.touched && meta.error && true}
      // Render the helper text using the _renderHelperText function
      helperText={_renderHelperText()}
      {...field} // Spread all properties from Formik's 'field' (like 'name', 'value', 'onChange')
      {...rest} // Spread any other passed properties
      multiline={true} // Allow the TextField to have multiple lines
    />
  );
}
