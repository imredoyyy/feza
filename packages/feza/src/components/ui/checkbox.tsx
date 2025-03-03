import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "feza:peer feza:border-input feza:data-[state=checked]:bg-primary feza:data-[state=checked]:text-primary-foreground feza:data-[state=checked]:border-primary feza:focus-visible:border-ring feza:focus-visible:ring-ring/50 feza:aria-invalid:ring-destructive/20 feza:dark:aria-invalid:ring-destructive/40 feza:aria-invalid:border-destructive feza:size-4 feza:shrink-0 feza:rounded-[4px] feza:border feza:shadow-xs feza:transition-shadow feza:outline-none feza:focus-visible:ring-[3px] feza:disabled:cursor-not-allowed feza:disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="feza:flex feza:items-center feza:justify-center feza:text-current feza:transition-none"
      >
        <CheckIcon className="feza:size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
