import React from "react";
import MessageList from "./MessageList";
import { Send } from "./Send";

const ChatZone = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-5 border p-2 rounded-lg">
      <MessageList />
      <Send />
    </div>
  );
};

export default ChatZone;
