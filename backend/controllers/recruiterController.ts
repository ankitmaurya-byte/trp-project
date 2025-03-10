import { NextFunction, Request, RequestHandler } from "express";
import mongoose from "mongoose";
import ErrorHandler from "../utils/errorhandler";

export interface AuthRequest extends Request {
  user: {
    id: mongoose.Types.ObjectId;
    role?: string;
    [key: string]: any;
  };
}

// recruiterController.ts
import { Response } from "express";
import Recruiter from "../models/users/Recruiter";

export const getRecruiterProfile = (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const recruiterId = req.params.id;
    if (!recruiterId) {
      throw new ErrorHandler(400, "Recruiter ID is required");
    }

    if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
      throw new ErrorHandler(400, "Invalid recruiter ID format");
    }

    const recruiter = await Recruiter.findById(recruiterId)
      .select("-password")
      .populate("jobsPosted")
      .populate("savedcandidates");

    if (!recruiter) {
      throw new ErrorHandler(404, "Recruiter not found");
    }

    res.json({ success: true, data: recruiter });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

export const updateRecruiterProfile = (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const recruiterId = req.user.id;

    if (!recruiterId) {
      throw new ErrorHandler(401, "Unauthorized - No user ID found");
    }

    const allowedUpdates = ["username", "company", "email"];
    const updates = Object.keys(req.body).reduce(
      (acc: Record<string, any>, key) => {
        if (allowedUpdates.includes(key)) {
          acc[key] = req.body[key];
        }
        return acc;
      },
      {}
    );

    const updatedProfile = await Recruiter.findByIdAndUpdate(
      recruiterId,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedProfile) {
      throw new ErrorHandler(404, "Recruiter not found");
    }

    res.json({ success: true, data: updatedProfile });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

export const saveCandidate = (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { candidateId } = req.params;
    const recruiterId = req.user.id;

    if (!recruiterId) {
      throw new ErrorHandler(401, "Unauthorized - No user ID found");
    }

    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      throw new ErrorHandler(400, "Invalid candidate ID format");
    }

    const recruiter = await Recruiter.findByIdAndUpdate(
      recruiterId,
      { $addToSet: { savedcandidates: candidateId } },
      { new: true, runValidators: true }
    ).select("-password");

    if (!recruiter) {
      throw new ErrorHandler(404, "Recruiter not found");
    }

    res.json({ success: true, data: recruiter });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;
