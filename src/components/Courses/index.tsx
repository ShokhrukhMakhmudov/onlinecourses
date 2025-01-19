import { ICourse } from "@/types";
import Link from "next/link";
import React from "react";
import CourseItem from "./CourseItem";

export default async function Courses({ data }: { data: ICourse[] }) {
  return (
    <section className="mt-10 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
          {data.map((item) => (
            <CourseItem data={item} key={item._id as string} />
          ))}
        </div>
      </div>
    </section>
  );
}
