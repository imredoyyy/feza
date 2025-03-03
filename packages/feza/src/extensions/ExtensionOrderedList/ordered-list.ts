import {
  OrderedList as OrderedListExtension,
  type OrderedListOptions as OrderedListExtensionOptions,
} from "@tiptap/extension-ordered-list";
import { ListOrderedIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface OrderedListOptions
  extends OrderedListExtensionOptions,
    ExtensionOptions<OrderedListOptions> {}

export const OrderedList = OrderedListExtension.extend<OrderedListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleOrderedList(),
          isActive: () => editor.isActive("orderedList") || false,
          disabled: false,
          icon: ListOrderedIcon,
          tooltip: "Ordered List",
          shortcutKeys: ["mod", "shift", "7"],
        },
      }),
    };
  },

  addAttributes() {
    return {
      "data-extension": {
        default: "ordered-list",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
