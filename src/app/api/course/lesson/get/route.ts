import { NextResponse } from "next/server";
import { Course, Lesson } from "../../../../../../models";
import connectMongoDb from "../../../../../../utils";

export async function GET(req: Request) {
  await connectMongoDb();

  const searchParams = new URL(req.url).searchParams;
  const courseId = searchParams.get("courseId");

  const id = searchParams.get("id");

  if (courseId) {
    try {
      const course = await Course.findById(courseId);
      const lessons = await Lesson.find({ courseId: courseId }).sort({
        order: 1,
      });
      return NextResponse.json(
        { lessons, course, success: true },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error, message: "Xatolik yuz berdi!" },
        { status: 500 }
      );
    }
  }

  if (id) {
    try {
      const lesson = await Lesson.findById(id);
      return NextResponse.json({ lesson, success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error, message: "Xatolik yuz berdi!" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Xatolik yuz berdi!" }, { status: 500 });
}
