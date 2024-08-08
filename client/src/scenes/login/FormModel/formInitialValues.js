import registerFormModel from "./registerFormModel";
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
    firstName,
    lastName,
    userEmail,
    password,
    title,
    city,
    position,
  },
} = registerFormModel;

export default {
  [ABN.name]: "",
  [orgName.name]: "",
  [orgEmail.name]: "",
  [phoneNumber.name]: "",
  [streetAddress.name]: "",
  [suburb.name]: "",
  [state.name]: "",
  [postcode.name]: "",
  [firstName.name]: "",
  [lastName.name]: "",
  [userEmail.name]: "",
  [password.name]: "",
  [title.name]: "",
  [city.name]: "",
  [position.name]: "",
};
