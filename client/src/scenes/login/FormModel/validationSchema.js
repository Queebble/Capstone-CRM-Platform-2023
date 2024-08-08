import * as Yup from "yup";
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

export default [
  Yup.object().shape({
    [ABN.name]: Yup.string()
      .required(`${ABN.requiredErrorMsg}`)
      .test(
        "len",
        `${ABN.invalidErrorMsg}`,
        (val) => val && /^\d{11}$/.test(val)
      ),
    [orgName.name]: Yup.string().required(`${orgName.requiredErrorMsg}`),
    [orgEmail.name]: Yup.string()
      .email("Invalid Email")
      .required(`${orgEmail.requiredErrorMsg}`),
    [phoneNumber.name]: Yup.string()
      .required(`${phoneNumber.requiredErrorMsg}`)
      .matches(/^04[0-9]{8}$/, `${phoneNumber.invalidErrorMsg}`),
    [streetAddress.name]: Yup.string().required(
      `${streetAddress.requiredErrorMsg}`
    ),
    [suburb.name]: Yup.string()
      .required(`${suburb.requiredErrorMsg}`)
      .matches(/^[a-zA-Z]+$/, `${suburb.invalidErrorMsg}`),
    [state.name]: Yup.string().nullable().required(`${state.requiredErrorMsg}`),
    [postcode.name]: Yup.string()
      .required(`${postcode.requiredErrorMsg}`)
      .test(
        "len",
        `${postcode.invalidErrorMsg}`,
        (val) => val && /^\d{4}$/.test(val)
      ),
  }),
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [userEmail.name]: Yup.string()
      .email("Invalid Email")
      .required(`${userEmail.requiredErrorMsg}`),
    [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
    [title.name]: Yup.string().nullable().required(`${title.requiredErrorMsg}`),
    [city.name]: Yup.string()
      .required(`${city.requiredErrorMsg}`)
      .matches(/^[a-zA-Z]+$/, `${city.invalidErrorMsg}`),
    [position.name]: Yup.string().required(`${position.requiredErrorMsg}`),
  }),
];
