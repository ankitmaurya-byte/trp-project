import express from "express";

import { Request, Response } from "express";
import Recruiter from "../models/users/Recruiter";
import Candidate from "../models/users/Candidate";

import {
  isAuthenticated as authenticate,
  authorize,
  isAuthenticated,
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

// getAllJobs

// getMessage

// Create or update candidate profile (candidates only)

// get jobsApplied

// notifications

// notificationViewed

//update messagedViewed

router.post(
  "/profile",
  authenticate,
  authorize(["candidate"]),
  updateCandidateProfile
);

router.get(
  "/findUser",
  isAuthenticated,
  async (
    req: Request & { user?: { role?: string; id?: string } },
    res: Response
  ): Promise<void> => {
    console.log("req.user");
    console.log(req.user);

    if (!req.user || !req.user.role || !req.user.id) {
      res.status(403).json({ message: "Not authorized" });
      return;
    }

    try {
      let userData;

      if (req.user.role === "recruiter") {
        // Fetch recruiter details
        userData = await Recruiter.findById(req.user.id);
      } else if (req.user.role === "candidate") {
        // Fetch candidate details
        userData = await Candidate.findById(req.user.id);
      } else {
        res.status(403).json({ message: "Role not authorized" });
        return;
      }

      if (!userData) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      console.log(userData);

      // Send the retrieved user data
      res.status(200).json({ message: "User found", user: userData });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
export default router;
