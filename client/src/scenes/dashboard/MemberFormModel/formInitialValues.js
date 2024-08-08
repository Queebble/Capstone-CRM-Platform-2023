import memberFormModel from "./memberFormModel";
const {
  formField: { firstName, lastName, userEmail, title, city, position },
} = memberFormModel;

export default {
  [firstName.name]: "",
  [lastName.name]: "",
  [userEmail.name]: "",
  [title.name]: "",
  [city.name]: "",
  [position.name]: "",
};
