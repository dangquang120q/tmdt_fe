import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialVal = {
  email: "",
  username: "",
  id: "",
  avatar: "",
  isLogin: false,
  phone: "",
  gender: "",
  fullName: "",
  dob: "",
};
export const useAuthentication = create(
  persist(
    (set) => ({
      ...initialVal,
      login: (user) => {
        const newUser = {
          email: user.email,
          username: user.username,
          id: user.id,
          role: user.role,
          avatar: user.avatar,
          isLogin: true,
          phone: user.phone,
          fullName: user.fullName,
          gender: user.gender,
          dob: user.dob,
        };
        set(() => ({ ...newUser }));
      },
      changeInfo: (info) => {
        set(() => ({
          avatar: info.avatar,
          gender: info.gender,
          fullName: info.fullName,
          dob: info.dob,
        }));
      },
      logout: () => {
        set(() => ({ ...initialVal }));
      },
    }),
    {
      name: "ROMAND_USER",
      partialize: (state) => ({
        isLogin: state.isLogin,
        username: state.username,
        id: state.id,
      }),
    }
  )
);
