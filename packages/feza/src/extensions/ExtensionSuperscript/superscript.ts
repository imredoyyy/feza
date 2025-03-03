import {
  Superscript as SuperscriptExtension,
  type SuperscriptExtensionOptions as SuperscriptExtensionOptions,
} from "@tiptap/extension-superscript";
import { SuperscriptIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface SuperscriptOptions
  extends SuperscriptExtensionOptions,
    ExtensionOptions<SuperscriptOptions> {}

export const Superscript = SuperscriptExtension.extend<SuperscriptOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          isActive: () => editor.isActive("superscript") || false,
          action: () => editor.commands.toggleSuperscript(),
          disabled: !editor.can().toggleSuperscript(),
          icon: SuperscriptIcon,
          tooltip: "Superscript",
          shortcutKeys: ["mod", "."],
        },
      }),
    };
  },

  addAttributes() {
    return {
      "data-extension": {
        default: "superscript",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
