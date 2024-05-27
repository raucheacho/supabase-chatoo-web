import { supabaseServer } from "@/lib/supabase/server";
import Formulaire from "@/components/Formulaire";
import { redirect } from "next/navigation";
import Link from "next/link";
import GithubBtn from "@/components/GithubBtn";
import { Separator } from "@/components/ui/separator";

async function LoginPage() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/");
  }
  return (
    <div className="max-w-5xl mx-auto space-y-10 container h-[620px] flex flex-col justify-center">
      <div className="md:w-1/2 space-y-5">
        <h1 className="text-3xl font-bold">Connexion</h1>
        <Formulaire role={"connexion"} />
      </div>
      <p className="text-xs sm:text-base">
        {"Si vous n'avez pas de compte"}{" "}
        <Link className="underline " href={"/inscription"}>
          inscrivez-vous ici
        </Link>
      </p>
      <Separator />
      <GithubBtn />
    </div>
  );
}

export default LoginPage;
// "use client";
// import { login } from "./action";
// import Formulaire from "@/components/Formulaire";
// import Link from "next/link";
// import GithubBtn from "@/components/GithubBtn";
// import { Separator } from "@/components/ui/separator";
// import { supabaseBrowser } from "@/lib/supabase/browser";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// function LoginPage() {
//   const router = useRouter();

//   async function getSession() {
//     const supabase = supabaseBrowser();
//     const { data } = await supabase.auth.getSession();
//     if (data.session?.user) {
//       router.push("/");
//     }
//   }

//   useEffect(() => {
//     getSession();
//   }, []);

//   function handleLogin(data: { email: string; password: string }) {
//     login(data);
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-10 container h-[620px] flex flex-col justify-center">
//       <div className="md:w-1/2 space-y-5">
//         <h1 className="text-3xl font-bold">Connexion</h1>
//         <Formulaire fonction={handleLogin} role={"connexion"} />
//       </div>
//       <p className="text-xs sm:text-base">
//         {"Si vous n'avez pas de compte"}{" "}
//         <Link className="underline " href={"/inscription"}>
//           inscrivez-vous ici
//         </Link>
//       </p>
//       <Separator />
//       <GithubBtn />
//     </div>
//   );
// }

// export default LoginPage;
