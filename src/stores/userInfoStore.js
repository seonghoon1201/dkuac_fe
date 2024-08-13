import { create } from "zustand";
import { persist } from "zustand/middleware";

const userInfoStore = create(
  persist(
    (set) => ({
      id: 0,
      name: "",
      isStaff: false,
      isLoggedIn: false,
      expiredTime: "",
      setUserInfo: (userInfo) =>
        set((state) => ({
          ...state,
          ...userInfo,
        })),
    }),
    {
      name: "userInfoStrorage",
    }
  )
);

export default userInfoStore;
