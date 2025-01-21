"use client";
import CourseItem from "@/components/Courses/CourseItem";
import Loader from "@/components/Loader";
import { useUserStatus } from "@/context/UserContext";
import { ICourse, IUser } from "@/types";
import React, { useEffect, useState } from "react";
import { sendTelegramMessage } from "../../../../utils/queries";

export default function page() {
  const {
    userStatus: { userData },
    deleteFromCart,
  } = useUserStatus();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(userData);

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

  const sendMessage = async (
    data: Omit<IUser, "password">,
    course: ICourse
  ) => {
    setLoading(true);

    const res = await sendTelegramMessage(data, course);

    if (res.success) {
      deleteFromCart(course._id as string);
      alert("Kurs sotib olish uchun so'rov jo'natildi");
    } else {
      alert("Xatolik yuz berdi! Qayta urinib ko'ring");
    }

    setLoading(false);
  };
  if (loading) return <Loader />;

  return (
    <main className="mt-10">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-10">Savatdagi kurslar</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {userData &&
            courses.map((item) => (
              <div className="flex flex-col gap-2" key={item._id as string}>
                <CourseItem data={item} />
                <button
                  className="btn btn-primary rounded-t-none"
                  onClick={() => sendMessage(userData, item)}>
                  Xarid qilish
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
