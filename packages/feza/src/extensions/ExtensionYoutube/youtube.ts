import {
  Youtube as YoutubeExtension,
  type YoutubeOptions as YoutubeExtensionOptions,
} from "@tiptap/extension-youtube";
import { YoutubeIcon } from "lucide-react";
import type { Editor, Range } from "@tiptap/core";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";

export interface YoutubeOptions
  extends YoutubeExtensionOptions,
    ExtensionOptions<YoutubeOptions> {}

export const Youtube = YoutubeExtension.extend<YoutubeOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor, extension }) => ({
        component: ActionButton,
        componentProps: {
          action: () => {
            const { from, to } = editor.state.selection;
            const range = { from, to };

            embedYoutubeVideo({ editor, range });
          },
          isActive: () => editor.isActive("youtube") || false,

          icon: YoutubeIcon,
          tooltip: extension.options.tooltip || "Youtube",
        },
      }),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      "data-extension": {
        default: "youtube",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },
}).configure({
  inline: false,
});

export function embedYoutubeVideo({
  editor,
  range,
}: {
  editor: Editor;
  range: Range;
}) {
  let isValid = false;
  let url: string | null = null;
  let tryCount = 0;

  const ytUrlRegex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

  while (!isValid) {
    if (tryCount >= 10) {
      alert("Too many failed attempts.");
      return;
    }

    url = prompt("Enter YouTube video URL");
    tryCount++;

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      alert("URL cannot be empty. Please try again.");
      continue;
    }

    if (!ytUrlRegex.test(url)) {
      alert("Invalid YouTube video URL. Please try again.");
      continue;
    }

    isValid = true;
  }

  editor
    .chain()
    .focus()
    .deleteRange(range)
    .setYoutubeVideo({ src: url! })
    .run();
}
