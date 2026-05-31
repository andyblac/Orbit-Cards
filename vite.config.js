import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/orbit-cards.js",
      formats: ["es"],
      fileName: () => "orbit-cards.js",
    },

    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});