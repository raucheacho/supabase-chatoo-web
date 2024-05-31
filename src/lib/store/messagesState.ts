import { create } from "zustand";
import { MessagesWithUsers } from "../types/collections";

interface MessagesState {
  messages: MessagesWithUsers[];
  setMessagesState: (messages: MessagesWithUsers[]) => void;
  addMessage: (message: MessagesWithUsers) => void;
  updateMessage: (message: MessagesWithUsers) => void;
  removeMessage: (message: MessagesWithUsers) => void;
}

export const messagesState = create<MessagesState>((set) => ({
  messages: [],
  setMessagesState: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateMessage: (message) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === message.id
          ? { ...msg, content: message.content, is_edit: message.is_edit }
          : msg
      ),
    })),
  removeMessage: (message) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== message.id),
    })),
}));
