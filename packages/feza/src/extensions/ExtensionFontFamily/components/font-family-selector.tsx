import * as React from "react";
import type { LucideIcon } from "lucide-react";
import type { Editor, EditorEvents } from "@tiptap/core";

import {
  ActionButton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components";

import type { ToolbarButtonComponentProps } from "@/types";

import { truncateString } from "@/utils/utils";

export interface FontFamilySelectorItem {
  title: string;
  tooltip: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  font?: string;
  isActive: ToolbarButtonComponentProps["isActive"];
  action?: ToolbarButtonComponentProps["action"];
  shortcutKeys?: string[];
  disabled?: boolean;
  showDividerAfter?: boolean;
  default?: boolean;
}

export interface FontFamilySelectorProps {
  disbaled?: boolean;
  items?: FontFamilySelectorItem[];
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  maxHeight?: string | number;
  editor: Editor;
  tooltip?: string;
}

export const FontFamilySelector = ({
  items = [],
  maxHeight,
  disbaled,
  editor,
  tooltip,
  icon,
}: FontFamilySelectorProps) => {
  const [activeFont, setActiveFont] = React.useState<
    FontFamilySelectorItem | undefined
  >(undefined);

  React.useEffect(() => {
    const updateActiveFont = () => {
      const active = items.find((font) => font.isActive?.());
      setActiveFont(active);
    };

    updateActiveFont();

    const events: Array<keyof EditorEvents> = [
      "update",
      "create",
      "focus",
      "transaction",
      "selectionUpdate",
    ];

    events.forEach((event) => {
      editor.on(event, updateActiveFont);
    });

    return () => {
      events.forEach((event) => {
        editor.off(event, updateActiveFont);
      });
    };
  }, [items, editor]);

  const fontFamily = React.useMemo(() => {
    const font = activeFont?.default ? "inherit" : activeFont?.font;
    return font;
  }, [activeFont]);

  const fontNameRegex = /["'](.*?)["']/g;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={disbaled} asChild>
        <ActionButton
          disabled={disbaled}
          icon={icon}
          tooltip={tooltip}
          title={truncateString({
            str: activeFont?.title.replace(fontNameRegex, "$1") || "Default",
            length: 9,
          })}
          iconOnly={false}
          className="w-[6.25rem] capitalize"
          style={{
            fontFamily,
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-60 border-fz-border"
        style={{ maxHeight }}
      >
        {items.map((font, idx) => (
          <React.Fragment key={idx}>
            <DropdownMenuCheckboxItem
              checked={activeFont === font}
              onClick={font.action}
            >
              <div
                className="ml-1 h-full capitalize"
                style={{
                  fontFamily: font.default ? "inherit" : font.font,
                }}
              >
                {font.title.replace(fontNameRegex, "$1")}
              </div>
            </DropdownMenuCheckboxItem>

            {font.title === "Default" && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
