"use client";
import Loader from "@/components/Loader";
import VideoPlayer from "@/components/VideoPlayer";
import { ICourse, ILesson } from "@/types";
import { useState, useEffect, memo } from "react";

const MemoVideoPlayer = memo(VideoPlayer);
export default function page({ params: { id } }: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [lessons, setLessons] = useState<ILesson[] | []>([]);
  const [activeLesson, setActiveLesson] = useState<number>(0);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`/api/course/lesson/get?courseId=${id}`);
        const data = await response.json();
        if (data.success) {
          setLessons(data.lessons);
          setCourse(data.course);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
      setLoading(false);
    };
    fetchLessons();
  }, [id]);
  console.log(
    `videos/hls/${lessons[activeLesson]?._id.toString()}/playlist.m3u8`
  );

  if (loading) return <Loader />;
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-start gap-5 justify-between">
          <div className="w-2/3">
            <h2 className="text-3xl font-semibold mb-4">{course?.title}</h2>
            {lessons[activeLesson]?._id.toString() && (
              <MemoVideoPlayer
                id={`${lessons[activeLesson]?._id.toString()}`}
                poster={course?.cover}
              />
            )}

            <div className="mt-6">
              <h3 className="text-2xl border-b-2 border-collapse pb-2 mb-2">
                Dars haqida
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: lessons[activeLesson]?.description,
                }}></div>
            </div>
          </div>
          <div className="w-1/3 card p-4">
            <h3 className="text-2xl border-b-2 border-collapse pb-2 mb-2">
              Darslar
            </h3>
            <ul className="flex flex-col gap-3 ps-0">
              {lessons.map((lesson, index) => (
                <li
                  key={lesson._id.toString()}
                  className={`${
                    activeLesson === index
                      ? "bg-primary text-white"
                      : "text-secondary"
                  } p-2 ps-4 cursor-pointer hover:bg-base-content/20 hover:text-primary rounded-md text-xl`}
                  onClick={() => setActiveLesson(index)}>
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
