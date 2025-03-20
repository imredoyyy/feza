export const DEFAULT_EDITOR_CONTENT = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { textAlign: "center", level: 1 },
      content: [{ type: "text", text: "Feza Editor" }],
    },
    {
      type: "paragraph",
      attrs: { textAlign: "center" },
      content: [
        {
          type: "text",
          text: "Feza is a free,  open-source, modern WYSIWYG editor built on ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev",
                target: "_blank",
                "data-extension": "link",
              },
            },
          ],
          text: "TipTap",
        },
        { type: "text", text: ", " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tailwindcss.com",
                target: "_blank",
                "data-extension": "link",
              },
            },
          ],
          text: "Tailwind CSS",
        },
        { type: "text", text: ", and " },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://ui.shadcn.com",
                target: "_blank",
                "data-extension": "link",
              },
            },
          ],
          text: "shadcn/ui",
        },
        { type: "text", text: "." },
      ],
    },
    {
      type: "heading",
      attrs: { textAlign: null, level: 3 },
      content: [{ type: "text", text: "Features" }],
    },
    {
      type: "bulletList",
      attrs: { "data-extension": "bullet-list" },
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: [
                { type: "text", text: "📝 " },
                {
                  type: "text",
                  marks: [
                    { type: "bold", attrs: { "data-extension": "bold" } },
                  ],
                  text: "Rich text editing",
                },
                { type: "text", text: " with an intuitive interface" },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: [
                { type: "text", text: "📤 " },
                {
                  type: "text",
                  marks: [
                    { type: "bold", attrs: { "data-extension": "bold" } },
                  ],
                  text: " Image Upload",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: [
                { type: "text", text: "🔌 " },
                {
                  type: "text",
                  marks: [
                    { type: "bold", attrs: { "data-extension": "bold" } },
                  ],
                  text: "Extensible with multiple extensions",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: [
                { type: "text", text: "🔑 " },
                {
                  type: "text",
                  marks: [
                    { type: "bold", attrs: { "data-extension": "bold" } },
                  ],
                  text: "Slash Command",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: { textAlign: null },
              content: [
                { type: "text", text: "✍️ " },
                {
                  type: "text",
                  marks: [
                    { type: "bold", attrs: { "data-extension": "bold" } },
                  ],
                  text: " Markdown Support",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: { textAlign: null, level: 3 },
      content: [{ type: "text", text: "Installation" }],
    },
    {
      type: "codeBlock",
      attrs: { language: "bash" },
      content: [{ type: "text", text: "pnpm add feza" }],
    },
    {
      type: "heading",
      attrs: { textAlign: null, level: 3 },
      content: [{ type: "text", text: "Usage" }],
    },
    {
      type: "codeBlock",
      attrs: { language: "typescript" },
      content: [
        {
          type: "text",
          text: 'import TiptapEditor, {\n  StarterKit,\n  Blockquote,\n  Bold,\n  // ...\n} from "feza";\n\n// Define extensions\nconst extensions = [\n  StarterKit,\n  Blockquote,\n  Bold,\n  // ...\n];\n\nexport const MyEditor = () => {\n  return <TiptapEditor extensions={extensions} />;\n};',
        },
      ],
    },
    { type: "paragraph", attrs: { textAlign: null } },
    {
      type: "youtube",
      attrs: {
        src: "https://youtu.be/dQw4w9WgXcQ?si=aQIKkoWl3jTPlgFf",
        start: 0,
        width: 640,
        height: 480,
        "data-extension": "youtube",
      },
    },
    { type: "paragraph", attrs: { textAlign: null } },
  ],
};
