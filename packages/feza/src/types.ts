import * as React from "react";
import type { Editor, Extension, Range } from "@tiptap/core";
import type { LucideIcon } from "lucide-react";

/**
 * Defines the general extension options for an extension.
 * @template T - The type of the extension options.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ExtensionOptions<T = any> {
  /**
   * Determines whether the extension should appear in the toolbar.
   */
  showInToolbar?: boolean;
  /**
   * Function to create a toolbar button for the extension.
   */
  createToolbarButton: ToolbarButtonConfig<T>;
  /**
   * Determines whether a divider should be added after the toolbar button.
   */
  showDividerAfter?: boolean;
  /**
   * Determines whether a divider should be added before the toolbar button.
   */
  showDividerBefore?: boolean;
  /**
   * Tooltip text for the toolbar button.
   */
  tooltip?: string;
  /**
   * Shortcut keys associated with the toolbar button.
   */
  shortcutKeys?: string[];
}

/**
 * Function type that returns a toolbar button configuration.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ToolbarButtonConfig<T = any> {
  /**
   * Function to create a toolbar button for the extension.
   * @param {ToolbarButtonParams<T>} params - The parameters for the toolbar button.
   */
  (params: ToolbarButtonParams<T>): ToolbarButtonProps | ToolbarButtonProps[];
}

/**
 * Represents the configuration for a toolbar button.
 */
export interface ToolbarButtonProps {
  /**
   * The component to be rendered as the toolbar button.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  /**
   * Properties passed to the toolbar button component.
   */
  componentProps: ToolbarButtonComponentProps;
}

/**
 * Defines the properties passed to a toolbar button component.
 */
export interface ToolbarButtonComponentProps {
  /**
   * Function to be called when the button is clicked.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: (params?: any) => void;

  /**
   * Determines if the button is currently active.
   * @returns {boolean} True if the button is active, false otherwise.
   */
  isActive?: () => boolean;

  /**
   * The icon to be displayed on the button.
   */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;

  /** Tooltip text displayed on hover */
  tooltip?: string;

  /** Shortcut keys associated with the button */
  shortcutKeys?: string[];

  /** Determines whether the button is disabled */
  disabled?: boolean;

  /** Additional component properties */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Parameters passed to the toolbar button creation function.
 * @template T - The type of the extension options.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ToolbarButtonParams<T = any> {
  /**
   * The Tiptap editor instance.
   */
  editor: Editor;
  /**
   * The associated extension.
   */
  extension: Extension<T>;
}

/**
 * Represents a toolbar item.
 */
export interface ToolbarItem {
  /**
   * Configuration for the toolbar button.
   */
  button: ToolbarButtonProps;
  /**
   * Determines whether a divider should be added after the toolbar button.
   */
  showDividerAfter: boolean;
  /**
   * Determines whether a spacer should be added before the toolbar button.
   */
  showDividerBefore: boolean;
  /**
   * Type of the extension.
   */
  extensionType: string;
  /**
   * Name of the extension.
   */
  extensionName: string;
}

/**
 * Parameters passed to the toolbar render function.
 */
export interface ToolbarRenderParams {
  /**
   * The Tiptap editor instance.
   */
  editor: Editor;
  /**
   * Indicates whether the toolbar should be disabled.
   */
  disabled?: boolean;
}

/**
 * Properties for the toolbar component.
 */
export interface ToolbarProps {
  /** Custom render function for the toolbar */
  render?: CustomToolbarRenderer;
}

/**
 * Defines the props for rendering a custom toolbar.
 */
export interface CustomToolbarRenderer {
  (
    params: ToolbarRenderParams,
    toolbarItems: ToolbarItem[],
    domElements: React.JSX.Element[],
    containerWrapper: (children: React.ReactNode) => React.ReactNode
  ): React.ReactNode;
}

export interface KeyValueOptions<T> {
  key: string;
  value: T;
}

export interface BubbleMenuRenderProps {
  editor: Editor;
  disabled: boolean;
  bubbleMenu: BubbleMenuProps;
}

/**
 * Represents the configuration for the bubble menu.
 */
export interface BubbleMenuProps {
  columnConfig?: {
    /**
     * Whether column menu should be hidden or not.
     * @default false
     */
    hidden?: boolean;
  };
  tableConfig?: {
    /**
     * Whether table menu should be hidden or not.
     * @default false
     */
    hidden?: boolean;
  };
  floatingMenuConfig?: {
    /**
     * Whether floating menu should be hidden or not.
     * @default false
     */
    hidden?: boolean;
  };
  linkConfig?: {
    /**
     * Whether link menu should be hidden or not.
     * @default false
     */
    hidden?: boolean;
  };
  textConfig?: {
    /**
     * Whether text menu should be hidden or not.
     * @default false
     */
    hidden?: boolean;
  };
  imageConfig?: {
    /**
     * Whether image menu should be hidden or not.
     * @default false
     */
    hidden?: boolean;
  };
  videoConfig?: {
    /**
     * Whether video menu should be hidden or not.
     * @default false
     */
    hidden?: boolean;
  };
  render?: (
    props: BubbleMenuRenderProps,
    children: React.ReactNode
  ) => React.ReactNode;
}

export interface CommandItemGroup {
  name: string;
  label: string;
  commandItems: CommandItem[];
}

export interface CommandItem {
  name: string;
  label: string;
  description?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | LucideIcon;
  command: ({ editor, range }: { editor: Editor; range: Range }) => void;
  searchQueries: string[];
}
