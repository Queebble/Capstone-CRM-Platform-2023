import React from "react";
import { Grid, Typography } from "@mui/material";
import InputField from "../../../components/FormFields/InputField";
import SelectField from "../../../components/FormFields/SelectedField";

const states = [
  {
    value: "QLD",
    label: "QLD",
  },
  {
    value: "NSW",
    label: "NSW",
  },
  {
    value: "VIC",
    label: "VIC",
  },
  {
    value: "ACT",
    label: "ACT",
  },
  {
    value: "SA",
    label: "SA",
  },
  {
    value: "WA",
    label: "WA",
  },
  {
    value: "NT",
    label: "NT",
  },
  {
    value: "TAS",
    label: "TAS",
  },
];

export default function OrganisationForm(props) {
  const {
    formField: {
      ABN,
      orgName,
      orgEmail,
      phoneNumber,
      streetAddress,
      suburb,
      state,
      postcode,
    },
  } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Register Organisation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField name={ABN.name} label={ABN.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={phoneNumber.name}
            label={phoneNumber.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <InputField name={orgName.name} label={orgName.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={orgEmail.name} label={orgEmail.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={streetAddress.name}
            label={streetAddress.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={suburb.name} label={suburb.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <InputField name={postcode.name} label={postcode.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SelectField
            name={state.name}
            label={state.label}
            data={states}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
