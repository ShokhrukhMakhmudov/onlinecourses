"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IUser } from "@/types";
import { useModal } from "@/context/AuthModalContext";
import { useUserStatus } from "@/context/UserContext";

export default function Header() {
  const { openModal } = useModal();
  const {
    userStatus: { userData: user },
    login,
    logOut,
  } = useUserStatus();

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
          login(data.user, token as string);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        logOut();
      } finally {
        setLoading(false);
      }
    }

    const token = sessionStorage.getItem("userToken");

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
            {loading ? (
              <span className="loading loading-spinner loading-lg text-primary" />
            ) : (
              <button
                type="button"
                className={`${
                  user?._id ? "hidden" : ""
                } btn btn-primary btn-soft`}
                onClick={openModal}>
                Kirish
              </button>
            )}
            <div
              className={`${
                user?._id ? "" : "hidden"
              } flex items-center gap-4`}>
              <div className="indicator">
                {user?.cart && user.cart.length > 0 && (
                  <span className="indicator-item badge badge-primary rounded-full">
                    {user.cart.length}
                  </span>
                )}
                <Link
                  href="/profile/cart"
                  className="btn btn-primary btn-outline btn-square"
                  aria-label="Button Indicator">
                  <span className="icon-[tabler--shopping-bag] size-5" />
                </Link>
              </div>

              <div
                className={`dropdown relative inline-flex rtl:[--placement:bottom-end]`}>
                <button
                  id="dropdown-avatar"
                  type="button"
                  className="dropdown-toggle btn btn-outline btn-primary flex items-center gap-2 rounded-full"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown">
                  {user?.fullName &&
                    user.fullName.split(" ")[0][0] +
                      user.fullName.split(" ")[1][0]}
                  <span className="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
                </button>
                <ul
                  className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-avatar">
                  <li className="dropdown-header gap-3">
                    {/* <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img
                          src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png"
                          alt="User Avatar"
                        />
                      </div>
                    </div> */}
                    <div>
                      <h6 className="text-base-content/90 text-base font-semibold">
                        {user?.fullName}
                      </h6>
                      <small className="text-base-content/50 text-sm font-normal">
                        {user?.email}
                      </small>
                    </div>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Shaxsiy kabinet
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Kurslarim
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      To'lovlar
                    </a>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => logOut()}>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="25px"
                        width="25px"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path>
                      </svg>
                      <span>Chiqish</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

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
          </div>
        </nav>
      </div>
    </header>
  );
}
