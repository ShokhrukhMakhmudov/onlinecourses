"use client";
import Loader from "@/components/Loader";
import { useModal } from "@/context/AuthModalContext";
import { useUserStatus } from "@/context/UserContext";
import { useState } from "react";

export default function CartBtn({ id }: { id: string }) {
  const {
    userStatus: { login, userData },
    addToCart,
    deleteFromCart,
  } = useUserStatus();
  const { openModal } = useModal();
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleAddToCart = async () => {
    if (!login) {
      openModal();
      return;
    }
    setLoading(true);
    const req = await addToCart(id);
    if (req.success) alert(req.message);
    setLoading(false);
  };

  const handleDeleteFromCart = async (id: string) => {
    setLoading(true);
    const req = await deleteFromCart(id);
    if (req.success) alert(req.message);
    setLoading(false);
  };

  if (loading) return <Loader />;
  return (
    <>
      {(userData?.cart as string[])?.includes(id) ? (
        <div className="tooltip show relative">
          <button
            type="button"
            className="tooltip-toggle btn btn-primary"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleDeleteFromCart(id)}>
            Savatda
          </button>
          {hover && (
            <span
              className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
              role="tooltip"
              style={{
                position: "absolute",
                top: "-110%",
                left: "50%",
                transform: "translateX(-50%)",
                margin: "0px",
              }}>
              <span className="tooltip-body text-lg text-primary bg-white border-2 border-primary">
                Savatdan o'chirish
              </span>
            </span>
          )}
        </div>
      ) : (
        <div className="tooltip show relative">
          <button
            type="button"
            className="tooltip-toggle btn btn-primary btn-outline"
            onClick={handleAddToCart}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <span className="icon-[tabler--shopping-cart]" />
          </button>
          {hover && (
            <span
              className="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible"
              role="tooltip"
              style={{
                position: "absolute",
                top: "-110%",
                left: "50%",
                transform: "translateX(-50%)",
                margin: "0px",
              }}>
              <span className="tooltip-body text-lg text-primary bg-white border-2 border-primary">
                Savatga qo'shish
              </span>
            </span>
          )}
        </div>
      )}
    </>
  );
}
