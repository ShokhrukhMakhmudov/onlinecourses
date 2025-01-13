import { getCourses } from "../../utils/queries";
import HeroSection from "@/components/Hero";
import Courses from "@/components/Courses";

export default async function Home() {
  const courses = await getCourses();
  return (
    <>
      <HeroSection />
      <Courses data={courses} />
    </>
  );
}
