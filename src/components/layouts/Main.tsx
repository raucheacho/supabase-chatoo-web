"use client";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SideMenu from "@/components/layouts/SideMenu";
import { PanelOnCollapse } from "react-resizable-panels";

const Main = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  useEffect(() => {
    console.log(isCollapsed);
  }, [isCollapsed]);
  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="max-h-[650px] max-w-full"
      >
        <ResizablePanel
          className="hidden md:block"
          collapsible={true}
          maxSize={40}
          defaultSize={30}
          collapsedSize={10}
          minSize={14}
          id="left"
          order={1}
          onCollapse={handleCollapse as PanelOnCollapse}
        >
          <div className="h-full">
            <SideMenu isCollapsed={isCollapsed} />
          </div>
        </ResizablePanel>
        <ResizableHandle className="hidden md:flex" withHandle />
        <ResizablePanel id="right" order={2} defaultSize={75} minSize={70}>
          <div className="h-full pl-0">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
};

export default Main;