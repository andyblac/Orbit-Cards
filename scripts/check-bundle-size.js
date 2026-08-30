import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const BUNDLE_PATH = new URL("../dist/orbit-cards.js", import.meta.url);
const LIMITS = {
  raw: 525_000,
  gzip: 120_000,
};

const bundle = await readFile(BUNDLE_PATH);
const sizes = {
  raw: bundle.byteLength,
  gzip: gzipSync(bundle).byteLength,
};
const failures = Object.entries(sizes).filter(
  ([format, size]) => size > LIMITS[format]
);

console.log(
  `Production bundle: ${formatBytes(sizes.raw)} raw, ` +
  `${formatBytes(sizes.gzip)} gzip`
);

if (failures.length) {
  failures.forEach(([format, size]) => {
    console.error(
      `${format} bundle size ${formatBytes(size)} exceeds ` +
      `${formatBytes(LIMITS[format])}`
    );
  });
  process.exitCode = 1;
}

function formatBytes(bytes) {
  return `${(bytes / 1000).toFixed(2)} kB`;
}
