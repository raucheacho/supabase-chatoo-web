"use client";
import { useEffect } from "react";
import { messagesState } from "../lib/store/messagesState";
import { MessagesWithUsers } from "../lib/types/collections";

export default function InitMessages({
  messages,
}: {
  messages: MessagesWithUsers[] | null;
}) {
  const { setMessagesState } = messagesState();
  useEffect(() => {
    setMessagesState(messages as MessagesWithUsers[]);
  }, [setMessagesState, messages]);

  return null;
}
