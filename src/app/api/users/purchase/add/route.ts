import { NextResponse } from "next/server";
import { User } from "../../../../../../models";
import connectMongoDb from "../../../../../../utils";

export async function POST(req: Request) {
  await connectMongoDb();

  const { userId, courseId } = await req.json();

  try {
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "Foydalanuvchi mavjud emas" },
        { status: 400 }
      );
    }

    if (user?.purchasedCourses.includes(courseId)) {
      return NextResponse.json(
        { message: "Bunday kurs xaridlarda mavjud!" },
        { status: 400 }
      );
    }

    user.purchasedCourses.push(courseId);

    await user.save();

    return NextResponse.json(
      { message: "Kurs xardiga qo'shildi!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
