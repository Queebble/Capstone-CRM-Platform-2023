import React, { useState } from "react";
import { Grid } from "@mui/material";
import InputField from "components/FormFields/InputField";
import SelectField from "components/FormFields/SelectedField";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetTeamsQuery } from "state/api";
import { useSelector } from "react-redux";

// Array for predefined titles.
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

export default function AddMemberForm(props) {
  // Destructuring props to get required form fields and a callback.
  const {
    formField: { firstName, lastName, userEmail, title, city, position },
    onTeamChange,
  } = props;

  // State variable to keep track of the selected team.
  const [selectedTeam, setSelectedTeam] = useState("");

  // Function to handle changes in the team selection.
  const handleTeamChange = (event, newValue) => {
    setSelectedTeam(newValue);
    onTeamChange(newValue);
  };

  // Configuration values for the API call.
  const page = 0;
  const pageSize = 100;
  const sort = {};
  const search = "";

  // Retrieving token and user details from the Redux store.
  const token = useSelector((state) => state.global.token);
  const user = useSelector((state) => state.global.user);
  const organisationID = user.organisationID;

  // Fetching teams data from the backend API using a custom hook.
  const { data } = useGetTeamsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    token,
    organisationID,
  });

  // Mapping teams data to get team names.
  const teams = data?.teams.map((team) => team.name) || [];

  // Component for team selection using autocomplete.
  const AutocompleteComponent = (props) => (
    <Autocomplete
      // Spreading props to inherit all properties passed to the component.
      {...props}
      options={teams}
      getOptionLabel={(option) => option.toString()}
      value={props.value || null}
      // Rendering the text input for autocomplete.
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          placeholder={props.placeholder}
        />
      )}
    />
  );
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField name={userEmail.name} label={userEmail.label} fullWidth />
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
        <Grid item xs={12} sm={12}>
          <AutocompleteComponent
            id="selectedTeam"
            label="Select Team (Optional)"
            placeholder="Select Team (Optional)"
            value={selectedTeam}
            onChange={handleTeamChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
