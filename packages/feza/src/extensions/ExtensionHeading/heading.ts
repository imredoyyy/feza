import {
  Heading as HeadingExtension,
  type HeadingOptions as HeadingExtensionOptions,
} from "@tiptap/extension-heading";
import { HeadingIcon } from "lucide-react";

import { type ExtensionOptions } from "@/types";
import { HeadingSelector } from "./components/heading-selector";

export interface HeadingOptions
  extends HeadingExtensionOptions,
    ExtensionOptions<HeadingOptions> {}

export const Heading = HeadingExtension.extend<HeadingOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [1, 2, 3, 4, 5, 6],
      createToolbarButton: ({ editor, extension }) => {
        const levels = extension.options?.levels?.length
          ? extension.options.levels
          : [];

        return {
          component: HeadingSelector,
          componentProps: {
            isActive: () =>
              editor.isActive("paragraph") ||
              levels.some((level) => editor.isActive("heading", { level })),
            tooltip: "Text Style",
            icon: HeadingIcon,
            editor,
            items: [
              {
                action: () => editor.commands.setParagraph(),
                isActive: () => editor.isActive("paragraph"),
                title: "Paragraph",
                shortcutKeys: ["mod", "alt", "0"],
                level: 0,
              },
              ...levels.map((level) => ({
                action: () => editor.commands.setHeading({ level }),
                isActive: () => editor.isActive("heading", { level }),
                title: `Heading ${level}`,
                shortcutKeys: ["mod", "alt", String(level)],
                level,
              })),
            ],
          },
        };
      },
    };
  },
});
