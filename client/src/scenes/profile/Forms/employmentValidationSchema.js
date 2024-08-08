import * as Yup from "yup";
import employmentFormModel from "./employmentFormModel";

const {
  formField: { employer, position, startDate, endDate },
} = employmentFormModel;

const employmentValidationSchema = Yup.object().shape({
  employmentHistory: Yup.array()
    .of(
      Yup.object().shape({
        employer: Yup.string().required(employer.requiredErrorMsg).nullable(),
        position: Yup.string().required(position.requiredErrorMsg).nullable(),
        startDate: Yup.date().required(startDate.requiredErrorMsg).nullable(),
        endDate: Yup.date().required(endDate.requiredErrorMsg).nullable(),
      })
    )
    .required("Must have employment history"),
});

export default employmentValidationSchema;
