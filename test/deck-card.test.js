import assert from "node:assert/strict";
import test from "node:test";

import {
  getDeckItemEntity,
  getDeckItemRenderConfig,
  getDefaultDeckIndex,
  getDefaultSelectionKey,
  hasDeckItemActions,
} from "../src/cards/deck/items.js";

test("Deck Card resolves wrapper actions and entities before child defaults", () => {
  const item = {
    attributes: {
      entity: "light.wrapper",
      tap_action: { action: "toggle", entity: "light.action" },
    },
    card: {
      type: "tile",
      entity: "light.child",
    },
  };

  assert.equal(hasDeckItemActions(item), true);
  assert.equal(getDeckItemEntity(item), "light.wrapper");
});

test("Deck Card removes overridden child actions and flattens surfaces", () => {
  const item = {
    attributes: {
      tap_action: { action: "navigate", navigation_path: "/home" },
    },
    card: {
      type: "tile",
      entity: "light.kitchen",
      tap_action: { action: "toggle" },
      hold_action: { action: "more-info" },
    },
  };

  assert.deepEqual(getDeckItemRenderConfig(item, true), {
    type: "tile",
    entity: "light.kitchen",
    hold_action: { action: "more-info" },
    hide_background: true,
  });
});

test("Deck Card derives stable default selection metadata", () => {
  const decks = [
    { attributes: {} },
    { attributes: { default: true } },
    { attributes: {} },
  ];

  assert.equal(getDefaultDeckIndex(decks), 1);
  assert.equal(getDefaultSelectionKey(decks), ":1:");
  assert.equal(getDefaultDeckIndex([{ attributes: {} }]), 0);
});
