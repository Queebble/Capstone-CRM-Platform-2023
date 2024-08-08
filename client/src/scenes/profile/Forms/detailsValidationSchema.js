import * as Yup from "yup";
import detailsFormModel from "./detailsFormModel";
const {
  formField: { firstName, lastName, title, city, position, profileImage },
} = detailsFormModel;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [title.name]: Yup.string().nullable().required(`${title.requiredErrorMsg}`),
    [city.name]: Yup.string().required(`${city.requiredErrorMsg}`),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
    [profileImage.name]: Yup.string().nullable(),
  }),
];
