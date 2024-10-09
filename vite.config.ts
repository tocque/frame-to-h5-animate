import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pathUtils from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": pathUtils.resolve(__dirname, "src"),
    },
  },
})
