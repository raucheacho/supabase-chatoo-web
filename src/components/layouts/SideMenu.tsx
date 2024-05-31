import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SideMenu = () => {
  return (
    <div className="h-full pr-5 space-y-5">
      <div className="w-full border p-2 rounded-md flex gap-2 hover:bg-accent">
        <MessageCircle />
        <Link href="/">Salon général</Link>
      </div>
      <Separator />
      <ScrollArea className="h-full w-full rounded-md p-5"></ScrollArea>
    </div>
  );
};

export default SideMenu;
