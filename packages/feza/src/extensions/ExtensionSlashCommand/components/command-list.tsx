import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components";

import type {
  CommandItemGroup,
  CommandItem as CommandItemProps,
} from "@/types";

interface EditorCommandProps {
  items: CommandItemGroup[];
  command: (item: CommandItemProps) => void;
}

export const EditorCommandList = ({ items, command }: EditorCommandProps) => {
  return (
    <Command className="rounded-lg border border-fz-input shadow-sm min-w-[14.5rem]">
      <CommandInput placeholder="Search..." />

      <CommandList className="max-h-[min(80vh,400px)] overflow-y-auto">
        <CommandEmpty>Nothing found.</CommandEmpty>

        {items.map((group, groupIdx) => (
          <CommandGroup key={`command-group-${groupIdx}`} heading={group.label}>
            {group.commandItems.map((item, commandIdx) => (
              <CommandItem
                key={`command-item-${commandIdx}`}
                onSelect={() => command(item)}
                className="flex items-center gap-2 transition-colors duration-200"
              >
                {item.icon && (
                  <span className="inline-block rounded-md p-2 border-fz-muted border bg-fz-background">
                    <item.icon className="h-4 w-4" />
                  </span>
                )}
                <div className="space-y-0.5">
                  <p className="capitalize">{item.label}</p>
                  <span className="block text-xs text-fz-muted-foreground normal-case">
                    {item.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </Command>
  );
};
