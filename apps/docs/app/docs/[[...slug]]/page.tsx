import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page";
import type { Page } from "fumadocs-core/source";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import Link from "next/link";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Card, Cards } from "fumadocs-ui/components/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { TypeTable } from "@/components/type-table";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { docsPages } from "@/data";

interface Props {
  params: Promise<{
    slug?: string[];
  }>;
}

export const generateStaticParams = async () => {
  const res = source.getPages().map((page) => ({
    slug: page.slugs,
  }));

  return res;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const { title, description } = page.data;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "website",
      images: ["./opengraph-image.png"],
    },
  };
};

const Page = async ({ params }: Props) => {
  const slug = (await params).slug;
  const page = source.getPage(slug);

  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "normal",
        single: false,
        header: <div className="w-10 h-4" />,
      }}
      footer={{
        enabled: true,
        component: <DocsFooter pageUrl={page.url} />,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            Link: ({
              className,
              ...props
            }: React.ComponentProps<typeof Link>) => (
              <Link
                className={cn(
                  "font-medium underline underline-offset-4",
                  className
                )}
                {...props}
              />
            ),
            Step,
            Steps,
            Tab,
            Tabs,
            Callout: ({ children, ...props }) => (
              <defaultMdxComponents.Callout
                {...props}
                className={cn(
                  props,
                  props.type === "info" && "border-l-blue-500/50",
                  props.type === "warn" && "border-l-amber-700/50",
                  props.type === "error" && "border-l-red-500/50"
                )}
              >
                {children}
              </defaultMdxComponents.Callout>
            ),
            Card,
            Cards,
            TypeTable,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
};

export default Page;

function DocsFooter({ pageUrl }: { pageUrl: string }) {
  const currentPageIndex = docsPages.findIndex((p) => p.url === pageUrl);

  const prevPage =
    currentPageIndex > 0 ? docsPages[currentPageIndex - 1] : null;
  const nextPage =
    currentPageIndex < docsPages.length - 1
      ? docsPages[currentPageIndex + 1]
      : null;

  return (
    <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {prevPage ? (
        <Button
          variant="outline"
          asChild
          className="flex-col h-fit md:!items-start"
        >
          <Link href={prevPage.url}>
            <div className="flex items-center gap-1 text-muted-foreground">
              <ChevronLeftIcon aria-hidden />
              <span className="line-clamp-1">Previous</span>
            </div>
            <span>{prevPage.data.title}</span>
          </Link>
        </Button>
      ) : (
        <div></div>
      )}

      {nextPage ? (
        <Button
          variant="outline"
          className="flex-col h-fit w-full md:!items-end"
          asChild
        >
          <Link href={nextPage.url}>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="line-clamp-1">Next</span>
              <ChevronRightIcon aria-hidden />
            </div>
            <span>{nextPage.data.title}</span>
          </Link>
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
}
