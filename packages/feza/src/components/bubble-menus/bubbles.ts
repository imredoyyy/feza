import { deleteSelection } from "@tiptap/pm/commands";
import type { Editor } from "@tiptap/core";

import { ActionButton } from "@/components";
import { ToolbarButtonParams, ToolbarButtonProps } from "@/types";
import { LIcon, MIcon, SIcon } from "@/assets";
import { BUBBLE_TEXT_LIST, IMAGE_SIZE } from "@/constants";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  FlipHorizontal2Icon,
  FlipVertical2Icon,
  Trash2Icon,
} from "lucide-react";

/**
 * Represents the size of images or videos.
 */
type BubbleFileSizeType = "size-small" | "size-medium" | "size-large";

/**
 * Represents the alignment of images.
 */
type ImageAlignmentType = "left" | "center" | "right";

type BubbleImageType =
  | `image-${BubbleFileSizeType}`
  | `video-${BubbleFileSizeType}`
  | "image"
  | "remove";

type BubbleVideoType = "video" | "remove";

type BubbleAllType =
  | BubbleImageType
  | BubbleVideoType
  | "divider"
  | (string & {});

/** The key of the node. */
export type NodeKeyType = "image" | "video" | "text";

export type BubbleMenuType = Partial<Record<NodeKeyType, BubbleMenuItem[]>>;

export type NodeMenuType = Partial<Record<NodeKeyType, BubbleAllType[]>>;

export interface BubbleMenuItem extends ToolbarButtonProps {
  type: BubbleAllType;
}

/**
 * Funtion to generate a bubble menu.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface BubbleView<T = any> {
  /**
   * Generates a bubble menu based on the provided option.
   * @param {ToolbarButtonParams<T>} options: The options for generating the bubble menu.
   * @returns {BubbleMenuType} The generated bubble menu.
   */
  (options: ToolbarButtonParams<T>): BubbleMenuType;
}

export interface BubbleOptions<T> {
  list: NodeMenuType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultBubbleList: any;
  button: BubbleView<T>;
}

const imageSizeMenu = (editor: Editor): BubbleMenuItem[] => {
  const types: BubbleFileSizeType[] = [
    "size-small",
    "size-medium",
    "size-large",
  ];
  const icons: NonNullable<ToolbarButtonProps["componentProps"]["icon"]>[] = [
    SIcon,
    MIcon,
    LIcon,
  ];

  return types.map((type, i) => {
    const Icon = icons[i];
    return {
      type: `image-${type}`,
      component: ActionButton,
      componentProps: {
        tooltip: type.replace("-", " "),
        icon: Icon,
        isActive: () => editor.isActive("image", { width: IMAGE_SIZE[type] }),
        action: () => editor.commands.updateImage({ width: IMAGE_SIZE[type] }),
      },
    };
  });
};

const imageAlignMenu = (editor: Editor): BubbleMenuItem[] => {
  const types: ImageAlignmentType[] = ["left", "center", "right"];
  const icons: Record<
    ImageAlignmentType,
    ToolbarButtonProps["componentProps"]["icon"]
  > = {
    left: AlignLeftIcon,
    center: AlignCenterIcon,
    right: AlignRightIcon,
  };

  return types.map((type) => ({
    type: `image-${type}`,
    component: ActionButton,
    componentProps: {
      tooltip: `Align ${type}`,
      icon: icons[type],
      isActive: () => editor.isActive({ align: type }) || false,
      action: () => editor.commands?.setImageAlignment?.(type),
      disabled: false,
    },
  }));
};

// const videoSizeMenu = (editor: Editor): BubbleMenuItem[]=> {
//   const types: BubbleFileSizeType[] = ['size-small', 'size-medium', 'size-large']
//   const icons:Record<BubbleFileSizeType, ToolbarButtonProps["componentProps"]["icon"]> = {
//   'size-small': SIcon,
//   'size-medium': MIcon,
//   'size-large': Licon
//   }

//   return types.map((type,) => ({
//     type: `image-${type}`,
//     component: ActionButton,
//     componentProps: {
//       tooltip: `Align ${type}`,
//       icon: icons[type],
//       isActive: () => editor.isActive('video', {width: VIDEO_SIZE[type]}),
//       action: () => editor.commands.updateVideo({ width: VIDEO_SIZE[type] }),
//       disabled: false,
//     }
//   }))
// }

export const updateImageFromBubble = (editor: Editor): BubbleMenuItem[] => [
  {
    type: "flipX",
    component: ActionButton,
    componentProps: {
      editor,
      tooltip: "Flip X",
      icon: FlipHorizontal2Icon,
      action: () => {
        const image = editor.getAttributes("image");
        const { flipX } = image;

        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .updateImage({
            flipX: !flipX,
          })
          .run();
        editor.view.updateState(editor.view.state);
      },
    },
  },
  {
    type: "flipY",
    component: ActionButton,
    componentProps: {
      editor,
      tooltip: "Flip Y",
      icon: FlipVertical2Icon,
      action: () => {
        const image = editor.getAttributes("image");
        const { flipY } = image;
        editor
          .chain()
          .focus(undefined, { scrollIntoView: false })
          .updateImage({
            flipY: !flipY,
          })
          .run();
        editor.view.updateState(editor.view.state);
      },
    },
  },
  ...imageSizeMenu(editor),
  ...imageAlignMenu(editor),
  {
    type: "remove",
    component: ActionButton,
    componentProps: {
      editor,
      icon: Trash2Icon,
      tooltip: "Remove",
      action: () => {
        const { state, dispatch } = editor?.view ?? {};
        deleteSelection(state, dispatch);
      },
    },
  },
];

// export const updateVideoFromBubble = (editor: Editor): BubbleMenuItem[] => ([
//   ...videoSizeMenu(editor),
//   {
//     type: 'remove',
//     component: ActionButton,
//     componentProps:{
//       editor,
//       icon: Trash2Icon,
//       tooltip: 'Remove',
//       action: () => {
//         const {state, dispatch} = editor?.view
//         deleteSelection(state, dispatch)
//       }
//     }
//   }
// ])

export const bubbleMenuText = (editor: Editor) => {
  return BUBBLE_TEXT_LIST.reduce((acc, type) => {
    if (type === "divider" && acc.length > 0) {
      return [
        ...acc,
        {
          type: "divider",
          component: undefined,
          componentProps: {},
        },
      ];
    }

    const ext = editor.extensionManager.extensions.find(
      (ext) => ext.name === type
    );

    if (ext) {
      return [
        ...acc,
        ext
          ?.configure?.()
          ?.options?.createToolbarButton?.({ editor, extension: ext }),
      ];
    }

    return acc;
  }, [] as BubbleMenuItem[]);
};
