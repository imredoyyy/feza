"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "feza:bg-popover feza:text-popover-foreground feza:data-[state=open]:animate-in feza:data-[state=closed]:animate-out feza:data-[state=closed]:fade-out-0 feza:data-[state=open]:fade-in-0 feza:data-[state=closed]:zoom-out-95 feza:data-[state=open]:zoom-in-95 feza:data-[side=bottom]:slide-in-from-top-2 feza:data-[side=left]:slide-in-from-right-2 feza:data-[side=right]:slide-in-from-left-2 feza:data-[side=top]:slide-in-from-bottom-2 feza:z-50 feza:min-w-[8rem] feza:overflow-hidden feza:rounded-md feza:border feza:p-1 feza:shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "feza:focus:bg-accent feza:focus:text-accent-foreground feza:data-[variant=destructive]:text-destructive-foreground feza:data-[variant=destructive]:focus:bg-destructive/10 dark:feza:data-[variant=destructive]:focus:bg-destructive/40 feza:data-[variant=destructive]:focus:text-destructive-foreground feza:data-[variant=destructive]:*:[svg]:!text-destructive-foreground feza:[&_svg:not([class*=text-])]:text-muted-foreground feza:relative feza:flex feza:cursor-default feza:items-center feza:gap-2 feza:rounded-sm feza:px-2 feza:py-1.5 feza:text-sm feza:outline-hidden feza:select-none feza:data-[disabled]:pointer-events-none feza:data-[disabled]:opacity-50 feza:data-[inset]:pl-8 feza:[&_svg]:pointer-events-none feza:[&_svg]:shrink-0 feza:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "feza:focus:bg-accent feza:focus:text-accent-foreground feza:relative feza:flex feza:cursor-default feza:items-center feza:gap-2 feza:rounded-sm feza:py-1.5 feza:pr-2 feza:pl-8 feza:text-sm feza:outline-hidden feza:select-none feza:data-[disabled]:pointer-events-none feza:data-[disabled]:opacity-50 feza:[&_svg]:pointer-events-none feza:[&_svg]:shrink-0 feza:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="feza:pointer-events-none feza:absolute feza:left-2 feza:flex feza:size-3.5 feza:items-center feza:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="feza:size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "feza:focus:bg-accent feza:focus:text-accent-foreground feza:relative feza:flex feza:cursor-default feza:items-center feza:gap-2 feza:rounded-sm feza:py-1.5 feza:pr-2 feza:pl-8 feza:text-sm feza:outline-hidden feza:select-none feza:data-[disabled]:pointer-events-none feza:data-[disabled]:opacity-50 feza:[&_svg]:pointer-events-none feza:[&_svg]:shrink-0 feza:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      <span className="feza:pointer-events-none feza:absolute feza:left-2 feza:flex feza:size-3.5 feza:items-center feza:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="feza:size-2 feza:fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "feza:px-2 feza:py-1.5 feza:text-sm feza:font-medium feza:data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("feza:bg-border feza:-mx-1 feza:my-1 feza:h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "feza:text-muted-foreground feza:ml-auto feza:text-xs feza:tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "feza:focus:bg-accent feza:focus:text-accent-foreground feza:data-[state=open]:bg-accent feza:data-[state=open]:text-accent-foreground feza:flex feza:cursor-default feza:items-center feza:rounded-sm feza:px-2 feza:py-1.5 feza:text-sm feza:outline-hidden feza:select-none feza:data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="feza:ml-auto feza:size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "feza:bg-popover feza:text-popover-foreground feza:data-[state=open]:animate-in feza:data-[state=closed]:animate-out feza:data-[state=closed]:fade-out-0 feza:data-[state=open]:fade-in-0 feza:data-[state=closed]:zoom-out-95 feza:data-[state=open]:zoom-in-95 feza:data-[side=bottom]:slide-in-from-top-2 feza:data-[side=left]:slide-in-from-right-2 feza:data-[side=right]:slide-in-from-left-2 feza:data-[side=top]:slide-in-from-bottom-2 feza:z-50 feza:min-w-[8rem] feza:overflow-hidden feza:rounded-md feza:border feza:p-1 feza:shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
