"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { userState } from "@/lib/store/userState";
import { supabaseBrowser } from "@/lib/supabase/browser";

const SideMenu = () => {
  const { user } = userState();
  const supabase = supabaseBrowser();
  const [connected, setConnected] = useState<object[]>([]);

  useEffect(() => {
    const channel = supabase.channel("room_01");
    channel
      .on("presence", { event: "sync" }, () => {
        const newState = [];

        for (const id in channel.presenceState()) {
          newState.push(channel.presenceState()[id][0]);
        }
        setConnected([...new Set(newState)]);
        console.log(newState);

        //setConnected(newState);
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        //console.log("join", key, newPresences);
      })
      .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
        //console.log("leave", key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
    return () => {
      channel.unsubscribe();
    };
  }, [supabase, user]);

  return (
    <div className="h-full pr-5 space-y-5 hidden md:block">
      <div className="w-full border p-2 rounded-md flex flex-col gap-2">
        <div className="w-full border p-2 rounded-md flex gap-2 hover:bg-accent">
          <MessageCircle />
          <Link href="/">Salon général</Link>
        </div>
        <div className="flex gap-2 items-center pl-2 ">
          <span className="bg-primary w-4 h-4 rounded-full block animate-pulse"></span>
          <p className="font-bold text-secondary-forground">
            {" "}
            {"connecté(s)"} {connected.length}
          </p>
        </div>
      </div>
      <Separator />
      <ScrollArea className="h-full w-full rounded-md p-5"></ScrollArea>
    </div>
  );
};

export default SideMenu;
