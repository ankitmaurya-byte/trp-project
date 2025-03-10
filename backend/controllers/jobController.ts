import { NextFunction, Request, RequestHandler, Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import Recruiter from "../models/users/Recruiter";
import Candidate from "../models/users/Candidate"; // Added missing import
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorhandler";
import { AuthRequest } from "./recruiterController";

interface FilterQuery {
  type?: "full-time" | "part-time" | "contract" | "internship";
  location?: string;
  experience?: "0-2" | "2-5" | "5-10" | "10+";
  locationType?: "remote" | "hybrid" | "on-site";
  minSalary?: number;
  maxSalary?: number;
  department?: string;
  skills?: string[];
  postedWithin?: string;
  createdAt?: { $gte: Date };
}
// Create a new job

export const createJob = (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobData = req.body;
    const recruiterId = req.user.id;

    // Map frontend data to schema-compatible structure
    const mappedJobData = {
      hiringFor: jobData.hiringFor,
      type: jobData.jobTypes?.[0]?.toLowerCase().replace(" ", "") || "fulltime", // Take first job type and normalize
      title: jobData.positionTitle || jobData.title,
      company: jobData.companyName || jobData.company,
      location: jobData.location,
      locationType: jobData.locationType || "hybrid", // Default value if not provided
      description: jobData.description,
      detailedSkills: {
        mustHave: Array.isArray(jobData.skills?.mustHave)
          ? jobData.skills.mustHave
          : typeof jobData.skills?.mustHave === "string"
          ? jobData.skills.mustHave.split(",").map((s: string) => s.trim())
          : [],
        niceToHave: Array.isArray(jobData.skills?.niceToHave)
          ? jobData.skills.niceToHave
          : typeof jobData.skills?.niceToHave === "string"
          ? jobData.skills.niceToHave.split(",").map((s: string) => s.trim())
          : [],
        addOn: Array.isArray(jobData.skills?.addOn)
          ? jobData.skills.addOn
          : typeof jobData.skills?.addOn === "string"
          ? jobData.skills.addOn.split(",").map((s: string) => s.trim())
          : [],
      },
      education: jobData.education,
      salary: {
        min: jobData.pay?.minimum || jobData.salary?.min,
        max: jobData.pay?.maximum || jobData.salary?.max,
        rate: jobData.pay?.rate || jobData.salary?.rate || "Per Month",
      },
      industryPreferences: {
        totalExperience:
          jobData.industry?.totalExperience ||
          jobData.industryPreferences?.totalExperience ||
          0,
        skillsExperience:
          jobData.industry?.skillsExperience ||
          jobData.industryPreferences?.skillsExperience ||
          0,
        numberOfYears: Number(
          jobData.industry?.numberOfYears ||
            jobData.industryPreferences?.numberOfYears ||
            0
        ),
      },
      otherDetails: jobData.otherDetails,
      certifications: jobData.certification
        ? [
            {
              name: jobData.certification,
              mandatory:
                jobData.isMandatory === true || jobData.isMandatory === "true",
            },
          ]
        : [],
      canRelocate:
        jobData.canRelocate === true || jobData.canRelocate === "true",
      contactPreference: jobData.contactPreference || "email",
      recruiter: recruiterId,
      status: "open",
      experience: 0,
      totalApplications: 0,
    };

    console.log("Creating job with data:", mappedJobData);

    // Create the job
    const job = await Job.create(mappedJobData);

    if (!job) {
      return res.status(400).json({
        success: false,
        message: "Failed to create job",
      });
    }

    // Update the recruiter's jobsPosted array with the new job ID
    await Recruiter.findByIdAndUpdate(
      recruiterId,
      { $push: { jobsPosted: job._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Job created successfully and added to your posted jobs",
      data: job,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create job",
      error: (error as Error).message,
    });
  }
}) as RequestHandler;
// Update existing job
export const updateJob = (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findOneAndUpdate(
      { _id: jobId, recruiter: req.user.id },
      req.body,
      { new: true }
    );

    if (!job) {
      throw new ErrorHandler(404, "Job not found or unauthorized to update");
    }

    res.json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

export const applyToJob = (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jobId } = req.params;
    const candidateId = req.user.id;
    const { readytorelocate, coverletter } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      throw new ErrorHandler(404, "Job not found");
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      candidate: candidateId,
    });

    if (existingApplication) {
      throw new ErrorHandler(400, "Already applied to this job");
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      candidate: candidateId,
      readytorelocate,
      coverletter,
      status: "applied",
    });

    if (!application) {
      throw new ErrorHandler(400, "Failed to create application");
    }

    // Update candidate's jobsApplied array
    await Candidate.findByIdAndUpdate(candidateId, {
      $push: { jobsApplied: jobId },
    });

    // Update job's totalApplications count
    await Job.findByIdAndUpdate(jobId, { $inc: { totalApplications: 1 } });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

export const getAllJobs = (async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const jobs = await Job.find().populate("recruiter", "-password");

    if (!jobs) {
      throw new ErrorHandler(404, "No jobs found");
    }

    res.json({ success: true, data: jobs });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

export const getMyJobs = (async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    const jobIds = (req.user as { jobsPosted: string[] }).jobsPosted;

    // Extract query parameters
    const {
      type,
      location,
      experience,
      locationType,
      minSalary,
      maxSalary,
      department,
      skills,
      postedWithin,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "-1",
    } = req.query;

    // Build filter query

    const filterQuery: FilterQuery & { _id: { $in: string[] } } = {
      _id: { $in: jobIds },
    };

    // Add filters conditionally

    if (type) filterQuery.type = type as FilterQuery["type"];
    if (location) filterQuery.location = location as string | undefined;
    if (experience)
      filterQuery.experience = experience as FilterQuery["experience"];
    if (locationType)
      filterQuery.locationType = locationType as FilterQuery["locationType"];
    if (department) filterQuery.department = department as string;

    // Handle salary range
    if (minSalary || maxSalary) {
      filterQuery.minSalary = minSalary ? Number(minSalary) : undefined;
      filterQuery.maxSalary = maxSalary ? Number(maxSalary) : undefined;
    }

    // Handle skills array
    if (skills) {
      filterQuery.skills = {
        $all: typeof skills === "string" ? [skills] : (skills as string[]),
      } as any;
    }

    // Handle posted within filter
    if (postedWithin) {
      const date = new Date();
      switch (postedWithin) {
        case "24h":
          date.setHours(date.getHours() - 24);
          break;
        case "7d":
          date.setDate(date.getDate() - 7);
          break;
        case "30d":
          date.setDate(date.getDate() - 30);
          break;
        case "90d":
          date.setDate(date.getDate() - 90);
          break;
      }
      filterQuery.createdAt = { $gte: date };
    }

    // Calculate skip value for pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Get total count for pagination
    const total = await Job.countDocuments(filterQuery);

    // Fetch filtered and paginated jobs
    const jobs = await Job.find(filterQuery)
      .sort({ [sortBy as string]: sortOrder === "-1" ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit))
      .select("-__v"); // Exclude version key

    // Return response with pagination info
    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          total,
          page: Number(page),
          pages: Math.ceil(total / Number(limit)),
          limit: Number(limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;
