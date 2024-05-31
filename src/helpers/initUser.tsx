"use client";
import { useEffect } from "react";
import { userState } from "@/lib/store/userState";
import { UsersType } from "@/lib/types/collections";

export default function InitUser({ user }: { user: UsersType | null }) {
  const { setUserState } = userState();
  useEffect(() => {
    if (user) setUserState(user);
  }, [setUserState, user]);

  return null;
}
