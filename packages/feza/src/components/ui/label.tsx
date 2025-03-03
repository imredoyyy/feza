import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "feza:flex feza:items-center feza:gap-2 feza:text-sm feza:leading-none feza:font-medium feza:select-none feza:group-data-[disabled=true]:pointer-events-none feza:group-data-[disabled=true]:opacity-50 feza:peer-disabled:cursor-not-allowed feza:peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Label };
