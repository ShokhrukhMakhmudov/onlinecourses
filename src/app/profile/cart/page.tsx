"use client";
import CourseItem from "@/components/Courses/CourseItem";
import Loader from "@/components/Loader";
import { useUserStatus } from "@/context/UserContext";
import { ICourse } from "@/types";
import React, { useEffect, useState } from "react";

export default function page() {
  const {
    userStatus: { userData },
  } = useUserStatus();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      if (!userData?.cart.length) {
        setCourses([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("/api/users/cart/get", {
          method: "POST",
          body: JSON.stringify({ cart: userData?.cart }),
        });
        const data = await response.json();
        if (data.success) {
          setCourses(data.courses);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
      setLoading(false);
    }
    fetchCourses();
  }, [userData, userData?.cart.length]);

  if (loading) return <Loader />;

  return (
    <main className="mt-10">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-10">Savatdagi kurslar</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {courses.map((item) => (
            <CourseItem data={item} key={item._id as string} />
          ))}
        </div>
      </div>
    </main>
  );
}
