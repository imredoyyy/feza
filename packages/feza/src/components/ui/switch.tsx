import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "feza:peer feza:data-[state=checked]:bg-primary feza:data-[state=unchecked]:bg-input feza:focus-visible:border-ring feza:focus-visible:ring-ring/50 feza:inline-flex feza:h-5 feza:w-9 feza:shrink-0 feza:items-center feza:rounded-full feza:border-2 feza:border-transparent feza:shadow-xs feza:transition-all feza:outline-none feza:focus-visible:ring-[3px] feza:disabled:cursor-not-allowed feza:disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "feza:bg-background feza:pointer-events-none feza:block feza:size-4 feza:rounded-full feza:ring-0 feza:shadow-lg feza:transition-transform feza:data-[state=checked]:translate-x-4 feza:data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
