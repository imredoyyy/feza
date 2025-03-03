import type { EditorState } from "@tiptap/pm/state";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

const UPLOAD_KEY = new PluginKey("image-upload");

interface ImageUploadAction {
  add?: Array<{ id: string; position: number; src: string }>;
  remove?: string[];
}

/**
 * Options for the image upload plugin
 */
export interface ImageUploadOptions {
  /**
   * The function to upload the image
   * @param file - The file to upload.
   * @returns The URL of the uploaded image.
   */
  uploadFn: (file: File) => Promise<string>;
  /**
   * The function to validate the image
   */
  validateFn?: ValidateFn;
}

export type UploadFn = (file: File, view: EditorView, position: number) => void;

/**
 * The function to validate the image
 * @param file - The file to validate.
 */
export type ValidateFn = (file: File) => boolean;

export const ImageUploadPlugin = ({ imageClass }: { imageClass: string }) =>
  new Plugin({
    key: UPLOAD_KEY,
    state: {
      init() {
        return DecorationSet.empty;
      },

      apply(tr, set) {
        set = set.map(tr.mapping, tr.doc);
        const action = tr.getMeta(UPLOAD_KEY) as ImageUploadAction;

        if (action?.add) {
          for (const { id, position, src } of action.add) {
            const placeholder = createPlaceholder(src, imageClass);
            const deco = Decoration.widget(position, placeholder, { id });
            set = set.add(tr.doc, [deco]);
          }
        } else if (action?.remove) {
          for (const id of action.remove) {
            set = set.remove(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              set.find(undefined, undefined, (spec: any) => spec.id === id)
            );
          }
        }

        return set;
      },
    },
    props: {
      decorations(state) {
        return this.getState(state);
      },
    },
  });

const createPlaceholder = (src: string, imageClass: string): HTMLElement => {
  const placeholder = document.createElement("div");
  const image = document.createElement("img");

  image.setAttribute("class", imageClass);
  image.src = src;
  image.addEventListener("load", () => {
    placeholder.setAttribute("class", "image-placeholder");
  });
  placeholder.append(image);

  return placeholder;
};

const findPlaceholder = (state: EditorState, id: string): number | null => {
  const decorators = UPLOAD_KEY.getState(state) as DecorationSet;
  const found = decorators.find(undefined, undefined, (spec) => spec.id === id);

  return found.length > 0 ? found[0]!.from : null;
};

export const createImageUpload =
  ({ uploadFn, validateFn }: ImageUploadOptions): UploadFn =>
  (file, view, position) => {
    if (validateFn) {
      const validated = validateFn(file);
      if (!validated) {
        console.warn("File is not valid");
        return;
      }
    } else {
      console.warn("No validation function provided");
    }

    const id = Date.now().toString();
    const tr = view.state.tr;
    if (!tr.selection.empty) tr.deleteSelection();

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (!reader.result) {
        console.error("Failed to upload image");
        return;
      }
      tr.setMeta(UPLOAD_KEY, {
        add: [
          {
            id,
            position,
            src: reader.result as string,
          },
        ],
      });
      view.dispatch(tr);

      uploadFn(file).then(
        async (src) => {
          const { schema } = view.state;
          let placeholderPosition = findPlaceholder(view.state, id);
          if (placeholderPosition === null) return;

          const imageSrc = typeof src === "object" ? reader.result : src;
          const node = schema.nodes.image?.create({ src: imageSrc });
          if (!node) return;

          const { doc } = view.state;
          if (placeholderPosition > doc.content.size) {
            placeholderPosition = doc.content.size - 1;
          }

          const trx = view.state.tr
            .replaceWith(placeholderPosition, placeholderPosition, node)
            .setMeta(UPLOAD_KEY, {
              remove: [id],
            });
          view.dispatch(trx);
        },
        () => {
          const trx = view.state.tr
            .delete(position, position)
            .setMeta(UPLOAD_KEY, {
              remove: [id],
            });
          view.dispatch(trx);
        }
      );
    };
  };

export const handleImagePaste = (
  view: EditorView,
  event: ClipboardEvent,
  uploadFn: UploadFn
): boolean => {
  const files = [...Array.from(event.clipboardData?.files || [])];
  const file = files.length > 0 ? files[0] : null;

  if (file) {
    event.preventDefault();
    const position = view.state.selection.from;
    uploadFn(file, view, position + 1);
    return true;
  }
  return false;
};

export const handleImageDrop = (
  view: EditorView,
  event: DragEvent,
  moved: boolean,
  uploadFn: UploadFn
): boolean => {
  const files = [...Array.from(event.dataTransfer?.files || [])];
  const file = files.length > 0 ? files[0] : null;

  if (!moved && file) {
    event.preventDefault();
    const cords = view.posAtCoords({
      left: event.clientX,
      top: event.clientY,
    });

    if (cords) {
      uploadFn(file, view, cords.pos + 1);
      return true;
    }
  }
  return false;
};
