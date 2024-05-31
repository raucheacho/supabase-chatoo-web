"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { createSafeActionClient } from "next-safe-action";
import { LoginFormSchema } from "@/schemas";

const sefeAction = createSafeActionClient();

export const login = sefeAction(
  LoginFormSchema,
  async ({ email, password }: { email: string; password: string }) => {
    const supabase = supabaseServer();

    const loginInfo = {
      email,
      password,
    };

    const { error } = await supabase.auth.signInWithPassword(loginInfo);
    if (error) return { message: error.message };
    revalidatePath("/", "layout");
    redirect("/");
  }
);
