import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import generateHLS from "../methods/GenerateHls";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!id) {
    return new NextResponse("Filename is required", { status: 400 });
  }

  const VIDEO_DIR = path.join(process.cwd(), `public/videos/hls/${id}`);

  const filePath = path.join(VIDEO_DIR, "playlist.m3u8");
  // await generateHLS(VIDEO_INPUT_PATH, OUTPUT_DIR)
  //   .then(() => console.log("Процесс завершен."))
  //   .catch((error) => console.error("Процесс завершился с ошибкой:", error));

  // if (!fs.existsSync(filePath)) {
  //   return new NextResponse("File not found", { status: 404 });
  // }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.get("range") || `bytes=0-${fileSize - 1}`;

  const [start, end] = range
    .replace(/bytes=/, "")
    .split("-")
    .map(Number);
  const adjustedEnd = end || fileSize - 1;

  const chunkSize = adjustedEnd - start + 1;
  const fileStream = fs.createReadStream(filePath, { start, end: adjustedEnd });

  const headers = {
    "Content-Range": `bytes ${start}-${adjustedEnd}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize.toString(),
    "Content-Type": "playlist.".endsWith(".m3u8")
      ? "application/vnd.apple.mpegurl"
      : "video/mp2t",
  };

  return new Response(fileStream as any, {
    status: 206,
    headers,
  });
}

export async function POST(req: NextRequest) {
  const { videoPath, id } = await req.json();

  const VIDEO_DIR = path.join(process.cwd(), `public/videos/hls/${id}`);
  const VIDEO_INPUT_PATH = path.join(process.cwd(), `public/${videoPath}`); // Исходное видео
  const OUTPUT_DIR = path.join(process.cwd(), `public/videos/hls/${id}`); // Директория для сегментов

  // Убедитесь, что папка существует перед запуском
  if (!fs.existsSync(VIDEO_DIR)) {
    fs.mkdirSync(VIDEO_DIR, { recursive: true });
  }

  const filePath = path.join(VIDEO_DIR, "playlist.m3u8");

  try {
    // Запустить процесс генерации HLS
    await generateHLS(VIDEO_INPUT_PATH, OUTPUT_DIR);

    // Проверить, был ли плейлист успешно сгенерирован
    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    return NextResponse.json(
      { success: true, message: "HLS Generated!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при обработке:", error);
    return new NextResponse("Error during HLS generation", { status: 500 });
  }
}
