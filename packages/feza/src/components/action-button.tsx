import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import type { VariantProps } from "class-variance-authority";
import { type LucideIcon } from "lucide-react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Toggle,
  type toggleVariants,
} from "@/components";
import { cn } from "@/lib/utils";
import { getShortcutKeys } from "@/utils/utils";

import type { ToolbarButtonComponentProps } from "@/types";

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  /**
   * The icon to be displayed on the button.
   */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  /**
   * Tooltip text displayed on hover.
   */
  tooltip?: string;
  /* Tooltip options */
  tooltipOptions?: TooltipContentProps;
  /** Active state checker. */
  isActive?: ToolbarButtonComponentProps["isActive"];
  /** Click action handler. */
  action?: ToolbarButtonComponentProps["action"];
  /** Child component */
  children?: React.ReactNode;
  /** Whether to use as child. */
  asChild?: boolean;
  /** Whether it's an icon only button. */
  iconOnly?: boolean;
  /** Keyboard shortcut keys. */
  shortcutKeys?: string[];
}

export const ActionButton = React.forwardRef<
  HTMLButtonElement,
  ActionButtonProps
>(
  (
    {
      className,
      icon,
      tooltip,
      tooltipOptions,
      isActive,
      action,
      children,
      asChild,
      iconOnly,
      shortcutKeys,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : Toggle;
    const Icon = icon;
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Comp
            ref={ref}
            size="sm"
            className={cn(
              "feza:min-h-8 feza:capitalize feza:cursor-pointer feza:disabled:cursor-default",
              className
            )}
            disabled={props.disabled}
            data-state={isActive?.() ? "on" : "off"}
            onClick={action}
            {...props}
          >
            {props.title && (
              <span className={cn(iconOnly ? "feza:sr-only" : "")}>
                {props.title}
              </span>
            )}
            {Icon && <Icon />}
            {children}
          </Comp>
        </TooltipTrigger>

        {tooltip && (
          <TooltipContent sideOffset={4} {...tooltipOptions}>
            <div className="feza:flex feza:flex-col feza:items-center feza:max-w-28">
              <span className="feza:capitalize">{tooltip}</span>
              {!!shortcutKeys?.length && (
                <span>{getShortcutKeys(shortcutKeys)}</span>
              )}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    );
  }
);

ActionButton.displayName = "ActionButton";
