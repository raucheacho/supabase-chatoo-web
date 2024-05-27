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
import { UsersType } from "@/lib/types/collections";
import { handleLogout } from "@/actions/logout";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { userState } from "@/lib/store/userState";
import { toast } from "sonner";

type UserAcount = {
  user: UsersType;
};

export function UserAcount({}: UserAcount) {
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
  console.log("test: ", status);
  const handleLogoutFunc = () => {
    execute({});
  };
  // console.log("result :", result);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="p-0 rounded-full" variant="outline">
          <UserAvatar avatar="" />
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
