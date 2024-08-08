import * as Yup from "yup";
import qualificationFormModel from "./qualificationFormModel";

const {
  formField: { qualification },
} = qualificationFormModel;

const qualificationValidationSchema = Yup.object().shape({
  qualifications: Yup.array()
    .of(
      Yup.object().shape({
        qualification: Yup.string()
          .required(qualification.requiredErrorMsg)
          .nullable(),
      })
    )
    .required("Must have qualification history"),
});

export default qualificationValidationSchema;
