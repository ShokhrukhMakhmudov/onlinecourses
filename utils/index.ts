"use server";
import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "courses",
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Could not connect to MongoDB");
  }
};

export default connectMongoDb;
