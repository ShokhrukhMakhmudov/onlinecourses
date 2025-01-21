"use client";
import { ICourse } from "@/types";
import { useState, useEffect } from "react";

export default function AddCourseModal({
  close,
  userId,
}: {
  close: () => void;
  userId: string | null;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[] | []>([]);
  useEffect(() => {
    async function fetchCourses() {
      try {
        const req = await fetch(`/api/course/get`);
        const res = await req.json();

        if (res.success) {
          setCourses(res.courses);
        }
      } catch (error) {}
    }

    fetchCourses();
  }, [userId]);
  return (
    <>
      <div
        id="delete-user-modal"
        className="open modal opacity-100 bg-primary/40">
        <div className="open overlay-animation-target modal-dialog overlay-open:mt-4 opacity-100 overlay-open:duration-500 mt-12 transition-all ease-out">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Kurs qo'shish</h3>
            </div>
            <div className="modal-body">
              <div className="w-96">
                <label className="label label-text" htmlFor="favorite-simpson">
                  Kursni tanlang:
                </label>
                <select className="select" id="favorite-simpson">
                  {courses.map((course) => (
                    <option
                      key={course._id as string}
                      value={course._id as string}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                disabled={loading}
                type="button"
                className="btn btn-primary">
                Qo'shish
                {loading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </button>
              <button
                disabled={loading}
                type="button"
                className="btn btn-soft btn-secondary"
                onClick={close}>
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
