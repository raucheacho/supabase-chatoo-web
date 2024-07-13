import React from "react";
import MessageList from "./MessageList";
import { Send } from "./Send";
import { supabaseServer } from "@/lib/supabase/server";
import InitMessages from "@/helpers/initMessages";

const ChatZone = async () => {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from("messages")
    .select("*, users(*)")
    .order("created_at", { ascending: true });

  return (
    <>
      <InitMessages messages={data} />
      <div className="w-full p-1 md:p-5 pt-0 h-full flex flex-col rounded-lg rounded-tl-none rounded-bl-none">
        <MessageList />
        <Send />
      </div>
    </>
  );
};

export default ChatZone;
