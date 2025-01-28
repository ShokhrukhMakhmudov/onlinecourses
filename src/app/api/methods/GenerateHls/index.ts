import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

export default async function generateHLS(
  videoPath: string,
  outputDir: string
) {
  return new Promise<void>((resolve, reject) => {
    // Убедитесь, что директория для сегментов существует
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    ffmpeg(videoPath)
      .outputOptions([
        "-preset veryfast", // Быстрое кодирование
        "-g 60", // Частота ключевых кадров
        "-sc_threshold 0", // Отключение авторазбиения сегментов
        "-hls_time 10", // Длина сегмента в секундах
        "-hls_playlist_type vod", // Тип плейлиста
        `-hls_segment_filename ${path.join(outputDir, "segment_%03d.ts")}`, // Шаблон имен сегментов
      ])
      .output(path.join(outputDir, "playlist.m3u8")) // Имя плейлиста
      .on("start", (commandLine) => {
        console.log(`Запуск команды FFmpeg: ${commandLine}`);
      })
      .on("progress", (progress) => {
        console.log(`Обработано: ${progress.percent?.toFixed(2)}%`);
      })
      .on("end", () => {
        console.log("HLS-сегменты успешно сгенерированы.");
        resolve();
      })
      .on("error", (err) => {
        console.error("Ошибка при генерации HLS-сегментов:", err);
        reject(err);
      })
      .setFfmpegPath("ffmpeg") // Путь к FFmpeg, если нужно явно указать
      .addOption("-y") // <--- Флаг перезаписи существующих файлов
      .run();
  });
}
