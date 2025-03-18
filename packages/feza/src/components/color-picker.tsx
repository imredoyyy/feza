import * as React from "react";
import { PaletteIcon, DropletOffIcon, CheckIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
} from "@/components";
import { cn } from "@/lib/utils";

export interface ColorPickerProps {
  highlight?: boolean;
  disabled?: boolean;
  colors?: string[];
  onColorChange?: (color?: string) => void;
  selectedColor?: string;
  setSelectedColor?: (color?: string) => void;
  className?: string;
  children: React.ReactNode;
}

export const ColorPicker = React.memo(
  ({
    highlight,
    disabled,
    colors,
    onColorChange,
    selectedColor,
    setSelectedColor,
    className,
    children,
  }: ColorPickerProps) => {
    const colorChunks = React.useMemo(() => {
      if (!colors) return [];
      return Array.from({ length: Math.ceil(colors.length / 10) }, (_, i) =>
        colors.slice(i * 10, i * 10 + 10)
      );
    }, [colors]);

    const setColor = React.useCallback(
      (color?: string) => {
        if (color === undefined) {
          setSelectedColor?.(undefined);
          onColorChange?.(undefined);
          return;
        }

        if (color === selectedColor) {
          setSelectedColor?.(undefined);
          onColorChange?.(undefined);
          return;
        }

        const isCorrectColor = /^#([\da-f]{3}){1,2}$/i.test(color);

        if (isCorrectColor) {
          setSelectedColor?.(color);
          onColorChange?.(color);
        }
      },
      [onColorChange, setSelectedColor, selectedColor]
    );

    const removeColor = React.useCallback(() => {
      setColor(undefined);
    }, [setColor]);

    return (
      <Popover modal>
        <PopoverTrigger
          className={cn("p-0", className)}
          asChild
          disabled={disabled}
        >
          {children}
        </PopoverTrigger>

        <PopoverContent
          hideWhenDetached
          className="h-full w-full p-2 border-fz-border"
        >
          <div className="flex items-center gap-2">
            <PaletteIcon className="h-4 w-4 text-blue-500" aria-hidden />
            <p className="text-sm font-semibold bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              Color Palette
            </p>
          </div>

          <Separator
            orientation="horizontal"
            className="mt-2 data-[orientation=vertical]:h-4"
          />

          <div className="flex flex-col">
            {highlight ? (
              <div
                onClick={removeColor}
                className="flex items-center p-1 cursor-pointer gap-2 hover:bg-fz-accent rounded-md transition-colors duration-200"
              >
                <DropletOffIcon className="w-4 h-4" />
                <span className="ml-1 text-sm">Clear</span>
              </div>
            ) : (
              <div
                onClick={removeColor}
                className="flex items-center p-1 cursor-pointer gap-2 hover:bg-fz-accent rounded-md transition-colors duration-200"
              >
                <DropletOffIcon className="w-4 h-4" />
                <span className="ml-1 text-sm">Set to default</span>
              </div>
            )}

            {colorChunks.map((chunk, i) => (
              <span key={i} className="relative flex w-full h-auto p-0.5">
                {chunk.map((color, idx) => (
                  <span
                    key={`${highlight ? `highlight-color-${idx}` : "color"}-${idx}`}
                    onClick={() => setColor(color)}
                    className="h-6 w-6 p-0.5 inline-block rounded-sm border flex-[0_0_24px] cursor-pointer border-fz-input hover:shadow-sm"
                  >
                    <span
                      style={{
                        backgroundColor: color,
                        height: "18px",
                        width: "18px",
                        borderRadius: "2px",
                      }}
                      className="relative block"
                    >
                      {color === selectedColor && (
                        <CheckIcon className="h-3 w-3 text-neutral-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
