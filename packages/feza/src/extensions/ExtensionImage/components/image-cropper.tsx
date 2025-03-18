import * as React from "react";
import { type Editor } from "@tiptap/core";
import { CropIcon, Trash2Icon } from "lucide-react";

import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@/components";

import { readImageAsBase64 } from "@/utils/converter";

interface ImageCropperProps {
  editor: Editor;
  inline: boolean;
  onClose: () => void;
  onCropDone: (croppedImageURL: string, file: File | null) => void;
}

export const ImageCropper = ({
  editor,
  onClose,
  onCropDone,
}: ImageCropperProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [crop, setCrop] = React.useState<Crop>();
  const [croppedImageURL, setCroppedImageURL] = React.useState("");
  const [urlUpload, setUrlUpload] = React.useState({
    src: "",
    file: null as File | null,
  });

  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const onCropComplete = React.useCallback(
    (pixelCrop: PixelCrop) => {
      if (imgRef.current && pixelCrop.width && pixelCrop.height) {
        const croppedImageSrc = getCroppedImage(imgRef.current, pixelCrop);

        setCroppedImageURL(croppedImageSrc);
      }
    },
    [imgRef]
  );

  const onCrop = React.useCallback(async () => {
    if (croppedImageURL) {
      onCropDone(croppedImageURL, urlUpload.file);
      setIsDialogOpen(false);
      setUrlUpload({
        src: "",
        file: null,
      });
      onClose();
    }
  }, [croppedImageURL, urlUpload, onClose, onCropDone]);

  const handleClickFileInput = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!editor || editor.isDestroyed || !files || files?.length === 0)
        return;

      const file = files[0];

      if (!file) return;

      const bas64 = await readImageAsBase64(file);

      setIsDialogOpen(true);
      setUrlUpload({
        src: bas64.src,
        file,
      });
    } catch (error) {
      console.error("Error cropping image", error);
      setUrlUpload({
        src: "",
        file: null,
      });
    }
  };

  return (
    <React.Fragment>
      <Button className="w-full mt-1" size="sm" onClick={handleClickFileInput}>
        Upload & Crop
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger />

        <DialogContent>
          <DialogTitle>Upload & Crop</DialogTitle>

          <div className="shadow-md outline-1 outline-zinc-700">
            {urlUpload.src && (
              <ReactCrop
                crop={crop}
                onChange={setCrop}
                onComplete={onCropComplete}
                className="w-full h-full"
              >
                <img ref={imgRef} src={urlUpload.src} alt="Crop" />
              </ReactCrop>
            )}
          </div>

          <DialogFooter className="flex gap-3 flex-col md:flex-row">
            <Button
              variant="destructive"
              onClick={() => {
                setIsDialogOpen(false);
                setUrlUpload({
                  src: "",
                  file: null,
                });
              }}
            >
              <Trash2Icon />
              Cancel
            </Button>

            <Button className="ml-1" onClick={onCrop}>
              <CropIcon />
              Crop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFile}
        ref={fileInputRef}
        className="hidden"
      />
    </React.Fragment>
  );
};

function getCroppedImage(image: HTMLImageElement, crop: PixelCrop) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  if (ctx) {
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }

  return canvas.toDataURL("image/png", 1);
}
