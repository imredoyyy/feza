import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import type { Editor, EditorEvents } from "@tiptap/core";

import { ActionButton, Button, ColorPicker } from "@/components";

import type { ToolbarButtonComponentProps } from "@/types";
import { cn } from "@/lib/utils";

const BaseLineIcon: React.FC<
  React.SVGProps<SVGSVGElement> & { color?: string }
> = ({ color, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-baseline h-4 w-4"
  >
    <path d="M4 20h16" stroke={color}></path>
    <path d="m6 16 6-12 6 12"></path>
    <path d="M8 12h8"></path>
  </svg>
);

interface ColorSelectionButtonProps {
  colors?: string[];
  tooltip?: string;
  disabled?: boolean;
  action?: ToolbarButtonComponentProps["action"];
  isActive?: ToolbarButtonComponentProps["isActive"];
  editor: Editor;
}

export const ColorSelectionButton: React.FC<ColorSelectionButtonProps> = ({
  colors,
  tooltip,
  disabled,
  action,
  isActive,
  editor,
}) => {
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(
    undefined
  );

  const onColorChange = React.useCallback(
    (color?: string) => {
      action?.(color);
    },
    [action]
  );

  const toggleColor = React.useCallback(() => {
    action?.(selectedColor);
  }, [action, selectedColor]);

  const setColor = React.useCallback((color?: string) => {
    setSelectedColor(color);
  }, []);

  React.useEffect(() => {
    const updateActiveColor = () => {
      const { color } = editor.getAttributes("textStyle");
      setSelectedColor(color);
    };

    updateActiveColor();

    const events: Array<keyof EditorEvents> = [
      "update",
      "create",
      "focus",
      "transaction",
      "selectionUpdate",
    ];

    events.forEach((event) => {
      editor.on(event, updateActiveColor);
    });

    return () => {
      events.forEach((event) => {
        editor.off(event, updateActiveColor);
      });
    };
  }, [editor]);

  return (
    <div
      className={cn(
        "flex items-center justify-center h-8 relative hover:bg-fz-muted p-2 pl-0 rounded-md w-10 group",
        isActive?.() && "bg-fz-accent"
      )}
    >
      <ActionButton
        tooltip={tooltip}
        disabled={disabled}
        action={toggleColor}
        isActive={isActive}
      >
        <BaseLineIcon color={selectedColor} />
      </ActionButton>

      <ColorPicker
        selectedColor={selectedColor}
        setSelectedColor={setColor}
        onColorChange={onColorChange}
        colors={colors}
        className="absolute right-1 top-1/2 -translate-y-1/2"
      >
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "h-8 w-3 group-hover:bg-fz-accent group-hover:text-fz-accent-foreground hover:text-fz-foreground hover:bg-transparent"
          )}
          disabled={disabled}
        >
          <ChevronDownIcon />
        </Button>
      </ColorPicker>
    </div>
  );
};
