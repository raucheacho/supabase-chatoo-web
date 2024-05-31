import { create } from "zustand";
import { UsersType } from "../types/collections";

interface UserState {
  user: null | UsersType;
  setUserState: (user: UsersType) => void;
  clearUser: () => void;
}

export const userState = create<UserState>((set) => ({
  user: null,
  setUserState: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
