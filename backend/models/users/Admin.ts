import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Interface for Admin
export interface Admin extends Document {
  username: string;
  email?: string;
  password?: string;
  googleId?: string;
  githubId?: string;
  linkedinId?: string;
  notification: {
    title: string;
    message: string;
    time: Date;
    status: "read" | "unread";
  }[];
  permissions: string[]; // Permissions field for admins
  comparePassword(candidatePassword: string): Promise<boolean>;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

// Admin schema definition
const adminSchema: Schema<Admin> = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    googleId: { type: String },
    githubId: { type: String },
    linkedinId: { type: String },
    notification: [
      {
        title: String,
        message: String,
        time: Date,
        status: { type: String, enum: ["read", "unread"] },
      },
    ],
    permissions: [{ type: String, default: ["admin"] }], // Admin specific permissions as array
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Pre-save hook to hash password
adminSchema.pre<Admin>("save", async function (next) {
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
adminSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<Admin>("Admin", adminSchema);
