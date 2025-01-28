import { NextResponse } from "next/server";
import { User } from "../../../../../../models";
import connectMongoDb from "../../../../../../utils";
import { ICourse } from "@/types";

export async function GET(req: Request) {
  await connectMongoDb();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const courseId = searchParams.get("courseId");

  try {
    if (courseId) {
      const user = await User.findById(id).populate("purchasedCourses");

      const result = user.purchasedCourses.filter(
        (course: ICourse) => (course._id as object).toString() === courseId
      );
      return NextResponse.json(
        { data: result[0], success: true },
        { status: 200 }
      );
    }
    if (id) {
      const user = await User.findById(id).populate("purchasedCourses");
      return NextResponse.json(
        { data: user.purchasedCourses, success: true },
        { status: 200 }
      );
    }
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
