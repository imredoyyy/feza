import * as React from "react";
import type { Editor, EditorEvents } from "@tiptap/core";
import { ChevronDownIcon, type LucideIcon } from "lucide-react";

import {
  ActionButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Toggle,
} from "@/components";

import type { ToolbarButtonComponentProps } from "@/types";

import { getShortcutKey } from "@/utils/utils";

export interface TextAlignButtonItem {
  title: string;
  tooltip?: string;
  isActive: ToolbarButtonComponentProps["isActive"];
  action?: ToolbarButtonComponentProps["action"];
  shortcutKeys?: string[];
  disabled?: boolean;
  showDividerAfter?: boolean;
  default?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
}

export interface TextAlignButtonProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  tooltip?: string;
  items: TextAlignButtonItem[];
  editor: Editor;
}

export const TextAlignButton = ({
  icon: ButtonIcon,
  tooltip,
  items,
  editor,
}: TextAlignButtonProps) => {
  const [activeItem, setActiveItem] = React.useState<
    TextAlignButtonItem | undefined
  >(undefined);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!editor) return;

    const updateActiveItem = () => {
      const active = items.find((item) => item.isActive?.());
      setActiveItem(active);
    };

    const events: Array<keyof EditorEvents> = [
      "update",
      "create",
      "focus",
      "selectionUpdate",
    ];

    updateActiveItem();

    events.forEach((event) => {
      editor.on(event, updateActiveItem);
    });

    return () => {
      events.forEach((event) => {
        editor.off(event, updateActiveItem);
      });
    };
  }, [items, editor]);

  const toggleTextAlign = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ActionButton
          icon={ButtonIcon}
          tooltip={tooltip || "Align"}
          action={toggleTextAlign}
          className="w-auto"
        >
          <div>
            <ChevronDownIcon />
          </div>
        </ActionButton>
      </PopoverTrigger>

      <PopoverContent
        className="w-full min-w-4 p-1 flex flex-row gap-1 border-fz-border"
        align="start"
        side="bottom"
      >
        {items.map((item, idx) => {
          const ItemIcon = item.icon;
          return (
            <Tooltip key={`text-align-${idx}`}>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  onClick={item.action}
                  pressed={activeItem === item}
                  data-state={activeItem === item ? "on" : "off"}
                >
                  {ItemIcon && <ItemIcon className="size-4" />}
                  <span className="sr-only">{item.title}</span>
                </Toggle>
              </TooltipTrigger>

              <TooltipContent className="flex flex-col items-center">
                <span>{item.title}</span>
                {!!item.shortcutKeys?.length && (
                  <span>
                    {item.shortcutKeys
                      .map((key) => getShortcutKey(key))
                      .join(" + ")}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
