import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import fs from "node:fs";
import DynamicCSSUtilities from "./script";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: "script/index.js",
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
        preserveModules: true,
        exports: 'named',
      },
      plugins: [
        {
          name: "copy-dts",
          closeBundle() {
            fs.copyFileSync("script/index.d.ts", "dist/index.d.ts");
          }
        }
      ]
    }
  },
  plugins: [
    react(),
    DynamicCSSUtilities({
      rootFolder: 'src',
      assetsPath: 'src/assets/',
      fileName: 'dynamic.css'
    })
  ]
})