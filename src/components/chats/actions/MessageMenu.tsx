"use client";
import React, { useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppState } from "@/lib/store/appState";
import { MessagesType } from "@/lib/types/collections";

const MessageMenu = ({
  children,
  message,
}: {
  children: React.ReactNode;
  message: MessagesType;
}) => {
  const { setStartDelete, setStartUpdate, setSelectedMessage } = useAppState();

  const handleUpdateClick = useCallback(() => {
    setStartUpdate();
    setSelectedMessage(message);
  }, [setStartUpdate, setSelectedMessage, message]);

  const handleDeleteClick = useCallback(() => {
    setStartDelete();
    setSelectedMessage(message);
  }, [setStartDelete, setSelectedMessage, message]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleUpdateClick}>
          Modifier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteClick}>
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessageMenu;
