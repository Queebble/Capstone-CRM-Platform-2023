import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useGetTeamlessMembersQuery } from "state/api";
import { useSelector } from "react-redux";

export default function AddTeamMemberForm(props) {
  // Destructuring props to get callbacks for changing members and team leaders.
  const { onMembersChange, onTeamLeadersChange } = props;

  // Initializing state variables for members, team leaders, and available members.
  const [refetch, setRefetch] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTeamLeaders, setSelectedTeamLeaders] = useState([]);
  const [availableMembers, setAvailableMembers] = useState([]);

  // Handlers for selecting members and team leaders.
  const handleMemberChange = (event, newValue) => {
    onMembersChange(newValue);
    setSelectedMembers(newValue);
  };

  const handleTeamLeaderChange = (event, newValue) => {
    onTeamLeadersChange(newValue);
    setSelectedTeamLeaders(newValue);
  };

  // Fetching token and user details from the global Redux store.
  const token = useSelector((state) => state.global.token);
  const user = useSelector((state) => state.global.user);
  const organisationID = user.organisationID;

  // Fetching members who are not assigned to any team using the custom hook.
  const { data, isLoading } = useGetTeamlessMembersQuery(
    {
      token,
      organisationID,
      refetch,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Updating the list of available members whenever there's a change in data or selected members/leaders.
  useEffect(() => {
    const allMembers = data ? data.members : [];
    const unavailableMembers = [
      ...selectedMembers.flat(),
      ...selectedTeamLeaders.flat(),
    ];
    const updatedAvailableMembers = allMembers.filter(
      (member) =>
        !unavailableMembers.some((selected) => selected._id === member._id)
    );
    setAvailableMembers(updatedAvailableMembers);
  }, [data, selectedMembers, selectedTeamLeaders]);

  // A reusable autocomplete component for adding team members or team leaders.
  const AutocompleteComponent = (props) => (
    <FormControl sx={{ m: 1, width: 500 }}>
      <Autocomplete
        multiple
        {...props}
        options={!data ? [{ label: "Loading...", id: 0 }] : data.members}
        getOptionLabel={(option) =>
          option.name + " - " + option.email + ": " + option.position
        }
        isOptionEqualToValue={(option, value) => option._id === value._id}
        filterOptions={(options) =>
          options.filter((option) =>
            availableMembers.some((member) => member._id === option._id)
          )
        }
        filterSelectedOptions={!data ? false : true}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            placeholder={props.placeholder}
          />
        )}
      />
    </FormControl>
  );

  // Rendering two autocomplete components, one for adding team leaders and the other for adding members.
  return (
    <React.Fragment>
      <AutocompleteComponent
        id="addTeamLeaders"
        label="Add Team Leaders"
        placeholder="Add Team Leaders..."
        value={selectedTeamLeaders}
        onChange={handleTeamLeaderChange}
      />
      <AutocompleteComponent
        id="addMembers"
        label="Add Members"
        placeholder="Add Member..."
        value={selectedMembers}
        onChange={handleMemberChange}
      />
    </React.Fragment>
  );
}
