"use client";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { userState } from "@/lib/store/userState";

export default function InitUser({ user }: { user: User | null }) {
  const { setUserState } = userState();
  useEffect(() => {
    setUserState(user as User);
  }, [setUserState, user]);

  return null;
}
