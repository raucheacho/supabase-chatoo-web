"use client";
import { useEffect } from "react";
import { userState } from "@/lib/store/userState";
import { User } from "@supabase/supabase-js";

export default function InitUser({ user }: { user: User | null }) {
  const { setUserState } = userState();
  useEffect(() => {
    if (user) setUserState(user);
  }, [setUserState, user]);

  return null;
}
