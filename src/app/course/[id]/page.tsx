import ButCourseBtn from "@/components/BuyCourseBtn";
import CartBtn from "@/components/Courses/CartBtn";
import { ILesson } from "@/types";
import { unstable_cache } from "next/cache";

import Image from "next/image";
import React from "react";

const getCourse = unstable_cache(
  async (id) => {
    try {
      const req = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/course/get?id=" + id,
        {
          method: "GET",
        }
      );
      const res = await req.json();

      if (res?.success) {
        return res.course;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      return [];
    }
  },
  ["course"],
  {
    revalidate: 30,
    tags: ["course"],
  }
);
const getLessons = unstable_cache(
  async (id) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/course/lesson/get?courseId=${id}`,
        {
          cache: "no-cache",
        }
      );
      const data = await res.json();
      if (data?.success) {
        return data.lessons;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return [];
    }
  },
  ["lessons"],
  {
    revalidate: 30,
    tags: ["lessons"],
  }
);

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const data = await getCourse(id);

  const lessons = await getLessons(id);
  return (
    <section className="py-10">
      <div className="container px-20">
        <div className="card flex flex-row items-start gap-5 justify-between mb-3">
          <div className="w-1/3 ">
            <div className="card-header">
              <h1 className="text-3xl font-bold text-primary">{data.title}</h1>
            </div>
            <div className="card-body gap-3">
              <div className="flex items-center gap-2 text-xl text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path d="m5,5C5,2.243,7.243,0,10,0s5,2.243,5,5-2.243,5-5,5-5-2.243-5-5ZM23,0h-5c-.552,0-1,.447-1,1s.448,1,1,1v5.347c0,.623.791.89,1.169.395l1.331-1.743,1.331,1.743c.378.495,1.169.228,1.169-.395V2c.552,0,1-.447,1-1s-.448-1-1-1Zm-4,20H1c-.552,0-1,.447-1,1s.448,1,1,1v1c0,.553.448,1,1,1h16c.552,0,1-.447,1-1v-1c.552,0,1-.447,1-1s-.448-1-1-1Zm-8.457-5.815l.956,3.815h5.431c.53,0,.926-.502.793-1.015-.691-2.657-2.705-4.783-5.306-5.61l-1.873,2.81Zm-7.474,3.815h5.431l.956-3.815-1.873-2.81c-2.601.826-4.616,2.952-5.306,5.61-.133.513.263,1.015.793,1.015Z" />
                </svg>
                <b>Ustoz:</b>
                <span className="text-2xl font-semibold text-secondary">
                  {data.author}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xl text-primary">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height={24}
                  width={24}
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="none"
                    strokeWidth="2"
                    d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,23 C15,23 16,18 16,12 C16,6 15,1 12,1 C9,1 8,6 8,12 C8,18 9,23 12,23 Z M2,16 L22,16 M2,8 L22,8"></path>
                </svg>
                <b>Til:</b>
                <span className="text-2xl font-semibold text-secondary">
                  {data.language}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xl text-primary">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  width={28}
                  height={28}
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg">
                  <defs id="defs493">
                    <clipPath clipPathUnits="userSpaceOnUse" id="clipPath503">
                      <path d="M 0,24 H 24 V 0 H 0 Z" id="path501" />
                    </clipPath>
                  </defs>
                  <g
                    id="g495"
                    transform="matrix(1.3333333,0,0,-1.3333333,0,32)">
                    <g id="g497">
                      <g id="g499" clipPath="url(#clipPath503)">
                        <g id="g505" transform="translate(1,1)">
                          <path
                            d="M 0,0 H 8"
                            style={{
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: 2,
                              strokeLinecap: "round",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              strokeDasharray: "none",
                              strokeOpacity: 1,
                            }}
                            id="path507"
                          />
                        </g>
                        <g id="g509" transform="translate(1,5)">
                          <path
                            d="M 0,0 H 6"
                            style={{
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: 2,
                              strokeLinecap: "round",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              strokeDasharray: "none",
                              strokeOpacity: 1,
                            }}
                            id="path511"
                          />
                        </g>
                        <g id="g513" transform="translate(1,9)">
                          <path
                            d="M 0,0 H 4"
                            style={{
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: 2,
                              strokeLinecap: "round",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              strokeDasharray: "none",
                              strokeOpacity: 1,
                            }}
                            id="path515"
                          />
                        </g>
                        <g id="g517" transform="translate(1.0449,13)">
                          <path
                            d="m 0,0 c 0.505,5.606 5.217,10 10.955,10 6.075,0 11,-4.925 11,-11 0,-5.738 -4.393,-10.45 -10,-10.955"
                            style={{
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: 2,
                              strokeLinecap: "round",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              strokeDasharray: "none",
                              strokeOpacity: 1,
                            }}
                            id="path519"
                          />
                        </g>
                        <g id="g521" transform="translate(12,18)">
                          <path
                            d="m 0,0 c -0.553,0 -1,-0.447 -1,-1 v -5 c 0,-0.266 0.105,-0.52 0.293,-0.707 l 3,-3 C 2.488,-9.902 2.744,-10 3,-10 c 0.256,0 0.512,0.098 0.707,0.293 0.391,0.391 0.391,1.023 0,1.414 L 1,-5.586 V -1 C 1,-0.447 0.553,0 0,0"
                            style={{
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: 1.5,
                              strokeLinecap: "round",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              strokeDasharray: "none",
                              strokeOpacity: 1,
                            }}
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>

                <b>Davomiyligi:</b>
                <span className="text-2xl font-semibold text-secondary">
                  ~{data.duration} soat
                </span>
              </div>

              <div className="flex items-center justify-between text-2xl">
                <div className="w-full flex flex-col mb-2">
                  <div className="flex items-center gap-2 text-xl text-primary mb-3">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      height={24}
                      width={24}
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="m22.996 5.448c-.046-1.661-.95-4.45-6.504-4.473-5.265.021-6.438 2.443-6.496 4.472v.057c.007.241.031.488.075.735-.723-.163-1.573-.26-2.579-.264-5.265.021-6.438 2.443-6.496 4.472v8.057c.059 2.029 1.233 4.451 6.504 4.471 2.732-.01 4.356-.671 5.301-1.589.978.385 2.183.583 3.699.589 5.263-.02 6.438-2.442 6.496-4.5v-12s-.001-.004-.001-.006c0-.007.001-.014.001-.021zm-20 8.548c.987.585 2.423.971 4.504.979 2.077-.008 3.51-.393 4.496-.981v.452c-.021.752-.072 2.512-4.496 2.529-4.432-.017-4.484-1.842-4.504-2.529zm10.999-3.528c0-.007.001-.014.001-.021-.006-.224-.03-.47-.077-.726.727.158 1.579.25 2.581.254 2.077-.008 3.51-.393 4.496-.981v.452c-.021.752-.072 2.512-4.496 2.529-.997-.004-1.831-.106-2.504-.293v-1.207s-.001-.004-.001-.006zm.001 3.266c.73.152 1.55.237 2.504.24 2.077-.008 3.51-.393 4.496-.978v.449c-.021.752-.072 2.512-4.496 2.529-.997-.004-1.831-.106-2.504-.293zm2.496-10.76c2.943.012 4.459.862 4.504 2.471-.021.752-.072 2.512-4.496 2.529-4.372-.017-4.482-1.792-4.504-2.5.02-.648.136-2.482 4.496-2.5zm-9 5.001c2.943.012 4.459.862 4.504 2.471-.021.752-.072 2.512-4.496 2.529-4.372-.017-4.482-1.792-4.504-2.5.02-.648.136-2.482 4.496-2.5zm.008 13c-4.432-.017-4.484-1.842-4.504-2.5v-.479c.987.585 2.423.971 4.504.979 2.077-.008 3.51-.393 4.496-.978v.449c-.021.752-.072 2.512-4.496 2.529zm9-1c-1.082-.004-1.969-.124-2.669-.344.105-.386.155-.777.165-1.156v-.74c.73.152 1.55.237 2.504.24 2.077-.008 3.51-.393 4.496-.978v.449c-.021.752-.072 2.512-4.496 2.529z" />
                    </svg>
                    <b>Narxi:</b>
                  </div>
                  <div className="flex items-center justify-between">
                    {data.newPrice ? (
                      <div>
                        <p className="line-through ">
                          {data.price.toLocaleString("EU", {
                            maximumFractionDigits: 0,
                            style: "currency",
                            currency: "UZS",
                          })}
                        </p>
                        <p className="text-success font-semibold text-3xl">
                          {data.newPrice.toLocaleString("EU", {
                            style: "currency",
                            currency: "UZS",
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </div>
                    ) : (
                      <p>
                        {data.price.toLocaleString("EU", {
                          maximumFractionDigits: 0,
                          style: "currency",
                          currency: "UZS",
                        })}
                      </p>
                    )}
                    <CartBtn id={data._id as string} />
                  </div>
                </div>
              </div>

              {data && <ButCourseBtn course={data} />}
            </div>
          </div>
          <Image
            src={data.cover}
            alt="cover"
            width={800}
            height={400}
            className="object-cover"
          />
        </div>
        <div>
          <nav
            className="tabs tabs-bordered"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal">
            <button
              type="button"
              className="tab active-tab:tab-active active text-xl font-semibold"
              id="tabs-basic-item-1"
              data-tab="#tabs-basic-1"
              aria-controls="tabs-basic-1"
              role="tab"
              aria-selected="true">
              Kurs haqida
            </button>
            <button
              type="button"
              className="tab active-tab:tab-active text-xl font-semibold"
              id="tabs-basic-item-2"
              data-tab="#tabs-basic-2"
              aria-controls="tabs-basic-2"
              role="tab"
              aria-selected="false">
              Darslar
            </button>
            {/* <button
              type="button"
              className="tab active-tab:tab-active"
              id="tabs-basic-item-3"
              data-tab="#tabs-basic-3"
              aria-controls="tabs-basic-3"
              role="tab"
              aria-selected="false">third tab</button> */}
          </nav>
          <div className="mt-3">
            <div
              id="tabs-basic-1"
              role="tabpanel"
              aria-labelledby="tabs-basic-item-1">
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
                style={{ zoom: 1.2 }}></div>
            </div>
            <div
              id="tabs-basic-2"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tabs-basic-item-2">
              <div className="accordion accordion-shadow">
                {!!lessons.length &&
                  lessons.map((item: ILesson) => (
                    <div
                      key={item._id.toString()}
                      className="accordion-item"
                      id="cancel̉-shadow">
                      <button
                        className="accordion-toggle inline-flex items-center gap-x-4 px-5 py-4 text-start text-xl font-semibold leading-none text-secondary transition duration-300 hover:text-primary focus:text-primary active:text-primary lg:text-2xl"
                        aria-controls="cancel̉-shadow-collapse"
                        aria-expanded="false">
                        <span className="icon-[tabler--plus] accordion-item-active:hidden text-base-content size-4.5 block shrink-0" />
                        <span className="icon-[tabler--minus] accordion-item-active:block text-base-content size-4.5 hidden shrink-0" />
                        {item.title}
                      </button>
                      <div
                        id="cancel̉-shadow-collapse"
                        className="accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                        aria-labelledby="cancel̉-shadow"
                        role="region">
                        <div
                          className="px-5 pb-4"
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                          style={{ zoom: 1.2 }}></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* <div
              id="tabs-basic-3"
              className="hidden"
              role="tabpanel"
              aria-labelledby="tabs-basic-item-3">
              <p className="text-base-content/80">
                <span className="text-base-content font-semibold">
                  Messages:
                </span>{" "}
                View your recent messages, chat with friends, and manage your
                conversations.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
