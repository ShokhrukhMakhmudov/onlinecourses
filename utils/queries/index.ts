import { unstable_cache } from "next/cache";

export const getCourses = unstable_cache(
  async () => {
    try {
      const req = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/course/get?status=active"
      );
      const res = await req.json();

      if (res?.success) {
        return res.courses;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  },
  ["courses"],
  {
    revalidate: 60,
    tags: ["courses"],
  }
);

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
