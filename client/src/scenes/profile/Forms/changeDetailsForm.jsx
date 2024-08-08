import React, { useState } from "react";
import { Grid } from "@mui/material";
import InputField from "components/FormFields/InputField";
import SelectField from "components/FormFields/SelectedField";

const titles = [
  {
    value: "Mr",
    label: "Mr",
  },
  {
    value: "Mrs",
    label: "Mrs",
  },
  {
    value: "Miss",
    label: "Miss",
  },
  {
    value: "Ms",
    label: "Ms",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export default function ChangeDetailsForm(props) {
  const {
    formField: { firstName, lastName, title, city, position, profileImage },
  } = props;

  return (
    <React.Fragment>
      <Grid container spacing={2} paddingTop="5px">
        <Grid item xs={12} sm={6}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SelectField
            name={title.name}
            label={title.label}
            data={titles}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <InputField name={city.name} label={city.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputField name={position.name} label={position.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
