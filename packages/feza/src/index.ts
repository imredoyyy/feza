import type {
  AnyExtension,
  Editor,
  Extension,
  Extensions,
  JSONContent,
  UseEditorOptions,
} from "@tiptap/react";
import { type EditorProps } from "@/components";
import TiptapEditor from "./components/editor";

import {
  type ImageUploadOptions,
  type UploadFn,
  type ValidateFn,
} from "@/plugins";

// Types export
export type {
  AnyExtension,
  Editor,
  EditorProps,
  Extension,
  Extensions,
  ImageUploadOptions,
  JSONContent,
  UploadFn,
  UseEditorOptions,
  ValidateFn,
};

export * from "./types";

// Editor export
export default TiptapEditor;

// Extensions export
export * from "./extensions";
