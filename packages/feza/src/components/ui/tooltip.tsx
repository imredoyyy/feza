"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "feza:bg-primary feza:text-primary-foreground feza:animate-in feza:fade-in-0 feza:zoom-in-95 feza:data-[state=closed]:animate-out feza:data-[state=closed]:fade-out-0 feza:data-[state=closed]:zoom-out-95 feza:data-[side=bottom]:slide-in-from-top-2 feza:data-[side=left]:slide-in-from-right-2 feza:data-[side=right]:slide-in-from-left-2 feza:data-[side=top]:slide-in-from-bottom-2 feza:z-50 feza:w-fit feza:rounded-md feza:px-3 feza:py-1.5 feza:text-xs feza:text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="feza:bg-primary feza:fill-primary feza:z-50 feza:size-2.5 feza:translate-y-[calc(-50%_-_2px)] feza:rotate-45 feza:rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
