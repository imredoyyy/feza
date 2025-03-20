import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  Color,
  FontFamily,
  Heading,
  Highlight,
  Image as TiptapImage,
  Italic,
  Link,
  OrderedList,
  Strike,
  SubscriptAndSuperscript,
  TextAlign,
  Underline,
  SlashCommand,
  StarterKit,
  Youtube,
  TaskList,
  Mathematics,
} from "feza";
import { toast } from "sonner";
import AutoJoiner from "tiptap-extension-auto-joiner";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";

const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

const image = TiptapImage.configure({
  validateFn: (file) => {
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image size must be less than 3MB");
      return false;
    }

    if (!allowedImageTypes.includes(file.type)) {
      toast.error("Invalid file type.");
      return false;
    }
    return true;
  },

  // Upload function expect a Promise that resolves to the image URL
  uploadFn: (file) => {
    // Use this to preview image locally
    // return new Promise((resolve, reject) => {
    //   toast.promise(
    //     new Promise((innerResolve) => {
    //       setTimeout(() => {
    //         const url = URL.createObjectURL(file);
    //         innerResolve(url);
    //       }, 2000);
    //     }).then((url) => {
    //       resolve(url as string);
    //       return url;
    //     }),
    //     {
    //       loading: "Uploading image...",
    //       success: "Image uploaded successfully",
    //       error: (e) => {
    //         reject(e);
    //         return e.message;
    //       },
    //     }
    //   );
    // });

    const formData = new FormData();
    formData.append("file", file);

    // Do not await here
    const uploadPromise = fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    return new Promise((resolve, reject) => {
      toast.promise(
        uploadPromise.then(async (res) => {
          if (res.ok) {
            const { url } = (await res.json()) as { url: string };
            resolve(url);
          } else {
            const { error } = (await res.json()) as { error: string };
            throw new Error(error || "Failed to upload image.");
          }
        }),
        {
          loading: "Uploading image...",
          success: "Image uploaded successfully",
          error: (e) => {
            reject(e);
            console.log(e);

            return e.message;
          },
        }
      );
    });
  },
});

export const extensions = [
  StarterKit,
  Blockquote,
  Bold,
  Italic,
  Strike,
  SubscriptAndSuperscript,
  Underline,
  BulletList.configure({
    showDividerBefore: true,
  }),
  OrderedList,
  TaskList.configure({
    showDividerAfter: true,
  }),
  Color,
  Highlight,
  Code.configure({
    showDividerBefore: true,
  }),
  CodeBlock.configure({
    showDividerAfter: true,
  }),
  Link,
  FontFamily,
  Heading,
  TextAlign,
  image.configure({ showDividerBefore: true }),
  Youtube,
  SlashCommand,
  Mathematics,
  AutoJoiner,
  GlobalDragHandle,
];
