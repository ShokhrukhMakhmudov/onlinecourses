import { IUser, IAdmin } from "@/types";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    purchasedCourses: { type: [String], default: [] },
    cart: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = models.User || model<IUser>("User", UserSchema);

export const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);
