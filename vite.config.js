import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.jsx",
    }),
  ],
  resolve: {
    alias: {
      constant: path.resolve("./src/constant"),
      components: path.resolve("./src/components"),
      pages: path.resolve("./src/pages"),
      resources: path.resolve("./src/resources"),
      services: path.resolve("./src/services"),
      routes: path.resolve("./src/routes"),
      hooks: path.resolve("./src/hooks"),
      store: path.resolve("./src/store"),
      utils: path.resolve("./src/utils"),
      context: path.resolve("./src/context"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    hmr: true,
  },
});
