import mongoose, { Document } from "mongoose";

interface IEmailTemplate extends Document {
  name: string;
  subject: string;
  body: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EmailTemplateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IEmailTemplate>(
  "EmailTemplate",
  EmailTemplateSchema
);
