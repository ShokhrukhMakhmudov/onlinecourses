import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import connectMongoDb from "../../../../../utils";
import { User } from "../../../../../models";

export async function POST(req: Request) {
  await connectMongoDb();
  let userId = null;
  const { fullName, email, password, phoneNumber, dateOfBirth, gender } =
    await req.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Bu e-mail allaqachon ro'yxatdan o'tgan" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      gender,
      isVerified: false,
    });
    userId = newUser._id.toString();

    const token = jwt.sign(
      { userId: newUser._id.toString() },
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
      html: `<h2>Assalomu alaykum, ${newUser.fullName}!</h2>
                 <p>E-mailingizni tasdiqlash uchun linkni bosing:</p>
                 <a href="${process.env.BASE_URL}/auth?token=${token}">Tasdiqlash</a>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        message:
          "Ro'yxatdan muvaffaqiyatli o'tdingiz! E-mailingizni tasdiqlang.",
      },
      { status: 201 }
    );
  } catch (error) {
    await User.findByIdAndDelete(userId);
    return NextResponse.json(
      { message: "Serverda xatolik!", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await connectMongoDb();

  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token mavjud emas" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    await User.findByIdAndUpdate(decoded.userId, { isVerified: true });

    return NextResponse.json(
      { message: "E-mail tasdiqlandi!", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Token eskirgan yoki mavjud emas!", error },
      { status: 400 }
    );
  }
}
