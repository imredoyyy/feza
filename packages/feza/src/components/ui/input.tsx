import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "feza:border-input feza:file:text-foreground feza:placeholder:text-muted-foreground selection:feza:bg-primary selection:feza:text-primary-foreground feza:flex feza:h-9 feza:w-full feza:min-w-0 feza:rounded-md feza:border feza:bg-transparent feza:px-3 feza:py-1 feza:text-base feza:shadow-xs feza:transition-[color,box-shadow] feza:outline-none feza:file:inline-flex feza:file:h-7 feza:file:border-0 feza:file:bg-transparent feza:file:text-sm feza:file:font-medium feza:disabled:pointer-events-none feza:disabled:cursor-not-allowed feza:disabled:opacity-50 feza:md:text-sm",
        "feza:focus-visible:border-ring feza:focus-visible:ring-ring/50 feza:focus-visible:ring-[3px]",
        "feza:aria-invalid:ring-destructive/20 feza:dark:aria-invalid:ring-destructive/40 feza:aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
