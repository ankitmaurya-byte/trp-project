// src/routes/jobRoutes.ts
import express, { RequestHandler, Router } from "express";
import {
  isAuthenticated,
  checkPermissionOnly,
  authorize,
} from "../middlewares/authMiddleware";
import {
  createJob,
  updateJob,
  getAllJobs,
  applyToJob,
  getMyJobs,
} from "../controllers/jobController";

const router: Router = express.Router();

// Create job route (recruiter only)
router.post(
  "/create-job",
  authorize(["recruiter"]),
  createJob
) as RequestHandler;

// Update job route (recruiter only)
router.put(
  "/update-job/:jobId",
  authorize(["recruiter"]),
  updateJob
) as RequestHandler;

// Apply to job route (candidate only)
router.post(
  "/apply/:jobId",
  authorize(["candidate"]),
  applyToJob
) as RequestHandler;

// Get all jobs route (accessible to all authenticated users)
router.get(
  "/get-all-jobs",
  authorize(["candidate"]),
  getAllJobs
) as RequestHandler;
router.get(
  "/get-my-post",
  authorize(["recruiter"]),
  getMyJobs
) as RequestHandler;

export default router;
