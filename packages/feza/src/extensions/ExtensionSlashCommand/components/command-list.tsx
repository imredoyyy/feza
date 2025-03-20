import React from "react";

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
  onEsc: () => void;
}

export const EditorCommandList = ({
  items,
  command,
  onEsc,
}: EditorCommandProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const commandRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, []);

  React.useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = filterCommandGroups(items, query);
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  const filterCommandGroups = (
    groups: CommandItemGroup[],
    query: string
  ): CommandItemGroup[] => {
    if (!query) return groups;

    const queryLower = query.toLowerCase();

    return groups
      .map((group) => ({
        ...group,
        commandItems: group.commandItems.filter((item) => {
          const allSearchString = [
            item.label.toLowerCase(),
            item.name.toLowerCase(),
            ...(item.searchQueries.map((q) => q.toLowerCase()) || []),
          ];
          return allSearchString.some((str) => str.includes(queryLower));
        }),
      }))
      .filter((group) => group.commandItems.length > 0);
  };

  React.useEffect(() => {
    const keys = ["ArrowUp", "ArrowDown", "Enter"];
    const onKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        e.preventDefault();

        if (commandRef.current) {
          commandRef.current.dispatchEvent(
            new KeyboardEvent("keyDown", {
              key: e.key,
              cancelable: true,
              bubbles: true,
            })
          );

          return false;
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEsc?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onEsc]);

  return (
    <Command
      shouldFilter={false}
      ref={commandRef}
      className="rounded-lg border border-fz-input shadow-sm min-w-[14.5rem]"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search..."
        ref={inputRef}
      />

      <CommandList className="max-h-[min(80vh,400px)] overflow-y-auto">
        <CommandEmpty>Nothing found.</CommandEmpty>

        {filteredItems.map((group, groupIdx) => (
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
