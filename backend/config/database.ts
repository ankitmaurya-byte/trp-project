import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(mongoUri, {});
    console.log("MongoDB connected successfully");
  } catch (err: unknown) {
    console.error(
      `Error: ${err instanceof Error ? err.message : "Unknown error occurred"}`
    );
    process.exit(1);
  }
};

export default connectDB;
