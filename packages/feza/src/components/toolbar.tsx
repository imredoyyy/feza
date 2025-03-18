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
        className="py-2 px-1 border-b border-b-input toolbar-container overflow-x-hidden"
        style={{
          pointerEvents: disabled ? "none" : "auto",
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <div className="h-auto toolbar flex items-center gap-0.5 overflow-x-auto md:flex-wrap">
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
            className="flex items-center shrink-0"
            key={`toolbar-item-${index}`}
          >
            {item.showDividerBefore && (
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4 mx-2.5"
              />
            )}

            <ButtonComponent
              {...item.button.componentProps}
              disabled={disabled || item?.button?.componentProps?.disabled}
            />

            {item.showDividerAfter && (
              <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4 mx-2.5"
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
