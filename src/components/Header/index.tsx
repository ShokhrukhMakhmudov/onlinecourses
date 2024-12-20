"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthModal from "../AuthModal";
import { IUser } from "@/types";

export default function Header() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      try {
        const response = await fetch("/api/auth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.status === 200) {
          setUser(data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return setLoading(false);
    }

    checkToken();
  }, []);

  return (
    <header className="shadow-lg">
      <div className="container">
        <nav className="navbar">
          <div className="navbar-start">
            <Link
              className="link text-base-content/90 link-neutral text-xl font-semibold no-underline hover:text-primary hover:no-underline"
              href="/">
              Logo
            </Link>
          </div>
          <div className="navbar-center max-md:hidden">
            <ul className="menu menu-horizontal gap-2 p-0 text-base rtl:ml-20">
              <li>
                <Link href="#" className="link-animated text-xl font-medium">
                  Biz haqimizda
                </Link>
              </li>
              <li>
                <Link href="#" className="link-animated text-xl font-medium">
                  Kurslar
                </Link>
              </li>
              <li>
                <Link href="#" className="link-animated text-xl font-medium">
                  To'lov
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end items-center gap-4">
            <div className="dropdown relative inline-flex md:hidden [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
              <button
                id="dropdown-default"
                type="button"
                className="dropdown-toggle btn btn-text btn-secondary btn-square"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown">
                <span className="icon-[tabler--menu-2] dropdown-open:hidden size-5" />
                <span className="icon-[tabler--x] dropdown-open:block hidden size-5" />
              </button>
              <ul
                className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60 z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropdown-default">
                <li className="py-2">
                  <Link href="#" className="text-xl link-animated">
                    Biz haqimizda
                  </Link>
                </li>
                <li className="py-2">
                  <Link href="#" className="text-xl link-animated">
                    Kurslar
                  </Link>
                </li>
                <li className="py-2">
                  <Link href="#" className="text-xl link-animated">
                    To'lov
                  </Link>
                </li>
              </ul>
            </div>
            {loading ? (
              <span className="loading loading-spinner loading-lg text-primary" />
            ) : user ? (
              <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
                <button
                  id="dropdown-avatar"
                  type="button"
                  className="dropdown-toggle btn btn-outline btn-primary flex items-center gap-2 rounded-full"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown">
                  <div className="avatar">
                    <div className="size-6 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png"
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  {user.fullName.split(" ")[0][0] +
                    user.fullName.split(" ")[1][0]}
                </button>
                <ul
                  className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-avatar">
                  <li className="dropdown-header gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png"
                          alt="User Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <h6 className="text-base-content/90 text-base font-semibold">
                        John Doe
                      </h6>
                      <small className="text-base-content/50 text-sm font-normal">
                        jhon@doe.com
                      </small>
                    </div>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Billing
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <AuthModal
                content="Kirish"
                className="btn btn-primary btn-soft"
              />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
