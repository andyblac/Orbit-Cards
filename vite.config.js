import { defineConfig } from "vite";
import { copyFile, mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";

function copyOrbitDevIcons() {
  return {
    name: "copy-orbit-dev-icons",
    async writeBundle() {
      const source = resolve("src/icons");
      const target = resolve("dist");
      const entries = await readdir(source, { withFileTypes: true });

      await mkdir(target, { recursive: true });
      await Promise.all(
        entries
          .filter(
            (entry) =>
              entry.isFile() &&
              (entry.name.endsWith(".svg") || entry.name === "manifest.json")
          )
          .map((entry) =>
            copyFile(resolve(source, entry.name), resolve(target, entry.name))
          )
      );
    },
  };
}

export default defineConfig({
  plugins: [copyOrbitDevIcons()],

  build: {
    codeSplitting: false,
    lib: {
      entry: "src/index.js",
      formats: ["es"],
      fileName: () => "orbit-cards.js",
    },
  },
});
