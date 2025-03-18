import * as React from "react";
import { ChevronDownIcon, type LucideIcon } from "lucide-react";
import type { Editor, EditorEvents } from "@tiptap/core";

import {
  ActionButton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components";

import { getShortcutKey } from "@/utils/utils";
import type { ToolbarButtonComponentProps } from "@/types";

export interface HeadingSelectorItem {
  title: string;
  tooltip: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  level?: number;
  isActive: ToolbarButtonComponentProps["isActive"];
  action?: ToolbarButtonComponentProps["action"];
  shortcutKeys?: string[];
  disbaled?: boolean;
  default?: boolean;
}

export interface HeadingSelectorProps {
  disabled?: boolean;
  items?: HeadingSelectorItem[];
  shortcutKeys?: string[];
  maxHeight?: string | number;
  tooltip?: string;
  editor: Editor;
}

export const HeadingSelector = ({
  disabled,
  items = [],
  maxHeight,
  editor,
}: HeadingSelectorProps) => {
  const [activeItem, setActiveItem] = React.useState<
    HeadingSelectorItem | undefined
  >();

  React.useEffect(() => {
    if (!editor) return;

    const updateActiveItem = () => {
      const active = items.find((item) => item.isActive?.());
      setActiveItem(active);
    };

    updateActiveItem();

    const events: Array<keyof EditorEvents> = [
      "update",
      "create",
      "focus",
      "transaction",
      "selectionUpdate",
    ];

    events.forEach((event) => {
      editor.on(event, updateActiveItem);
    });

    return () => {
      events.forEach((event) => {
        editor.off(event, updateActiveItem);
      });
    };
  }, [items, editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disabled} asChild>
        <ActionButton
          tooltip={activeItem?.tooltip || "Text Style"}
          title={activeItem?.title || "Default"}
          disabled={disabled}
          iconOnly={false}
          className="w-auto"
        >
          <ChevronDownIcon className="h-4 w-4" />
        </ActionButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 border-fz-border"
        style={{ maxHeight }}
      >
        {items?.map((item, idx) => (
          <React.Fragment key={idx}>
            <DropdownMenuCheckboxItem
              checked={activeItem === item}
              onClick={item.action}
              className="flex items-center gap-2"
            >
              <div className="ml-1">{item.title}</div>
              {!!item.shortcutKeys?.length && (
                <DropdownMenuShortcut>
                  {item.shortcutKeys
                    ?.map((key) => getShortcutKey(key))
                    .join("+")}
                </DropdownMenuShortcut>
              )}
            </DropdownMenuCheckboxItem>
            {item.level === 0 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
