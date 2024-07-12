"use client";
import React, { useEffect } from "react";
import Message from "@/components/chats/Message";
import { messagesState } from "@/lib/store/messagesState";
import { ArrowDown } from "lucide-react";
import SkeletonMessageList from "./SkeletonMessageList";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { MessagesWithUsers } from "@/lib/types/collections";
import useScroll from "@/hooks/useScroll";

const MessageList: React.FC = () => {
  const { messages, addMessage } = messagesState();
  const { scrollRef, scrolledByUser, notification, scrollDown } =
    useScroll(messages);

  //à la fin de l'optimistique
  const supabase = supabaseBrowser();
  useEffect(() => {
    const subscription = supabase
      .channel("globals-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          const { data } = await supabase
            .from("messages")
            .select("*, users(*)")
            .eq("id", payload.new.id)
            .single();
          if (data) {
            addMessage(data as MessagesWithUsers);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, addMessage]);

  return (
    <div className={"relative max-h-full flex flex-col"}>
      <div
        className="h-[550px] overflow-y-auto no-scroll"
        ref={scrollRef}
        aria-label="Message list"
      >
        {messages.length !== 0 ? (
          messages.map((message, index) => (
            <Message message={message} key={index} />
          ))
        ) : (
          <SkeletonMessageList />
        )}
      </div>
      {scrolledByUser && (
        <Notification notification={notification} onClick={scrollDown} />
      )}
    </div>
  );
};

const Notification: React.FC<{
  notification: number;
  onClick: () => void;
}> = ({ notification, onClick }) => (
  <div className="absolute bottom-10 w-full">
    <div
      className="w-10 h-10 bg-primary rounded-full flex justify-center items-center ml-auto border cursor-pointer hover:scale-110 transition-all relative"
      onClick={onClick}
      aria-label="Scroll to bottom"
    >
      {notification > 0 && (
        <span className="absolute bg-background border w-6 h-6 text-[10px] flex justify-center text-primary items-center rounded-full -left-2 -top-2">
          {notification}
        </span>
      )}
      <ArrowDown className="text-secondary" />
    </div>
  </div>
);

export default MessageList;
