import {
  CodeBlockLowlight as CodeBlockExtension,
  type CodeBlockLowlightOptions as CodeBlockExtensionOptions,
} from "@tiptap/extension-code-block-lowlight";
import { Code2Icon } from "lucide-react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { common, createLowlight } from "lowlight";

import type { ExtensionOptions } from "@/types";
import { DEFAULT_CODE_LANGUAGES } from "@/constants";
import { CodeBlockNodeView } from "./components/code-block-node-view";
import { CodeBlockTriggerButton } from "./components/code-block-trigger-button";

export interface CodeBlockOptions
  extends CodeBlockExtensionOptions,
    ExtensionOptions<CodeBlockOptions> {
  /**
   * Available programming language options for the code block.
   * Each option should have a value (language identifier) and display label.
   *
   * @example
   * languages: [
   *   { value: 'typescript', label: 'TypeScript' },
   *   { value: 'kotlin', label: 'Kotlin' }
   * ]
   * @type {{ value: string, label: string }[]}
   */
  languages?: { value: string; label: string }[];

  /**
   * Determines the sorting order of language options in the dropdown.
   * - 'asc': Sorts languages alphabetically in ascending order (A to Z)
   * - 'desc': Sorts languages alphabetically in descending order (Z to A)
   *
   * @default 'asc'
   */
  sortBy?: "asc" | "desc";

  /**
   * Whether to show the language dropdown in the code block editor.
   * @default true
   */
  showLanguageDropdown?: boolean;
}

const normalizeLabel = (label: string) =>
  label.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

export const CodeBlock = CodeBlockExtension.extend<CodeBlockOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      languages: DEFAULT_CODE_LANGUAGES,
      sortBy: "asc",
      showLanguageDropdown: true,
      createToolbarButton: ({ editor, extension }) => {
        const languages = extension.options?.languages?.length
          ? extension.options.languages
          : DEFAULT_CODE_LANGUAGES;

        const sortedLanguages = languages.sort((a, b) => {
          const labelA = normalizeLabel(a.label);
          const labelB = normalizeLabel(b.label);

          return extension.options.sortBy === "asc"
            ? labelA.localeCompare(labelB)
            : labelB.localeCompare(labelA);
        });

        return {
          component: CodeBlockTriggerButton,
          componentProps: {
            isActive: () => editor.isActive("codeBlock") || false,
            disabled: false,
            icon: Code2Icon,
            tooltip: "Code Block",
            action: ({ language }: { language: string }) =>
              editor.commands.setCodeBlock({ language }),
            languages: sortedLanguages,
            sortBy: extension?.options?.sortBy || "asc",
            showLanguageDropdown:
              extension?.options?.showLanguageDropdown || true,
            shortcutKeys: ["mod", "alt", "c"],
          },
        };
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNodeView);
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      language: {
        default: null,
        renderHTML: (attributes) => {
          const language = attributes.language;
          return {
            language,
            class:
              language && language !== "auto" ? `language-${language}` : "",
          };
        },
      },
    };
  },
}).configure({
  lowlight: createLowlight(common),
});
