import React from "react";
import { Grid } from "@mui/material";
import InputField from "components/FormFields/InputField";

export default function AddTeamForm(props) {
  const {
    formField: { teamName, city, department },
  } = props;
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField name={teamName.name} label={teamName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={city.name} label={city.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={department.name}
            label={department.label}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
