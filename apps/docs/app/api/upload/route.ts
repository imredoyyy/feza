import { NextResponse } from "next/server";
import type { UploadApiResponse } from "cloudinary";

import cloudinary from "@/lib/cloudinary";

const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.size > 3 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 3MB." },
        { status: 400 }
      );
    }

    if (!allowedImageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "feza",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result!);
        }
      );

      uploadStream.write(buffer);
      uploadStream.end();
    });

    return NextResponse.json({ url: result.secure_url }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Error uploading file." },
      { status: 500 }
    );
  }
};
