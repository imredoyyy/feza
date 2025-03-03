import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "feza:border-input feza:cursor-pointer feza:data-[placeholder]:text-muted-foreground feza:[&_svg:not([class*=text-])]:text-muted-foreground feza:focus-visible:border-ring feza:focus-visible:ring-ring/50 feza:aria-invalid:ring-destructive/20 feza:dark:aria-invalid:ring-destructive/40 feza:aria-invalid:border-destructive feza:flex feza:h-9 feza:w-full feza:items-center feza:justify-between feza:gap-2 feza:rounded-md feza:border feza:bg-transparent feza:px-3 feza:py-2 feza:text-sm feza:whitespace-nowrap feza:shadow-xs feza:transition-[color,box-shadow] feza:outline-none feza:focus-visible:ring-[3px] feza:disabled:cursor-not-allowed feza:disabled:opacity-50 feza:*:data-[slot=select-value]:line-clamp-1 feza:*:data-[slot=select-value]:flex feza:*:data-[slot=select-value]:items-center feza:*:data-[slot=select-value]:gap-2 feza:[&_svg]:pointer-events-none feza:[&_svg]:shrink-0 feza:[&_svg:not([class*=size-])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="feza:size-4 feza:opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "feza:bg-popover feza:text-popover-foreground feza:data-[state=open]:animate-in feza:data-[state=closed]:animate-out feza:data-[state=closed]:fade-out-0 feza:data-[state=open]:fade-in-0 feza:data-[state=closed]:zoom-out-95 feza:data-[state=open]:zoom-in-95 feza:data-[side=bottom]:slide-in-from-top-2 feza:data-[side=left]:slide-in-from-right-2 feza:data-[side=right]:slide-in-from-left-2 feza:data-[side=top]:slide-in-from-bottom-2 feza:relative feza:z-50 feza:max-h-96 feza:min-w-[8rem] feza:overflow-hidden feza:rounded-md feza:border feza:shadow-md",
          position === "popper" &&
            "feza:data-[side=bottom]:translate-y-1 feza:data-[side=left]:-translate-x-1 feza:data-[side=right]:translate-x-1 feza:data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "feza:p-1",
            position === "popper" &&
              "feza:h-[var(--radix-select-trigger-height)] feza:w-full feza:min-w-[var(--radix-select-trigger-width)] feza:scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn(
        "feza:px-2 feza:py-1.5 feza:text-sm feza:font-medium",
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "feza:focus:bg-accent feza:focus:text-accent-foreground feza:[&_svg:not([class*=text-])]:text-muted-foreground feza:relative feza:flex feza:w-full feza:cursor-default feza:items-center feza:gap-2 feza:rounded-sm feza:py-1.5 feza:pr-8 feza:pl-2 feza:text-sm feza:outline-hidden feza:select-none feza:data-[disabled]:pointer-events-none feza:data-[disabled]:opacity-50 feza:[&_svg]:pointer-events-none feza:[&_svg]:shrink-0 feza:[&_svg:not([class*=size-])]:size-4 feza:*:[span]:last:flex feza:*:[span]:last:items-center feza:*:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="feza:absolute feza:right-2 feza:flex feza:size-3.5 feza:items-center feza:justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="feza:size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "feza:bg-border feza:pointer-events-none feza:-mx-1 feza:my-1 feza:h-px",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "feza:flex feza:cursor-default feza:items-center feza:justify-center feza:py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="feza:size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "feza:flex feza:cursor-default feza:items-center feza:justify-center feza:py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="feza:size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
