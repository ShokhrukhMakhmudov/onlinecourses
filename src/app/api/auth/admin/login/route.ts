import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongoDb from "../../../../../../utils";
import { Admin } from "../../../../../../models";

export async function POST(req: Request) {
  await connectMongoDb();

  const { email, password } = await req.json();

  try {
    const existingUser = await Admin.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "Bunday foydalanuvchi mavjud emas!",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (hashedPassword) {
      const token = jwt.sign(
        { userId: existingUser._id.toString() },
        process.env.JWT_SECRET as string,
        { expiresIn: "4h" }
      );
      return NextResponse.json(
        { message: "Siz tizimga muvofaqiyatli kirdingiz!", token },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: "Parol notog'ri!",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Serverda xatolik", error },
      { status: 500 }
    );
  }
}
