"use client";
import React from "react";
import { UserAvatar } from "@/components/users/UserAvatar";
import { MessagesWithUsers } from "@/lib/types/collections";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { EllipsisIcon } from "lucide-react";
import MessageMenu from "./actions/MessageMenu";
import { userState } from "@/lib/store/userState";
import { cn } from "@/lib/utils";

const Message = ({ message }: { message: MessagesWithUsers }) => {
  const { user } = userState();
  const iAmUser = user?.id === message.send_by;
  return (
    <div
      className={cn("w-full  flex ", iAmUser ? "justify-end" : "justify-start")}
    >
      <div className="flex gap-2 w-fit">
        {!iAmUser && (
          <div className="border-2 h-fit rounded-full">
            <UserAvatar avatar={message.users.avatar_url as string} />
          </div>
        )}
        <div className="space-y-2 max-w-sm mb-5 relative">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold ">{message.users?.display_name}</p>
            <p className="text-xs font-thin">
              {formatDistanceToNow(new Date(message.created_at), {
                addSuffix: true,
                includeSeconds: true,
                locale: fr,
              })}
            </p>
            {message.users.id === user?.id && (
              <MessageMenu message={message}>
                <EllipsisIcon />
              </MessageMenu>
            )}
          </div>
          <div className="flex flex-col bg-secondary p-2 rounded-md w-fit">
            <p className="text-xs">{message.content}</p>
          </div>
          {message.is_edit && (
            <p className="text-[10px] -bottom-3  absolute tracking-wide text-primary font-regular bg-background  w-fit">
              Modifié
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
