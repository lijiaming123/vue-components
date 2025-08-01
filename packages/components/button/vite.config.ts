// Vite 配置文件，用于打包 DaodaButton 组件库
import { defineConfig } from "vite"; // 引入 Vite 配置方法
import vue from "@vitejs/plugin-vue"; // 引入 Vue 插件，支持 .vue 文件
import { resolve } from "path"; // 引入路径处理模块

export default defineConfig({
  plugins: [vue()], // 使用 Vue 插件
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"), // 组件库入口文件
      name: "DaodaButton", // UMD 库的全局变量名称
      fileName: "index", // 打包输出的文件名
      formats: ["es", "cjs"], // 输出格式：ESM 和 CommonJS
    },
    rollupOptions: {
      // 指定外部依赖，不会被打包进库
      external: ["vue", "element-plus", "@daoda-component/utils"],
      output: {
        // 为外部依赖指定全局变量名
        globals: {
          vue: "Vue",
          "element-plus": "ElementPlus",
          "@daoda-component/utils": "DaodaUtils",
        },
      },
    },
  },
});
