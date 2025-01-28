"use server";
import mongoose from "mongoose";

let isConnected = false;
const connectMongoDb = async () => {
  if (isConnected) {
    console.log("Используется существующее соединение с MongoDB");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "courses",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Could not connect to MongoDB");
  }
};

export default connectMongoDb;
