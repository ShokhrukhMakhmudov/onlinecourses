"use client";

import VideoUpload from "@/components/VideoUpload";
import dynamic from "next/dynamic";
import React, { FormEvent, memo, use, useEffect, useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

const MemoEditor = memo(Editor);
export default function page({
  params: { lessonId },
}: {
  params: { lessonId: string };
}) {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    videoPath: string;
  }>({
    title: "",
    description: "Dars to'g'risida ma'lumot",
    videoPath: "",
  });
  console.log(formData.videoPath);
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoPath: "",
    title: "",
  });
  const handleDescChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleGetVideoPath = (videoPath: string) => {
    setFormData((prev) => ({ ...prev, videoPath }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const req = await fetch(`/api/course/lesson/create`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (req.ok) {
        const res = await req.json();
        alert("Dars muvaffaqiyatli yaratildi!");
      } else throw new Error("Dars yaratishda xatolik yuz berdi!");
    } catch (error) {
      alert("Dars yaratishda xatolik yuz berdi!");
    }
  };

  useEffect(() => {
    async function getCourses() {
      try {
        const req = await fetch(`/api/course/lesson/get?id=${lessonId}`, {
          cache: "no-cache",
        });
        const res = await req.json();

        if (res?.success) {
          setFormData(res.lesson);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        alert(error);
        console.error("Error fetching courses:", error);
      }
    }
    getCourses();
  }, []);

  const handleOpenVideoModal = (videoPath: string, title: string) => {
    setVideoModal({
      isOpen: true,
      videoPath,
      title,
    });
  };
  return (
    <>
      <div className="bg-white p-4 h-full overflow-y-hidden flex flex-col">
        <div className="flex items-center justify-between border-b-2 border-gray-300 pb-2 mb-5">
          <h2 className="text-xl font-semibold">Dars (Tahrirlash)</h2>
        </div>
        <form
          className="needs-validation peer h-full flex flex-col gap-y-4"
          onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="label label-text" htmlFor="title">
                Sarlavha
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Dars sarlavhasi"
                className="input"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="flex items-end gap-3">
              {/* <label className="label label-text" htmlFor="videoFile">
              Video fayl
            </label>
            <div className="flex items-center">
              <input
                id="videoFile"
                type="file"
                className="block text-sm file:uppercase file:btn file:btn-primary file:me-3"
                aria-label="file-input"
              />
              <div className="flex w-52 flex-col gap-1">
                <span className="progress-label ms-[calc(25%-1.25rem)]">
                  25%
                </span>
                <div
                  className="progress h-2"
                  role="progressbar"
                  aria-label="50% Progressbar"
                  aria-valuenow={25}
                  aria-valuemin={0}
                  aria-valuemax={100}>
                  <div className="progress-bar w-1/4 bg-primary"></div>
                </div>
              </div>
            </div> */}
              {formData.videoPath && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    handleOpenVideoModal(formData.videoPath, formData.title)
                  }>
                  <span className="icon-[tabler--video]" />
                  Video
                </button>
              )}
              <VideoUpload handleGetVideoPath={handleGetVideoPath} />
            </div>
          </div>
          <div className="w-full h-full flex flex-col overflow-y-auto vertical-scrollbar">
            <label className="label label-text">Dars haqida</label>
            <div className="flex-grow-[1] border-2 border-slate-300 flex flex-col">
              <MemoEditor
                handleDescChange={handleDescChange}
                description={formData.description}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              name="submitButton"
              className="btn btn-primary">
              O'zgartirish
            </button>
          </div>
        </form>
      </div>
      {videoModal.isOpen && (
        <div
          id="middle-center-modal"
          className="overlay modal overlay-open:opacity-100 modal-middle modal-center open opened"
          role="dialog"
          style={{ zIndex: 100 }}>
          <div className="open opened modal-dialog max-w-5xl overlay-open:opacity-100">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">{videoModal.title}</h3>
                <button
                  type="button"
                  className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                  onClick={() =>
                    setVideoModal({ isOpen: false, videoPath: "", title: "" })
                  }>
                  <span className="icon-[tabler--x] size-4"></span>
                </button>
              </div>
              <div className="modal-body">
                <video
                  controls
                  controlsList="nodownload"
                  src={`/${videoModal.videoPath}`}
                  width="100%"
                  height="480"></video>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
