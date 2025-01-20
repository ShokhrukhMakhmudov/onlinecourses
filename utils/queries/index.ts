import { ICourse, IUser } from "@/types";
import { unstable_cache } from "next/cache";

export const AddToCart = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  try {
    const req = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/course/addToCart",
      {
        method: "POST",
        body: JSON.stringify({ id, userId }),
      }
    );
    const res = await req.json();

    if (res?.success) {
      return {
        success: true,
        message: res.message,
      };
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      message: error,
    };
  }
};

export const checkUserToken = async (token: string) => {
  try {
    const req = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );
    const res = await req.json();

    if (res?.success) {
      return {
        success: true,
        user: res.user,
      };
    } else {
      return {
        success: false,
        message: res.message,
      };
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return {
      message: error,
    };
  }
};

export const sendTelegramMessage = async (
  data: Omit<IUser, "password">,
  course: ICourse
) => {
  const text = `
      Kurs sotib olish \nIsmi: ${data.fullName} \nTelefon: ${
    data.phoneNumber
  }\nE-mail: ${data.email}\nKurs nomi: ${course.title}\nKurs narxi: ${
    course?.newPrice ?? course.price
  } so'm
    `;

  const botToken = "7067213755:AAGn3XhFbUX7ZsHcQznhyziDX7aTG99YJh4";
  const chatId = "-1002263824706";

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
    return { success: true, message: res.message };
  }

  return { success: false, message: res.message };
};
