export default {
  formId: "registerForm",
  formField: {
    ABN: {
      name: "ABN",
      label: "ABN*",
      requiredErrorMsg: "ABN is required",
      invalidErrorMsg: "ABN is not valid (e.g. 12345678912)",
    },
    orgName: {
      name: "orgName",
      label: "Organisation Name*",
      requiredErrorMsg: "Organisation Name is required",
    },
    orgEmail: {
      name: "orgEmail",
      label: "Organisation Email*",
      requiredErrorMsg: "Organisation Email is required",
    },
    phoneNumber: {
      name: "phoneNumber",
      label: "Phone Number*",
      requiredErrorMsg: "Phone Number is required",
      invalidErrorMsg:
        "Phone Number is not valid (phone number should be in format of 10 digits starting with '04')",
    },
    streetAddress: {
      name: "streetAddress",
      label: "Street Address*",
      requiredErrorMsg: "Street Address is required",
    },
    suburb: {
      name: "suburb",
      label: "Suburb*",
      requiredErrorMsg: "Suburb is required",
      invalidErrorMsg: "Suburb can only contain letters",
    },
    state: {
      name: "state",
      label: "State*",
      requiredErrorMsg: "State is required",
    },
    postcode: {
      name: "postcode",
      label: "Postcode*",
      requiredErrorMsg: "Postcode is required",
      invalidErrorMsg: "Postcode is not valid (e.g. 4000)",
    },
    firstName: {
      name: "firstName",
      label: "First Name*",
      requiredErrorMsg: "First Name is required",
    },
    lastName: {
      name: "lastName",
      label: "Last Name*",
      requiredErrorMsg: "Last Name is required",
    },
    userEmail: {
      name: "userEmail",
      label: "User Email*",
      requiredErrorMsg: "User Email is required",
    },
    password: {
      name: "password",
      label: "Password*",
      requiredErrorMsg: "Password is required",
    },
    title: {
      name: "title",
      label: "Title*",
      requiredErrorMsg: "Title is required",
    },
    city: {
      name: "city",
      label: "City*",
      requiredErrorMsg: "City is required",
      invalidErrorMsg: "City can only contain letters",
    },
    position: {
      name: "position",
      label: "Position*",
      requiredErrorMsg: "Position is required",
    },
  },
};
