import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  outDir: "dist",
  entry: ["src/**/!(*.test).ts"],
  format: ["esm", "cjs"],
  splitting: true,
  dts: true,
  treeshake: true,
  bundle: true,
  minify: !options.watch,
}));
