import katex, { type KatexOptions } from "katex";
import { Node, mergeAttributes } from "@tiptap/core";
import { type EditorState } from "@tiptap/pm/state";
import { ExtensionOptions } from "@/types";
import { ActionButton } from "@/components";
import { SigmaIcon } from "lucide-react";

export interface MathematicsOptions
  extends ExtensionOptions<MathematicsOptions> {
  /**
   * Katex only works when mathematical expressions are not inside a code block.
   * @param state - EditorState
   * @param pos - number
   * @returns boolean
   */
  shouldRender: (state: EditorState, pos: number) => boolean;

  katexOptions?: KatexOptions;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Katex: {
      setKatex: ({ katex }: { katex: string }) => ReturnType;

      unsetKatex: () => ReturnType;
    };
  }
}

export const Mathematics = Node.create<MathematicsOptions>({
  name: "mathematics",
  inline: true,
  group: "inline",
  atom: true,
  selectable: true,
  marks: "",

  addAttributes() {
    return {
      katex: "",
    };
  },

  addOptions() {
    return {
      shouldRender: (state, pos) => {
        const position = state.doc.resolve(pos);

        if (!position.parent.isTextblock) return false;

        return position.parent.type.name !== "codeBlock";
      },
      katexOptions: {
        throwOnError: false,
      },
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          editor,
          action: () => {
            if (editor.isActive("mathematics")) {
              editor.chain().focus().unsetKatex().run();
            } else {
              const { from, to } = editor.state.selection;
              const katex = editor.state.doc.textBetween(from, to);

              if (!katex) return;

              editor.chain().focus().setKatex({ katex }).run();
            }
          },
          isActive: () => false,
          disabled: false,
          tooltip: "Math Expression",
          icon: SigmaIcon,
        },
      }),
      HTMLAttributes: {},
    };
  },

  addCommands() {
    return {
      setKatex:
        ({ katex }) =>
        ({ editor }) => {
          if (!katex) {
            return false;
          }
          editor.commands.deleteSelection();
          return editor.commands.insertContent({
            type: this.name,
            attrs: { katex },
          });
        },
      unsetKatex:
        () =>
        ({ editor, state, chain }) => {
          const katex = editor.getAttributes(this.name).katex;
          if (typeof katex !== "string") {
            return false;
          }

          const { from, to } = state.selection;

          return chain()
            .command(({ tr }) => {
              tr.insertText(katex, from, to);
              return true;
            })
            .setTextSelection({
              from: from,
              to: from + katex.length,
            })
            .run();
        },
    };
  },

  parseHTML() {
    return [{ tag: `span[data-type="${this.name}"]` }];
  },

  renderHTML({ node, HTMLAttributes }) {
    const katex = node.attrs["katex"] ?? "";
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": this.name,
      }),
      katex,
    ];
  },

  renderText({ node }) {
    return node.attrs["katex"] ?? "";
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const span = document.createElement("span");
      const katexAttr: string = node.attrs["katex"] ?? "";

      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });

      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });

      span.addEventListener("click", (_) => {
        if (editor.isEditable && typeof getPos === "function") {
          const pos = getPos();
          const nodeSize = node.nodeSize;
          editor.commands.setTextSelection({ from: pos, to: pos + nodeSize });
        }
      });

      span.contentEditable = "false";

      span.innerHTML = katex.renderToString(
        katexAttr,
        this.options.katexOptions
      );

      return {
        dom: span,
      };
    };
  },
});
