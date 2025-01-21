import { IUser } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function UserItem({
  user,
  openDeleteModal,
}: {
  user: IUser;
  openDeleteModal: (user: IUser) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <tr>
      <td className="text-nowrap">
        <div
          className="tooltip [--placement:bottom-start] sm:[--placement:right] show"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <div className="tooltip-toggle">
            <div className="border-base-content/20 flex items-center gap-3 rounded-lg border bg-base-100 p-2 shadow hover:cursor-pointer">
              {user.fullName}
            </div>
            {isHovered && (
              <div
                className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
                role="popover">
                <div className="tooltip-body bg-base-100 text-base-content/80 w-56 rounded-lg p-4 text-start shadow">
                  <div className="flex flex-col">
                    <div className=" space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="icon-[fa--intersex] size-5" />
                        {user.gender === "male" ? "Erkak" : "Ayol"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="icon-[ic--outline-date-range] size-5" />
                        {new Date(user.dateOfBirth).toLocaleDateString("uz", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="divider my-2" />
                    <div className="text-sm flex items-center gap-3">
                      <div className="flex items-center gap-2 text-xl">
                        <span className="icon-[tdesign--course] size-5" />

                        <span className="text-base-content me-1 font-medium">
                          {user.purchasedCourses.length}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xl">
                        <span className="icon-[f7--cart] size-5" />
                        <span className="text-base-content me-1 font-medium">
                          {user.cart.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </td>
      <td>{user.email}</td>
      <td className="text-nowrap">{user.phoneNumber}</td>
      <td>
        {user.isVerified ? (
          <span className="badge badge-soft badge-success ">Tasdiqlangan</span>
        ) : (
          <span className="badge badge-soft badge-error ">Tasdiqlanmagan</span>
        )}
      </td>

      <td>
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/dashboard/users/${user._id}`}
            className="btn btn-circle btn-text btn-sm"
            aria-label="Action button">
            <span className="icon-[tabler--pencil] size-6" />
          </Link>

          <button
            className="btn btn-square btn-text btn-sm"
            type="button"
            onClick={() => openDeleteModal(user)}>
            <span className="icon-[tabler--trash] size-6" />
          </button>
        </div>
      </td>
    </tr>
  );
}
