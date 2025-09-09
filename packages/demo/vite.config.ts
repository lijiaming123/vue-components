import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@daoda-component/config": resolve(__dirname, "../config/src"),
      "@daoda-component/components/button": resolve(
        __dirname,
        "../components/button/src"
      ),
      "@daoda-component/components/select": resolve(
        __dirname,
        "../components/select/src"
      ),
    },
  },
  server: {
    port: 5174,
    open: true,
  },
});
