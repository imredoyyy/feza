"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "feza:bg-popover feza:text-popover-foreground feza:data-[state=open]:animate-in feza:data-[state=closed]:animate-out feza:data-[state=closed]:fade-out-0 feza:data-[state=open]:fade-in-0 feza:data-[state=closed]:zoom-out-95 feza:data-[state=open]:zoom-in-95 feza:data-[side=bottom]:slide-in-from-top-2 feza:data-[side=left]:slide-in-from-right-2 feza:data-[side=right]:slide-in-from-left-2 feza:data-[side=top]:slide-in-from-bottom-2 feza:z-50 feza:w-72 feza:rounded-md feza:border feza:p-4 feza:shadow-md feza:outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
