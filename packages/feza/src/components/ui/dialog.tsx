import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "feza:data-[state=open]:animate-in feza:data-[state=closed]:animate-out feza:data-[state=closed]:fade-out-0 feza:data-[state=open]:fade-in-0 feza:fixed feza:inset-0 feza:z-50 feza:bg-black/80",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "feza:bg-background feza:data-[state=open]:animate-in feza:data-[state=closed]:animate-out feza:data-[state=closed]:fade-out-0 feza:data-[state=open]:fade-in-0 feza:data-[state=closed]:zoom-out-95 feza:data-[state=open]:zoom-in-95 feza:fixed feza:top-[50%] feza:left-[50%] feza:z-50 feza:grid feza:w-full feza:max-w-[calc(100%-2rem)] feza:translate-x-[-50%] feza:translate-y-[-50%] feza:gap-4 feza:rounded-lg feza:border feza:p-6 feza:shadow-lg feza:duration-200 feza:sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="feza:ring-offset-background feza:focus:ring-ring feza:data-[state=open]:bg-accent feza:data-[state=open]:text-muted-foreground feza:absolute feza:top-4 feza:right-4 feza:rounded-xs feza:opacity-70 feza:transition-opacity feza:hover:opacity-100 feza:focus:ring-2 feza:focus:ring-offset-2 feza:focus:outline-hidden feza:disabled:pointer-events-none feza:[&_svg]:pointer-events-none feza:[&_svg]:shrink-0 feza:[&_svg:not([class*=size-])]:size-4">
          <XIcon />
          <span className="feza:sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "feza:flex feza:flex-col feza:gap-2 feza:text-center feza:sm:text-left",
        className
      )}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "feza:flex feza:flex-col-reverse feza:gap-2 feza:sm:flex-row feza:sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "feza:text-lg feza:leading-none feza:font-semibold",
        className
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("feza:text-muted-foreground feza:text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
