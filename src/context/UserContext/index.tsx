import { IUser } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface IUserStatus {
  login: boolean;
  userData: IUser | null;
}

interface IUserContext {
  userStatus: IUserStatus;
  login: (userData: IUser, token: string) => void;
  logOut: () => void;
  addToCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
}

export const UserContext = createContext<IUserContext>({
  userStatus: { login: false, userData: null },
  login: () => {},
  logOut: () => {},
  addToCart: () => {},
  deleteFromCart: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [userStatus, setUserStatus] = useState<IUserStatus>({
    login: false,
    userData: null,
  });

  const login = (userData: IUser, token: string) => {
    sessionStorage.setItem("userToken", token);
    setUserStatus({ login: true, userData });
  };
  const logOut = () => {
    sessionStorage.removeItem("userToken");
    setUserStatus({ login: false, userData: null });
  };
  const addToCart = async (id: string) => {
    try {
      const req = await fetch("/api/users/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: id,
          userId: userStatus.userData?._id,
        }),
      });

      const res = await req.json();

      if (req.status === 200) {
        setUserStatus((prev) => ({ ...prev, userData: res.user }));
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {}
  };

  const deleteFromCart = async (id: string) => {
    try {
      const req = await fetch("/api/users/cart/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: id,
          userId: userStatus.userData?._id,
        }),
      });

      const res = await req.json();

      if (req.status === 200) {
        setUserStatus((prev) => ({ ...prev, userData: res.user }));
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{ userStatus, login, logOut, addToCart, deleteFromCart }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserStatus = () => useContext(UserContext);
