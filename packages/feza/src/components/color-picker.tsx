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
          className={cn("feza:p-0", className)}
          asChild
          disabled={disabled}
        >
          {children}
        </PopoverTrigger>

        <PopoverContent
          hideWhenDetached
          className="feza:h-full feza:w-full feza:p-2 feza:border-border"
        >
          <div className="feza:flex feza:items-center feza:gap-2">
            <PaletteIcon
              className="feza:h-4 feza:w-4 feza:text-blue-500"
              aria-hidden
            />
            <p className="feza:text-sm feza:font-semibold feza:bg-gradient-to-r feza:from-indigo-500 feza:via-violet-500 feza:to-purple-500 feza:bg-clip-text feza:text-transparent">
              Color Palette
            </p>
          </div>

          <Separator
            orientation="horizontal"
            className="feza:mt-2 feza:data-[orientation=vertical]:h-4"
          />

          <div className="feza:flex feza:flex-col">
            {highlight ? (
              <div
                onClick={removeColor}
                className="feza:flex feza:items-center feza:p-1 feza:cursor-pointer feza:gap-2 feza:hover:bg-accent feza:rounded-md feza:transition-colors feza:duration-200"
              >
                <DropletOffIcon className="feza:w-4 feza:h-4" />
                <span className="feza:ml-1 feza:text-sm">Clear</span>
              </div>
            ) : (
              <div
                onClick={removeColor}
                className="feza:flex feza:items-center feza:p-1 feza:cursor-pointer feza:gap-2 feza:hover:bg-accent feza:rounded-md feza:transition-colors feza:duration-200"
              >
                <DropletOffIcon className="feza:w-4 feza:h-4" />
                <span className="feza:ml-1 feza:text-sm">Set to default</span>
              </div>
            )}

            {colorChunks.map((chunk, i) => (
              <span
                key={i}
                className="feza:relative feza:flex feza:w-full feza:h-auto feza:p-0.5"
              >
                {chunk.map((color, idx) => (
                  <span
                    key={`${highlight ? `highlight-color-${idx}` : "color"}-${idx}`}
                    onClick={() => setColor(color)}
                    className="feza:h-6 feza:w-6 feza:p-0.5 feza:inline-block feza:rounded-sm feza:border feza:flex-[0_0_24px] feza:cursor-pointer feza:border-input feza:hover:shadow-sm"
                  >
                    <span
                      style={{
                        backgroundColor: color,
                        height: "18px",
                        width: "18px",
                        borderRadius: "2px",
                      }}
                      className="feza:relative feza:block"
                    >
                      {color === selectedColor && (
                        <CheckIcon className="feza:h-3 feza:w-3 feza:text-neutral-200 feza:absolute feza:top-1/2 feza:left-1/2 -feza:translate-x-1/2 -feza:translate-y-1/2" />
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
