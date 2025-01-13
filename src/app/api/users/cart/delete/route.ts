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

    if (!user?.cart.includes(courseId)) {
      return NextResponse.json(
        { message: "Bunday kurs savatda mavjud emas!" },
        { status: 400 }
      );
    }

    user.cart = user.cart.filter((id: string) => id !== courseId);
    await user.save();

    return NextResponse.json(
      { message: "Kurs savatdan o'chirildi!", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
