import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const RELEASE = /^(\d+)\.(\d+)\.(\d+)$/;
const BETA = /^(\d+\.\d+\.\d+-beta)\.(\d+)$/;
const DEVELOPMENT = /^(\d+\.\d+\.\d+)-dev\.(\d+)$/;
const BETA_DEVELOPMENT = /^(\d+\.\d+\.\d+-beta\.\d+)-dev\.(\d+)$/;
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const CARD_KEYS = ["area", "status", "action", "deck", "statusBadge"];

function nextVersion(current, { dev, final }) {
  if (dev) {
    const release = RELEASE.exec(current);
    const beta = BETA.exec(current);
    const development = DEVELOPMENT.exec(current);
    const betaDevelopment = BETA_DEVELOPMENT.exec(current);

    if (betaDevelopment) {
      return `${betaDevelopment[1]}-dev.${BigInt(betaDevelopment[2]) + 1n}`;
    }
    if (development) {
      return `${development[1]}-dev.${BigInt(development[2]) + 1n}`;
    }
    if (beta) return `${beta[1]}.${BigInt(beta[2]) + 1n}-dev.1`;
    if (release) {
      return `${release[1]}.${release[2]}.${BigInt(release[3]) + 1n}-beta.1-dev.1`;
    }
    throw new Error(`Cannot create a dev build from version ${current}`);
  }

  const betaDevelopment = BETA_DEVELOPMENT.exec(current);
  const development = DEVELOPMENT.exec(current);
  const beta = BETA.exec(current);
  if (final && betaDevelopment) {
    return betaDevelopment[1].replace(/-beta\.\d+$/, "");
  }
  if (final && beta) return beta[1].replace(/-beta$/, "");
  if (betaDevelopment) return betaDevelopment[1];
  if (development) return development[1];
  return current;
}

function readCardVersions(source) {
  return Object.fromEntries(
    CARD_KEYS.map((key) => {
      const match = source.match(new RegExp(`\\b${key}:\\s*"([^"]+)"`));
      if (!match) throw new Error(`Missing ${key} in src/version.js`);
      return [key, match[1]];
    })
  );
}

function replaceVersionSource(source, orbitVersion, cardVersions) {
  let nextSource = source.replace(
    /ORBIT_CARDS_VERSION\s*=\s*"[^"]+"/,
    `ORBIT_CARDS_VERSION = "${orbitVersion}"`
  );
  for (const [key, version] of Object.entries(cardVersions)) {
    nextSource = nextSource.replace(
      new RegExp(`(\\b${key}:\\s*)"[^"]+"`),
      `$1"${version}"`
    );
  }
  return nextSource;
}

export default function buildVersion({
  dev = false,
  final = false,
  preserve = false,
  cards = [],
  root = process.cwd(),
} = {}) {
  const packagePath = resolve(root, "package.json");
  const packageLockPath = resolve(root, "package-lock.json");
  const versionPath = resolve(root, "src/version.js");
  const selectedCards = new Set(cards);
  let packageData;
  let packageLockData;
  let packageVersion;
  let orbitVersion;
  let versionSource;
  let nextVersionSource;
  let cardVersions;

  return {
    name: "build-version",
    buildStart() {
      const invalidCards = [...selectedCards].filter((key) => !CARD_KEYS.includes(key));
      if (invalidCards.length) {
        throw new Error(`Unknown Orbit card keys: ${invalidCards.join(", ")}`);
      }

      packageData = JSON.parse(readFileSync(packagePath, "utf8"));
      packageLockData = JSON.parse(readFileSync(packageLockPath, "utf8"));
      packageVersion = packageData.version;
      orbitVersion = preserve
        ? packageVersion
        : nextVersion(packageVersion, { dev, final });
      versionSource = readFileSync(versionPath, "utf8");
      cardVersions = readCardVersions(versionSource);

      for (const key of CARD_KEYS) {
        if (preserve) continue;
        if ((dev && selectedCards.has(key)) || (!dev && cardVersions[key].includes("-dev."))) {
          cardVersions[key] = nextVersion(cardVersions[key], { dev, final });
        } else if (final && cardVersions[key].includes("-beta.")) {
          cardVersions[key] = nextVersion(cardVersions[key], { dev, final });
        }
      }

      for (const version of [orbitVersion, ...Object.values(cardVersions)]) {
        if (!SEMVER.test(version)) throw new Error(`Invalid semantic version ${version}`);
      }
      if (process.env.RELEASE_TAG && process.env.RELEASE_TAG !== `v${orbitVersion}`) {
        throw new Error(
          `Release tag ${process.env.RELEASE_TAG} does not match package version v${orbitVersion}`
        );
      }
      nextVersionSource = replaceVersionSource(versionSource, orbitVersion, cardVersions);
    },
    shouldTransformCachedModule({ id }) {
      return id === versionPath ? true : null;
    },
    transform(_code, id) {
      if (id !== versionPath) return null;
      return { code: nextVersionSource, map: null };
    },
    writeBundle() {
      if (orbitVersion !== packageVersion) {
        packageData.version = orbitVersion;
        packageLockData.version = orbitVersion;
        if (packageLockData.packages?.[""]) {
          packageLockData.packages[""].version = orbitVersion;
        }
        writeFileSync(packagePath, `${JSON.stringify(packageData, null, 2)}\n`);
        writeFileSync(packageLockPath, `${JSON.stringify(packageLockData, null, 2)}\n`);
      }
      if (nextVersionSource !== versionSource) {
        writeFileSync(versionPath, nextVersionSource);
      }
      console.info(`\nBuilt Orbit Cards ${orbitVersion}`);
      if (dev) {
        console.info(`Development cards: ${[...selectedCards].join(", ")}`);
      }
    },
  };
}
