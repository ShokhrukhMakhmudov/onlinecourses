"use client";
import { useState } from "react";

export default function page() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    error: {
      status: false,
      message: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: login.email, password: login.password }),
    });

    const data = await response.json();
    if (response.status === 200) {
      sessionStorage.setItem("token", data.token);
      window.location.href = "/admin/dashboard";
    } else {
      setLogin((prev) => ({
        ...prev,
        error: {
          status: true,
          message: data.message,
        },
      }));
    }
  };
  return (
    <>
      <section className="h-full flex items-center justify-center">
        <div className="card w-[500px] bg-base-100 shadow-xl p-8 mt-[-100px]">
          <h2 className="text-center text-xl font-semibold text-black mb-5">
            Boshqaruv panel
          </h2>
          <form className="flex flex-col gap-2" onSubmit={handleLoginSubmit}>
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
            <button className="btn btn-primary mt-4 text-xl" type="submit">
              Kirish
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
