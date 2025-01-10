import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface GUser extends Document {
  username: string;
  googleId?: string;
  matchPassword(password: string): Promise<boolean>;
}
const GoogleUserSchema: Schema<GUser> = new Schema({
  username: { type: String, required: true },
  googleId: { type: String },
});
const GoogleUser: Model<GUser> = mongoose.model<GUser>(
  "GoogleUser",
  GoogleUserSchema
);

export default GoogleUser;
