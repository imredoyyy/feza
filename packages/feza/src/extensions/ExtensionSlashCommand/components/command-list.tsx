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
    <Command className="feza:rounded-lg feza:border feza:border-input feza:shadow-sm feza:min-w-[14.5rem]">
      <CommandInput placeholder="Search..." />

      <CommandList className="feza:max-h-[min(80vh,400px)] feza:overflow-y-auto">
        <CommandEmpty>Nothing found.</CommandEmpty>

        {items.map((group, groupIdx) => (
          <CommandGroup key={`command-group-${groupIdx}`} heading={group.label}>
            {group.commandItems.map((item, commandIdx) => (
              <CommandItem
                key={`command-item-${commandIdx}`}
                onSelect={() => command(item)}
                className="feza:flex feza:items-center feza:gap-2 feza:transition-colors feza:duration-200"
              >
                {item.icon && (
                  <span className="feza:inline-block feza:rounded-md feza:p-2 feza:border-muted feza:border feza:bg-background">
                    <item.icon className="feza:h-4 feza:w-4" />
                  </span>
                )}
                <div className="feza:space-y-0.5">
                  <p className="feza:capitalize">{item.label}</p>
                  <span className="feza:block feza:text-xs feza:text-muted-foreground feza:normal-case">
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
