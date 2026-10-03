import { build } from "vite";

const args = process.argv.slice(2);
const dev = args.includes("--dev");
const final = args.includes("--release");
const watch = args.includes("--watch");

if (dev && final) {
  throw new Error("A build cannot be both development and final release");
}

const cardKeys = new Set();
for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];
  if (arg.startsWith("--cards=")) {
    arg.slice("--cards=".length).split(",").filter(Boolean).forEach((key) => cardKeys.add(key));
  } else if (arg === "--cards") {
    const value = args[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error("--cards requires a comma-separated card list");
    }
    value.split(",").filter(Boolean).forEach((key) => cardKeys.add(key));
    index += 1;
  }
}

if (dev && cardKeys.size === 0) {
  throw new Error(
    "A new Orbit dev build requires --cards, for example: " +
      "npm run build:dev -- --cards=status,statusBadge"
  );
}

process.env.ORBIT_BUILD_RELEASE = final ? "1" : "0";
process.env.ORBIT_DEV_CARDS = [...cardKeys].join(",");
process.env.ORBIT_BUILD_DEV = dev ? "1" : "0";

if (dev && !watch) {
  await build({ mode: "production" });
  process.env.ORBIT_BUILD_PRESERVE_VERSION = "1";
  await build({ mode: "orbit-dev" });
} else {
  await build({
    mode: dev ? "orbit-dev" : "production",
    build: watch ? { watch: {} } : undefined,
  });
}
