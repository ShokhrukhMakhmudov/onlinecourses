import { NextResponse } from "next/server";
import { Lesson } from "../../../../../../models";
import connectMongoDb from "../../../../../../utils";

export async function PUT(req: Request) {
  await connectMongoDb();
  const data = await req.json();
  try {
    const reorderedLessons = await Lesson.bulkWrite(
      data.reorderedLessons.map((lesson: { _id: string; order: number }) => ({
        updateOne: {
          filter: { _id: lesson._id.toString() },
          update: [{ $set: { order: lesson.order } }],
        },
      }))
    );

    return NextResponse.json(
      { reorderedLessons, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
