"use client";
import Loader from "@/components/Loader";
import UserDeleteModal from "@/components/Modals/UserDeleteModal";
import UserItem from "@/components/UserItem";
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
                  <th>Telefon raqam</th>
                  <th>Holat</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="h-full overflow-y-scroll">
                {users ? (
                  users.map((user) => (
                    <UserItem
                      key={user._id as string}
                      user={user}
                      openDeleteModal={openDeleteModal}
                    />
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
