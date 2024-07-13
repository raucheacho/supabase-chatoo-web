"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideMenu from "@/components/layouts/SideMenu";

const Main = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  useEffect(() => {
    console.log(isCollapsed);
  }, [isCollapsed]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-h-[650px] max-w-full"
    >
      <ResizablePanel
        className="hidden lg:block"
        collapsible
        maxSize={40}
        defaultSize={30}
        collapsedSize={10}
        minSize={20}
        onCollapse={() => handleCollapse(true)}
        onExpand={() => handleCollapse(false)}
      >
        <div className="h-full">
          <SideMenu isCollapsed={isCollapsed} />
        </div>
      </ResizablePanel>
      <ResizableHandle className="hidden lg:flex" withHandle />
      <ResizablePanel defaultSize={75} minSize={70}>
        <div className="h-full pl-0">{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Main;
