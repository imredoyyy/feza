import {
  Blockquote as BlockquoteExtension,
  type BlockquoteOptions as BlockquoteExtensionOptions,
} from "@tiptap/extension-blockquote";
import { QuoteIcon } from "lucide-react";

import { ActionButton } from "@/components";

import type { ExtensionOptions } from "@/types";

export interface BlockquoteOptions
  extends BlockquoteExtensionOptions,
    ExtensionOptions<BlockquoteOptions> {}

export const Blockquote = BlockquoteExtension.extend<BlockquoteOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBlockquote(),
          isActive: () => editor.isActive("blockquote") || false,
          icon: QuoteIcon,
          shortcutKeys: ["mod", "shift", "b"],
          tooltip: "Blockquote",
          disabled: false,
        },
      }),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      "data-extension": {
        default: "blockquote",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
