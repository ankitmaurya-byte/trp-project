import mongoose, { Document } from "mongoose";

interface IApplication extends Document {
  job: mongoose.Types.ObjectId;
  candidate: mongoose.Types.ObjectId;
  readytorelocate: boolean;
  resume?: string;
  coverletter?: string;
  recruiter: mongoose.Types.ObjectId;
  messages: {
    candimessagedBy: "candidate" | "recruiter";
    date: Date;
    time: string;
    location: string;
    status: "sent" | "viewed" | "delivered";
  }[];
  status: "applied" | "shortlisted" | "rejected" | "hired" | "viewed";
  notes?: string;
}

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

export default mongoose.model<IApplication>("Application", ApplicationSchema);
