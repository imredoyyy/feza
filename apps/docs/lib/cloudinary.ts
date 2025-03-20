import { v2 as cloudinary, type ConfigOptions } from "cloudinary";

export const configOptions: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(configOptions);

export default cloudinary;
