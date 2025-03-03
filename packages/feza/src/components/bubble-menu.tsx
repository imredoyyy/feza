import { useMemo } from "react";
import type { Editor } from "@tiptap/core";

import { BubbleMenuImage, BubbleMenuLink, BubbleMenuText } from "@/components";
import type { BubbleMenuProps } from "@/types";

interface BubbleMenuComponentProps {
  editor: Editor;
  disabled?: boolean;
  bubbleMenu?: BubbleMenuProps;
}

export const BubbleMenu = ({
  editor,
  disabled,
  bubbleMenu,
}: BubbleMenuComponentProps) => {
  const extensionNames = useMemo(
    () =>
      // Get all extensions and filter out duplicates
      editor &&
      editor?.extensionManager?.extensions
        ?.map((ext) => ext.name)
        .filter(Boolean),
    [editor]
  );

  if (!extensionNames) return null;

  const renderBubbleMenuItems = () => [
    extensionNames.includes("link") && !bubbleMenu?.linkConfig?.hidden && (
      <BubbleMenuLink key="link" editor={editor} disabled={disabled} />
    ),
    extensionNames.includes("image") && !bubbleMenu?.imageConfig?.hidden && (
      <BubbleMenuImage key="image" editor={editor} disabled={disabled} />
    ),
    !bubbleMenu?.textConfig?.hidden && (
      <BubbleMenuText key="text" editor={editor} disabled={disabled} />
    ),
  ];

  if (bubbleMenu?.render) {
    return bubbleMenu.render(
      { editor, disabled: disabled || false, bubbleMenu },
      renderBubbleMenuItems()
    );
  }

  return renderBubbleMenuItems().filter(Boolean);
};
