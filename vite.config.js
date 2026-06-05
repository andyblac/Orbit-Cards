import { defineConfig } from "vite";
import { access, cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

function copyOrbitIcons() {
  return {
    name: "copy-orbit-icons",
    async writeBundle() {
      const source = resolve("src/icons");
      const target = resolve("dist/icons");

      try {
        await access(source);
      } catch (_err) {
        return;
      }

      await rm(target, {
        recursive: true,
        force: true,
      });
      await mkdir(target, {
        recursive: true,
      });
      await cp(source, target, {
        recursive: true,
        filter: (path) => !path.endsWith(".DS_Store"),
      });
    },
  };
}

export default defineConfig({
  plugins: [
    copyOrbitIcons(),
  ],

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
