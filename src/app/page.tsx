import ChatHeader from "@/components/ChatHeader";
import { SendMessages } from "@/components/send_messages/SendMessages";
import InitUser from "@/helpers/initUser";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideMenu from "@/components/SideMenu";

export default async function Home() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/connexion");
  }

  return (
    <>
      <InitUser user={data.user} />
      <main className="container max-w-5xl h-screen mx-auto md:py-10">
        <div className="h-[80%]">
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] max-w-full"
          >
            <ResizablePanel defaultSize={25} minSize={10}>
              <div className="flex h-full items-center justify-center p-6">
                <SideMenu />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75} minSize={70}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Content</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </>
  );
}
