import HeroSection from "@/components/Hero";
import Courses from "@/components/Courses";
import { unstable_cache } from "next/cache";

const getCourses = unstable_cache(
  async () => {
    try {
      const req = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/course/get?status=active",
        {
          method: "GET",
        }
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
export default async function Home() {
  const courses = await getCourses();
  return (
    <>
      <HeroSection />
      <Courses data={courses} />
    </>
  );
}
