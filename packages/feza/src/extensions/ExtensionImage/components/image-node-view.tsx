import * as React from "react";
import { NodeViewWrapper, Editor } from "@tiptap/react";
import { flushSync } from "react-dom";

import { IMAGE_MAX_SIZE, IMAGE_MIN_SIZE } from "@/constants";
import { isNumber } from "@/utils/utils";
import { clamp } from "@/utils/converter";
import { cn } from "@/lib/utils";

import type { ImageAttributeOptions } from "@/extensions/ExtensionImage/image";

interface Size {
  width: number;
  height: number;
}

enum ResizeDirection {
  TOP_LEFT = "tl",
  TOP_RIGHT = "tr",
  BOTTOM_LEFT = "bl",
  BOTTOM_RIGHT = "br",
}

interface Node {
  attrs: ImageAttributeOptions;
}

interface ImageNodeViewProps {
  node: Node;
  editor: Editor;
  getPos: () => number;
  updateAttributes: ({
    width,
    height,
  }: {
    width: number | null;
    height: number | null;
  }) => void;
  selected: boolean;
}

export const ImageNodeView = ({
  node,
  getPos,
  editor,
  updateAttributes,
  selected,
}: ImageNodeViewProps) => {
  const [maxSize, setMaxSize] = React.useState<Size>({
    width: IMAGE_MAX_SIZE,
    height: IMAGE_MAX_SIZE,
  });

  const [originalImageSize, setOriginalImageSize] = React.useState({
    width: 0,
    height: 0,
  });
  const resizeDirections = Object.values(ResizeDirection);
  const [resizing, setResizing] = React.useState(false);
  const [resizerState, setResizerState] = React.useState({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    dir: "",
  });

  const { alignment, inline } = node?.attrs ?? {};

  const imgAttrs = React.useMemo(() => {
    const {
      src,
      alt,
      width: w,
      height: h,
      flipX,
      flipY,
      title,
    } = node?.attrs ?? {};
    const width = isNumber(w) ? `${w}px` : w;
    const height = isNumber(h) ? `${h}px` : h;
    const transformStyles: string[] = [];

    if (flipX) transformStyles.push("rotateX(180deg)");
    if (flipY) transformStyles.push("rotateY(180deg)");
    const transform = transformStyles.join(" ");

    return {
      src: src || undefined,
      alt: alt || undefined,
      title: title || undefined,
      style: {
        width: width || undefined,
        height: height || undefined,
        transform: transform || "none",
      },
    };
  }, [node?.attrs]);

  const imageMaxStyle = React.useMemo(
    () => ({
      width: imgAttrs.style.width === "100%" ? "100%" : undefined,
    }),
    [imgAttrs.style.width]
  );

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setOriginalImageSize({ width, height });
  };

  const onSelectImage = React.useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [editor, getPos]);

  const getMaxSize = React.useCallback(() => {
    const { width } = getComputedStyle(editor.view.dom);
    setMaxSize((prev) => ({
      ...prev,
      width: parseInt(width, 10),
    }));
  }, [editor]);

  const onMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, dir: string) => {
      e.preventDefault();
      e.stopPropagation();

      const originalWidth = originalImageSize.width;
      const originalHeight = originalImageSize.height;
      const aspectRatio = originalWidth / originalHeight;
      let width = Number(node.attrs.width);
      let height = Number(node.attrs.height);
      const maxWidth = maxSize.width;

      if (width && !height) {
        width = Math.min(width, maxWidth);
        height = Math.round(width / aspectRatio);
      } else if (height && !width) {
        width = Math.min(Math.round(height * aspectRatio), maxWidth);
      } else if (!width && !height) {
        width = Math.min(originalWidth, maxWidth);
        height = Math.round(width / aspectRatio);
      } else {
        width = Math.min(width, maxWidth);
      }

      flushSync(() => {
        setResizing(true);

        setResizerState({
          x: e.clientX,
          y: e.clientY,
          w: width,
          h: height,
          dir,
        });
      });
    },
    [maxSize, node.attrs, originalImageSize]
  );

  const onMouseMove = React.useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!resizing) return;

      const { x, w, dir } = resizerState;

      const dx = (e.clientX - x) * (/l/.test(dir) ? -1 : 1);

      const width = clamp(w + dx, IMAGE_MIN_SIZE, maxSize.width);

      updateAttributes({
        width,
        height: null,
      });
    },
    [resizing, maxSize.width, resizerState, updateAttributes]
  );

  const onMouseUp = React.useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!resizing) return;

      flushSync(() => {
        setResizerState({
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          dir: "",
        });

        setResizing(false);
        onSelectImage();
      });
    },
    [resizing, onSelectImage]
  );

  React.useEffect(() => {
    if (resizing) {
      document.addEventListener("mousemove", onMouseMove, true);
      document.addEventListener("mouseup", onMouseUp, true);

      return () => {
        document.removeEventListener("mousemove", onMouseMove, true);
        document.removeEventListener("mouseup", onMouseUp, true);
      };
    }
  }, [resizing, onMouseMove, onMouseUp]);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(getMaxSize);
    resizeObserver.observe(editor.view.dom);

    return () => resizeObserver.disconnect();
  }, [editor.view.dom, getMaxSize]);

  return (
    <NodeViewWrapper
      className={cn("image-view", inline ? "feza:mx-4 last:feza:ml-0" : "")}
      style={
        {
          ...imageMaxStyle,
          textAlign: alignment,
          display: inline ? "inline" : "block",
        } as React.CSSProperties
      }
      as={inline ? "span" : "div"}
    >
      <div
        draggable
        data-drag-handle
        className={cn(
          "feza:inline-block feza:relative image-view__body",
          selected
            ? "image-view__body--focused"
            : resizing
              ? "image-view__body--resizing"
              : ""
        )}
      >
        <img
          src={imgAttrs.src}
          alt={imgAttrs.alt}
          title={imgAttrs.title}
          width={imgAttrs.style.width}
          height={imgAttrs.style.height}
          style={imgAttrs.style}
          onLoad={onImageLoad}
          onClick={onSelectImage}
          className="image-view__body__image feza:block feza:rounded-lg"
        />
        {editor.view.editable && (selected || resizing) && (
          <div className="image-resizer feza:absolute feza:top-0 feza:left-0 feza:h-full feza:w-full feza:border feza:border-border feza:duration-200 feza:z-[2] feza:cursor-default">
            {resizeDirections?.map((dir) => (
              <span
                key={dir}
                style={{
                  borderRadius: "3px",
                }}
                className={cn(
                  "image-resizer__handle feza:absolute feza:z-[2] feza:box-border feza:block feza:aspect-square feza:w-3 feza:border feza:bg-foreground",
                  `image-resizer__handle--${dir}`
                )}
                onMouseDown={(e) => onMouseDown(e, dir)}
              />
            ))}
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
