import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://embalses.antoniohorrillo.com",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
