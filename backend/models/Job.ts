import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    requirements: { type: [String] },
    skills: { type: [String] },
    experience: { type: Number, default: 0 },
    totalApplications: { type: Number, default: 0 },
    postDate: { type: Date, default: Date.now },
    type: { type: String, enum: ["fulltime", "internship", "contract"] },
    locationType: { type: String, enum: ["hybrid", "inoffice", "remote"] },
    salary: { min: { type: Number }, max: { type: Number } },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
