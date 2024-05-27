"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { createSafeActionClient } from "next-safe-action";
import { SignUpFormSchema } from "@/schemas";
const sefeAction = createSafeActionClient();
export const signup = sefeAction(
  SignUpFormSchema,
  async ({
    email,
    password,
    pseudo,
  }: {
    pseudo: string;
    email: string;
    password: string;
  }) => {
    const supabase = supabaseServer();
    const data = {
      email,
      password,
      options: {
        data: {
          user_name: pseudo,
          avatar_url: "https://randomuser.me/api/portraits/med/men/75.jpg",
        },
      },
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) return { message: error.message };

    revalidatePath("/", "layout");
    redirect("/");
  }
);
