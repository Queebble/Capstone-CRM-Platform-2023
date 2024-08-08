import express from "express";
import {
  finxsAuth,
  generatePasswords,
  checkPasswordStatuses,
  addAssessments,
  updateAssessments,
  getReport,
} from "../controllers/finxs.js";

// Creating an instance of the Express Router
const router = express.Router();

router.post("/auth", finxsAuth); // Route for authenticating with the FinxS API
router.post("/passwords", generatePasswords); // Route for generating passwords
router.post("/checkPasswords", checkPasswordStatuses); // Route for checking password statuses
router.post("/addAssessments", addAssessments); // Route for adding assessments to a member
router.post("/updateAssessments", updateAssessments); // Route for updating assessments for a member
router.get("/getReport", getReport); // Route for getting a report from the FinxS API

export default router;
