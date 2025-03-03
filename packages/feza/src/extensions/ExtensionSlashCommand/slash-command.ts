import { Extension } from "@tiptap/core";
import type { Editor, Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import tippy, {
  type Instance,
  type Props,
  type GetReferenceClientRect,
} from "tippy.js";

import { createSuggestionCommandItems } from "./slash-command-item-group";
import { EditorCommandList } from "./components/command-list";
import { CommandItem, CommandItemGroup } from "@/types";

interface CommandProps {
  editor: Editor;
  range: Range;
  props: {
    command: (props: { editor: Editor; range: Range }) => void;
  };
}

interface SuggestionProps {
  query: string;
  editor: Editor;
}

interface RenderProps {
  editor: Editor;
  clientRect: GetReferenceClientRect;
  items: CommandItem[];
}

export const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }: CommandProps) => {
          props.command({ editor, range });
        },
        items: ({ query, editor }: SuggestionProps) => {
          const commandGroups = createSuggestionCommandItems(
            editor.extensionManager.extensions
          );

          return filterCommandGroups(commandGroups, query.toLowerCase());
        },
        render: () => createCommandRenderer(),
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        allowSpaces: true,
        ...this.options.suggestion,
      }),
    ];
  },
});

const filterCommandGroups = (
  groups: CommandItemGroup[],
  query: string
): CommandItemGroup[] => {
  const filteredGroups = groups.map((group) => ({
    ...group,
    commandItems: group.commandItems.filter((item) => {
      if (item.searchQueries?.length) {
        return item.searchQueries.some((searchQuery) =>
          searchQuery.toLowerCase().includes(query)
        );
      }
      return item.label.toLowerCase().includes(query);
    }),
  }));

  return filteredGroups.filter((group) => group.commandItems.length > 0);
};

const createCommandRenderer = () => {
  let component: ReactRenderer | null = null;
  let popup: Instance<Props>[] | null = null;

  return {
    onStart: (props: RenderProps) => {
      const { editor, clientRect } = props;
      const { selection } = editor.state;
      const parentNode = selection.$from.node(selection.$from.depth);

      // Don't show suggestions in code blocks
      if (parentNode.type.name === "codeBlock") {
        return false;
      }

      component = new ReactRenderer(EditorCommandList, {
        props,
        editor,
      });

      popup = tippy("body", {
        getReferenceClientRect: clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
        zIndex: 9999,
        maxWidth: "17rem",
        offset: [16, 8],
        popperOptions: {
          modifiers: [
            {
              name: "flip",
              enabled: false,
            },
          ],
        },
      });

      return true;
    },

    onUpdate: ({ editor, clientRect }: RenderProps) => {
      component?.updateProps({ editor, clientRect });
      popup?.[0]?.setProps({
        getReferenceClientRect: clientRect,
      });
    },

    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === "Escape") {
        popup?.[0]?.hide();
        return true;
      }

      // Close the popup when typing regular characters (not navigation keys)
      const isRegularCharacter =
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey;

      if (isRegularCharacter && event.key !== "/") {
        popup?.[0]?.hide();
        // Return false to allow the character to be typed
        return false;
      }

      return false;
    },

    onExit: () => {
      popup?.[0]?.destroy();
      component?.destroy();
    },
  };
};
