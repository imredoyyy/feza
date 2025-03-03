import * as React from "react";
import { Code2Icon, LucideIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ToolbarButtonComponentProps } from "@/types";

interface CodeBlockTriggerButtonProps {
  action: ToolbarButtonComponentProps["action"];
  isActive: ToolbarButtonComponentProps["isActive"];
  disabled: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  tooltip: string;
  shortcutKeys?: string[];
}

export const CodeBlockTriggerButton = (props: CodeBlockTriggerButtonProps) => {
  return (
    <ActionButton
      icon={Code2Icon}
      tooltip={props.tooltip}
      isActive={props.isActive}
      action={() => props.action?.({ language: "auto" })}
      disabled={props.disabled}
      shortcutKeys={props.shortcutKeys}
    />
  );
};
