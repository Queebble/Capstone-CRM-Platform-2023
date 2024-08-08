import * as Yup from "yup";
import devPlanFormModel from "./devPlanFormModel";

const {
  formField: {
    goal,
    action,
    successMeasure,
    status,
    startDate,
    endDate,
    notes,
  },
} = devPlanFormModel;

const devPlanValidationSchema = Yup.object()
  .shape({
    goal: Yup.string().required(goal.requiredErrorMsg).nullable(),
    action: Yup.string().required(action.requiredErrorMsg).nullable(),
    status: Yup.string().required(status.requiredErrorMsg).nullable(),
    successMeasure: Yup.string()
      .required(successMeasure.requiredErrorMsg)
      .nullable(),
    startDate: Yup.date().required(startDate.requiredErrorMsg).nullable(),
    endDate: Yup.date().required(endDate.requiredErrorMsg).nullable(),
    notes: Yup.string().required(notes.requiredErrorMsg).nullable(),
  })
  .required("Must have Development Plans");

export default devPlanValidationSchema;
