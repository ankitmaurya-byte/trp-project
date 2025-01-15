import { Request, Response } from "express";
import Job from "../models/Job";
import type { Request as AuthRequest } from "express";

interface User {
  id: string;
  // add other properties if needed
}

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

// Create a new job (recruiters only)
export const createJob = async (req: AuthRequest, res: Response) => {
  const {
    title,
    company,
    location,
    description,
    requirements,
    skills,
    experience,
    salary,
  } = req.body;
  try {
    if (req.user?.id) {
      const job = new Job({ ...req.body, recruiter: req.user.id });
      await job.save();
      res.status(201).json({ message: "Job created successfully.", job });
    } else {
      res.status(401).json({ message: "Unauthorized: User ID not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// Fetch all jobs (accessible to all roles)
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().populate("recruiter", "username email");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
