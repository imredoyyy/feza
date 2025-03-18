import {
  TaskList as TaskListExtension,
  type TaskListOptions as TaskListExtensionOptions,
} from "@tiptap/extension-task-list";
import {
  TaskItem as TaskItemExtension,
  type TaskItemOptions as TaskItemExtensionOptions,
} from "@tiptap/extension-task-item";
import { ListTodoIcon } from "lucide-react";

import { ActionButton } from "@/components";
import type { ExtensionOptions } from "@/types";
import { cn } from "@/lib/utils";

export interface TaskListOptions
  extends TaskListExtensionOptions,
    ExtensionOptions<TaskListOptions> {
  /**
   * Options for the task item.
   */
  taskItemOptions?: Partial<TaskItemExtensionOptions>;
}

export const TaskList = TaskListExtension.extend<TaskListOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: cn("not-prose pl-2"),
      },
      taskItemOptions: {
        HTMLAttributes: {
          class: cn("flex gap-2 items-start my-4"),
        },
      },
      createToolbarButton: ({ editor }) => ({
        component: ActionButton,
        componentProps: {
          isActive: () => editor.isActive("taskList") || false,
          action: () => editor.commands.toggleTaskList(),
          icon: ListTodoIcon,
          tooltip: "Task List",
          shortcutKeys: ["mod", "shift", "9"],
        },
      }),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      "data-extension": {
        default: "task-list",
        renderHTML: (attributes) => ({
          "data-extension": attributes["data-extension"],
        }),
      },
    };
  },

  addExtensions() {
    return [TaskItemExtension.configure(this.options.taskItemOptions)];
  },
});
