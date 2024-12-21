"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LottieAnimation from "../AnimatedIcons";
import Link from "next/link";

export default function page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState({
    status: "info",
    message: "Tekshirilmoqda...",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await fetch(`/api/auth/register?token=${token}`, {
        method: "GET",
        cache: "no-cache",
      });
      const data = await response.json();

      if (data?.status === 200) {
        setMessage({
          status: "success",
          message: data.message,
        });
      } else {
        setMessage({
          status: "error",
          message: data.message,
        });
      }

      setLoading(false);
    };

    if (token) {
      verifyEmail();
    } else {
      setLoading(false);
      setMessage({
        status: "error",
        message: "Ma'lumot topilmadi. \n Qayta urinib ko'ring!",
      });
    }
  }, [token]);

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-5 items-center">
        {message.status === "success" && (
          <div>
            <LottieAnimation
              className="w-48 h-48"
              style={{ width: "350px", height: "350px" }}
            />
          </div>
        )}

        {message.status === "error" && (
          <div>
            <LottieAnimation
              type="error"
              className="w-48 h-48"
              style={{ width: "200px", height: "200px" }}
            />
          </div>
        )}

        {loading && (
          <span
            className="loading loading-spinner loading-lg text-primary"
            style={{
              zoom: 3,
            }}></span>
        )}
        <h1 className="text-3xl text-center">{message.message}</h1>
        {message.status === "success" && (
          <Link className="btn btn-primary" href="/">
            Asosiy sahifaga qaytish
          </Link>
        )}
      </div>
    </div>
  );
}
