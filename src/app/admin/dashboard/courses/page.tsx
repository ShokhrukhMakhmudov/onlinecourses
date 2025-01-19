"use client";
import { ICourse } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
  const [courses, setCourses] = useState<ICourse[] | null>(null);

  useEffect(() => {
    async function getCourses() {
      try {
        const req = await fetch("/api/course/get", {
          cache: "no-cache",
        });
        const res = await req.json();

        if (res?.success) {
          setCourses(res.courses);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        alert(error);
        console.error("Error fetching courses:", error);
      }
    }
    getCourses();
  }, []);
  return (
    <div className="bg-white p-4 h-full overflow-y-hidden flex flex-col">
      <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4 mb-5">
        <h2 className="text-xl font-semibold">
          Kurslar
          {/* (Jami: {courses?.length || 0}) */}
        </h2>

        <Link
          href="/admin/dashboard/courses/create"
          className="btn btn-primary">
          Kurs qo`shish
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full overflow-y-auto pb-2 vertical-scrollbar rounded-scrollbar">
        {courses &&
          courses.map(
            ({
              _id,
              title,
              author,
              price,
              newPrice,
              cover,
              language,
              duration,
              status,
            }) => (
              <div key={_id as string} className="card sm:max-w-sm h-fit">
                <figure>
                  <img width={384} height={216} src={cover} alt="Watch" />
                </figure>
                <div className="card-body p-4 gap-2">
                  <h5 className="card-title mb-2.5">{title}</h5>
                  <p className="mb-2">Ustoz: {author}</p>
                  <div className="w-full flex items-center justify-between">
                    <p>Kurs tili: {language}</p>
                    <p>
                      Holati:{" "}
                      {status ? (
                        <span className="badge badge-soft badge-success ">
                          Faol
                        </span>
                      ) : (
                        <span className="badge badge-soft badge-error ">
                          Faol emas
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p>Davomiyligi: ~{duration} soat</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <p>
                      Narxi: <br />
                      {price.toLocaleString("uz", {
                        style: "currency",
                        currency: "UZS",
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    {newPrice && (
                      <p>
                        Chegirmada: <br />
                        {newPrice.toLocaleString("uz", {
                          style: "currency",
                          currency: "UZS",
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/admin/dashboard/courses/edit/${_id}`}
                      className="w-[48%] btn btn-primary">
                      <span className="icon-[tabler--pencil]" />
                      Tahrirlash
                    </Link>

                    <Link
                      href={`/admin/dashboard/courses/lessons/${_id}`}
                      className="w-[48%] btn btn-secondary btn-soft">
                      <span className="icon-[tabler--video]" />
                      Darslar
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}

        {/* <div className="card sm:max-w-sm">
          <figure>
            <img
              src="https://cdn.flyonui.com/fy-assets/components/card/image-9.png"
              alt="Watch"
            />
          </figure>
          <div className="card-body">
            <h5 className="card-title mb-2.5">Apple Smart Watch</h5>
            <p className="mb-4">
              Stay connected, motivated, and healthy with the latest Apple
              Watch.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
              <button className="btn btn-secondary btn-soft">
                Add to cart
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
