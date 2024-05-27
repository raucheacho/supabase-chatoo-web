"use client";
import React from "react";
import { Button } from "./ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

const ChatHeader = ({ user }: { user: User | null }) => {
  return (
    <div className="h-20">
      <div className="p-5 border-b flex items-center justify-between h-full">
        <div>
          <h1 className="text-xl font-bold">Daily Chat</h1>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-primary-foreground rounded-full animate-pulse"></div>
            <h1>2 En ligne</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
