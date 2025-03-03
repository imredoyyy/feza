import { Extension, Extensions } from "@tiptap/core";

import { Subscript, Superscript } from "@/extensions";

export interface SubscriptAndSuperscriptOptions {
  subscript: Partial<typeof Subscript.options> | false;
  superscript: Partial<typeof Superscript.options> | false;
}

export const SubscriptAndSuperscript =
  Extension.create<SubscriptAndSuperscriptOptions>({
    name: "subscriptAndSuperscript",

    addExtensions() {
      const extensions: Extensions = [];

      if (this.options.subscript !== false) {
        extensions.push(Subscript.configure(this.options.subscript));
      }

      if (this.options.superscript !== false) {
        extensions.push(Superscript.configure(this.options.superscript));
      }

      return extensions;
    },
  });
