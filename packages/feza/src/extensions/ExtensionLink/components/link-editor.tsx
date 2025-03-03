import * as React from "react";
import type { Editor } from "@tiptap/core";

import { Button, Input, Label, Switch } from "@/components";
import { isValidUrl } from "@/utils/utils";

interface LinkEditorProps {
  editor: Editor;
  onLinkSave: (url: string, label?: string, openInNewTab?: boolean) => void;
}

interface formData {
  text: string;
  link: string;
  openInNewTab: boolean;
}

export const LinkEditor = ({ editor, onLinkSave }: LinkEditorProps) => {
  const [formData, setFormData] = React.useState<formData>({
    text: "",
    link: "",
    openInNewTab: false,
  });

  React.useEffect(() => {
    if (editor) {
      const { href: link, target } = editor.getAttributes("link");

      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, " ");

      setFormData({
        text,
        link,
        openInNewTab: target === "_blank",
      });
    }
  }, [editor]);

  const onUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!formData || !formData.link || formData.link.trim() === "")
        throw new Error("URL cannot be empty");

      const validUrl = isValidUrl(formData.link);

      if (!validUrl) throw new Error("Invalid URL");

      onLinkSave(formData.link, formData.text, formData.openInNewTab);
    } catch (error) {
      console.error("Error saving link", error);
    }
  };

  const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      link: e.target.value,
    });
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      text: e.target.value,
    });
  };

  const onOpenInNewTabChange = (checked: boolean) => {
    setFormData({
      ...formData,
      openInNewTab: checked,
    });
  };

  return (
    <form
      onSubmit={onUrlSubmit}
      className="feza:flex feza:flex-col feza:gap-y-4 feza:text-sm feza:min-w-[13rem]"
    >
      <div>
        <Label htmlFor="link-text">Link Text</Label>
        <Input
          id="link-text"
          value={formData.text}
          onChange={onTextChange}
          placeholder="Link Text"
          className="feza:text-sm feza:block feza:mt-2"
        />
      </div>

      <div>
        <Label htmlFor="link-url">Link URL</Label>
        <Input
          id="link-url"
          value={formData.link}
          onChange={onLinkChange}
          placeholder="https://example.com"
          className="feza:text-sm feza:block feza:mt-2"
        />
      </div>

      <div className="feza:flex feza:items-center feza:justify-between">
        <Label htmlFor="open-in-new-tab" className="feza:cursor-pointer">
          Open in new tab
        </Label>
        <Switch
          id="open-in-new-tab"
          checked={formData.openInNewTab}
          onCheckedChange={onOpenInNewTabChange}
          className="feza:ml-2"
        />
      </div>

      <Button type="submit" size="sm" className="feza:mt-1">
        Save Changes
      </Button>
    </form>
  );
};
