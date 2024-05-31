import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonMessage() {
  return (
    <div className="flex items-start space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

const SkeletonMessageList: React.FC = () => {
  return (
    <div className="relative max-h-full">
      <div
        className="h-[550px] overflow-y-auto space-y-5"
        aria-label="Message list waiting"
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonMessage key={index} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonMessageList;
