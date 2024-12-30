"use client";
import { NavLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();

  const isActive = pathname === href; // Проверка, активна ли ссылка
  const linkClass = `${className || ""} ${isActive ? "active" : ""}`.trim();

  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="navbar bg-base-100 max-sm:rounded-box max-sm:shadow sm:border-b border-base-content/25 sm:z-[1] relative">
        <button
          type="button"
          className="btn btn-text max-sm:btn-square sm:hidden me-2"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="default-sidebar"
          data-overlay="#default-sidebar">
          <span className="icon-[tabler--menu-2] size-5" />
        </button>
        <div className="flex flex-1 items-center">
          <a
            className="link text-base-content/90 link-neutral text-xl font-semibold no-underline"
            href="#">
            LOGO
          </a>
        </div>
        <div className="navbar-end flex items-center gap-4">
          <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
            <button
              id="dropdown-scrollable"
              type="button"
              className="dropdown-toggle btn btn-text btn-circle dropdown-open:bg-base-content/10 size-10"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown">
              <div className="indicator">
                <span className="indicator-item bg-error size-2 rounded-full" />
                <span className="icon-[tabler--bell] text-base-content size-[1.375rem]" />
              </div>
            </button>
            <div
              className="dropdown-menu dropdown-open:opacity-100 hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-scrollable">
              <div className="dropdown-header justify-center">
                <h6 className="text-base-content/90 text-base">
                  Notifications
                </h6>
              </div>
              <div className="vertical-scrollbar horizontal-scrollbar rounded-scrollbar text-base-content/80 max-h-56 overflow-auto max-md:max-w-60">
                <div className="dropdown-item">
                  <div className="avatar away-bottom">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                        alt="avatar 1"
                      />
                    </div>
                  </div>
                  <div className="w-60">
                    <h6 className="truncate text-base">Charles Franklin</h6>
                    <small className="text-base-content/50 truncate">
                      Accepted your connection
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png"
                        alt="avatar 2"
                      />
                    </div>
                  </div>
                  <div className="w-60">
                    <h6 className="truncate text-base">
                      Martian added moved Charts &amp; Maps task to the done
                      board.
                    </h6>
                    <small className="text-base-content/50 truncate">
                      Today 10:00 AM
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar online-bottom">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-8.png"
                        alt="avatar 8"
                      />
                    </div>
                  </div>
                  <div className="w-60">
                    <h6 className="truncate text-base">New Message</h6>
                    <small className="text-base-content/50 truncate">
                      You have new message from Natalie
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-10 rounded-full p-2">
                      <span className="icon-[tabler--user] size-full" />
                    </div>
                  </div>
                  <div className="w-60">
                    <h6 className="truncate text-base">
                      Application has been approved 🚀
                    </h6>
                    <small className="text-base-content/50 text-wrap">
                      Your ABC project application has been approved.
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-10.png"
                        alt="avatar 10"
                      />
                    </div>
                  </div>
                  <div className="w-60">
                    <h6 className="truncate text-base">
                      New message from Jane
                    </h6>
                    <small className="text-base-content/50 text-wrap">
                      Your have new message from Jane
                    </small>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png"
                        alt="avatar 3"
                      />
                    </div>
                  </div>
                  <div className="w-60">
                    <h6 className="truncate text-base">
                      Barry Commented on App review task.
                    </h6>
                    <small className="text-base-content/50 truncate">
                      Today 8:32 AM
                    </small>
                  </div>
                </div>
              </div>
              <a href="#" className="dropdown-footer justify-center gap-1">
                <span className="icon-[tabler--eye] size-4" />
                View all
              </a>
            </div>
          </div>
          <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
            <button
              id="dropdown-scrollable"
              type="button"
              className="dropdown-toggle flex items-center"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown">
              <div className="avatar">
                <div className="size-9.5 rounded-full">
                  <img
                    src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                    alt="avatar 1"
                  />
                </div>
              </div>
            </button>
            <ul
              className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-avatar">
              <li className="dropdown-header gap-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                      alt="avatar"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="text-base-content/90 text-base font-semibold">
                    John Doe
                  </h6>
                  <small className="text-base-content/50">Admin</small>
                </div>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="icon-[tabler--user]" />
                  My Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="icon-[tabler--settings]" />
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="icon-[tabler--receipt-rupee]" />
                  Billing
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <span className="icon-[tabler--help-triangle]" />
                  FAQs
                </a>
              </li>
              <li className="dropdown-footer gap-2">
                <a className="btn btn-error btn-soft btn-block" href="#">
                  <span className="icon-[tabler--logout]" />
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <aside
        id="default-sidebar"
        className="overlay sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden max-w-64 sm:absolute sm:z-0 sm:flex sm:translate-x-0 pt-16 "
        role="dialog"
        tabIndex={-1}>
        <div className="drawer-body px-2 pt-4 shadow-xl bg-base-100">
          <ul className="menu p-0">
            <li>
              <NavLink href="/admin/dashboard" className="active">
                <span className="icon-[tabler--home] size-5" />
                Bosh sahifa
              </NavLink>
            </li>
            <li>
              <a href="#">
                <span className="icon-[tabler--user] size-5" />
                Foydalanuvchilar
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon-[tabler--message] size-5" />
                Kurslar
              </a>
            </li>
            {/* <li>
              <a href="#">
                <span className="icon-[tabler--mail] size-5" />
                Email
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon-[tabler--calendar] size-5" />
                Calendar
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon-[tabler--shopping-bag] size-5" />
                Product
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon-[tabler--login] size-5" />
                Sign In
              </a>
            </li> */}
            <li>
              <Link href="/">
                <span className="icon-[tabler--logout-2] size-5" />
                Saytka qaytish
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="fixed bottom-[0] left-[0] sm:left-[256px] top-[64px] right-[0] z-[-1] flex-grow-[1] bg-gray-300 p-4">
        {children}
      </div>
    </>
  );
}
