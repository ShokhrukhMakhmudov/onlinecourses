import { NextResponse } from "next/server";
import connectMongoDb from "../../../../../utils";
import { User } from "../../../../../models";

export async function DELETE(req: Request) {
  await connectMongoDb();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const user = await User.findByIdAndDelete(id);

      return NextResponse.json(
        { message: "Foydalanuvchi o'chirildi." },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Foydalanuvchi mavjud emas" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
