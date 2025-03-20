// source.config.ts
import {
  defineConfig,
  defineCollections,
  defineDocs
} from "fumadocs-mdx/config";
import { remarkInstall } from "fumadocs-docgen";
import { z } from "zod";
var changelogCollection = defineCollections({
  type: "doc",
  dir: "./content/changelog",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date()
  })
});
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkInstall]
  }
});
var { docs, meta } = defineDocs({
  dir: "./content/docs"
});
export {
  changelogCollection,
  source_config_default as default,
  docs,
  meta
};
