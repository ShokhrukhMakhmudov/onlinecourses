"use client";
import { useState } from "react";

const VideoUpload = ({
  handleGetVideoPath,
}: {
  handleGetVideoPath: (videoPath: string) => void;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Iltimos faylni tanlang!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const req = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const res = await req.json();
      if (req.ok) {
        handleGetVideoPath(res.path);
        alert("Fayl yuklandi!");
      } else {
        alert("Fayl yuklashda xatolik yuz berdi: " + res.error);
      }
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      alert("Fayl yuklashda xatolik yuz berdi:" + error);
    }

    setLoading(false);
  };

  return (
    <div className="">
      <label className="label label-text" htmlFor="videoFile">
        Video fayl
      </label>
      <div className="flex items-center gap-2">
        <input
          id="videoFile"
          type="file"
          onChange={handleFileChange}
          className="block text-sm file:uppercase file:btn file:btn-primary file:me-3"
          aria-label="file-input"
          disabled={loading}
        />
        <button
          type="button"
          onClick={handleFileUpload}
          disabled={loading}
          className="btn btn-primary ">
          Yuklash
          {loading && (
            <span className="loading loading-spinner loading-sm text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoUpload;
