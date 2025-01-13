"use client";
import Loader from "@/components/Loader";
import UserDeleteModal from "@/components/Modals/UserDeleteModal";
import { IUser } from "@/types";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState<[IUser] | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    userData: IUser | null;
  }>({
    isOpen: false,
    userData: null,
  });

  const openDeleteModal = (userData: IUser) => {
    setDeleteModal({
      isOpen: true,
      userData,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      userData: null,
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users/get", {
          method: "GET",
          // cache: "force-cache",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setUsers(data as [IUser]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <>
      <div className="bg-white p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-5">
          Foydalanuvchilar (Jami: {users?.length || 0})
        </h2>
        <div className="border-base-content/25 w-full rounded-lg border">
          <div className="">
            <table className="table  rounded ">
              <thead>
                <tr>
                  <th>Ism</th>
                  <th>Email</th>
                  <th>Holat</th>
                  <th>Tu'gilgan sana</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="h-full overflow-y-scroll">
                {users ? (
                  users.map((user) => (
                    <tr key={user._id as string}>
                      <td className="text-nowrap">{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.isVerified ? (
                          <span className="badge badge-soft badge-success ">
                            Tasdiqlangan
                          </span>
                        ) : (
                          <span className="badge badge-soft badge-error ">
                            Tasdiqlanmagan
                          </span>
                        )}
                      </td>
                      <td className="text-nowrap">
                        {new Date(user.createdAt).toLocaleDateString("uz", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="flex items-center">
                        <button
                          className="btn btn-circle btn-text btn-sm"
                          aria-label="Action button">
                          <span className="icon-[tabler--pencil] size-5" />
                        </button>

                        <button
                          className="btn btn-square btn-text btn-sm"
                          type="button"
                          onClick={() => openDeleteModal(user)}>
                          <span className="icon-[tabler--trash] size-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <Loader />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {deleteModal.isOpen && (
        <UserDeleteModal
          userData={deleteModal.userData}
          close={closeDeleteModal}
        />
      )}
    </>
  );
}
