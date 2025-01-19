"use client";
import LessonReorder from "@/components/LessonsDnD";
import { ILesson } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page({ params: { id } }: { params: { id: string } }) {
  const [lessons, setLessons] = useState([]);
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoPath: "",
    title: "",
  });

  useEffect(() => {
    async function getLessons() {
      try {
        const res = await fetch(`/api/course/lesson/get?courseId=${id}`, {
          cache: "no-cache",
        });
        const data = await res.json();
        if (data?.success) {
          setLessons(data.lessons);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        alert(error);
        console.error("Error fetching lessons:", error);
      }
    }
    getLessons();
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
        <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4 mb-5">
          <h2 className="text-xl font-semibold">
            Video darsliklar
            {/* (Jami: {courses?.length || 0}) */}
          </h2>

          <Link
            href={`/admin/dashboard/courses/lessons/${id}/add`}
            className="btn btn-primary">
            Dars qo`shish
          </Link>
        </div>
        <div>
          {/* {lessons &&
            lessons.map((lesson: ILesson) => (
              <div
                key={lesson._id.toString()}
                className="border-2 border-gray-300 p-4 mb-4 rounded-md flex items-center">
                <h3 className="text-lg font-semibold me-auto">
                  {lesson.title}
                </h3>
                <Link
                  href={`/admin/dashboard/courses/lessons/${id}/edit/${lesson._id.toString()}`}
                  className="btn btn-primary me-2">
                  <span className="icon-[tabler--pencil]" />
                  Tahrirlash
                </Link>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    handleOpenVideoModal(lesson.videoPath, lesson.title)
                  }>
                  <span className="icon-[tabler--video]" />
                  Video
                </button>
              </div>
            ))} */}

          {!!lessons.length && (
            <LessonReorder
              initialLessons={lessons}
              handleOpenVideoModal={handleOpenVideoModal}
            />
          )}
        </div>
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
