import { NextFunction, Request, RequestHandler, Response } from "express";
import Application from "../models/Application";
import mongoose from "mongoose";
import { AuthRequest } from "./recruiterController";

export const getMessages = (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.user?.id;
    const applications = await Application.find({ candidate: candidateId })
      .select("messages")
      .populate("job")
      .populate("recruiter", "username company");

    res.json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
}) as RequestHandler;
export const markMessageViewed = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const application = await Application.findOneAndUpdate(
      { "messages._id": messageId },
      { "messages.$.status": "viewed" },
      { new: true }
    );

    res.json({ success: true, data: application });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to mark message as viewed" });
  }
};
export const getJobApplications = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId })
      .populate("candidate", "-password")
      .populate("job");

    res.json({ success: true, data: applications });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch applications" });
  }
};
