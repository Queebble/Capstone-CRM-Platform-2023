import * as Yup from "yup";
import responsibilityFormModel from "./responsibilityFormModel";

const {
  formField: { responsibility },
} = responsibilityFormModel;

const responsibilityValidationSchema = Yup.object().shape({
  responsibilities: Yup.array()
    .of(
      Yup.object().shape({
        responsibility: Yup.string()
          .required(responsibility.requiredErrorMsg)
          .nullable(),
      })
    )
    .required("Must have responsibilities"),
});

export default responsibilityValidationSchema;
