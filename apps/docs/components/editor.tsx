"use client";

import { useState, useEffect } from "react";
import TiptapEditor, {
  type JSONContent,
  type Editor as EditorInstance,
} from "feza";
import { useDebouncedCallback } from "use-debounce";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

import { extensions } from "@/lib/extensions";
import { DEFAULT_EDITOR_CONTENT } from "@/lib/default-editor-content";
import { cn } from "@/lib/utils";

const Editor = () => {
  const [content, setContent] = useState<JSONContent | undefined>(
    DEFAULT_EDITOR_CONTENT
  );

  const highlightCodeBlocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const codeBlocks = doc.querySelectorAll("pre code");

    codeBlocks.forEach((codeBlock) => {
      hljs.highlightElement(codeBlock as HTMLElement);
    });

    return new XMLSerializer().serializeToString(doc);
  };

  const debouncedUpdates = useDebouncedCallback((editor: EditorInstance) => {
    const json = editor.getJSON();
    const html = editor.getHTML();

    localStorage.setItem("jsonContent", JSON.stringify(json));
    localStorage.setItem("htmlContent", highlightCodeBlocks(html));
  }, 500);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedContent = localStorage.getItem("jsonContent");

      if (storedContent) {
        try {
          const parsedContent = JSON.parse(storedContent) as JSONContent;
          setContent(parsedContent);
        } catch (error) {
          console.error("Failed to parse stored content:", error);
        }
      } else setContent(DEFAULT_EDITOR_CONTENT);
    }
  }, []);

  return (
    <div className="px-4 md:px-8 mb-[calc(15vh)]">
      <TiptapEditor
        // Because of setting immediatelyRender to false,
        // sometimes the editor will not render the content.
        // To force re-render, set a key to the editor
        key={content ? JSON.stringify(content) : "empty"}
        className="overflow-hidden max-w-4xl mx-auto shadow-sm sm:shadow-lg"
        editorClassName={cn(
          "min-h-[75vh] prose overflow-hidden dark:prose-invert p-4 md:px-6 prose-code:border-0"
        )}
        initialContent={content}
        extensions={extensions}
        editorProps={{
          onUpdate: ({ editor }) => debouncedUpdates(editor),
          // Set this to false in SSR environments
          immediatelyRender: false,
        }}
      />
    </div>
  );
};

export default Editor;
