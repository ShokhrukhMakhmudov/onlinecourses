"use client";
import { useState } from "react";
import Loader from "../Loader";
import { sendTelegramMessage } from "../../../utils/queries";
import { ICourse, IUser } from "@/types";
import { useUserStatus } from "@/context/UserContext";
import { useModal } from "@/context/AuthModalContext";

export default function ButCourseBtn({ course }: { course: ICourse }) {
  const [loading, setLoading] = useState(false);
  const {
    userStatus: { userData, login },
  } = useUserStatus();
  const { openModal } = useModal();
  const sendMessage = async (
    data: Omit<IUser, "password">,
    course: ICourse
  ) => {
    setLoading(true);
    const res = await sendTelegramMessage(data, course);

    if (res.success) {
      alert("Kurs sotib olish uchun so'rov jo'natildi");
    } else {
      alert("Xatolik yuz berdi! Qayta urinib ko'ring");
    }

    setLoading(false);
  };

  const redirectToLogin = () => {
    openModal();
    return;
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <button
      className="btn btn-primary rounded-t-none"
      onClick={() =>
        login && userData ? sendMessage(userData, course) : redirectToLogin()
      }>
      Xarid qilish
    </button>
  );
}
