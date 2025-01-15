import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    experience: { type: Number, default: 0 },
    skills: { type: [String] },
    preferredLocation: { type: String },
    resume: { type: String }, // URL to the uploaded resume
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Candidate", CandidateSchema);
