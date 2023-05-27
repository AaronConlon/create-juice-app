import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    dts: false,
    clean: true,
    sourceMap: false,
    minify: true,
    legacyOutput: true,
    entryPoints: ["src/index.ts"],
    outDir: "dist",
    ignoreWatch: ["**/node_modules/**"],
    define: {
      __VERSION__: '"1.0.0"',
    },
    target: "node12",
    treeshake: true,
    format: ["esm"],
    external: ["fs", "path", "child_process"],
  };
});
