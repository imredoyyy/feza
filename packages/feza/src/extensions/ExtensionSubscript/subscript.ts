import {
  Subscript as SubscriptExtension,
  type SubscriptExtensionOptions as SubscriptExtensionOptions,
} from "@tiptap/extension-subscript";
import { SubscriptIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface SubscriptOptions
  extends SubscriptExtensionOptions,
    ExtensionOptions<SubscriptOptions> {}

export const Subscript = SubscriptExtension.extend<SubscriptOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          isActive: () => editor.isActive("subscript") || false,
          action: () => editor.commands.toggleSubscript(),
          disabled: !editor.can().toggleSubscript(),
          icon: SubscriptIcon,
          tooltip: "Subscript",
          shortcutKeys: ["mod", ","],
        },
      }),
    };
  },

  addAttributes() {
    return {
      "data-extension": {
        default: "subscript",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
