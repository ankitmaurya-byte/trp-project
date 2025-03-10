import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Interface for Recruiter
export interface Recruiter extends Document {
  username: string;
  email: string;
  password?: string;
  provider?: string;
  providerId?: string;
  linkedinId?: string;
  avatar?: string;
  notification: {
    title: string;
    message: string;
    time: Date;
    status: "read" | "unread";
  }[];
  emailTemplates: {
    template: mongoose.Types.ObjectId;
    folderName: string;
  }[];
  savedcandidates: mongoose.Types.ObjectId[]; // Referencing Candidate model
  company: string; // Company field for recruiters
  jobsPosted: [{ type: Schema.Types.ObjectId; ref: "Job" }]; // Referencing Job model
  contactNumber: number;
  savedSearch: {
    search: string;
    data: string;
    time: Date;
  }[];
  comparePassword(candidatePassword: string): Promise<boolean>;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}
// Recruiter schema definition
const recruiterSchema: Schema<Recruiter> = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, sparse: true },
    contactNumber: { type: Number },
    password: { type: String },
    provider: { type: String },
    providerId: { type: String },
    avatar: { type: String },
    emailTemplates: [
      {
        template: { type: Schema.Types.ObjectId, ref: "EmailTemplate" },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        folderName: { type: String },
      },
    ],
    linkedinId: { type: String },
    company: { type: String },
    jobsPosted: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    savedSearch: [
      {
        search: { type: String },
        data: { type: String },
        time: { type: Date, default: Date.now },
      },
    ],
    notification: [
      { title: String, message: String, time: Date, status: String },
    ],
    savedcandidates: [{ type: Schema.Types.ObjectId, ref: "Candidate" }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
recruiterSchema.pre<Recruiter>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
  } catch (err) {
    next(err as any);
  }
});

// Instance method to compare password
recruiterSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<Recruiter>("Recruiter", recruiterSchema);
