import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    readytorelocate: { type: Boolean, default: false },
    resume: { type: String },
    coverletter: { type: String },

    messages: [
      {
        candimessagedBy: { type: String, enum: ["candidate", "recruiter"] },
        date: { type: Date },
        time: { type: String },
        location: { type: String },
        status: { type: String, enum: ["sent", "viewed", "delivered"] },
      },
    ],
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "hired", "viewed"],
      default: "applied",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
