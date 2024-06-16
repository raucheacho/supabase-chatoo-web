import InitUser from "@/helpers/initUser";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideMenu from "@/components/layouts/SideMenu";
import ChatZone from "@/components/chats/ChatZone";
import { ModifierMessage } from "@/components/chats/actions/ModifierMessage";
import { SupprimerMessage } from "@/components/chats/actions/SupprimerMessage";

export default async function Home() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/connexion");
  }

  return (
    <>
      <InitUser user={data.user} />
      <div className="h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="max-h-[650px] max-w-full"
        >
          <ResizablePanel defaultSize={25} minSize={10}>
            <div className="h-full">
              <SideMenu />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} minSize={70}>
            <div className="h-full pl-0">
              <ChatZone />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
        <ModifierMessage />
        <SupprimerMessage />
      </div>
    </>
  );
}
