import * as React from "react";
import type { LucideIcon } from "lucide-react";
import type { Editor } from "@tiptap/core";
import {
  ActionButton,
  Button,
  Checkbox,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  DialogDescription,
} from "@/components";
import { ImageCropper } from "./image-cropper";

import { useDialogImage } from "@/store/use-dialog-image";
import { dataURLToFile } from "@/utils/converter";
import { cn } from "@/lib/utils";
import { isValidUrl } from "@/utils/utils";

interface ImageMetadata {
  alt?: string;
  title?: string;
}

interface ImageUploadButtonProps {
  editor: Editor;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  tooltip?: string;
  uploadFn: (file: File) => Promise<string>;
  validateFn?: (file: File) => boolean;
  imgMetadata?: ImageMetadata;
  title?: string;
  imageSourceType?: "upload" | "url" | "both";
}

export const ImageUploadButton = ({
  editor,
  icon,
  tooltip,
  uploadFn,
  validateFn,
  title,
  imageSourceType,
}: ImageUploadButtonProps) => {
  const { open, setOpen } = useDialogImage();
  const [inline, setInline] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [imageMetadata, setImageMetadata] = React.useState<
    ImageMetadata | undefined
  >({
    alt: "",
    title: "",
  });

  const uploadOptions = React.useMemo(() => {
    return editor.extensionManager.extensions.find(
      (extension) => extension.name === "image"
    )?.options;
  }, [editor]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!editor || editor.isDestroyed || !files || files?.length === 0)
        return;

      const file = files[0];

      if (!file) return;

      if (validateFn) {
        const validated = validateFn(file);
        if (!validated) return;
      }

      let src = "";

      if (uploadFn) {
        setOpen(false);
        src = await uploadFn(file);
      } else {
        throw new Error("No image upload function provided");
      }

      if (src) {
        editor
          .chain()
          .focus()
          .setImageInline({ src, inline, ...imageMetadata })
          .run();
        setInline(false);
        setImageUrl("");
        setImageMetadata({
          alt: "",
          title: "",
        });
      }
    } catch (error) {
      console.error("Error in image upload button", error);
    }
  };

  const handleImageUrl = (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      const validUrl = isValidUrl(imageUrl);

      if (!validUrl) throw new Error("Invalid URL");

      editor
        .chain()
        .focus()
        .setImageInline({ src: imageUrl, inline, ...imageMetadata })
        .run();
      setOpen(false);
      setInline(false);
      setImageUrl("");
      setImageMetadata({
        alt: "",
        title: "",
      });
    } catch (error) {
      console.error("Error uploading image from URL", error);
    }
  };

  const handleCropDone = async (croppedImageURL: string, file: File | null) => {
    try {
      const fileCrop = dataURLToFile(
        croppedImageURL,
        file?.name || "image.png"
      );
      const imageUploadExtension = uploadOptions;
      let src = "";

      if (imageUploadExtension.onUpload) {
        src = await imageUploadExtension.onUpload(fileCrop);
      } else {
        src = URL.createObjectURL(fileCrop);
      }

      if (src) {
        editor
          .chain()
          .focus()
          .setImageInline({
            src,
            inline,
            ...imageMetadata,
          })
          .run();

        setOpen(false);
        setInline(false);
        setImageUrl("");
        setImageMetadata({
          title: "",
          alt: "",
        });
      }
    } catch (error) {
      console.error("Error completing crop and upload", error);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const onMetadataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ImageMetadata
  ) => {
    const value = e.target.value;
    setImageMetadata({ ...imageMetadata, [key]: value });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ActionButton
          icon={icon}
          tooltip={tooltip || "Image"}
          action={() => setOpen(true)}
        />
      </DialogTrigger>

      <DialogContent className="feza:border-border">
        <DialogTitle>{title || "Upload Image"}</DialogTitle>

        <DialogDescription className="feza:sr-only">
          Upload an image
        </DialogDescription>

        <Tabs
          defaultValue={
            imageSourceType === "both" || imageSourceType === "upload"
              ? "upload"
              : "url"
          }
          activationMode="manual"
        >
          <TabsList className={cn("feza:grid feza:grid-cols-2 feza:w-full")}>
            <TabsTrigger value="upload" disabled={imageSourceType === "url"}>
              Upload
            </TabsTrigger>
            <TabsTrigger value="url" disabled={imageSourceType === "upload"}>
              URL
            </TabsTrigger>
          </TabsList>

          <div className="feza:flex feza:items-center feza:gap-1 feza:my-3">
            <Checkbox
              id="inline"
              checked={inline}
              onCheckedChange={(val) => setInline(val as boolean)}
            />
            <Label htmlFor="inline" className="feza:cursor-pointer">
              Inline
            </Label>
          </div>

          <TabsContent
            value="upload"
            className="feza:flex feza:flex-col feza:gap-4"
          >
            <ImageMetadataFields
              imageMetadata={imageMetadata}
              onMetadataChange={onMetadataChange}
            />

            <div className="feza:grid feza:grid-cols-1 feza:md:grid-cols-2 feza:gap-y-2 feza:md:gap-x-2 feza:md:gap-y-0">
              <Button
                className="feza:mt-1 feza:w-full"
                onClick={handleClick}
                size="sm"
              >
                Upload
              </Button>

              <ImageCropper
                editor={editor}
                inline={inline}
                onClose={() => setOpen(false)}
                onCropDone={handleCropDone}
              />
            </div>

            <Input
              type="file"
              ref={fileInputRef}
              multiple
              accept={uploadOptions?.acceptMimeTypes?.join(",") ?? "image/*"}
              className="feza:hidden"
              onChange={handleFile}
            />
          </TabsContent>

          <TabsContent value="url">
            <form
              className="feza:flex feza:flex-col feza:gap-4"
              onSubmit={handleImageUrl}
            >
              <ImageMetadataFields
                imageMetadata={imageMetadata}
                onMetadataChange={onMetadataChange}
              />

              <div className="feza:flex feza:items-center feza:gap-2">
                <Input
                  type="url"
                  autoFocus
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL of the image"
                  className="feza:flex-1"
                />

                <Button type="submit">Apply</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

interface ImageMetadataFieldsProps {
  imageMetadata?: ImageMetadata;
  onMetadataChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof ImageMetadata
  ) => void;
}

const ImageMetadataFields = ({
  imageMetadata,
  onMetadataChange,
}: ImageMetadataFieldsProps) => {
  return (
    <div className="feza:space-y-2.5">
      <div className="feza:grid feza:md:grid-cols-12 feza:items-center feza:gap-2">
        <Label
          htmlFor="image-alt"
          className="feza:md:col-span-5"
          title="Recommended for accsessibility"
        >
          Alt Text
        </Label>
        <Input
          id="image-alt"
          value={imageMetadata?.alt}
          onChange={(e) => onMetadataChange(e, "alt")}
          className="feza:md:col-span-7"
          placeholder="A beautiful sunset..."
        />
      </div>

      <div className="feza:grid feza:md:grid-cols-12 feza:items-center feza:gap-2">
        <Label
          htmlFor="image-title"
          className="feza:md:col-span-5"
          title="Recommended for accsessibility"
        >
          Title
        </Label>
        <Input
          id="image-title"
          value={imageMetadata?.title}
          onChange={(e) => onMetadataChange(e, "title")}
          className="feza:md:col-span-7"
          placeholder="Photo taken during trip..."
        />
      </div>
    </div>
  );
};
