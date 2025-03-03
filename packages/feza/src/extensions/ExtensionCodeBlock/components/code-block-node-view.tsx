import * as React from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import type { Node } from "@tiptap/pm/model";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";

interface CodeBlockNodeViewProps {
  node: Node;
  updateAttributes: ({ language }: { language: string }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extension: any;
}

export const CodeBlockNodeView = ({
  node,
  updateAttributes,
  extension,
}: CodeBlockNodeViewProps) => {
  const currentLanguage = node.attrs.language || "auto";
  const languageClass =
    currentLanguage !== "auto" ? `language-${currentLanguage}` : "";

  const extensionOptions = React.useMemo(
    () => extension.options,
    [extension.options]
  );

  const { languages, showLanguageDropdown } = extensionOptions;

  return (
    <NodeViewWrapper>
      <pre className="feza:relative" data-extension="code-block">
        {showLanguageDropdown && languages?.length > 0 && (
          <Select
            value={currentLanguage || "auto"}
            onValueChange={(value) => updateAttributes({ language: value })}
          >
            <SelectTrigger className="feza:w-fit feza:max-w-36 feza:h-8 feza:absolute feza:top-2 feza:right-2 feza:border feza:rounded-md feza:shadow-sm">
              <SelectValue placeholder="Code Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              {languages.map((lang: { label: string; value: string }) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <NodeViewContent className={`${languageClass} feza:block`} as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
