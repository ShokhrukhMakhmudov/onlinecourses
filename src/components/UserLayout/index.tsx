"use client";
import { Suspense } from "react";
import { ReactNode } from "react";
import Header from "../Header";
import { usePathname } from "next/navigation";
import { ModalProvider } from "@/context/AuthModalContext";
import AuthModal from "../AuthModal";
import { UserProvider } from "@/context/UserContext";

export default function UserLayout({ children }: { children: ReactNode }) {
  const path = usePathname();

  const showHeader = !path.includes("auth") && !path.includes("admin");

  return (
    <>
      {showHeader ? (
        <>
          <UserProvider>
            <ModalProvider>
              <Header />
              {children}
              <AuthModal />
            </ModalProvider>
          </UserProvider>
        </>
      ) : (
        <Suspense>{children}</Suspense>
      )}
    </>
  );
}
