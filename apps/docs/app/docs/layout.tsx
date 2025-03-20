import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "../layout.config";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      sidebar={{
        hideSearch: true,
      }}
      {...baseOptions}
    >
      {children}
    </DocsLayout>
  );
}
