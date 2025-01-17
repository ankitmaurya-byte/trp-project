import express, { Request, Response, Router } from "express";
import {
  isAuthenticated as authenticate,
  authorize,
} from "../middlewares/authMiddleware";
import { createJob, getAllJobs } from "../controllers/jobController";

const router: Router = express.Router();

// Create a new job (recruiters only)
router.post("/create_job", authenticate, authorize(["recruiter"]), createJob);

// update job created

// saveCandidates

// updateOwnProfile

//update messagedViewed

// notificationViewed

// getMessage

// get all application of particular job

// get particular candidate

// Fetch all jobs (accessible to all roles)
router.get("/get_all_job", authenticate, getAllJobs);

export default router;
