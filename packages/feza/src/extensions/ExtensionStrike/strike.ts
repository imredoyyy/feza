import {
  Strike as StrikeExtension,
  type StrikeOptions as StrikeExtensionOptions,
} from "@tiptap/extension-strike";
import { StrikethroughIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface StrikeOptions
  extends StrikeExtensionOptions,
    ExtensionOptions<StrikeOptions> {}

export const Strike = StrikeExtension.extend<StrikeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),

      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleStrike(),
          isActive: () => editor.isActive("strike") || false,
          disabled: !editor.can().toggleStrike(),
          icon: StrikethroughIcon,
          tooltip: "Strikethrough",
          shortcutKeys: ["mod", "shift", "s"],
        },
      }),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      "data-extension": {
        default: "strike",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
