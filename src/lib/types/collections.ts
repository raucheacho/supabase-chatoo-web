import { Tables } from "./supabase";
export type UsersType = Tables<"users">;
export type MessagesType = Tables<"messages">;

// export type MessagesWithUsers = {
//   created_at: string;
//   id: string;
//   is_edit: boolean;
//   send_by: string;
//   text: string;
//   users: {
//     avatar_url: string;
//     created_at: string;
//     display_name: string;
//     id: string;
//   } | null;
// }[];
export type MessagesWithUsers = MessagesType & {
  users: UsersType;
};
