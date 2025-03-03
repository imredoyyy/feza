import type { AnyExtension } from "@tiptap/core";
import { Extension } from "@tiptap/core";
import {
  Dropcursor,
  type DropcursorOptions,
} from "@tiptap/extension-dropcursor";
import GapCursor from "@tiptap/extension-gapcursor";

import {
  Document,
  Selection,
  Placeholder,
  TextStyle,
  ListItem,
  Paragraph,
  Text,
  type ParagraphOptions,
  type ListItemOptions,
  type TextStyleOptions,
  type PlaceholderOptions,
} from "@/extensions";

/**
 * Starter Kit options.
 */
export interface StarterKitOptions {
  /**
   * Whether to enable document extension.
   *
   * @default true
   */
  document?: boolean;

  /**
   * Whether to enable heading extension.
   *
   * @default true
   */
  heading?: boolean;

  /**
   * Whether to enable paragraph extension.
   *
   * @default true
   */
  paragraph?: Partial<ParagraphOptions> | false;

  /**
   * Whether to enable text extension.
   *
   * @default true
   */
  text?: boolean;

  /**
   * Whether to enable list item extension.
   *
   * @default true
   */
  listItem?: Partial<ListItemOptions> | false;

  /**
   * Whether to enable text style extension.
   *
   * @default true
   * */
  textStyle?: Partial<TextStyleOptions> | false;

  /**
   * Whether to enable placeholder extension.
   *
   * @default true
   * */
  placeholder?: Partial<PlaceholderOptions> | false;

  /**
   * Whether to enable selection extension.
   *
   * @default true
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selection?: any | false;

  /**
   * Whether to enable gap cursor extension.
   *
   * @default true
   */
  gapCursor?: boolean;

  /**
   * Whether to enable drop cursor extension.
   *
   * @default true
   */
  dropCursor?: Partial<DropcursorOptions> | false;
}

export const StarterKit = Extension.create<StarterKitOptions>({
  name: "starter-kit",

  addExtensions() {
    const extensions: AnyExtension[] = [];

    if (this.options.document !== false) extensions.push(Document.configure());

    if (this.options.placeholder !== false) {
      extensions.push(
        Placeholder.configure({
          placeholder: ({ node, pos, editor }) => {
            if (node?.type?.name === "columns" || node?.content?.size !== 0)
              return "";

            if (node?.type?.name === "heading") return `${node.attrs.level}`;

            if (
              node?.type?.name === "codeBlock" ||
              node?.type?.name === "table"
            )
              return "";

            if (
              editor.extensionManager.extensions.some(
                (ext) => ext.name === "slash-command"
              )
            )
              return "Press '/' for commands.";

            if (pos === 0) return "Write anything...";

            return "Write anything...";
          },
          ...this.options.placeholder,
        })
      );
    }

    if (this.options.text !== false) extensions.push(Text.configure());

    if (this.options.paragraph !== false)
      extensions.push(Paragraph.configure(this.options.paragraph));

    if (this.options.textStyle !== false)
      extensions.push(TextStyle.configure(this.options.textStyle));

    if (this.options.listItem !== false)
      extensions.push(ListItem.configure(this.options.listItem));

    if (this.options.selection !== false) extensions.push(Selection);

    if (this.options.gapCursor !== false)
      extensions.push(GapCursor.configure());

    if (this.options.dropCursor !== false)
      extensions.push(
        Dropcursor.configure({
          ...this.options.dropCursor,
          width: 2,
          class: "feza:border-input ProseMirror-dropcursor",
        })
      );

    return extensions;
  },
});
