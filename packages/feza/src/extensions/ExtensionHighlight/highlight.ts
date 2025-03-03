import {
  Highlight as HighlightExtension,
  type HighlightOptions as HighlightExtensionOptions,
} from "@tiptap/extension-highlight";
import { HighlighterIcon } from "lucide-react";

import type { ExtensionOptions } from "@/types";
import { HighlighterButton } from "./components/highlighter-button";
import { DEFAULT_COLORS } from "@/constants";

export interface HighlightOptions
  extends HighlightExtensionOptions,
    ExtensionOptions<HighlightOptions> {
  /**
   * An array of colors to use for the highlighter.
   */
  colors?: string[];
}

export const Highlight = HighlightExtension.extend<HighlightOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor, extension }) => ({
        component: HighlighterButton,
        componentProps: {
          editor,
          colors: extension.options.colors?.length
            ? extension.options.colors
            : DEFAULT_COLORS,
          action: (color?: string) => {
            if (color === undefined)
              editor.chain().focus().unsetHighlight().run();
            else if (typeof color === "string")
              editor.chain().focus().toggleHighlight({ color }).run();
          },
          isActive: () => editor.isActive("highlight") || false,
          tooltip: "Highlight",
          disabled: !editor.can().toggleHighlight(),
          icon: HighlighterIcon,
        },
      }),
    };
  },

  addAttributes() {
    return {
      "data-extension": {
        default: "highlight",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
});
