import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    //extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    //mainFields: ["module"]
    
  }
})