import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({ avatar }: { avatar: string }) {
  return (
    <Avatar>
      <AvatarImage src={avatar} alt="raucheacho" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
