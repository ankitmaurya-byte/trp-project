import express from "express";

import {
  isAuthenticated as authenticate,
  authorize,
  isAuthenticated,
} from "../middlewares/authMiddleware";
import {
  viewCandidateById,
  viewCandidates,
} from "../controllers/candidateController";

const router = express.Router();

// View candidates (recruiters only)
router.get(
  "/get-all-candidates",
  authorize(["recruiter", "admin"]),
  viewCandidates
);

// get jobsApplied

// notifications

// notificationViewed

//update messagedViewed

router.get(
  "/get-profile/:id",
  authorize(["recruiter", "admin"]),
  viewCandidateById
);
router.put("/update-profile/", authenticate, viewCandidateById);

export default router;
