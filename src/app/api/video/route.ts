import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import generateHLS from "../methods/GenerateHls";

const VIDEO_DIR = path.join(process.cwd(), "public/videos/hls");
const VIDEO_INPUT_PATH = path.join(process.cwd(), "public/video.mp4"); // Исходное видео
const OUTPUT_DIR = path.join(process.cwd(), "public/videos/hls"); // Директория для сегментов

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");
  const token = searchParams.get("token");

  if (!filename) {
    return new NextResponse("Filename is required", { status: 400 });
  }

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
    "Content-Type": filename.endsWith(".m3u8")
      ? "application/vnd.apple.mpegurl"
      : "video/mp2t",
  };

  return new Response(fileStream as any, {
    status: 206,
    headers,
  });
}
