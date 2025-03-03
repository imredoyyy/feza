export const dataURLToFile = (dataURL: string, filename: string): File => {
  try {
    const arr = dataURL.split(",");
    if (arr.length !== 2) {
      throw new Error("Invalid data URL format");
    }

    const mimeMatch = arr[0]!.match(/:(.*?);/);
    const mimeString = mimeMatch ? mimeMatch[1] : "application/octet-stream";

    const byteString = atob(arr[1]!);
    const u8Array = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      u8Array[i] = byteString.charCodeAt(i);
    }

    return new File([u8Array], filename, { type: mimeString });
  } catch (e) {
    console.error("Error converting data URL to file", e);
    throw new Error("Invalid data URL");
  }
};

export const convertBase64ToBlob = (base64: string): Blob => {
  try {
    const arr = base64.split(",");
    if (arr.length !== 2) {
      throw new Error("Invalid base64 format");
    }

    const mimeMatch = arr[0]!.match(/:(.*?);/);
    const mimeString = mimeMatch ? mimeMatch[1] : "application/octet-stream";

    const byteString = atob(arr[1]!);
    const u8Array = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      u8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([u8Array], { type: mimeString });
  } catch (e) {
    console.error("Error converting base64 to blob", e);
    throw new Error("Invalid base64 string");
  }
};

export const convertFileToUrl = (file: File): string => {
  return URL.createObjectURL(file);
};

export const readImageAsBase64 = (
  file: File
): Promise<{ src: string; alt: string }> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        resolve({ src: reader.result as string, alt: file.name });
      },
      false
    );
    reader.readAsDataURL(file);
  });

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
