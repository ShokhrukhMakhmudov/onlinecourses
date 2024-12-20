"use client";
import React, { useState } from "react";
import Loader from "../Loader";
import { error } from "console";

export default function AuthModal({
  content,
  className = "btn btn-primary",
}: {
  content: React.ReactNode | string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState("tab-login");

  const [signup, setSignup] = useState({
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
    error: {
      status: false,
      message: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length > signup.phoneNumber.length) {
      if (input.length === 1) {
        setSignup((prev) => ({ ...prev, phoneNumber: `+998(${input}` }));
      } else if (input.length === 8) {
        setSignup((prev) => ({
          ...prev,
          phoneNumber: `${input.slice(0, 7)})${input.slice(7)}`,
        }));
      } else if (input.length === 8) {
        setSignup((prev) => ({
          ...prev,
          phoneNumber: `${input.slice(0, 7)})${input.slice(7)}`,
        }));
      } else
        setSignup((prev) => ({
          ...prev,
          phoneNumber: input,
        }));
    } else {
      if (input.length === 4) {
        return;
      }
      setSignup((prev) => ({
        ...prev,
        phoneNumber: input,
      }));
    }
  };

  // Changes
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignup((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  // Submits
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signup),
    });

    const data = await response.json();
    if (data?.status === 201) {
      setSignup({
        fullName: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        password: "",
      });
      setActiveTab("tab-login");
    }

    setLoading(false);
    alert(data.message);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: login.email, password: login.password }),
    });

    const data = await response.json();
    if (response.status === 200) {
      setLogin({
        email: "",
        password: "",
        error: {
          status: false,
          message: "",
        },
      });

      localStorage.setItem("token", data.token);
      window.location.reload();
    } else {
      setLogin((prev) => ({
        ...prev,
        error: {
          status: true,
          message: data.message,
        },
      }));
    }

    setLoading(false);
  };
  return (
    <>
      {loading && <Loader />}
      <button
        type="button"
        className={className}
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="middle-center-modal"
        data-overlay="#middle-center-modal">
        {content}
      </button>
      <div
        id="middle-center-modal"
        className="overlay modal overlay-open:opacity-100 overlay-open:backdrop-blur-md modal-middle hidden"
        role="dialog"
        tabIndex={100}>
        <div className="modal-dialog overlay-open:opacity-100">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                aria-label="Close"
                data-overlay="#middle-center-modal">
                <span className="icon-[tabler--x] size-4" />
              </button>
            </div>
            <div className="modal-body">
              <nav
                className="tabs items-center justify-center overflow-x-auto space-x-1 rtl:space-x-reverse p-1"
                aria-label="Tabs"
                role="tablist"
                aria-orientation="horizontal">
                <button
                  type="button"
                  className="btn btn-text active-tab:bg-primary active-tab:text-white hover:text-primary active-tab:opacity-100 opacity-50 active hover:bg-primary/20"
                  id="tabs-pill-icon-item-1"
                  data-tab="#tabs-pill-icon-1"
                  aria-controls="tabs-pill-icon-1"
                  role="tab"
                  aria-selected={activeTab === "tab-login" ? "true" : "false"}
                  onClick={() => setActiveTab("tab-login")}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 15H6V20H18V4H6V9H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V15ZM10 11V8L15 12L10 16V13H2V11H10Z"></path>
                  </svg>
                  <span className="hidden sm:inline">Kirish</span>
                </button>
                <button
                  type="button"
                  className="btn btn-text active-tab:bg-primary active-tab:text-white active-tab:opacity-100 opacity-50 hover:text-primary hover:bg-primary/20"
                  id="tabs-pill-icon-item-2"
                  data-tab="#tabs-pill-icon-2"
                  aria-controls="tabs-pill-icon-2"
                  role="tab"
                  aria-selected={activeTab === "tab-signup" ? "true" : "false"}
                  onClick={() => setActiveTab("tab-signup")}>
                  <span className="icon-[tabler--user] size-5 flex-shrink-0" />
                  <span className="hidden sm:inline">Ro'yhatdan o'tish </span>
                </button>
              </nav>
              <div className="mt-3">
                {/* Tab Login */}
                <div
                  id="tabs-pill-icon-1"
                  role="tabpanel"
                  aria-labelledby="tabs-pill-icon-item-1">
                  <form
                    className="flex flex-col gap-2"
                    onSubmit={handleLoginSubmit}>
                    <div>
                      <label
                        className="label label-text text-lg font-semibold"
                        htmlFor="email">
                        E-mail
                      </label>
                      <input
                        type="email"
                        placeholder="Elektron manzilingizni kiriting"
                        className="input text-lg"
                        id="email"
                        name="email"
                        required
                        onChange={handleLoginChange}
                        value={login.email}
                      />
                    </div>
                    <div>
                      <label
                        className="label label-text text-lg font-semibold"
                        htmlFor="password">
                        Parol
                      </label>
                      <div className="input-group">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="input text-lg"
                          placeholder="Parolni kiriting"
                          name="password"
                          required
                          onChange={handleLoginChange}
                          value={login.password}
                        />
                        <span className="input-group-text">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="block">
                            {showPassword ? (
                              <span className="icon-[tabler--eye] text-base-content/80 password-active:hidden block size-5 flex-shrink-0" />
                            ) : (
                              <span className="icon-[tabler--eye-off] text-base-content/80 password-active:block size-5 flex-shrink-0" />
                            )}
                          </button>
                        </span>
                      </div>
                    </div>
                    {login.error?.status && (
                      <p className="text-white px-4 py-2 mt-2 bg-error">
                        {login.error?.message || "Xatolik yuz berdi!"}
                      </p>
                    )}
                    <button
                      className="btn btn-primary mt-4 text-xl"
                      type="submit">
                      Kirish
                    </button>
                  </form>
                </div>
                {/* Tab SignUp */}
                <div
                  id="tabs-pill-icon-2"
                  className="hidden"
                  role="tabpanel"
                  aria-labelledby="tabs-pill-icon-item-2">
                  <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSignupSubmit}>
                    <div>
                      <label
                        className="label label-text text-lg font-semibold"
                        htmlFor="defaultInput">
                        Ism va Familiya
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        placeholder="Ism va Familiyani kiriting"
                        className="input text-lg"
                        id="defaultInput"
                        minLength={2}
                        required
                        onChange={handleSignupChange}
                        autoComplete="off"
                        value={signup.fullName}
                      />
                    </div>

                    <div>
                      <label
                        className="label label-text text-lg font-semibold"
                        htmlFor="phoneInput">
                        Telefon raqam
                      </label>
                      <input
                        name="phoneNumber"
                        type="tel"
                        placeholder="+998 99 999 99 99"
                        className="input text-lg"
                        id="phoneInput"
                        pattern="+[8-9]{3}([0-9]{2})[0-9]{7}"
                        maxLength={15}
                        minLength={15}
                        required
                        value={signup.phoneNumber}
                        onChange={handlePhoneChange}
                        autoComplete="off"
                      />
                      <span className="label">
                        <span className="label-text-alt">
                          Ushbu raqam oraqali operatorlar siz bilan bog'lanadi.
                        </span>
                      </span>
                    </div>
                    <div>
                      <label
                        className="label label-text text-lg font-semibold"
                        htmlFor="dob">
                        Tug'ilgan sana
                      </label>
                      <input
                        name="dateOfBirth"
                        type="date"
                        className="input"
                        id="dob"
                        onChange={handleSignupChange}
                        value={signup.dateOfBirth}
                        required
                      />
                    </div>

                    <div>
                      <h6 className="text-lg font-semibold text-base-content/90 mb-1">
                        Jins
                      </h6>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="gender"
                            className="radio radio-primary"
                            id="male"
                            required
                            value="male"
                            onChange={handleSignupChange}
                          />
                          <label
                            className="label label-text text-base"
                            htmlFor="male">
                            Erkak
                          </label>
                        </div>
                        <div className="flex items-center gap-1">
                          <input
                            type="radio"
                            name="gender"
                            className="radio radio-primary"
                            id="female"
                            required
                            value="female"
                            onChange={handleSignupChange}
                          />
                          <label
                            className="label label-text text-base"
                            htmlFor="female">
                            Ayol
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        className="label label-text text-lg font-semibold"
                        htmlFor="email">
                        E-mail
                      </label>
                      <input
                        type="email"
                        placeholder="Elektron manzilingizni kiriting"
                        className="input text-lg"
                        id="email"
                        required
                        name="email"
                        value={signup.email}
                        onChange={handleSignupChange}
                      />
                    </div>
                    <div>
                      <label
                        className="label label-text text-lg font-semibold"
                        htmlFor="toggle-password-label1">
                        Parol
                      </label>
                      <div className="input-group">
                        <input
                          id="toggle-password-label1"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="input text-lg"
                          placeholder="Parolni kiriting va eslab qoling!"
                          minLength={8}
                          required
                          value={signup.password}
                          onChange={handleSignupChange}
                        />
                        <span className="input-group-text">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="block">
                            {showPassword ? (
                              <span className="icon-[tabler--eye] text-base-content/80 password-active:hidden block size-5 flex-shrink-0" />
                            ) : (
                              <span className="icon-[tabler--eye-off] text-base-content/80 password-active:block size-5 flex-shrink-0" />
                            )}
                          </button>
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary mt-4 text-xl"
                      type="submit">
                      Ro'yhatdan o'tish
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-soft btn-secondary"
                data-overlay="#middle-center-modal">
                Bekor qilish
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
