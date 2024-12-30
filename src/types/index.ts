import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: "male" | "female";
  purchasedCourses: string[];
  cart: string[];
  isVerified: boolean;
  createdAt: Date;
}

export interface IAdmin extends Document {
  email: string;
  password: string;
}

export interface LottieAnimationProps {
  type?: "success" | "error";
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
