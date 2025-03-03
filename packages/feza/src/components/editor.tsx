import * as React from "react";
import type { AnyExtension } from "@tiptap/core";
import {
  useEditor,
  EditorContent,
  type EditorProviderProps,
  type JSONContent,
} from "@tiptap/react";
import "katex/dist/katex.min.css";

import { TooltipProvider } from "@/components";
import { Toolbar } from "./toolbar";
import type { ToolbarProps, BubbleMenuProps } from "@/types";
import { cn } from "@/lib/utils";
import { BubbleMenu } from "./bubble-menu";
import "../styles/index.css";

export interface EditorProps {
  /**
   * The extensions to use for the editor.
   */
  extensions: AnyExtension[];
  /**
   * Maximum width.
   */
  maxWidth?: string | number;
  /**
   * Minimum width
   */
  minWidth?: string | number;
  /**
   * Maximum height
   */
  maxHeight?: string | number;
  /**
   * Minimum height
   */
  minHeight?: string | number;
  /**
   * The class name to use for the editor wrapper.
   */
  className?: string;
  /**
   * The class name to use for the editor.
   */
  editorClassName?: string;
  /**
   * Editor props.
   */
  editorProps?: Omit<EditorProviderProps, "content">;
  /**
   * Whether the editor is disabled.
   */
  disabled?: boolean;
  /**
   * Toolbar props.
   */
  toolbar?: ToolbarProps;
  /**
   * Whether to hide the toolbar.
   */
  hideToolbar?: boolean;
  /**
   * Initial content to set in the editor.
   */
  initialContent?: JSONContent;
  /**
   * Bubble menu props.
   */
  bubbleMenu?: BubbleMenuProps;
  /**
   * Whether to hide the bubble menu.
   */
  hideBubbleMenu?: boolean;
}

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      extensions,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      editorProps = {},
      disabled,
      className,
      toolbar,
      initialContent,
      bubbleMenu,
      hideBubbleMenu,
      hideToolbar,
      editorClassName,
      ...props
    },
    ref
  ) => {
    const configuredExtensions = React.useMemo(() => {
      return extensions.map((ext, index) =>
        ext.configure({
          ...ext.options,
          sort: index,
        })
      );
    }, [extensions]);

    const editor = useEditor({
      extensions: configuredExtensions,
      content: initialContent,
      editable: !disabled,
      immediatelyRender: false,
      ...editorProps,
    });

    return (
      <TooltipProvider delayDuration={200} disableHoverableContent>
        <div
          className={cn(
            "feza:flex feza:flex-col feza:w-full feza:rounded-lg feza:border feza:border-input",
            className
          )}
          style={{ maxWidth, maxHeight, minWidth, minHeight }}
        >
          {!hideToolbar && (
            <Toolbar editor={editor} toolbar={toolbar} disabled={disabled} />
          )}
          <div className="feza:p-2 feza:editor-content-wrapper">
            <EditorContent
              ref={ref}
              editor={editor}
              className={cn(editorClassName)}
              disabled={disabled}
              {...props}
            />
            {!hideBubbleMenu && (
              <BubbleMenu
                bubbleMenu={bubbleMenu}
                editor={editor!}
                disabled={disabled}
              />
            )}
          </div>
        </div>
      </TooltipProvider>
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
