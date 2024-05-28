import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";
const MessageList = () => {
  return (
    <ScrollArea className="h-full w-full rounded-md p-5">
      <Message />
      <Message />
      <Message />
    </ScrollArea>
  );
};

export default MessageList;
