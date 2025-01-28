import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectMongoDb from "../../../../../utils";
import { User } from "../../../../../models";

export async function POST(req: Request) {
  await connectMongoDb();

  const { token } = await req.json();

  try {
    const status = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    const user = await User.findById(status.userId);

    if (!user) {
      return NextResponse.json(
        { message: "Token eskirgan yoki mavjud emas" },
        { status: 400 }
      );
    }

    const newToken = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" }
    );
    return NextResponse.json(
      {
        user,
        token: newToken,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Token eskirgan yoki mavjud emas", error },
      { status: 400 }
    );
  }
}
