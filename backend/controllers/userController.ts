import Recruiter from "../models/users/Recruiter";
import Candidate from "../models/users/Candidate";
import { NextFunction, Request, RequestHandler, Response } from "express";
import Application from "../models/Application";
import { AuthRequest } from "./recruiterController";

export const findUser = async (
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
};

// Mark message as viewed
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

// Mark notification as viewed
export const markNotificationViewed = (async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { notificationId } = req.params;
    const recruiterId = req.user?.id;

    const recruiter = await Recruiter.findOneAndUpdate(
      { _id: recruiterId, "notification._id": notificationId },
      { "notification.$.status": "read" },
      { new: true }
    );

    res.json({ success: true, data: recruiter });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to mark notification as viewed" });
  }
}) as RequestHandler;
