import React from "react";
import { Separator } from "@/components/ui/separator";
import { supabaseServer } from "@/lib/supabase/server";
import Formulaire from "@/components/authentication/Formulaire";
import { redirect } from "next/navigation";
import Link from "next/link";
import GithubBtn from "@/components/authentication/GithubBtn";

async function SignUpPage() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/");
  }
  return (
    <div className="max-w-5xl mx-auto space-y-10 container h-[620px] flex flex-col justify-center">
      <div className="md:w-1/2 space-y-5">
        <h1 className="text-2xl md:text-3xl font-bold">Bienvenue sur Chatoo</h1>
        <Formulaire role="inscription" />
      </div>
      <p className="text-xs sm:text-base">
        {"Si vous n'avez pas de compte"}{" "}
        <Link className="underline" href={"/connexion"}>
          connectez-vous ici
        </Link>
      </p>
      <Separator />
      <GithubBtn />
    </div>
  );
}

export default SignUpPage;
