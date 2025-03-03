import * as React from "react";
import type { Editor } from "@tiptap/core";

import type { ToolbarItem, ToolbarProps } from "@/types";
import { Separator } from "@/components";
import { isFunction } from "@/utils/utils";

/**
 * Props for the Toolbar component.
 */
export interface ToolbarComponentProps {
  /** The Tiptap editor instance */
  editor: Editor | null;
  /** Whether the toolbar should be disabled */
  disabled?: boolean;
  /** Custom toolbar rendering options */
  toolbar?: ToolbarProps;
}

/**
 * Renders the toolbar for the editor.
 */
const Toolbar = ({ editor, disabled, toolbar }: ToolbarComponentProps) => {
  const toolbarItems = React.useMemo(() => {
    // Retrieve and sort extensions based on their order
    const sortedExtensions = [
      ...(editor?.extensionManager.extensions ?? []),
    ].sort((a, b) => (a.options.sort ?? -1) - (b.options.sort ?? -1));

    let items: ToolbarItem[] = [];

    for (const extension of sortedExtensions) {
      const {
        createToolbarButton,
        showInToolbar = true,
        showDividerAfter = false,
        showDividerBefore = false,
      } = extension.options;

      if (
        !createToolbarButton ||
        !isFunction(createToolbarButton) ||
        !showInToolbar
      ) {
        continue;
      }

      // Generate button configuration
      const buttons = createToolbarButton({ editor, extension });

      if (Array.isArray(buttons)) {
        const mappedButtons: ToolbarItem[] = buttons.map(
          (buttonConfig, index) => ({
            button: buttonConfig,
            showDividerAfter:
              index === buttons.length - 1 ? showDividerAfter : false,
            showDividerBefore: index === 0 ? showDividerBefore : false,
            extensionType: extension.type,
            extensionName: extension.name,
          })
        );
        items = [...items, ...mappedButtons];
        continue;
      }

      items.push({
        button: buttons,
        showDividerAfter,
        showDividerBefore,
        extensionType: extension.type,
        extensionName: extension.name,
      });
    }

    return items;
  }, [editor]);

  const containerWrapper = React.useCallback(
    (content: React.ReactNode) => (
      <div
        className="feza:py-2 feza:px-1 feza:border-b feza:border-b-input feza:toolbar-container"
        style={{
          pointerEvents: disabled ? "none" : "auto",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <div className="feza:relative feza:flex feza:flex-wrap feza:h-auto feza:gap-1 feza:toolbar">
          {content}
        </div>
      </div>
    ),
    [disabled]
  );

  const buttonElements = React.useMemo(
    () =>
      toolbarItems.map((item, index) => {
        const ButtonComponent = item.button.component;

        return (
          <div
            className="feza:flex feza:items-center"
            key={`toolbar-item-${index}`}
          >
            {item.showDividerBefore && (
              <Separator
                orientation="vertical"
                className="feza:data-[orientation=vertical]:h-4 feza:mx-2.5"
              />
            )}

            <ButtonComponent
              {...item.button.componentProps}
              disabled={disabled || item?.button?.componentProps?.disabled}
            />

            {item.showDividerAfter && (
              <Separator
                orientation="vertical"
                className="feza:data-[orientation=vertical]:h-4 feza:mx-2.5"
              />
            )}
          </div>
        );
      }),
    [toolbarItems, disabled]
  );

  if (!editor) return null;

  if (toolbar?.render) {
    return toolbar.render(
      { editor, disabled: disabled || false },
      toolbarItems,
      buttonElements,
      containerWrapper
    );
  }

  return containerWrapper(buttonElements);
};

export { Toolbar };
