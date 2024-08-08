import * as Yup from "yup";
import teamFormModel from "./teamFormModel";
const {
  formField: { teamName, city, department },
} = teamFormModel;

export default [
  Yup.object().shape({
    [teamName.name]: Yup.string().required(`${teamName.requiredErrorMsg}`),
    [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
    [department.name]: Yup.string().required(`${department.requiredErrorMsg}`),
  }),
];
