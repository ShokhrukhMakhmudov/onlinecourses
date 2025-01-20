import { NextResponse } from "next/server";
import { User } from "../../../../../models";
import connectMongoDb from "../../../../../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectMongoDb();

  const data = await req.json();

  if (data.newPassword.trim()) {
    const existingUser = await User.findById(data._id);

    const hashedPassword = await bcrypt.compare(
      data.password,
      existingUser.password
    );

    if (hashedPassword) {
      const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
      const user = await User.findByIdAndUpdate(data._id, {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        dateOfBirth: data.dateOfBirth,
        password: hashedNewPassword,
        gender: data.gender,
      });

      const token = jwt.sign(
        { userId: existingUser._id.toString() },
        process.env.JWT_SECRET as string,
        { expiresIn: "4h" }
      );

      return NextResponse.json(
        {
          message: "Ma'lumotlar muvaffaqiyatli o'zgartirildi!",
          user,
          token,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Parol noto'g'ri kiritildi!",
        },
        { status: 400 }
      );
    }
  }
  try {
    const user = await User.findByIdAndUpdate(data._id, {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
    });
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "4h" }
    );

    return NextResponse.json(
      {
        user,
        token,

        message: "Ma'lumotlar muvaffaqiyatli o'zgartirildi!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
