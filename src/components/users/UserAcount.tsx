"use client";
import { Loader2, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";

import { handleLogout } from "@/actions/logout";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { userState } from "@/lib/store/userState";
import { toast } from "sonner";
import { User as TypeUser } from "@supabase/supabase-js";

type UserAcount = {
  user: TypeUser;
};

export function UserAcount({ user }: UserAcount) {
  // console.log("account:", user);

  const { clearUser } = userState();
  const { execute, status, result } = useAction(handleLogout, {
    onSuccess: (data) => {
      if (data) {
        clearUser();
        toast.success(data.message);
      }
    },
    onExecute() {
      console.log("déconnexion en cours");
    },
    onError(error) {
      console.log(error);
    },
  });
  const handleLogoutFunc = () => {
    execute({});
  };
  // console.log("result :", user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-0 rounded-full" variant="outline">
          <UserAvatar avatar={user.user_metadata.avatar_url as string} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link href={"/profile"}>Mes informations</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <Button
            onClick={handleLogoutFunc}
            className="p-0 h-fit"
            variant={"ghost"}
          >
            {status === "executing" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Se deconnecter
          </Button>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
