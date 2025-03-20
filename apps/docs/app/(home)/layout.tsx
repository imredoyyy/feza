import Link from "next/link";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { CopyrightIcon } from "lucide-react";

import { baseOptions } from "@/app/layout.config";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HomeLayout {...baseOptions}>
      {children}
      <Footer />
    </HomeLayout>
  );
}

function Footer() {
  return (
    <footer className="w-full py-6 bg-accent dark:bg-card">
      <div className="flex items-center justify-center text-sm gap-1 text-muted-foreground">
        <CopyrightIcon className="size-4 font-normal" />
        <span>{new Date().getFullYear()}</span> |
        <Link
          href="https://github.com/imredoyyy"
          target="_blank"
          className="underline underline-offset-4 transition-colors hover:text-primary"
        >
          Redoy Saha
        </Link>
      </div>
    </footer>
  );
}
