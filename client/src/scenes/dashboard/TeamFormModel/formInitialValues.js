import teamFormModel from "./teamFormModel";
const {
  formField: { teamName, city, department },
} = teamFormModel;

export default {
  [teamName.name]: "",
  [city.name]: "",
  [department.name]: "",
};
