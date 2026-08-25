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

const DEV_DISPLAY_NAMES = [
  "Orbit Area Card",
  "Orbit Status Card",
  "Orbit Action Card",
  "Orbit Deck Card",
  "Orbit Status Badge",
];

function namespaceOrbitDevSource(enabled) {
  const sourceRoot = `${resolve("src")}/`;
  const entry = resolve("src/index.js");

  return {
    name: "namespace-orbit-dev-source",
    enforce: "pre",
    transform(code, id) {
      const sourcePath = id.split("?", 1)[0];

      if (
        !enabled ||
        !sourcePath.startsWith(sourceRoot) ||
        !/\.(?:js|json)$/.test(sourcePath)
      ) {
        return null;
      }

      let namespacedCode = code;

      for (const elementName of DEV_ELEMENT_NAMES) {
        namespacedCode = namespacedCode.replaceAll(
          elementName,
          `${elementName}-dev`
        );
      }

      for (const displayName of DEV_DISPLAY_NAMES) {
        namespacedCode = namespacedCode.replaceAll(
          displayName,
          `${displayName} (Dev)`
        );
      }

      if (sourcePath === entry) {
        namespacedCode = `console.info("Orbit Cards development namespace active (-dev)");\n${namespacedCode}`;
      }

      return { code: namespacedCode, map: null };
    },
  };
}

export default defineConfig(({ mode }) => {
  const isDevNamespace = mode === "orbit-dev";

  return {
    plugins: [
      copyOrbitDevIcons(),
      namespaceOrbitDevSource(isDevNamespace),
    ],

    build: {
      emptyOutDir: !isDevNamespace,
      codeSplitting: false,
      lib: {
        entry: "src/index.js",
        formats: ["es"],
        fileName: () => isDevNamespace
          ? "orbit-cards-dev.js"
          : "orbit-cards.js",
      },
    },
  };
});
