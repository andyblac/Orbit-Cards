import { defineConfig } from "vite";
import { access, copyFile, mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";

function copyOrbitIcons() {
  return {
    name: "copy-orbit-icons",
    async writeBundle() {
      const source = resolve("src/icons");
      const target = resolve("dist");

      try {
        await access(source);
      } catch (_err) {
        return;
      }

      await mkdir(target, {
        recursive: true,
      });

      const entries = await readdir(source, {
        withFileTypes: true,
      });

      await Promise.all(
        entries
          .filter((entry) => entry.isFile() && entry.name !== ".DS_Store")
          .map((entry) =>
            copyFile(
              resolve(source, entry.name),
              resolve(target, entry.name)
            )
          )
      );
    },
  };
}

export default defineConfig({
  plugins: [
    copyOrbitIcons(),
  ],

  build: {
    codeSplitting: false,
    lib: {
      entry: "src/orbit-cards.js",
      formats: ["es"],
      fileName: () => "orbit-cards.js",
    },
  },
});
