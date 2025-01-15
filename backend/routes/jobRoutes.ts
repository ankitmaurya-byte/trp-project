import express, { Request, Response, Router } from "express";
import {
  isAuthenticated as authenticate,
  authorize,
} from "../middlewares/authMiddleware";
import { createJob, getAllJobs } from "../controllers/jobController";

const router: Router = express.Router();

// Create a new job (recruiters only)
router.post("/create_job", authenticate, authorize(["recruiter"]), createJob);

// Fetch all jobs (accessible to all roles)
router.get("/get_all_job", authenticate, getAllJobs);

export default router;
