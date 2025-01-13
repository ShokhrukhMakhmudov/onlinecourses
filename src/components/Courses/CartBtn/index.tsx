"use client";
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
  const handleAddToCart = async () => {
    if (!login) {
      openModal();
      return;
    }

    addToCart(id);
  };

  return (
    <>
      {userData?.cart.includes(id) ? (
        <div className="tooltip show relative">
          <button
            type="button"
            className="tooltip-toggle btn btn-primary"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => deleteFromCart(id)}>
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
