/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: "./",
  build: {
    target: "es2021",
  },
  server: {
    port: 8066,
    cors: true,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/tests/setup.ts",
  },
});