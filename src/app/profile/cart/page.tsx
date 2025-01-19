"use client";
import CourseItem from "@/components/Courses/CourseItem";
import Loader from "@/components/Loader";
import { useUserStatus } from "@/context/UserContext";
import { ICourse, IUser } from "@/types";
import React, { useEffect, useState } from "react";

export default function page() {
  const {
    userStatus: { userData },
    deleteFromCart,
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

  const sendTelegramMessage = async (data: IUser, course: ICourse) => {
    const text = `
      Kurs sotib olish \nIsmi: ${data.fullName} \nTelefon: ${
      data.phoneNumber
    }\nE-mail: ${data.email}\nKurs nomi: ${course.title}\nKurs narxi: ${
      course?.newPrice ?? course.price
    } so'm
    `;

    const botToken = "7067213755:AAGn3XhFbUX7ZsHcQznhyziDX7aTG99YJh4";
    const chatId = "-1002263824706";
    setLoading(true);
    const req = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await req.json();

    if (res.ok) {
      deleteFromCart(course._id as string);
      alert("Kurs sotib olish uchun so'rov jo'natildi");
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
                  onClick={() => sendTelegramMessage(userData, item)}>
                  Sotib olish
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
