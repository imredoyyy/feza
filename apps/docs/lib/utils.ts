import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const normalizedString = (str: string) => {
  if (str.trim() === "") return "";
  return str.replace(/[^a-zA-Z0-9_-]+/g, "-").toLowerCase();
};

export const toKebabCase = (str: string) => {
  if (!str || str.trim() === "") return "";

  let text = str.trim();

  text = text.replace(/([A-Z])/g, (_, p1, offset) => {
    // If it's the first letter, keep it as-is
    // Otherwise, add a hyphen before
    return offset === 0 ? p1 : "-" + p1;
  });

  return normalizedString(text);
};
