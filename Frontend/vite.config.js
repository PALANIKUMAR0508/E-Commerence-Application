import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      //localhost:5173 la run aagura ui yaa backend kuda connect pannrom
      "/api": { target: "http://localhost:5000", changeOrigin: true },
    },
  },
});
