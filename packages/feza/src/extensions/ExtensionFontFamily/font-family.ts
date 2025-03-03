import {
  FontFamily as FontFamilyExtension,
  type FontFamilyOptions as FontFamilyExtensionOptions,
} from "@tiptap/extension-font-family";
import { TypeIcon } from "lucide-react";

import { DEFAULT_FONT_FAMILIES } from "@/constants";
import { getKeyValueOptions } from "@/utils/utils";
import { ExtensionOptions, KeyValueOptions } from "@/types";
import { FontFamilySelector } from "./components/font-family-selector";

export interface FontFamilyOptions
  extends FontFamilyExtensionOptions,
    ExtensionOptions<FontFamilyOptions> {
  /**
   * List of built-int font families.
   */
  fontFamilies: (string | KeyValueOptions<string>)[];
}

export const FontFamily = FontFamilyExtension.extend<FontFamilyOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      fontFamilies: DEFAULT_FONT_FAMILIES,
      createToolbarButton: ({ editor, extension }) => {
        const fontFamilyList =
          getKeyValueOptions(extension.options.fontFamilies) || [];

        return {
          component: FontFamilySelector,
          componentProps: {
            editor,
            isActive: () =>
              fontFamilyList.some((f) =>
                editor.isActive("textStyle", { fontFamily: f.value })
              ) || false,
            disabled:
              !editor.can().unsetFontFamily() &&
              fontFamilyList.every((f) => !editor.can().setFontFamily(f.value)),
            icon: TypeIcon,
            tooltip: "Font Family",
            items: [
              {
                action: () => editor.chain().focus().unsetFontFamily().run(),
                isActive: () =>
                  !fontFamilyList.some((f) =>
                    editor.isActive("textStyle", { fontFamily: f.value })
                  ) || false,
                title: "Default",
                default: true,
              },
              ...fontFamilyList.map((f) => ({
                action: () =>
                  editor.chain().focus().setFontFamily(f.value).run(),
                isActive: () =>
                  editor.isActive("textStyle", { fontFamily: f.value }) ||
                  false,
                title: f.key,
                font: f.value,
                disabled: !editor.can().setFontFamily(f.value),
              })),
            ],
          },
        };
      },
    };
  },
});
