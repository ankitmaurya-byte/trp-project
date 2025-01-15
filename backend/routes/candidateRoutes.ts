import express from "express";
import {
  isAuthenticated as authenticate,
  authorize,
} from "../middlewares/authMiddleware";
import {
  viewCandidates,
  updateCandidateProfile,
} from "../controllers/candidateController";

const router = express.Router();

// View candidates (recruiters only)
router.get(
  "/get_all_candidates",
  authenticate,
  authorize(["recruiter", "admin"]),
  viewCandidates
);

// Create or update candidate profile (candidates only)
router.post(
  "/profile",
  authenticate,
  authorize(["candidate"]),
  updateCandidateProfile
);

export default router;
