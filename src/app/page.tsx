import InitUser from "@/helpers/initUser";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ChatZone from "@/components/chats/ChatZone";
import { ModifierMessage } from "@/components/chats/actions/ModifierMessage";
import { SupprimerMessage } from "@/components/chats/actions/SupprimerMessage";
import Main from "@/components/layouts/Main";

export default async function Home() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/connexion");
  }

  return (
    <>
      <InitUser user={data.user} />
      <div className="h-full w-full">
        <Main>
          <ChatZone />
        </Main>
        <ModifierMessage />
        <SupprimerMessage />
      </div>
    </>
  );
}
