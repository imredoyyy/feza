import {
  defineConfig,
  defineCollections,
  defineDocs,
} from "fumadocs-mdx/config";
import { remarkInstall } from "fumadocs-docgen";
import { z } from "zod";

export const changelogCollection = defineCollections({
  type: "doc",
  dir: "./content/changelog",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
  }),
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkInstall],
  },
});

export const { docs, meta } = defineDocs({
  dir: "./content/docs",
});
