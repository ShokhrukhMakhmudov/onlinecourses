import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/videos");

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) {
    return new Response(JSON.stringify({ error: "Fayl topilmadi!" }), {
      status: 400,
    });
  }

  const filePath = path.join(uploadDir, file.name);

  if (fs.existsSync(filePath)) {
    const existingFilePath = filePath
      .slice(filePath.indexOf("videos"))
      .replaceAll("\\", "/");
    return new Response(JSON.stringify({ path: existingFilePath }), {
      status: 200,
    });
  }
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  fs.writeFile(filePath, fileBuffer, (err) => {
    if (err) {
      return new Response(
        JSON.stringify({ error: "Fayl yuklashda xatolik yuz berdi!" }),
        {
          status: 500,
        }
      );
    }
  });

  return new Response(
    JSON.stringify({
      path: filePath.slice(filePath.indexOf("videos")).replaceAll("\\", "/"),
    }),
    { status: 200 }
  );
}
