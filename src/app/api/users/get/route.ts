import { NextResponse } from "next/server";
import { User } from "../../../../../models";
import connectMongoDb from "../../../../../utils";

export async function GET(req: Request) {
  await connectMongoDb();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const user = await User.findById(id)
        .populate("purchasedCourses")
        .populate("cart");

      return NextResponse.json(user, { status: 200 });
    }

    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
