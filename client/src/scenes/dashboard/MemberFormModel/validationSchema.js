import * as Yup from "yup";
import memberFormModel from "./memberFormModel";
const {
  formField: { firstName, lastName, userEmail, title, city, position },
} = memberFormModel;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [userEmail.name]: Yup.string()
      .email("Invalid Email")
      .required(`${userEmail.requiredErrorMsg}`),
    [title.name]: Yup.string().nullable().required(`${title.requiredErrorMsg}`),
    [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
  }),
];
