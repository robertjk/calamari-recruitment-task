/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "%components": path.resolve(__dirname, "src/app/components"),
      "%mocks": path.resolve(__dirname, "src/mocks"),
      "%store": path.resolve(__dirname, "src/store"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests",
  },
});
