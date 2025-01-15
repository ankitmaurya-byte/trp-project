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
    salary: { min: { type: Number }, max: { type: Number } },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
