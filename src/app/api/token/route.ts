// app/api/token/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";
const JWT_EXPIRATION = "3600"; // 1 hour

// Генерация JWT токена
export async function GET() {
  const payload = {
    userId: 1, // Уникальный идентификатор пользователя (можно заменить на реальное значение)
    email: "user@example.com",
  };

  // Генерация токена
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

  return NextResponse.json({ token });
}
