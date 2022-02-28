const path = require("path");
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import DefineOptions from "unplugin-vue-define-options/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), DefineOptions()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "packages/index.js"),
      name: "vue-hash-calendar",
      fileName: (format) => `vue-hash-calendar.${format}.js`,
    },
    outDir: "lib",
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
