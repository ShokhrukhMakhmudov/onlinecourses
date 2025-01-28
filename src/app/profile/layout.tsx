"use client";
import Loader from "@/components/Loader";
import { useUserStatus } from "@/context/UserContext";
import { ReactNode, useEffect, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const {
    login,
    userStatus: { userData, login: loginStatus },
  } = useUserStatus();
  const [isLoading, setIsLoading] = useState(true); // Управление состоянием загрузки

  useEffect(() => {
    const token = sessionStorage.getItem("userToken") || null;

    if (!token) {
      window.location.href = "/";
      return;
    }

    async function checkToken(token: string) {
      try {
        const req = await fetch("/api/auth/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const res = await req.json();

        if (!res?.success) {
          window.location.href = "/";
          return;
        }

        login(res.user, res.token); // Авторизуем пользователя
      } catch (error) {
        console.error("Ошибка при проверке токена:", error);
        window.location.href = "/";
      } finally {
        setIsLoading(false); // Устанавливаем окончание загрузки
      }
    }

    // Проверяем токен, только если пользователь не залогинен
    if (!loginStatus) {
      checkToken(token);
    } else {
      setIsLoading(false);
    }
  }, [loginStatus]);

  // Показать состояние загрузки, пока идет проверка
  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
}
