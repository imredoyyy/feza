import {
  Image as ImageExtension,
  type ImageOptions as ImageExtensionOptions,
} from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { mergeAttributes } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { ImageUpIcon } from "lucide-react";

import type { ExtensionOptions } from "@/types";
import {
  ImageUploadPlugin,
  createImageUpload,
  handleImageDrop,
  handleImagePaste,
} from "@/plugins";
import { ImageNodeView } from "./components/image-node-view";
import { ImageUploadButton } from "./components/image-upload-button";

/**
 * Image attribute options.
 */
export interface ImageAttributeOptions {
  /**
   * The source of the image.
   */
  src?: string;

  /** The alt text of the image. */
  alt?: string;

  /** The title of the image. */
  title?: string;

  /** The width of the image. */
  width?: string | number;

  /** The height of the image. */
  height?: string | number;

  /** The alignment of the image. */
  alignment?: "left" | "center" | "right";

  /** Whether the image is inline. */
  inline?: boolean;

  /** Whether the image is flipped horizontally. */
  flipX?: boolean;

  /** Whether the image is flipped vertically. */
  flipY?: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageInline: (options: Partial<ImageAttributeOptions>) => ReturnType;
      updateImage: (options: Partial<ImageAttributeOptions>) => ReturnType;
      setImageAlignment: (alignment: "left" | "center" | "right") => ReturnType;
    };
  }
}

export interface ImageOptions
  extends ImageExtensionOptions,
    ExtensionOptions<ImageOptions> {
  /** Function to upload files. */
  uploadFn: (file: File) => Promise<string>;

  /** Function to validate files. */
  validateFn?: (file: File) => boolean;

  /** The source type of the image.
   * @default "both"
   */
  imageSourceType: "upload" | "url" | "both";
}

export const Image = ImageExtension.extend<ImageOptions>({
  name: "image",
  group: "inline",
  inline: true,
  draggable: true,
  selectable: true,
  defining: true,

  addOptions() {
    return {
      ...this.parent?.(),
      createToolbarButton: ({ editor, extension }) => ({
        component: ImageUploadButton,
        componentProps: {
          action: () => {},
          uploadFn: extension.options.uploadFn,
          validateFn: extension.options.validateFn,
          // @ts-expect-error property does not exist
          disabled: !editor.can().setImage?.({}),
          icon: ImageUpIcon,
          editor,
          imageSourceType: extension.options.imageSourceType || "both",
        },
      }),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      flipX: {
        default: false,
      },
      flipY: {
        default: false,
      },
      width: {
        default: null,
        parseHTML: (element) => {
          const width =
            element.style.width || element.getAttribute("width") || null;
          return !width ? null : width;
        },
        renderHTML: (attributes) => ({
          width: attributes.width,
        }),
      },
      alignment: {
        default: "center",
        parseHTML: (element) => element.getAttribute("alignment"),
        renderHTML: (attributes) => ({
          alignment: attributes.alignment,
        }),
      },
      inline: {
        default: false,
        parseHTML: (element) => Boolean(element.getAttribute("inline")),
        renderHTML: (attributes) => ({
          inline: attributes.inline,
        }),
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImageInline:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
      updateImage:
        (options) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, options),
      setImageAlignment:
        (alignment) =>
        ({ commands }) =>
          commands.updateAttributes(this.name, { alignment }),
    };
  },

  renderHTML(props) {
    const { flipX, flipY, inline, alignment } = props.HTMLAttributes;

    const transform =
      flipX || flipY
        ? `transform: rotateX(${flipX ? "180" : "0"}deg) rotateY(${
            flipY ? "180" : "0"
          }deg);`
        : "";
    const textAlign = alignment ? `text-align: ${alignment};` : "";

    return [
      inline ? "span" : "div",
      {
        style: textAlign,
        class: "image",
      },
      [
        "img",
        mergeAttributes(
          {
            height: "auto",
            style: transform,
            "data-inline": `"${inline}"`,
          },
          {
            ...this.options.HTMLAttributes,
            ...props.HTMLAttributes,
          }
        ),
      ],
    ];
  },

  parseHTML() {
    return [
      {
        tag: "span.image img",
        getAttrs: (img) => {
          const el = img?.parentElement;
          const width = img?.getAttribute("width");
          const flipX = img?.getAttribute("flipX") || false;
          const flipY = img?.getAttribute("flipY") || false;

          return {
            src: img?.getAttribute("src"),
            alt: img?.getAttribute("alt"),
            title: img?.getAttribute("title"),
            width: width ? parseInt(width, 10) : null,
            alignment:
              img?.getAttribute("align") || el?.style.textAlign || "center",
            inline: img?.getAttribute("inline") || false,
            flipX: flipX === "true",
            flipY: flipY === "true",
          };
        },
      },
    ];
  },

  addProseMirrorPlugins() {
    const { validateFn, uploadFn } = this.options;

    if (!uploadFn) throw new Error("No image upload function provided");
    else if (!validateFn) console.warn("No image validation function provided");

    const onUpload = createImageUpload({
      uploadFn,
      validateFn,
    });

    return [
      new Plugin({
        props: {
          handlePaste: (view, ev) => {
            if (!ev.clipboardData) return false;

            const files = Array.from(ev.clipboardData.files) || [];
            if (files.some((file) => file.type === "text/html")) return false;

            return handleImagePaste(view, ev, onUpload);
          },
          handleDrop: (view, ev, _slice, moved) => {
            if (!ev.dataTransfer) return false;

            return handleImageDrop(view, ev, moved, onUpload);
          },
        },
      }),
      ImageUploadPlugin({
        imageClass: "opacity-40 rounded-lg border border-stone-200",
      }),
    ];
  },
});
