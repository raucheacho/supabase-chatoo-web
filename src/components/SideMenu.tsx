import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

const SideMenu = () => {
  return (
    <div className="h-full">
      <div>
        <Button className="border w-full" variant={"ghost"}>
          Salon générale
        </Button>
      </div>
      <ScrollArea className="h-full w-full rounded-md p-5"></ScrollArea>
    </div>
  );
};

export default SideMenu;
