import { NextResponse } from "next/server";
import { User } from "../../../../../../models";
import connectMongoDb from "../../../../../../utils";

export async function DELETE(req: Request) {
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

    if (!user?.purchasedCourses.includes(courseId)) {
      return NextResponse.json(
        { message: "Bunday kurs xardilarda mavjud emas!" },
        { status: 400 }
      );
    }

    user.purchasedCourses = user.purchasedCourses.filter(
      (id: string) => id.toString() !== courseId
    );

    await user.save();

    return NextResponse.json(
      { message: "Kurs xaridlardan o'chirildi!", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
