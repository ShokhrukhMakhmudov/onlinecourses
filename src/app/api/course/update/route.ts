import { NextResponse } from "next/server";
import { Course } from "../../../../../models";
import connectMongoDb from "../../../../../utils";

export async function POST(req: Request) {
  await connectMongoDb();

  const data = await req.json();

  try {
    const course = await Course.findByIdAndUpdate(data._id, data);

    return NextResponse.json({ course, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
