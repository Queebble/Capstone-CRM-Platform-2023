import React from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

// Define the SelectField component
function SelectField(props) {
  // Destructure 'label' and 'data' properties from props, and collect the rest into 'rest'
  const { label, data, ...rest } = props;

  // Use the 'useField' hook from Formik to manage field state and meta information
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;

  // Safely extract 'touched' and 'error' properties from 'meta' using lodash's 'at'
  const [touched, error] = at(meta, "touched", "error");

  // Determine if there is an error based on touched and error state
  const isError = touched && error && true;

  // Define a function to render helper text based on error state
  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  // Render a FormControl, including an InputLabel, Select component, and any helper text
  return (
    <FormControl {...rest} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={selectedValue ? selectedValue : ""}>
        {data.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>
  );
}

// Set default properties for the SelectField component
SelectField.defaultProps = {
  data: [],
};

// Define prop types for the SelectField component to ensure correct usage
SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

// Export the SelectField component as the default export
export default SelectField;
