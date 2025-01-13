import { NextResponse } from "next/server";
import { Course } from "../../../../../../models";
import connectMongoDb from "../../../../../../utils";

export async function POST(req: Request) {
  await connectMongoDb();
  const { cart } = await req.json();

  try {
    if (cart) {
      const courses = await Course.find({ _id: { $in: cart } });
      return NextResponse.json({ courses, success: true }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
