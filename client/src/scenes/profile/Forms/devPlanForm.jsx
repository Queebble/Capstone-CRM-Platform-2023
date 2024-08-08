import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import InputField from "components/FormFields/InputField";
import SelectField from "components/FormFields/SelectedField";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const statuses = [
  {
    value: "In progress",
    label: "In progress",
  },
  {
    value: "Completed",
    label: "Completed",
  },
  {
    value: "On hold",
    label: "On hold",
  },
  {
    value: "Not started",
    label: "Not started",
  },
];

export default function DevPlanForm(props) {
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
  } = props;

  return (
    <React.Fragment>
      <Grid container spacing={2} paddingTop="5px">
        <Grid item xs={12}>
          <InputField name={goal.name} label={goal.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={action.name} label={action.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={successMeasure.name}
            label={successMeasure.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <SelectField
            name={status.name}
            label={status.label}
            data={statuses}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          {/* Use DatePicker for start date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              name={startDate.name}
              label={startDate.label}
              value={dayjs(startDate)}
              slotProps={<InputField fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          {/* Use DatePicker for end date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              name={endDate.name}
              label={endDate.label}
              value={dayjs(endDate)}
              slotProps={<InputField fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <InputField name={notes.name} label={notes.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
