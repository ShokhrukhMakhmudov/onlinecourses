"use client";
import { IUser } from "@/types";
import { useState } from "react";

export default function UserDeleteModal({
  close,
  userData,
}: {
  close: () => void;
  userData: IUser | null;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  async function deleteUser(id: string) {
    setLoading(true);
    const response = await fetch("/api/users/delete" + `?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response?.status === 200) {
      alert(data.message);
    } else {
      alert(data.message);
    }

    setLoading(false);
    close();
    window.location.reload();
  }

  return (
    <>
      <div
        id="delete-user-modal"
        className="open modal opacity-100 bg-primary/40">
        <div className="open overlay-animation-target modal-dialog overlay-open:mt-4 opacity-100 overlay-open:duration-500 mt-12 transition-all ease-out">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Foydalanuvchini o'chirish</h3>
            </div>
            <div className="modal-body">
              <p>
                ISMI: <b> {userData?.fullName}</b>
              </p>
              <p>
                EMAIL: <b> {userData?.email}</b>
              </p>
              <br />
              <p>Ushbu foydalanuvchini o'chirmoqchimisiz?</p>
            </div>
            <div className="modal-footer">
              <button
                disabled={loading}
                type="button"
                className="btn btn-primary"
                onClick={() => deleteUser(userData?._id?.toString() as string)}>
                Ha
                {loading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </button>
              <button
                disabled={loading}
                type="button"
                className="btn btn-soft btn-secondary"
                onClick={close}>
                Yo'q
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
