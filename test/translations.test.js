import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";

import { localize } from "../src/common/localize.js";

const translationsDirectory = new URL("../src/translations/", import.meta.url);

async function readTranslations() {
  const filenames = (await readdir(translationsDirectory))
    .filter((filename) => filename.endsWith(".json"))
    .sort();

  return Promise.all(filenames.map(async (filename) => [
    filename,
    JSON.parse(await readFile(new URL(filename, translationsDirectory), "utf8")),
  ]));
}

function placeholders(value) {
  return [...String(value).matchAll(/\{([^{}]+)\}/g)]
    .map((match) => match[1])
    .sort();
}

test("all locales contain the same keys as English", async () => {
  const translations = await readTranslations();
  const english = translations.find(([filename]) => filename === "en.json")[1];
  const expectedKeys = Object.keys(english).sort();

  for (const [filename, locale] of translations) {
    assert.deepEqual(
      Object.keys(locale).sort(),
      expectedKeys,
      `${filename} must contain exactly the English translation keys`
    );
  }
});

test("translation values are non-empty strings", async () => {
  for (const [filename, locale] of await readTranslations()) {
    for (const [key, value] of Object.entries(locale)) {
      assert.equal(typeof value, "string", `${filename}: ${key}`);
      assert.notEqual(value.trim(), "", `${filename}: ${key}`);
    }
  }
});

test("translated placeholders match their English source", async () => {
  const translations = await readTranslations();
  const english = translations.find(([filename]) => filename === "en.json")[1];

  for (const [filename, locale] of translations) {
    for (const [key, source] of Object.entries(english)) {
      assert.deepEqual(
        placeholders(locale[key]),
        placeholders(source),
        `${filename}: ${key} must preserve placeholders`
      );
    }
  }
});

test("native Home Assistant labels take priority over Orbit fallbacks", () => {
  const nativeTranslations = {
    "ui.card.common.entity_not_found": "Entität nicht gefunden",
    "ui.components.device-class-picker.device_class": "Geräteklasse",
  };
  const hass = {
    language: "de",
    localize: (key) => nativeTranslations[key] || key,
  };

  assert.equal(localize(hass, "Entity not found"), "Entität nicht gefunden");
  assert.equal(localize(hass, "Device class"), "Geräteklasse");
});
