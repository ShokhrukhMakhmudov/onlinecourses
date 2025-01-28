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
    if (data.videoPath.includes("videos/hls")) {
      const lesson = await Lesson.findByIdAndUpdate(id, data);
      return NextResponse.json({ lesson, success: true }, { status: 200 });
    }

    const videoReq = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/video",
      {
        method: "POST",
        body: JSON.stringify({
          videoPath: data.videoPath,
          id: id,
        }),
      }
    );

    const videoRes = await videoReq.json();

    if (!videoRes?.success) {
      return NextResponse.json({ message: videoRes }, { status: 400 });
    }

    const lesson = await Lesson.findByIdAndUpdate(id, {
      ...data,
      videoPath: `videos/hls/${id}`,
    });

    return NextResponse.json({ lesson, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
