import express from "express";
import {
  registerOrg,
  registerUser,
  login,
  createTeam,
  removeTeams,
  removeMembers,
  updateUser,
  updateEmployment,
  updateQualification,
  updateResponsibility,
  deleteDevelopmentPlan,
  addDevelopmentPlan,
  editDevelopmentPlan,
  addTeamMembers,
  removeTeamMembers,
} from "../controllers/auth.js";

// Creating an instance of the Express Router
const router = express.Router();

// Defining the routes and associating them with corresponding controller functions

router.post("/registerOrganisation", registerOrg); // Route for registering an organization
router.post("/registerUser", registerUser); // Route for registering a user
router.post("/login", login); // Route for user login
router.post("/updateUser", updateUser); // Route for updating user information
router.post("/updateEmployment", updateEmployment); // Route for updating employment history
router.post("/updateQualification", updateQualification); // Route for updating qualifications
router.post("/updateResponsibility", updateResponsibility); // Route for updating responsibilities
router.post("/deleteDevelopmentPlan", deleteDevelopmentPlan); // Route for deleting a development plan
router.post("/addDevelopmentPlan", addDevelopmentPlan); // Route for adding a development plan
router.post("/editDevelopmentPlan", editDevelopmentPlan); // Route for editing a development plan
router.post("/createTeam", createTeam); // Route for creating a team
router.post("/removeTeam", removeTeams); // Route for removing teams
router.post("/removeMember", removeMembers); // Route for removing members
router.post("/addTeamMembers", addTeamMembers); // Route for adding team members
router.post("/removeTeamMembers", removeTeamMembers); // Route for removing team members

export default router;
