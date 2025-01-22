"use client";
import Loader from "@/components/Loader";
import { ICourse } from "@/types";
import { useState, useEffect, ChangeEvent } from "react";

export default function AddCourseModal({
  close,
  userId,
}: {
  close: () => void;
  userId: string | null;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[] | []>([]);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [error, setError] = useState<{ message: string; status: boolean }>({
    message: "",
    status: false,
  });

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

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedCourse = courses.find(
      (course) => course._id === selectedValue
    );
    if (!selectedCourse) return;

    if (error.status) {
      setError({ message: "", status: false });
    }

    setSelectedCourse(selectedCourse);
  };

  const handleAddtoPurchase = async () => {
    if (!selectedCourse) {
      setError({ message: "Kursni tanlang!", status: true });
      return;
    }
    setLoading(true);
    try {
      const req = await fetch(`/api/users/purchase/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, courseId: selectedCourse._id }),
      });
      const res = await req.json();
      if (req.status === 200) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert((error as Error).message || "Xatolik yuz berdi");
    }

    setLoading(false);
    close();
    window.location.reload();
  };

  if (loading) return <Loader />;

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
              <div>
                <label
                  className="label label-text text-lg"
                  htmlFor="favorite-simpson">
                  Kursni tanlang:
                </label>
                <select
                  className="select w-full text-lg mb-2"
                  id="favorite-simpson"
                  onChange={handleSelectChange}
                  value={(selectedCourse?._id || "") as string}
                  required>
                  <option value="" disabled>
                    Kursni tanlang
                  </option>
                  {courses.map((course) => (
                    <option
                      key={course._id as string}
                      value={course._id as string}>
                      {course.title}
                    </option>
                  ))}
                </select>
                {error.status && (
                  <p className="text-white px-4 py-2 bg-error">
                    {error?.message || "Xatolik yuz berdi!"}
                  </p>
                )}
                <label className="label label-text text-lg">
                  Tanlangan kurs:
                </label>
                {selectedCourse && (
                  <>
                    <figure className="relative">
                      <img
                        width={"100%"}
                        height={"auto"}
                        src={selectedCourse.cover}
                        alt="Kurs rasmi"
                      />
                      <div className="absolute top-3 right-3">
                        {selectedCourse.status ? (
                          <span className="badge badge-success badge-lg">
                            Faol
                          </span>
                        ) : (
                          <span className="badge badge-error badge-lg">
                            Faol emas
                          </span>
                        )}
                      </div>
                    </figure>
                    <div>
                      <p className="my-2 text-lg">
                        Ustoz: {selectedCourse.author}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                disabled={loading}
                type="button"
                onClick={handleAddtoPurchase}
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
