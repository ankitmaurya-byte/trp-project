import { Request, Response } from "express";
import Candidate from "../models/users/Candidate";

// interface AuthenticatedRequest {
//   user?: {
//     _id: string;
//   };
// }

// View candidates (recruiters only)
export const viewCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find().populate(
      "user",
      "username email"
    );
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// Create or update candidate profile (candidates only)
export const updateCandidateProfile = async (
  req: Request & { user?: { id: string } },
  res: Response
): Promise<void> => {
  const { experience, skills, preferredLocation, resume } = req.body;
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let candidate = await Candidate.findOne({ user: userId });
    if (candidate) {
      candidate = await Candidate.findByIdAndUpdate(
        candidate._id,
        { experience, skills, preferredLocation, resume },
        { new: true }
      );
    } else {
      candidate = new Candidate({
        user: userId,
        experience,
        skills,
        preferredLocation,
        resume,
      });
      await candidate.save();
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
