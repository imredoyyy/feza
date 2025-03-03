import * as React from "react";
import { BubbleMenu } from "@tiptap/react";

import type { Editor } from "@tiptap/core";

import { LinkEditor } from "@/extensions/ExtensionLink/components/link-editor";
import { LinkViewer } from "@/extensions/ExtensionLink/components/link-view";

interface BubbleMenuLinkProps {
  editor: Editor;
  disabled?: boolean;
}

export const BubbleMenuLink = ({ editor, disabled }: BubbleMenuLinkProps) => {
  const [isEditing, setIsEditing] = React.useState(false);

  const link = React.useMemo(() => {
    const { href: link } = editor.getAttributes("link");

    return link as string;
  }, [editor]);

  const shouldShow = React.useCallback(
    ({ editor }: { editor: Editor }) => editor.isActive("link"),
    []
  );

  const onSetLink = (url: string, label?: string, openInNewTab?: boolean) => {
    editor
      .chain()
      .extendMarkRange("link")
      .insertContent({
        type: "text",
        text: label,
        marks: [
          {
            type: "link",
            attrs: {
              href: url,
              target: openInNewTab ? "_blank" : "",
            },
          },
        ],
      })
      .setLink({ href: url })
      .focus()
      .run();
    setIsEditing(false);
  };

  const unsetLink = React.useCallback(() => {
    editor.chain().extendMarkRange("link").unsetLink().focus().run();
    setIsEditing(false);
  }, [editor]);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        popperOptions: { modifiers: [{ name: "flip", enabled: false }] },
        placement: "bottom-start",
        offset: [-2, 16],
        zIndex: 6969,
        onHidden: () => setIsEditing(false),
      }}
    >
      {disabled ? null : (
        <>
          {isEditing ? (
            <LinkEditor onLinkSave={onSetLink} editor={editor} />
          ) : (
            <LinkViewer
              link={link}
              handleUnlink={unsetLink}
              handleEdit={() => setIsEditing(true)}
            />
          )}
        </>
      )}
    </BubbleMenu>
  );
};
