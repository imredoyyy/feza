import { KeyValueOptions } from "@/types";

let isMac: boolean | undefined;
let isTouch: boolean | undefined;

export const isMacOSDevice = (): boolean => {
  try {
    if (isMac === undefined) {
      if (typeof navigator === "undefined") return false;

      if (
        "userAgentData" in navigator &&
        // @ts-expect-error: userAgentData is still experimental
        "platform" in navigator.userAgentData
      ) {
        isMac = navigator.userAgentData.platform === "macOS";
      } else {
        const platform = navigator.platform?.toLowerCase();
        const userAgent = navigator.userAgent?.toLowerCase();

        isMac =
          /macintosh|macintel|macppc|mac68k/i.test(userAgent) ||
          platform?.startsWith("mac") ||
          userAgent?.includes("mac");
      }
    }
    return isMac;
  } catch (_) {
    return false;
  }
};

export const isTouchResult = () => {
  try {
    if (isTouch === undefined && typeof window !== "undefined") {
      if ("maxTouchPoints" in navigator) {
        isTouch = navigator.maxTouchPoints > 0;
      } else {
        isTouch =
          "ontouchstart" in window ||
          // @ts-expect-error: msMaxTouchPoints is IE specific
          ("msMaxTouchPoints" in navigator && navigator.msMaxTouchPoints > 0);
      }
    }
    return isTouch;
  } catch (_) {
    return false;
  }
};

export const getShortcutKey = (key: string) => {
  const isMac = isMacOSDevice();
  if (key.toLowerCase() === "mod") {
    return isMac ? "⌘" : "Ctrl";
  } else if (key.toLowerCase() === "alt") {
    return isMac ? "⌥" : "Alt";
  } else if (key.toLowerCase() === "shift") {
    return isMac ? "⇧" : "Shift";
  }

  return key;
};

export const getShortcutKeys = (keys: string[]) => {
  return keys.map((key) => getShortcutKey(key)).join(" + ");
};

export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

export const isFunction = (value: unknown): value is (...args: any[]) => any =>
  typeof value === "function";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

/**
 * Get key value options.
 * @param arr - Array of strings or objects with key and value properties.
 * @returns An array of objects with key and value properties.
 */
export const getKeyValueOptions = (
  arr: (string | KeyValueOptions<string>)[]
): KeyValueOptions<string>[] =>
  arr.map((key) => {
    if (isString(key)) {
      return {
        key,
        value: key,
      };
    }
    return key;
  });

export const truncateString = ({
  str,
  length,
}: {
  str: string;
  length: number;
}) => (str.length <= length ? str : str.slice(0, length - 3) + "...");

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};
