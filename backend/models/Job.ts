import mongoose, { Document, Schema } from "mongoose";

interface ISalary {
  min: number; // Changed to required
  max: number; // Changed to required
  rate: string; // Changed to required
}

interface IHiredCandidate {
  candidate: Schema.Types.ObjectId;
  date: Date;
  time: string;
}

interface ISkills {
  mustHave: string[]; // Changed to required
  niceToHave?: string[];
  addOn?: string[];
}

interface IEducation {
  mustHave: string; // Changed to required
  niceToHave?: string;
  addOn?: string;
}

interface IIndustryPreferences {
  totalExperience: number; // Changed to required
  skillsExperience: number; // Changed to required
  numberOfYears: number; // Changed to required
}

interface IOtherDetails {
  areaPreference?: string;
  joiningPeriod?: string;
}

interface ICertification {
  name: string;
  mandatory: boolean;
}

interface IJob extends Document {
  // Basic fields
  title: string;
  company: string;
  location: string;
  description?: string;
  requiredCandidate?: number;
  skills?: string[];
  experience: number;
  totalApplications: number;
  postDate: Date;
  type:
    | "fulltime"
    | "internship"
    | "contract"
    | "part time"
    | "fresher"
    | "temporary"
    | "volunteer";
  locationType: "hybrid" | "inoffice" | "remote";
  salary: ISalary;
  recruiter?: Schema.Types.ObjectId;
  status: "open" | "closed";
  hiredCandidates?: IHiredCandidate[];
  createdAt: Date;
  updatedAt: Date;

  // Frontend fields
  hiringFor: "company" | "clients";
  detailedSkills: ISkills;
  education: IEducation;
  industryPreferences: IIndustryPreferences;
  otherDetails?: IOtherDetails;
  certifications?: ICertification[];
  canRelocate: boolean;
  contactPreference: "whatsapp" | "email";
}

const JobSchema = new Schema<IJob>(
  {
    // Basic fields - required ones from frontend
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "fulltime",
        "internship",
        "contract",
        "part time",
        "fresher",
        "temporary",
        "volunteer",
      ],
      required: true,
    },
    locationType: {
      type: String,
      enum: ["hybrid", "inoffice", "remote"],
      required: true,
    },
    hiringFor: {
      type: String,
      enum: ["company", "clients"],
      required: true,
    },

    // Optional fields with defaults
    description: { type: String },
    requiredCandidate: { type: Number },
    skills: { type: [String] },
    experience: { type: Number, default: 0 },
    totalApplications: { type: Number, default: 0 },
    postDate: { type: Date, default: Date.now },

    // Salary structure - all required per frontend
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      rate: {
        type: String,
        enum: ["Per Month", "Per Year"],
        required: true,
      },
    },

    // Backend-managed fields
    recruiter: {
      type: Schema.Types.ObjectId,
      ref: "Recruiter",
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    hiredCandidates: [
      {
        candidate: {
          type: Schema.Types.ObjectId,
          ref: "Candidate",
        },
        date: {
          type: Date,
          default: Date.now,
        },
        time: {
          type: String,
        },
      },
    ],

    // Detailed skills structure
    detailedSkills: {
      mustHave: { type: [String], required: true },
      niceToHave: { type: [String] },
      addOn: { type: [String] },
    },

    // Education structure
    education: {
      mustHave: { type: String, required: true },
      niceToHave: { type: String },
      addOn: { type: String },
    },

    // Industry preferences - all required per frontend
    industryPreferences: {
      totalExperience: { type: Number, required: true },
      skillsExperience: { type: Number, required: true },
      numberOfYears: { type: Number, required: true },
    },

    // Other details - remains optional
    otherDetails: {
      areaPreference: { type: String },
      joiningPeriod: { type: String },
    },

    // Certifications - remains optional
    certifications: [
      {
        name: { type: String },
        mandatory: { type: Boolean, default: false },
      },
    ],

    // Additional preferences
    canRelocate: {
      type: Boolean,
      required: true,
    },
    contactPreference: {
      type: String,
      enum: ["whatsapp", "email"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IJob>("Job", JobSchema);
