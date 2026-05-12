import mongoose from "mongoose";
import config from "./index.js";

const DB_URL = config.dbUrl;

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error MongoDB connecting: ", error);
    process.exit(1);
  }
};
