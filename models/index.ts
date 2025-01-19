import { IUser, IAdmin, ICourse, ILesson } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    purchasedCourses: { type: [String], default: [] },
    cart: { type: [String], default: [], ref: "Course" },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  newPrice: { type: Number },
  language: {
    type: String,
    enum: ["O'zbek", "Русский", "English"],
    required: true,
  },
  cover: { type: String, required: true },
  status: { type: Boolean, default: false },
});

const LessonSchema = new Schema<ILesson>({
  courseId: { type: String, ref: "Course", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoPath: { type: String, required: true },
  order: { type: Number, default: 100 },
});

export const User = models.User || model<IUser>("User", UserSchema);

export const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);

export const Course = models.Course || model<IUser>("Course", CourseSchema);

export const Lesson = models.Lesson || model<ILesson>("Lesson", LessonSchema);
