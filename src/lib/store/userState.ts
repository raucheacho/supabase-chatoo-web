import { create } from "zustand";
import { UsersType } from "../types/collections";
import { User } from "@supabase/supabase-js";

interface UserState {
  user: null | User;
  setUserState: (user: User) => void;
  clearUser: () => void;
}

export const userState = create<UserState>((set) => ({
  user: null,
  setUserState: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
