import { ILesson } from "@/types";
import Link from "next/link";
import React, { useState } from "react";

const LessonReorder = ({
  initialLessons,
  handleOpenVideoModal,
}: {
  initialLessons: ILesson[];
  handleOpenVideoModal: (videoPath: string, title: string) => void;
}) => {
  const [lessons, setLessons] = useState(initialLessons);
  console.log(lessons);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Начало перетаскивания
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  // Разрешение сброса
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // Нужно для разрешения сброса
  };

  // Сброс элемента на новое место
  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;

    const updatedLessons = Array.from(lessons);
    const [draggedItem] = updatedLessons.splice(draggedIndex, 1); // Удаляем перетаскиваемый элемент
    updatedLessons.splice(index, 0, draggedItem); // Вставляем его на новое место

    // Обновляем порядок
    updatedLessons.forEach((lesson, idx) => {
      lesson.order = idx + 1; // Присваиваем порядок
    });

    setLessons(updatedLessons);
    setDraggedIndex(null); // Сбрасываем состояние
  };

  // Сохранение порядка
  const handleSave = async () => {
    try {
      await fetch("/api/course/lesson/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderedLessons: lessons }),
      });
      alert("Tartib saqlandi!");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  return (
    <div>
      <ul className="px-2">
        {lessons.map((lesson, index) => (
          <li
            draggable // Включаем возможность перетаскивания
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            key={lesson._id.toString()}
            className="border-2 cursor-move border-gray-300 p-4 mb-4 rounded-md flex items-center">
            <span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="20px"
                width="20px"
                xmlns="http://www.w3.org/2000/svg">
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
            </span>
            <h3 className="text-lg font-semibold me-auto">{lesson.title}</h3>

            <Link
              href={`/admin/dashboard/courses/lessons/edit/${lesson._id.toString()}`}
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
          </li>
        ))}
      </ul>
      <button onClick={handleSave} className="btn btn-primary mt-3">
        Tartibni saqlash
      </button>
    </div>
  );
};

export default LessonReorder;
