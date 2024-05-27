"use server";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { createSafeActionClient } from "next-safe-action";
import { LogoutSchema } from "@/schemas";
const sefeAction = createSafeActionClient();

export const handleLogout = sefeAction(LogoutSchema, async () => {
  const supabase = supabaseServer();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { message: error.message };
  } else {
    return { message: "l'utilisateur a bien été déconecté" };
  }
});
