import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  minify: true,
  dts: true,
  target: "esnext",
  clean: true,
  banner: {
    js: "'use client'",
  },
  outDir: "dist",
  external: ["react", "react-dom", "katex"],
  esbuildOptions: (options) => {
    options.loader = {
      ...options.loader,
      ".css": "file",
    };
  },
  ...options,
}));
