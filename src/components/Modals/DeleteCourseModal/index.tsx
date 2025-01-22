"use client";
import Loader from "@/components/Loader";
import { useState } from "react";

export default function DeleteCourseModal({
  close,
  data: { userId, courseId, userName },
}: {
  close: () => void;
  data: {
    userId: string | null;
    courseId: string | null;
    userName: string | undefined;
  };
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddtoPurchase = async () => {
    setLoading(true);
    try {
      const req = await fetch(`/api/users/purchase/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
      });
      const res = await req.json();
      if (req.status === 200) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert((error as Error).message || "Xatolik yuz berdi");
    }

    setLoading(false);
    close();
    window.location.reload();
  };

  if (loading) return <Loader />;

  return (
    <>
      <div
        id="delete-user-modal"
        className="open modal opacity-100 bg-primary/40">
        <div className="open overlay-animation-target modal-dialog overlay-open:mt-4 opacity-100 overlay-open:duration-500 mt-12 transition-all ease-out">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Xaridni o'chirish</h3>
            </div>
            <div className="modal-body">
              <p>
                ISMI: <b> {userName}</b>
              </p>

              <br />
              <p>
                Ushbu foydalanuvchini xaridini bekor qilishga ishonchingiz
                komilmi?
              </p>
            </div>
            <div className="modal-footer">
              <button
                disabled={loading}
                type="button"
                className="btn btn-primary"
                onClick={handleAddtoPurchase}>
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
