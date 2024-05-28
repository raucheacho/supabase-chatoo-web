import React from "react";
import { UserAvatar } from "./UserAvatar";

const Message = () => {
  return (
    <div className="flex gap-2">
      <div className="border-2 h-fit rounded-full">
        <UserAvatar avatar={""} />
      </div>
      <div className="space-y-2 max-w-sm mb-5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold ">raucheacho</p>
          <p className="text-xs font-thin">il y a 2h00</p>
        </div>
        <div className="flex flex-col bg-secondary p-2 rounded-xl ">
          <p className="text-xs">
            {
              "Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow🥰🥰."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
