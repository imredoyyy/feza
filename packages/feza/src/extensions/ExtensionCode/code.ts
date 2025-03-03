import {
  Code as CodeExtension,
  type CodeOptions as CodeExtensionOptions,
} from "@tiptap/extension-code";
import { CodeIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface CodeOptions
  extends CodeExtensionOptions,
    ExtensionOptions<CodeOptions> {}

export const Code = CodeExtension.extend<CodeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          action: () => editor.commands.toggleCode(),
          isActive: () => editor.isActive("code") || false,
          disabled: !editor.can().toggleCode(),
          icon: CodeIcon,
          tooltip: "Code",
          shortcutKeys: ["mod", "e"],
        },
      }),
    };
  },

  addAttributes() {
    return {
      "data-extension": {
        default: "code",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
