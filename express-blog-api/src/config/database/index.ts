import mongoose from "mongoose";
import { MONGO_URI } from "../env";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {});

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};