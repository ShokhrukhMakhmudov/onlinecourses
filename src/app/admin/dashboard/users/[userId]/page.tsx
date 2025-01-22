"use client";
import AddCourseModal from "@/components/Modals/AddCourseModal";
import DeleteCourseModal from "@/components/Modals/DeleteCourseModal";
import { IUser } from "@/types";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function page({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const [addCourseModal, setAddCourseModal] = useState<{
    isOpen: boolean;
    userId: string | null;
  }>({
    isOpen: false,
    userId: null,
  });

  const [deleteCourseModal, setDeleteCourseModal] = useState<{
    isOpen: boolean;
    userId: string | null;
    courseId: string | null;
    userName: string | null;
  }>({
    isOpen: false,
    userId: null,
    courseId: null,
    userName: null,
  });

  const openAddCourseModal = (userId: string) => {
    setAddCourseModal({
      isOpen: true,
      userId,
    });
  };

  const closeAddCourseModal = () => {
    setAddCourseModal({
      isOpen: false,
      userId: null,
    });
  };
  const openDeleteCourseModal = (
    userId: string,
    courseId: string,
    userName: string
  ) => {
    setDeleteCourseModal({
      isOpen: true,
      userId,
      courseId,
      userName,
    });
  };

  const closeDeleteCourseModal = () => {
    setDeleteCourseModal({
      isOpen: false,
      userId: null,
      courseId: null,
      userName: null,
    });
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users/get?id=${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setUser(data as IUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userId]);

  return (
    <>
      <div className="bg-white p-4 rounded-xl flex flex-col gap-5 h-full overflow-y-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold ">
            Foydalanuvchi:{" "}
            <span className="text-primary text-xl">{user?.fullName}</span>
          </h2>
          <button
            className="btn btn-primary"
            onClick={() => openAddCourseModal(userId as string)}>
            <span className="icon-[icon-park-outline--add] size-5"></span>
            Qo'shish
          </button>
        </div>
        <div className="h-full overflow-y-auto vertical-scrollbar">
          <div className="mb-5">
            <h2 className="text-lg font-semibold pb-2 mb-5 border-b-2 border-gray-200">
              Xarid qilingan kurslar:
            </h2>
            <div className="flex flex-col gap-5 h-full pb-2 pe-4">
              {!!user?.purchasedCourses.length ? (
                user.purchasedCourses.map(
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
                    <div key={_id as string} className="card flex-row gap-3">
                      <figure className="max-w-[500px]">
                        <img
                          width={384}
                          height={216}
                          src={cover}
                          alt="Kurs rasmi"
                        />
                      </figure>
                      <div className="card-body p-4 gap-2 relative">
                        <h5 className="card-title mb-2.5">
                          {title} asdasd asd asd asd asd as
                        </h5>
                        <p className="mb-2">Ustoz: {author}</p>
                        <div className="w-full flex items-center justify-between">
                          <p>Kurs tili: {language}</p>
                          <p>
                            {status ? (
                              <span className="badge badge-soft badge-success badge-lg">
                                Faol
                              </span>
                            ) : (
                              <span className="badge badge-soft badge-error badge-lg">
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
                          <button
                            className="btn btn-error w-[48%]"
                            onClick={() =>
                              openDeleteCourseModal(
                                user?._id as string,
                                _id as string,
                                user.fullName
                              )
                            }>
                            <span className="icon-[tabler--trash]" />
                            O'chirish
                          </button>
                        </div>
                        <Link
                          href={`/admin/dashboard/courses/lessons/${_id}`}
                          className=" btn btn-secondary btn-soft">
                          <span className="icon-[tabler--video]" />
                          Darslar
                        </Link>
                      </div>
                    </div>
                  )
                )
              ) : (
                <h2 className="text-lg  pb-2 mb-5">
                  Xarid qilingan kurslar mavjud emas.
                </h2>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold pb-2 mb-5 border-b-2 border-gray-200">
              Savatdagi kurslar:
            </h2>
            <div className="flex flex-col gap-5 h-full pb-2 pe-4">
              {!!user?.cart.length ? (
                user.cart.map(
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
                    <div key={_id as string} className="card flex-row gap-3">
                      <figure className="max-w-[500px]">
                        <img
                          width={384}
                          height={216}
                          src={cover}
                          alt="Kurs rasmi"
                        />
                      </figure>
                      <div className="card-body p-4 gap-2">
                        <h5 className="card-title mb-2.5">{title}</h5>
                        <p className="mb-2">Ustoz: {author}</p>
                        <div className="w-full flex items-center justify-between">
                          <p>Kurs tili: {language}</p>
                          <p>
                            {status ? (
                              <span className="badge badge-soft badge-success badge-lg">
                                Faol
                              </span>
                            ) : (
                              <span className="badge badge-soft badge-error badge-lg">
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
                )
              ) : (
                <h2 className="text-lg  pb-2 mb-5">
                  Savatda kurslar mavjud emas.
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
      {addCourseModal.isOpen && (
        <AddCourseModal
          userId={addCourseModal.userId}
          close={closeAddCourseModal}
        />
      )}
      {deleteCourseModal.isOpen && (
        <DeleteCourseModal
          data={{
            userId: deleteCourseModal.userId,
            courseId: deleteCourseModal.courseId,
            userName: user?.fullName,
          }}
          close={closeDeleteCourseModal}
        />
      )}
    </>
  );
}
