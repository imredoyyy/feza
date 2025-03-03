import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "feza:inline-flex feza:items-center feza:justify-center feza:gap-2 feza:rounded-md feza:text-sm feza:font-medium feza:hover:bg-muted feza:hover:text-muted-foreground feza:disabled:pointer-events-none feza:disabled:opacity-50 feza:data-[state=on]:bg-accent feza:data-[state=on]:text-accent-foreground feza:[&_svg]:pointer-events-none feza:[&_svg:not([class*=size-])]:size-4 feza:[&_svg]:shrink-0 feza:focus-visible:border-ring feza:focus-visible:ring-ring/50 feza:focus-visible:ring-[3px] feza:outline-none feza:transition-[color,box-shadow] feza:aria-invalid:ring-destructive/20 feza:dark:aria-invalid:ring-destructive/40 feza:aria-invalid:border-destructive feza:whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "feza:bg-transparent",
        outline:
          "feza:border feza:border-input feza:bg-transparent feza:shadow-xs feza:hover:bg-accent feza:hover:text-accent-foreground",
      },
      size: {
        default: "feza:h-9 feza:px-2 feza:min-w-9",
        sm: "feza:h-8 feza:px-1.5 feza:min-w-8",
        lg: "feza:h-10 feza:px-2.5 feza:min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
