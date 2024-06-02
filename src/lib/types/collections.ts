import { Tables } from "./supabase";

export type UsersType = Tables<"users">;
export type MessagesType = Tables<"messages">;
export type MessagesWithUsers = MessagesType & {
  users: UsersType;
};
