"use client";
import Loader from "@/components/Loader";
import { useUserStatus } from "@/context/UserContext";
import { ChangeEvent, useEffect, useState } from "react";

interface IUserFormData {
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: "male" | "female";
  email: string;
  password: string;
  newPassword: string;
}
export default function page() {
  const [formData, setFormData] = useState<IUserFormData>({
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "male",
    email: "",
    password: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    userStatus: { userData },
    login,
  } = useUserStatus();
  console.log(userData);
  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber,
        dateOfBirth: String(userData.dateOfBirth).slice(0, 10),
        gender: userData.gender,
        email: userData.email,
        password: "",
        newPassword: "",
      });
    }
  }, [userData]);
  // Changes
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length > formData.phoneNumber.length) {
      if (input.length === 1) {
        setFormData((prev) => ({ ...prev, phoneNumber: `+998(${input}` }));
      } else if (input.length === 8) {
        setFormData((prev) => ({
          ...prev,
          phoneNumber: `${input.slice(0, 7)})${input.slice(7)}`,
        }));
      } else if (input.length === 8) {
        setFormData((prev) => ({
          ...prev,
          phoneNumber: `${input.slice(0, 7)})${input.slice(7)}`,
        }));
      } else
        setFormData((prev) => ({
          ...prev,
          phoneNumber: input,
        }));
    } else {
      if (input.length === 4) {
        return;
      }
      setFormData((prev) => ({
        ...prev,
        phoneNumber: input,
      }));
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const req = await fetch(process.env.NEXT_PUBLIC_API + "/api/users/edit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, _id: userData?._id }),
    });

    const res = await req.json();

    setLoading(false);
    alert(res.message);

    if (req.status === 200) {
      window.location.reload();
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="container ">
      <div className="py-10 w-full">
        <form
          className="flex flex-col gap-2 w-[800px] mx-auto"
          onSubmit={handleSubmit}>
          <div className="w-full">
            <label
              className="label label-text text-lg font-semibold"
              htmlFor="defaultInput">
              Ism va Familiya
            </label>
            <input
              name="fullName"
              type="text"
              placeholder="Ism va Familiyani kiriting"
              className="input text-xl"
              id="defaultInput"
              minLength={2}
              required
              onChange={handleChange}
              autoComplete="off"
              value={formData.fullName}
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
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              autoComplete="off"
            />
            <span className="label">
              <span className="label-text-alt">
                Ushbu raqam oraqali operatorlar siz bilan bog'lanadi.
              </span>
            </span>
          </div>
          <div className="flex items-start gap-10">
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
                onChange={handleChange}
                value={formData.dateOfBirth}
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
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                  />
                  <label className="label label-text text-base" htmlFor="male">
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
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                  />
                  <label
                    className="label label-text text-base"
                    htmlFor="female">
                    Ayol
                  </label>
                </div>
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
              className="input text-xl"
              id="email"
              name="email"
              value={formData.email}
              disabled
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
                className="input text-xl"
                placeholder="Parolni kiriting va eslab qoling!"
                minLength={8}
                value={formData.password}
                onChange={handleChange}
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
          <div>
            <label
              className="label label-text text-lg font-semibold"
              htmlFor="toggle-password-label1">
              Yangi Parol
            </label>
            <div className="input-group">
              <input
                id="toggle-password-label1"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                className="input text-xl"
                placeholder="Parolni kiriting va eslab qoling!"
                minLength={8}
                value={formData.newPassword}
                onChange={handleChange}
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
          <button className="btn btn-primary mt-4 text-xl" type="submit">
            O'zgartirish
          </button>
        </form>
      </div>
    </div>
  );
}
