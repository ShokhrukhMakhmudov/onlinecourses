import { promises as fs } from "fs";
import path from "path";
const fileExists = async (filePath: string) => {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
};
export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "Fayl topilmadi!" }), {
        status: 400,
      });
    }

    const uploadDir = path.join(process.cwd(), "public", "courses", "covers");

    const filename = file.name.replace(/\s/g, "");

    let filePath = path.join(uploadDir, filename);

    let counter = 0;
    while (await fileExists(filePath)) {
      const ext = path.extname(filename);
      const baseName = path.basename(filename, ext);
      const uniqueSuffix = `${baseName}_${counter}${ext}`;
      filePath = path.join(uploadDir, uniqueSuffix);
      counter++;
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);

    const publicFilePath = path.join(
      "/courses/covers",
      path.basename(filePath)
    );

    return new Response(
      JSON.stringify({
        path: publicFilePath.replaceAll("\\", "/"),
        success: true,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Fayl yuklashda xatolik!" }), {
      status: 500,
    });
  }
}
