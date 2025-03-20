import { BookOpenIcon, FeatherIcon, GithubIcon } from "lucide-react";
import { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <FeatherIcon className="size-6 text-fd-primary" />
        <h3 className="text-xl font-medium">Feza</h3>
      </div>
    ),
    enableSearch: false,
  },

  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
      icon: <BookOpenIcon />,
    },
    {
      text: "GitHub",
      url: "https://github.com/imredoyyy/feza",
      icon: <GithubIcon />,
    },
  ],
};
