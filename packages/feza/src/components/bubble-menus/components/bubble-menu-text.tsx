import { useMemo } from "react";
import { TextSelection } from "@tiptap/pm/state";
import { BubbleMenu } from "@tiptap/react";
import type { Editor } from "@tiptap/core";

import { Separator, bubbleMenuText } from "@/components";
import { ToolbarButtonProps } from "@/types";

interface BubbleMenuTextProps {
  editor: Editor;
  disabled?: boolean;
}

interface ItemProps extends BubbleMenuTextProps {
  item: ToolbarButtonProps;
}

const tippyOptions = {
  maxWidth: "auto",
  zIndex: 20,
  moveTransition: "transform 150ms ease-out",
};

const Item = ({ editor, item, disabled }: ItemProps) => {
  const Component = item?.component;

  if (!Component) return null;

  return (
    <Component
      {...item?.componentProps}
      editor={editor}
      disabled={disabled || item?.componentProps?.disabled}
    />
  );
};

export const BubbleMenuText = ({ editor, disabled }: BubbleMenuTextProps) => {
  const shouldShow = ({ editor }: { editor: Editor }) => {
    const { selection } = editor.view.state;
    const { $from, to } = selection;

    if ($from.pos === to) return false;

    return selection instanceof TextSelection;
  };

  const items = useMemo(() => {
    if (disabled) return [];

    const menuItems = bubbleMenuText(editor);
    return menuItems;
  }, [disabled, editor]);

  return (
    <BubbleMenu
      shouldShow={shouldShow}
      editor={editor}
      tippyOptions={{
        ...tippyOptions,
        appendTo: "parent",
      }}
    >
      {items.length > 0 ? (
        <div className="feza:px-3 feza:py-2 feza:transition-all feza:border feza:border-input feza:rounded-md feza:shadow-md feza:pointer-events-auto feza:select-none feza:bg-background feza:w-full">
          <div className="feza:flex feza:items-center feza:gap-2 feza:flex-nowrap feza:justify-start feza:whitespace-nowrap">
            {items.map((item, i) => {
              if (item?.type === "divider") {
                return (
                  <Separator
                    key={`bubbleMenu-divider-${i}`}
                    orientation="vertical"
                    className="feza:mx-1 feza:my-2 feza:data-[orientation=vertical]:h-4"
                  />
                );
              }
              return (
                <Item
                  key={`bubbleMenu-text-${i}`}
                  item={item}
                  disabled={disabled}
                  editor={editor}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </BubbleMenu>
  );
};
