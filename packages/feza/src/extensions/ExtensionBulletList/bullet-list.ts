import {
  BulletList as BulletListExtension,
  type BulletListOptions as BulletListExtensionOptions,
} from "@tiptap/extension-bullet-list";
import { ListIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface BulletListOptions
  extends BulletListExtensionOptions,
    ExtensionOptions<BulletListOptions> {}

export const BulletList = BulletListExtension.extend<BulletListOptions>({
  addOptions() {
    return {
      ...(this.parent?.() ?? {}),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleBulletList(),
          isActive: () => editor.isActive("bulletList") || false,
          disabled: false,
          icon: ListIcon,
          tooltip: "Bullet List",
          shortcutKeys: ["mod", "shift", "8"],
        },
      }),
    };
  },

  addAttributes() {
    return {
      "data-extension": {
        default: "bullet-list",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
