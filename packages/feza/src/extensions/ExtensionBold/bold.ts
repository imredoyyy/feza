import {
  Bold as BoldExtension,
  type BoldOptions as BoldExtensionOptions,
} from "@tiptap/extension-bold";
import { BoldIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface BoldOptions
  extends BoldExtensionOptions,
    ExtensionOptions<BoldOptions> {}

export const Bold = BoldExtension.extend<BoldOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive("bold") || false,
          icon: BoldIcon,
          shortcutKeys: ["mod", "b"],
          tooltip: "Bold",
          disabled: !editor.can().toggleBold(),
        },
      }),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      "data-extension": {
        default: "bold",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
