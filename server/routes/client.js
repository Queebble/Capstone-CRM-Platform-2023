import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getMemberByToken,
  getMember,
  getMembers,
  getTotalMembers,
  getTotalTeams,
  getTeams,
  getOrganisations,
  checkMember,
  checkOrganisation,
  getTeam,
  checkTeam,
  getTeamlessMembers,
  getTeamMemberAssessments,
  getMembersByEmails,
  getTeamMembers,
  getOrganisationAssessments,
  getTeamSizes,
  getOrganisation,
} from "../controllers/client.js";

const router = express.Router(); // Creating an instance of the Express Router

router.get("/member/token/:token", getMemberByToken); // Route to get a specific member by token
router.get("/member/:email", getMember); // Route to get a specific member by email
router.get("/members", verifyToken, getMembers); // Route to get all members (requires token verification)
router.get("/members/total", verifyToken, getTotalMembers); // Route to get total members (requires token verification)
router.get("/assessments", verifyToken, getOrganisationAssessments); // Route to get organization assessments (requires token verification)
router.get("/teamlessmembers", verifyToken, getTeamlessMembers); // Route to get teamless members (requires token verification)
router.get("/teams/total", verifyToken, getTotalTeams); // Route to get total teams (requires token verification)
router.get("/teams", verifyToken, getTeams); // Route to get all teams (requires token verification)
router.get("/teams/size", verifyToken, getTeamSizes); // Route to get all team sizes (requires token verification)
router.get("/teams/members", verifyToken, getTeamMembers); // Route to get all team members (requires token verification)
router.get("/teams/assessments", verifyToken, getTeamMemberAssessments); // Route to get team member assessments (requires token verification)
router.get("/organisation/:abn", verifyToken, getOrganisation); // Route to get a specific organization by ABN (requires token verification)
router.get("/organisations", verifyToken, getOrganisations); // Route to get all organizations (requires token verification)
router.get("/:abn/:team", verifyToken, getTeam); // Route to get a specific team by ABN and name (requires token verification)
router.get("/check/:abn/:team", checkTeam); // Route to check a specific team by ABN and name
router.get("/organisation/check/:abn", checkOrganisation); // Route to check a specific organization by ABN
router.get("/member/check/:email", checkMember); // Route to check a specific member by email
router.get("/members/emails", verifyToken, getMembersByEmails); // Route to get member emails (requires token verification)

export default router;
