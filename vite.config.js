import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@babel/plugin-syntax-import-assertions"],
      },
    }),
    svgr(),
  ],
  server: {
    open: "/test",
  },
});
