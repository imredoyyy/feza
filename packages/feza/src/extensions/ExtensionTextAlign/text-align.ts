import {
  TextAlign as TextAlignExtension,
  type TextAlignOptions as TextAlignExtensionOptions,
} from "@tiptap/extension-text-align";
import {
  AlignCenterIcon,
  AlignRightIcon,
  AlignLeftIcon,
  AlignJustifyIcon,
} from "lucide-react";

import { TextAlignButton } from "./components/text-align-button";
import { ExtensionOptions } from "@/types";

type Alignment = "left" | "center" | "right" | "justify";

export interface TextAlignOptions
  extends TextAlignExtensionOptions,
    ExtensionOptions<TextAlignOptions> {
  /**
   * List of available text alignment options.
   * @default ["left", "center", "right", "justify"]
   */
  alignments: Alignment[];
}

export const TextAlign = TextAlignExtension.extend<TextAlignOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      types: ["heading", "paragraph", "title", "list_item"],
      createToolbarButton: ({ editor, extension }) => {
        const alignments = extension.options?.alignments || [];
        const shortcutKeysMap = {
          left: ["shift", "alt", "l"],
          center: ["shift", "alt", "c"],
          right: ["shift", "alt", "r"],
          justify: ["shift", "alt", "j"],
        };
        const iconMap = {
          left: AlignLeftIcon,
          center: AlignCenterIcon,
          right: AlignRightIcon,
          justify: AlignJustifyIcon,
        };

        return {
          component: TextAlignButton,
          componentProps: {
            isActive: () =>
              alignments.some((alignment) =>
                editor.isActive({ textAlign: alignment })
              ) || false,
            icon: AlignJustifyIcon,
            tooltip: "Text Align",
            editor,
            items: [
              ...alignments.map((item) => ({
                title: item.charAt(0).toUpperCase() + item.slice(1),
                tooltip: item,
                disabled: !editor.can?.()?.setTextAlign?.(item),
                isActive: () => editor.isActive({ textAlign: item }) || false,
                action: () => editor.commands?.setTextAlign?.(item),
                icon: iconMap[item],
                shortcutKeys: shortcutKeysMap[item],
              })),
            ],
          },
        };
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Shift-Alt-L": () => this.editor.commands.setTextAlign("left"),
      "Shift-Alt-C": () => this.editor.commands.setTextAlign("center"),
      "Shift-Alt-R": () => this.editor.commands.setTextAlign("right"),
      "Shift-Alt-J": () => this.editor.commands.setTextAlign("justify"),
    };
  },
});
