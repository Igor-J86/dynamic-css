import { defineConfig } from "vite";
import fs from "node:fs";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.js",
      name: "DynamicCSSUtilities",
      fileName: "dynamic-css-utilities",
      formats: ["es","cjs"],
    },
    rollupOptions: {
      external: [
        "fs",
        "path",
      ],
      treeshake: false,
      output: {
        preserveModules: true
      },
      plugins: [
        {
          name: "copy-dts",
          closeBundle() {
            fs.copyFileSync("src/index.d.ts", "dist/index.d.ts");
          }
        }
      ]
    }
  }
})