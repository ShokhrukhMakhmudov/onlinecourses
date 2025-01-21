import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: "male" | "female";
  purchasedCourses: ICourse[] | [];
  cart: ICourse[] | [];
  isVerified: boolean;
  createdAt: Date;
}

export interface ILesson {
  _id: typeof Schema.ObjectId;
  courseId: string;
  title: string;
  description: string;
  videoPath: string;
  order?: number;
}
export interface ICourse extends Document {
  title: string;
  author: string;
  description: string;
  duration: number;
  price: number;
  newPrice: number | "";
  language: "uz" | "ru" | "en";
  cover: string;
  status: boolean;
  lessons: [ILesson];
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
