"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "feza:bg-popover feza:text-popover-foreground feza:flex feza:h-full feza:w-full feza:flex-col feza:overflow-hidden feza:rounded-md",
        className
      )}
      {...props}
    />
  );
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="feza:sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent className="feza:overflow-hidden feza:p-0">
        <Command className="feza:[&_[cmdk-group-heading]]:text-muted-foreground feza:**:data-[slot=command-input-wrapper]:h-12 feza:[&_[cmdk-group-heading]]:px-2 feza:[&_[cmdk-group-heading]]:font-medium feza:[&_[cmdk-group]]:px-2 feza:[&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 feza:[&_[cmdk-input-wrapper]_svg]:h-5 feza:[&_[cmdk-input-wrapper]_svg]:w-5 feza:[&_[cmdk-input]]:h-12 feza:[&_[cmdk-item]]:px-2 feza:[&_[cmdk-item]]:py-3 feza:[&_[cmdk-item]_svg]:h-5 feza:[&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="feza:flex feza:h-9 feza:items-center feza:gap-2 feza:border-b feza:px-3"
    >
      <SearchIcon className="feza:size-4 feza:shrink-0 feza:opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "feza:placeholder:text-muted-foreground feza:flex feza:h-10 feza:w-full feza:rounded-md feza:bg-transparent feza:py-3 feza:text-sm feza:outline-hidden feza:disabled:cursor-not-allowed feza:disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "feza:max-h-[300px] feza:scroll-py-1 feza:overflow-x-hidden feza:overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}

function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="feza:py-6 feza:text-center feza:text-sm"
      {...props}
    />
  );
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "feza:text-foreground feza:[&_[cmdk-group-heading]]:text-muted-foreground feza:overflow-hidden feza:p-1 feza:[&_[cmdk-group-heading]]:px-2 feza:[&_[cmdk-group-heading]]:py-1.5 feza:[&_[cmdk-group-heading]]:text-xs feza:[&_[cmdk-group-heading]]:font-medium",
        className
      )}
      {...props}
    />
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("feza:bg-border feza:-mx-1 feza:h-px", className)}
      {...props}
    />
  );
}

function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "feza:data-[selected=true]:bg-accent feza:data-[selected=true]:text-accent-foreground feza:[&_svg:not([class*=text-])]:text-muted-foreground feza:relative feza:flex feza:cursor-default feza:items-center feza:gap-2 feza:rounded-sm feza:px-2 feza:py-1.5 feza:text-sm feza:outline-hidden feza:select-none feza:data-[disabled=true]:pointer-events-none feza:data-[disabled=true]:opacity-50 feza:[&_svg]:pointer-events-none feza:[&_svg]:shrink-0 feza:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "feza:text-muted-foreground feza:ml-auto feza:text-xs feza:tracking-widest",
        className
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
