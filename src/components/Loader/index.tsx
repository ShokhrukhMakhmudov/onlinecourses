import React from "react";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 z-[100] flex h-full w-full items-center justify-center backdrop-blur-lg">
      <span
        className="loading loading-spinner loading-lg text-primary"
        style={{ zoom: 2 }}
      />
    </div>
  );
}
