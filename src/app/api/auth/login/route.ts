import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import connectMongoDb from "../../../../../utils";
import { User } from "../../../../../models";

export async function POST(req: Request) {
  await connectMongoDb();

  const { email, password } = await req.json();

  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return NextResponse.json(
        {
          message: "Bunday foydalanuvchi mavjud emas!",
        },
        { status: 400 }
      );
    }

    if (existingUser?.isVerified) {
      const hashedPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (hashedPassword) {
        const token = jwt.sign(
          { userId: existingUser._id.toString() },
          process.env.JWT_SECRET as string,
          { expiresIn: "1h" }
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
    }

    const token = jwt.sign(
      { userId: existingUser._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "E-mailni tasdiqlash",
      html: `<h2>Assalomu alaykum, ${existingUser.fullName}!</h2>
                 <p>E-mailingizni tasdiqlash uchun linkni bosing:</p>
                 <a href="${process.env.BASE_URL}/auth?token=${token}">Tasdiqlash</a>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message:
          "E-mail tasdiqlanmagan! E-mailni tasdiqlash uchun sizga yangi havola yuborildi!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Serverda xatolik", error },
      { status: 500 }
    );
  }
}
