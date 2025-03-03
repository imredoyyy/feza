import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "feza:inline-flex feza:items-center feza:cursor-pointer feza:justify-center feza:gap-2 feza:whitespace-nowrap feza:rounded-md feza:text-sm feza:font-medium feza:transition-[color,box-shadow] feza:disabled:pointer-events-none feza:disabled:opacity-50 feza:[&_svg]:pointer-events-none feza:[&_svg:not([class*=size-])]:size-4 feza:shrink-0 feza:[&_svg]:shrink-0 feza:outline-none feza:focus-visible:border-ring feza:focus-visible:ring-ring/50 feza:focus-visible:ring-[3px] feza:aria-invalid:ring-destructive/20 feza:dark:aria-invalid:ring-destructive/40 feza:aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "feza:bg-primary feza:text-primary-foreground feza:shadow-xs feza:hover:bg-primary/90",
        destructive:
          "feza:bg-destructive feza:text-white feza:shadow-xs feza:hover:bg-destructive/90 feza:focus-visible:ring-destructive/20 feza:dark:focus-visible:ring-destructive/40",
        outline:
          "feza:border feza:border-input feza:bg-background feza:shadow-xs feza:hover:bg-accent feza:hover:text-accent-foreground",
        secondary:
          "feza:bg-secondary feza:text-secondary-foreground feza:shadow-xs feza:hover:bg-secondary/80",
        ghost: "feza:hover:bg-accent feza:hover:text-accent-foreground",
        link: "feza:text-primary feza:underline-offset-4 feza:hover:underline",
      },
      size: {
        default: "feza:h-9 feza:px-4 feza:py-2 feza:has-[>svg]:px-3",
        sm: "feza:h-8 feza:rounded-md feza:gap-1.5 feza:px-3 feza:has-[>svg]:px-2.5",
        lg: "feza:h-10 feza:rounded-md feza:px-6 feza:has-[>svg]:px-4",
        icon: "feza:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    // @ts-expect-error string' is not assignable to type 'Ref<HTMLElement>
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
