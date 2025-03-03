import * as React from "react";
import type { Editor } from "@tiptap/core";

import {
  ActionButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import { LinkEditor } from "./link-editor";

import type { ToolbarButtonComponentProps } from "@/types";

interface LinkCreationPopoverProps extends ToolbarButtonComponentProps {
  editor: Editor;
  disabled?: boolean;
}

export const LinkCreationPopover = ({
  editor,
  action,
  tooltip,
  isActive,
  disabled,
  icon,
  shortcutKeys,
}: LinkCreationPopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const onLinkSave = (link: string, text?: string, openInNewTab?: boolean) => {
    if (action) {
      action({ link, text, openInNewTab });
      setIsPopoverOpen(false);
    }
  };

  const handleTriggerClick = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <div onClick={handleTriggerClick}>
          <ActionButton
            icon={icon}
            tooltip={tooltip}
            isActive={isActive}
            shortcutKeys={shortcutKeys}
            disabled={disabled}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        hideWhenDetached
        align="start"
        side="bottom"
        className="feza:w-full feza:border-border"
        sideOffset={5}
      >
        <LinkEditor editor={editor} onLinkSave={onLinkSave} />
      </PopoverContent>
    </Popover>
  );
};
