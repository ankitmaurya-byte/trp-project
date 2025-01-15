import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Interface for Candidate
export interface Candidate extends Document {
  username: string;
  email?: string;
  password?: string;
  googleId?: string;
  githubId?: string;
  linkedinId?: string;
  yearOfExperience?: string;
  noticePeriod?: string;
  currentLocation?: string;
  skills: string[];
  notification: {
    title: string;
    message: string;
    time: Date;
    status: "read" | "unread";
  }[];
  status:
    | "open_to_hire"
    | "not_open_to_hire"
    | "active"
    | "inactive"
    | "on_vacation";
  resume?: string;
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
  jobsApplied: Schema.Types.ObjectId[]; // Referencing Job model
  messages: Schema.Types.ObjectId[]; // Referencing Message model
  comparePassword(candidatePassword: string): Promise<boolean>;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

// Candidate schema definition
const candidateSchema: Schema<Candidate> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    linkedinId: { type: String },
    yearOfExperience: { type: String },
    noticePeriod: { type: String },
    currentLocation: { type: String },
    skills: [{ type: String }],
    notification: [
      {
        title: String,
        message: String,
        time: Date,
        status: { type: String, enum: ["read", "unread"] },
      },
    ],
    status: {
      type: String,
      enum: [
        "open_to_hire",
        "not_open_to_hire",
        "active",
        "inactive",
        "on_vacation",
      ],
    },
    resume: { type: String },
    experience: [
      {
        companyName: { type: String },
        title: { type: String },
        joiningDate: { type: String },
        leavingDate: { type: String },
        locationType: { type: String, enum: ["remote", "hybrid", "inoffice"] },
        jobType: { type: String, enum: ["fulltime", "internship", "contract"] },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        graduationYear: { type: String },
        score: { type: Number },
      },
    ],
    jobsApplied: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
candidateSchema.pre<Candidate>("save", async function (next) {
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
candidateSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<Candidate>("Candidate", candidateSchema);
