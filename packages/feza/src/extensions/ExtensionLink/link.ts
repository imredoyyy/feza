import {
  Link as LinkExtension,
  LinkOptions as LinkExtensionOptions,
} from "@tiptap/extension-link";
import { LinkIcon } from "lucide-react";

import type { ExtensionOptions } from "@/types";
import { mergeAttributes } from "@tiptap/core";
import { LinkCreationPopover } from "./components/link-creation-popover";

export interface LinkOptions
  extends LinkExtensionOptions,
    ExtensionOptions<LinkOptions> {}

export const Link = LinkExtension.extend<LinkOptions>({
  inclusive: false,

  addOptions() {
    return {
      ...this.parent?.(),
      // openOnClick: true,
      createToolbarButton: ({ editor }) => ({
        component: LinkCreationPopover,
        componentProps: {
          editor,
          action: (values) => {
            const { link, text, openInNewTab } = values;

            const { from, to } = editor.state.selection;
            const selectedText = editor.state.doc.textBetween(from, to);
            if (selectedText) {
              editor
                .chain()
                .setLink({
                  href: link,
                  target: openInNewTab ? "_blank" : null,
                })
                .run();
            } else if (text) {
              editor
                .chain()
                .insertContent({
                  type: "text",
                  text,
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: link,
                        target: openInNewTab ? "_blank" : undefined,
                      },
                    },
                  ],
                })
                .run();
            }
            editor.chain().focus().run();
          },
          id: "link",
          isActive: () => editor.isActive("link"),
          disabled: !editor.can().setLink({ href: "" }),
          icon: LinkIcon,
          tooltip: "Link",
        },
      }),
    };
  },

  addAttributes() {
    return {
      href: { default: null },
      target: { default: null },
      "data-extension": {
        default: "link",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "link",
      }),
    ];
  },
});
