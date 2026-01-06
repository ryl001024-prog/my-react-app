import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import AntdResolver from "unplugin-auto-import-antd";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    AutoImport({
      resolvers: [AntdResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  // assetsInclude: ["**/*.svg"],
  define: {
    "process.env": {},
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 1102,
  },
});
