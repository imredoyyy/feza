import * as React from "react";
import { ChevronDownIcon, type LucideIcon } from "lucide-react";
import type { Editor } from "@tiptap/core";

import { ActionButton, Button, ColorPicker } from "@/components";

import type { ToolbarButtonComponentProps } from "@/types";
import { cn } from "@/lib/utils";

interface HighlighterButtonProps {
  colors?: string[];
  tooltip?: string;
  disabled?: boolean;
  action?: ToolbarButtonComponentProps["action"];
  isActive?: ToolbarButtonComponentProps["isActive"];
  shortcutKeys?: string[];
  editor: Editor;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
}

export const HighlighterButton = ({
  colors,
  tooltip,
  disabled,
  action,
  isActive,
  shortcutKeys,
  editor,
  icon,
}: HighlighterButtonProps) => {
  const [highlightedColor, setHighlightedColor] = React.useState<
    string | undefined
  >(undefined);

  const onColorChange = React.useCallback(
    (color?: string) => {
      action?.(color);
    },
    [action]
  );

  const toggleColor = React.useCallback(() => {
    action?.(highlightedColor);
  }, [action, highlightedColor]);

  const setColor = React.useCallback((color?: string) => {
    setHighlightedColor(color);
  }, []);

  const updateHighlight = React.useCallback(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const { state } = editor;
    const { schema } = state;

    if (from !== to || from > 0) {
      const highlightType = schema.marks.highlight;
      if (!highlightType) return;

      const $pos = state.doc.resolve(from);
      const storedMarks = state.storedMarks || $pos.marks();

      const mark = storedMarks.find((mark) => mark.type === highlightType);
      if (mark && mark.attrs.color) {
        setHighlightedColor(mark.attrs.color);
        return;
      }
    }
  }, [editor]);

  React.useEffect(() => {
    if (!editor) return;

    const onUpdate = () => {
      updateHighlight();
    };

    editor.on("update", onUpdate);
    editor.on("selectionUpdate", onUpdate);

    onUpdate();

    return () => {
      editor.off("update", onUpdate);
      editor.off("selectionUpdate", onUpdate);
    };
  }, [editor, updateHighlight]);

  return (
    <div
      className={cn(
        "flex items-center justify-center h-8 relative hover:bg-fz-muted p-2 pl-0 rounded-md w-10",
        isActive?.() && "bg-fz-accent"
      )}
    >
      <ActionButton
        tooltip={tooltip || "Highlight"}
        disabled={disabled}
        icon={icon}
        action={toggleColor}
        shortcutKeys={shortcutKeys}
        isActive={isActive}
      />

      <ColorPicker
        selectedColor={highlightedColor}
        setSelectedColor={setColor}
        colors={colors}
        onColorChange={onColorChange}
        className="absolute right-1 top-1/2 -translate-y-1/2"
      >
        <Button
          size="icon"
          variant="ghost"
          disabled={disabled}
          className={cn("h-8 w-3 bg-transparent hover:bg-transparent")}
        >
          <ChevronDownIcon className="size-4" />
        </Button>
      </ColorPicker>
    </div>
  );
};
