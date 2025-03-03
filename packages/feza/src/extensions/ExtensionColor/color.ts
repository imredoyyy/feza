import {
  Color as ColorExtension,
  type ColorOptions as ColorExtensionOptions,
} from "@tiptap/extension-color";

import { DEFAULT_COLORS } from "@/constants";
import type { ExtensionOptions } from "@/types";
import { ColorSelectionButton } from "./components/color-selection-button";

export interface ColorOptions
  extends ColorExtensionOptions,
    ExtensionOptions<ColorOptions> {
  /**
   * An array of colors to display in the color picker.
   */
  colors?: string[];
}

export const Color = ColorExtension.extend<ColorOptions>({
  addOptions() {
    return {
      ...this.parent?.(),

      createToolbarButton: ({ editor, extension }) => ({
        component: ColorSelectionButton,
        componentProps: {
          editor,
          extension,
          colors: extension.options.colors?.length
            ? extension.options.colors
            : DEFAULT_COLORS,
          action: (color?: string) => {
            if (color === undefined) editor.chain().focus().unsetColor().run();
            else if (typeof color === "string")
              editor.chain().focus().setColor(color).run();
          },
          isActive: () => {
            const { color } = editor.getAttributes("textStyle");
            return color ? editor.isActive("textStyle", { color }) : false;
          },
          tooltip: "Color",
          disabled: !editor.can().setColor(""),
        },
      }),
    };
  },
});
