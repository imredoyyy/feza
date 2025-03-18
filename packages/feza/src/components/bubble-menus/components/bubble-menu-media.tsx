import * as React from "react";
import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import type { Node } from "@tiptap/pm/model";

import { Separator, updateImageFromBubble } from "@/components";
import { ToolbarButtonProps } from "@/types";

interface BubbleMenuProps {
  editor: Editor;
  disabled?: boolean;
}

interface ItemProps extends BubbleMenuProps {
  item: ToolbarButtonProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

const tippyOptions = {
  maxWidth: "auto",
  zIndex: 20,
  moveTransition: "transform 150ms ease-out",
};

const isImageNode = (node: Node) => node.type.name === "image";

// const isVideoNode = (node: Node) => node.type.name === "video";

const Item = ({ disabled, editor, item }: ItemProps) => {
  const Component = item.component;

  if (!Component) return null;

  return item.type === "divider" ? (
    <Separator
      orientation="vertical"
      className="mx-1 my-2 data-[orientation=vertical]:h-4"
    />
  ) : (
    <Component
      {...item.componentProps}
      editor={editor}
      disabled={disabled || item?.componentProps?.disabled}
    />
  );
};

const BubbleMenuImage = ({ editor, disabled }: BubbleMenuProps) => {
  const shouldShow = ({ editor }: { editor: Editor }) => {
    const {
      selection: { $from, to },
    } = editor.view.state;
    let isImage = false;

    editor.view.state.doc.nodesBetween($from.pos, to, (node) => {
      if (isImageNode(node)) {
        isImage = true;
        return false;
      }
    });

    return isImage;
  };

  const items = React.useMemo(() => {
    if (disabled) return [];
    return updateImageFromBubble(editor);
  }, [disabled, editor]);

  return (
    <BubbleMenu
      shouldShow={shouldShow}
      editor={editor}
      tippyOptions={{
        ...tippyOptions,
        appendTo: "parent",
      }}
    >
      {items.length > 0 ? (
        <div className="px-3 py-2 transition-all border border-fz-border rounded-md shadow-md pointer-events-auto select-none bg-fz-background w-full">
          <div className="flex items-center gap-2 flex-nowrap justify-start whitespace-nowrap">
            {items.map((item, i) => (
              <Item
                key={`bubbleMenu-image-${i}`}
                item={item}
                disabled={disabled}
                editor={editor}
              />
            ))}
          </div>
        </div>
      ) : null}
    </BubbleMenu>
  );
};

// const BubbleMenuVideo = ({ editor, disabled }: BubbleMenuProps) => {
//   const shouldShow = ({ editor }: { editor: Editor }) => {
//     const {
//       selection: { $from, to },
//     } = editor.view.state;
//     let isVideo= false;

//     editor.view.state.doc.nodesBetween($from.pos, to, (node) => {
//       if (isVideoNode(node)) {
//         isVideo= true;
//         return false;
//       }
//     });

//     return isVideo;
//   };

//   const items = React.useMemo(() => {
//     if (disabled) return [];
//     return updateImageFromBubble(editor);
//   }, [disabled, editor]);

//   return (
//     <BubbleMenu
//       shouldShow={shouldShow}
//       editor={editor}
//       tippyOptions={{
//         ...tippyOptions,
//         appendTo: "parent",
//       }}
//     >
//       {items.length > 0 ? (
//         <div className="px-3 py-2 transition-all border border-fz-border rounded-md shadow-md pointer-events-auto select-none bg-fz-background w-auto">
//           {items.map((item, i) => (

//               <Item
//                 key={`bubbleMenu-video-${i}`}
//                 item={item}
//                 disabled={disabled}
//                 editor={editor}
//               />
//           )
//           )}
//         </div>
//       ) : null}
//     </BubbleMenu>
//   );
// };

export { BubbleMenuImage };
