import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectMongoDb from "../../../../../../utils";
import { Admin } from "../../../../../../models";

export async function POST(req: Request) {
  await connectMongoDb();

  const { token } = await req.json();

  try {
    const status = jwt.verify(token, process.env.JWT_SECRET as string) as {
      adminId: string;
    };

    const admin = await Admin.findById(status.adminId);

    if (!admin) {
      return NextResponse.json(
        { message: "Token eskirgan yoki mavjud emas" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
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
