import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/orbit-room-card.js",
      formats: ["es"],
      fileName: () => "orbit-room-card.js",
    },

    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});