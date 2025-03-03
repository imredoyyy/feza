import type { Extensions } from "@tiptap/core";

import type { CommandItemGroup } from "@/types";
import type { HeadingOptions } from "@/extensions";
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  TextIcon,
  QuoteIcon,
  Code2Icon,
  ImageIcon,
  YoutubeIcon,
} from "lucide-react";

import { useDialogImage } from "@/store/use-dialog-image";
import { embedYoutubeVideo } from "@/extensions/ExtensionYoutube";

const headingIconMap = {
  1: Heading1Icon,
  2: Heading2Icon,
  3: Heading3Icon,
  4: Heading4Icon,
  5: Heading5Icon,
  6: Heading6Icon,
} as const;

export const createSuggestionCommandItems = (extensions: Extensions) => {
  const commandItemGroup: CommandItemGroup[] = [
    {
      name: "format",
      label: "Format",
      commandItems: [],
    },
    {
      name: "heading",
      label: "Heading",
      commandItems: [],
    },
    {
      name: "list",
      label: "List",
      commandItems: [],
    },
    {
      name: "insert",
      label: "Insert",
      commandItems: [],
    },
  ];

  extensions.forEach((extension) => {
    if (extension.name.toLowerCase() === "paragraph") {
      commandItemGroup[0]?.commandItems.push({
        command: ({ editor, range }) =>
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleNode("paragraph", "paragraph")
            .run(),
        name: `paragraph`,
        label: `Paragraph`,
        icon: TextIcon,
        description: `Start typing with plain text.`,
        searchQueries: ["paragraph"],
      });
    }

    if (extension.name.toLowerCase() === "blockquote") {
      commandItemGroup[0]?.commandItems.push({
        command: ({ editor, range }) =>
          editor.chain().focus().deleteRange(range).setBlockquote().run(),
        name: `blockquote`,
        label: `Blockquote`,
        icon: QuoteIcon,
        description: `Add a blockquote.`,
        searchQueries: ["blockquote"],
      });
    }

    if (extension.name.toLowerCase() === "codeblock") {
      commandItemGroup[0]?.commandItems.push({
        command: ({ editor, range }) =>
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
        name: `codeblock`,
        label: `Code Block`,
        icon: Code2Icon,
        description: `Code snippets with syntax highlighting.`,
        searchQueries: ["codeblock", "code"],
      });
    }

    if (extension.name.toLowerCase() === "heading") {
      extension.options.levels.forEach(
        (level: HeadingOptions["levels"][number]) => {
          commandItemGroup[1]?.commandItems.push({
            command: ({ editor, range }) =>
              editor
                .chain()
                .focus()
                .deleteRange(range)
                .setHeading({ level })
                .run(),
            name: `heading-${level}`,

            label: `Heading ${level}`,
            icon: headingIconMap[level],
            description: `Add a level ${level} heading.`,
            searchQueries: [`h${level}`, "heading", "title"],
          });
        }
      );
    }

    if (extension.name.toLowerCase() === "bulletlist") {
      commandItemGroup[2]?.commandItems.push({
        command: ({ editor, range }) =>
          editor.chain().focus().deleteRange(range).toggleBulletList().run(),
        name: `bulletlist`,
        label: `Bullet List`,
        icon: ListIcon,
        description: `Create a bullet list.`,
        searchQueries: ["bullet", "list", "unordered"],
      });
    }

    if (extension.name.toLowerCase() === "orderedlist") {
      commandItemGroup[2]?.commandItems.push({
        command: ({ editor, range }) =>
          editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
        name: `orderedlist`,
        label: `Numbered List`,
        icon: ListOrderedIcon,
        description: `Create a numbered list.`,
        searchQueries: ["ordered", "list", "numbered"],
      });
    }

    if (extension.name.toLowerCase() === "tasklist") {
      commandItemGroup[2]?.commandItems.push({
        command: ({ editor, range }) =>
          editor.chain().focus().deleteRange(range).toggleTaskList().run(),
        name: `tasklist`,
        label: `Task List`,
        icon: ListTodoIcon,
        description: `Create a task list.`,
        searchQueries: ["todo", "list", "task"],
      });
    }

    if (extension.name.toLowerCase() === "image") {
      commandItemGroup[3]?.commandItems.push({
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).run();
          useDialogImage.getState().setOpen(true);
        },
        name: `image`,
        label: `Image`,
        icon: ImageIcon,
        description: `Upload an image.`,
        searchQueries: ["image", "file"],
      });
    }

    if (extension.name.toLowerCase() === "youtube") {
      commandItemGroup[3]?.commandItems.push({
        command: ({ editor, range }) => {
          embedYoutubeVideo({ editor, range });
        },
        name: `youtube`,
        label: `Youtube`,
        icon: YoutubeIcon,
        description: `Embed a youtube video.`,
        searchQueries: ["youtube", "video", "embed"],
      });
    }
  });

  return commandItemGroup;
};
