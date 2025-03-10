import express, { Router } from "express";
import {
  isAuthenticated,
  checkPermissionOnly,
  authorize,
} from "../middlewares/authMiddleware";
import {
  getRecruiterProfile,
  saveCandidate,
  updateRecruiterProfile,
} from "../controllers/recruiterController";

const router: Router = express.Router();

router.put("/update-profile", authorize(["recruiter"]), updateRecruiterProfile);

router.get("/get-profile/:id", isAuthenticated, getRecruiterProfile);

router.post(
  "/save-candidate/:candidateId",
  isAuthenticated,
  checkPermissionOnly(["recruiter"]),
  saveCandidate
);

export default router;
