import { Request, Response, NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import Candidate from "../models/users/Candidate";
import ErrorHandler from "../utils/errorhandler";
// import { Candidate } from "../models/interfaces/Candidate";
// import ErrorHandler from "../utils/ErrorHandler";

interface CandidateQueryParams {
  status?: string;
  skills?: string;
  experience?: string;
  location?: string;
}

export const viewCandidates = async (
  req: Request<{}, {}, {}, CandidateQueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, skills, experience, location } = req.query;

    // Build query based on filters
    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (skills) {
      query.skills = { $in: skills.split(",") };
    }

    if (location) {
      query.currentLocation = location;
    }

    if (experience) {
      query.yearOfExperience = experience;
    }

    const candidates = await Candidate.find(query)
      .select("-password -resetPasswordToken -resetPasswordExpires")
      .populate("jobsApplied", "title company location")
      .lean();

    if (!candidates) {
      throw new ErrorHandler(404, "No candidates found");
    }

    // Format the response to exclude sensitive information
    // const formattedCandidates = candidates.map((candidate) => ({
    //   id: candidate._id,
    //   username: candidate.username,
    //   email: candidate.email,
    //   contact: candidate.contact,
    //   yearOfExperience: candidate.yearOfExperience,
    //   currentLocation: candidate.currentLocation,
    //   skills: candidate.skills,
    //   status: candidate.status,
    //   experience: candidate.experience,
    //   education: candidate.education,
    //   jobsApplied: candidate.jobsApplied,
    // }));

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new ErrorHandler(500, error.message));
    } else {
      next(new ErrorHandler(500, "Internal Server Error"));
    }
  }
};

// Get single candidate by ID
export const viewCandidateById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
      .select("-password -resetPasswordToken -resetPasswordExpires")
      .populate("jobsApplied", "title company location")
      .lean();

    if (!candidate) {
      throw new ErrorHandler(404, "Candidate not found");
    }

    // const formattedCandidate = {
    //   id: candidate._id,
    //   username: candidate.username,
    //   email: candidate.email,
    //   contact: candidate.contact,
    //   yearOfExperience: candidate.yearOfExperience,
    //   currentLocation: candidate.currentLocation,
    //   skills: candidate.skills,
    //   status: candidate.status,
    //   experience: candidate.experience,
    //   education: candidate.education,
    //   jobsApplied: candidate.jobsApplied,
    //   notification: candidate.notification,
    // };

    res.status(200).json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    if (error instanceof Error) {
      next(new ErrorHandler(500, error.message));
    } else {
      next(new ErrorHandler(500, "Internal Server Error"));
    }
  }
};

interface UpdateCandidateBody {
  username?: string;
  email?: string;
  contact?: string;
  yearOfExperience?: string;
  noticePeriod?: string;
  currentLocation?: string;
  skills?: string[];
  status?:
    | "open_to_hire"
    | "not_open_to_hire"
    | "active"
    | "inactive"
    | "on_vacation";
  experience?: [
    {
      companyName: string;
      title: string;
      joiningDate: string;
      leavingDate: string;
      locationType: "remote" | "hybrid" | "inoffice";
      jobType: "fulltime" | "internship" | "contract";
      description: string;
    }
  ];
  education?: [
    {
      institution: string;
      degree: string;
      field: string;
      graduationYear: string;
      score: number;
    }
  ];
}
interface AuthRequest extends Request {
  user: {
    id: mongoose.Types.ObjectId;
    role?: string;
  };
}
export const updateCandidate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const candidateId = req.user.id;
    const updateData: UpdateCandidateBody = req.body;

    // Validate the update data
    if (Object.keys(updateData).length === 0) {
      throw new ErrorHandler(400, "No update data provided");
    }

    // Check if candidate exists
    const existingCandidate = await Candidate.findById(candidateId);
    if (!existingCandidate) {
      throw new ErrorHandler(404, "Candidate not found");
    }

    // If email is being updated, check if it's already in use
    if (updateData.email && updateData.email !== existingCandidate.email) {
      const emailExists = await Candidate.findOne({ email: updateData.email });
      if (emailExists) {
        throw new ErrorHandler(400, "Email already in use");
      }
    }

    // Validate skills array if provided
    if (updateData.skills) {
      if (!Array.isArray(updateData.skills)) {
        throw new ErrorHandler(400, "Skills must be an array");
      }
      if (
        updateData.skills.some((skill: string) => typeof skill !== "string")
      ) {
        throw new ErrorHandler(400, "All skills must be strings");
      }
    }

    // Validate experience array if provided
    if (updateData.experience) {
      if (!Array.isArray(updateData.experience)) {
        throw new ErrorHandler(400, "Experience must be an array");
      }
      updateData.experience.forEach(
        (exp: {
          companyName: string;
          title: string;
          joiningDate: string;
          leavingDate: string;
          locationType: "remote" | "hybrid" | "inoffice";
          jobType: "fulltime" | "internship" | "contract";
          description: string;
        }) => {
          if (!exp.companyName || !exp.title || !exp.joiningDate) {
            throw new ErrorHandler(400, "Invalid experience data structure");
          }
        }
      );
    }

    // Validate education array if provided
    if (updateData.education) {
      if (!Array.isArray(updateData.education)) {
        throw new ErrorHandler(400, "Education must be an array");
      }
      updateData.education.forEach(
        (edu: {
          institution: string;
          degree: string;
          field: string;
          graduationYear: string;
          score: number;
        }) => {
          if (!edu.institution || !edu.degree || !edu.graduationYear) {
            throw new ErrorHandler(400, "Invalid education data structure");
          }
          if (
            typeof edu.score !== "number" ||
            edu.score < 0 ||
            edu.score > 100
          ) {
            throw new ErrorHandler(
              400,
              "Score must be a number between 0 and 100"
            );
          }
        }
      );
    }

    // Update the candidate
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      candidateId,
      {
        $set: updateData,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
        select: "-password -resetPasswordToken -resetPasswordExpires",
      }
    );

    if (!updatedCandidate) {
      throw new ErrorHandler(500, "Failed to update candidate");
    }

    // Format the response
    // const formattedResponse = {
    //   id: updatedCandidate._id,
    //   username: updatedCandidate.username,
    //   email: updatedCandidate.email,
    //   contact: updatedCandidate.contact,
    //   yearOfExperience: updatedCandidate.yearOfExperience,
    //   noticePeriod: updatedCandidate.noticePeriod,
    //   currentLocation: updatedCandidate.currentLocation,
    //   skills: updatedCandidate.skills,
    //   status: updatedCandidate.status,
    //   experience: updatedCandidate.experience,
    //   education: updatedCandidate.education,
    //   jobsApplied: updatedCandidate.jobsApplied,
    // };

    res.status(200).json({
      success: true,
      message: "Candidate updated successfully",
      data: updatedCandidate,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      next(new ErrorHandler(400, "Validation Error: " + error.message));
    } else if (error instanceof Error) {
      next(error);
    } else {
      next(new ErrorHandler(500, "Internal Server Error"));
    }
  }
};
