// backend/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  email?: string;
  password?: string;
  googleId?: string;
  githubId?: string;
  linkedinId?: string;
  role: "admin" | "recruiter" | "candidate";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    linkedinId: { type: String },
    role: {
      type: String,
      enum: ["admin", "recruiter", "candidate"],
      default: "candidate",
    },
  },
  { timestamps: true }
);
// Pre-save hook to hash password
UserSchema.pre<IUser>("save", async function (next) {
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
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
