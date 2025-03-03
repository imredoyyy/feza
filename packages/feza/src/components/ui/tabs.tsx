"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("feza:flex feza:flex-col feza:gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "feza:bg-muted feza:text-muted-foreground feza:inline-flex feza:h-9 feza:w-fit feza:items-center feza:justify-center feza:rounded-lg feza:p-1",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "feza:data-[state=active]:bg-background feza:data-[state=active]:text-foreground feza:focus-visible:border-ring feza:focus-visible:ring-ring/50 feza:focus-visible:outline-ring feza:inline-flex feza:items-center feza:justify-center feza:gap-1.5 feza:rounded-md feza:px-2 feza:py-1 feza:text-sm feza:font-medium feza:whitespace-nowrap feza:transition-[color,box-shadow] feza:focus-visible:ring-[3px] feza:focus-visible:outline-1 feza:disabled:pointer-events-none feza:disabled:opacity-50 feza:data-[state=active]:shadow-sm feza:[&_svg]:pointer-events-none feza:[&_svg]:shrink-0 feza:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("feza:flex-1 feza:outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
