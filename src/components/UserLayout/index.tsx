"use client";
import { Suspense } from "react";
import { ReactNode } from "react";
import Header from "../Header";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }: { children: ReactNode }) {
  const path = usePathname();

  const showHeader = !path.includes("auth");

  return (
    <>
      {showHeader ? (
        <>
          <Header />
          {children}
        </>
      ) : (
        <Suspense>{children}</Suspense>
      )}
    </>
  );
}
