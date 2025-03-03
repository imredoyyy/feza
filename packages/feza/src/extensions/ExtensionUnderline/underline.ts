import {
  Underline as UnderlineExtension,
  type UnderlineOptions as UnderlineExtensionOptions,
} from "@tiptap/extension-underline";
import { UnderlineIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface UnderlineOptions
  extends UnderlineExtensionOptions,
    ExtensionOptions<UnderlineOptions> {}

export const Underline = UnderlineExtension.extend<UnderlineOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          isActive: () => editor.isActive("underline") || false,
          action: () => editor.commands.toggleUnderline(),
          disabled: !editor.can().toggleUnderline(),
          icon: UnderlineIcon,
          tooltip: "Underline",
          shortcutKeys: ["mod", "u"],
        },
      }),
    };
  },

  addAttributes() {
    return {
      "data-extension": {
        default: "underline",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
