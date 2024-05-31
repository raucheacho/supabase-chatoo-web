"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Message from "@/components/chats/Message";
import { messagesState } from "@/lib/store/messagesState"; // Assurez-vous que le chemin est correct
import { ArrowDown } from "lucide-react";
import SkeletonMessageList from "./SkeletonMessageList";
import { supabaseBrowser } from "@/lib/supabase/browser";

const MessageList: React.FC = () => {
  const { messages } = messagesState();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolledByUser, setScrolledByUser] = useState(false);
  const [notification, setNotification] = useState(0);
  const scrollContainer = scrollRef.current;

  const handleNewMessage = () => {
    if (scrollContainer) {
      const atBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop ===
        scrollContainer.clientHeight;
      if (atBottom) {
        setNotification(0);
      } else {
        setNotification((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (scrolledByUser) {
      handleNewMessage();
    }
  }, [messages]);

  useEffect(() => {
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, scrollContainer]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const handleScroll = () => {
      if (scrollContainer) {
        const atBottom =
          scrollContainer.scrollHeight - scrollContainer.scrollTop ===
          scrollContainer.clientHeight;
        setScrolledByUser(!atBottom);
        setNotification(0);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollDown = () => {
    setNotification(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const supabase = supabaseBrowser();
  useEffect(() => {
    const changement = supabase
      .channel("globals-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => console.log(payload)
      )
      .subscribe();

    return () => {
      changement.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="relative max-h-full flex flex-col">
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
  <div className="absolute   bottom-10 w-full">
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
