import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tokens": path.resolve(__dirname, "./tokens"),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
