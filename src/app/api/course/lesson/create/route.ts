import connectMongoDb from "../../../../../../utils";
import { Lesson } from "../../../../../../models";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  await connectMongoDb();
  const searchParams = new URL(req.url).searchParams;
  const id = searchParams.get("id");
  const data = await req.json();

  if (data.videoPath.trim() === "") {
    return NextResponse.json(
      { message: "Video mavjud emas!" },
      { status: 400 }
    );
  }

  try {
    const lesson = await Lesson.create({ ...data, courseId: id });

    return NextResponse.json({ lesson, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
