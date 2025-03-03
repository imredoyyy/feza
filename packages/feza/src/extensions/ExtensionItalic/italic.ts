import {
  Italic as ItalicExtension,
  type ItalicOptions as ItalicExtensionOptions,
} from "@tiptap/extension-italic";
import { ItalicIcon } from "lucide-react";

import { type ExtensionOptions } from "@/types";
import { ActionButton } from "@/components";

export interface ItalicOptions
  extends ItalicExtensionOptions,
    ExtensionOptions<ItalicOptions> {}

export const Italic = ItalicExtension.extend<ItalicOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleItalic(),
          isActive: () => editor.isActive("italic") || false,
          disabled: !editor.can().toggleItalic(),
          icon: ItalicIcon,
          tooltip: "Italic",
          shortcutKeys: ["mod", "i"],
        },
      }),
    };
  },

  addAttributes() {
    return {
      "data-extension": {
        default: "italic",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
