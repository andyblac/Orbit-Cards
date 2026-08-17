import { defineConfig } from "vite";
import { createHash } from "node:crypto";
import {
  access,
  copyFile,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "node:fs/promises";
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
          .filter(
            (entry) =>
              entry.isFile() &&
              entry.name !== ".DS_Store" &&
              entry.name !== "manifest.json"
          )
          .map((entry) =>
            copyFile(
              resolve(source, entry.name),
              resolve(target, entry.name)
            )
          )
      );

      const manifest = JSON.parse(
        await readFile(resolve(source, "manifest.json"), "utf8")
      );
      const versionedManifest = await Promise.all(
        manifest.map(async (icon) => {
          if (!icon.file) return icon;

          const iconContent = await readFile(resolve(source, icon.file));
          const revision = createHash("sha256")
            .update(iconContent)
            .digest("hex")
            .slice(0, 8);

          return {
            ...icon,
            revision,
          };
        })
      );

      await writeFile(
        resolve(target, "manifest.json"),
        `${JSON.stringify(versionedManifest, null, 2)}\n`
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
      entry: "src/index.js",
      formats: ["es"],
      fileName: () => "orbit-cards.js",
    },
  },
});
