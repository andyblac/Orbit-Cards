import assert from "node:assert/strict";
import test from "node:test";

import {
  cleanClearedStatusItem,
  hasLegacyStatusPresentationConfig,
  migrateStatusPresentationConfig,
  orderStatusConfig,
} from "../src/editors/status/config.js";

test("status presentation migration normalizes legacy color and icon keys", () => {
  const migrated = migrateStatusPresentationConfig({
    accent_color_source: "template",
    accent_color: "{{ config.color }}",
    entity_icon_source: "entity",
    entity_icon_on: "mdi:check",
  });

  assert.deepEqual(migrated, {
    color_source: "template",
    color: "{{ config.color }}",
    icon_source: "entity",
    icon_on: "mdi:check",
  });
});

test("legacy presentation detection includes grouped status items", () => {
  assert.equal(hasLegacyStatusPresentationConfig({
    mode: "icon_only",
    entities: [{ entity_icon: "mdi:lightbulb" }],
  }), true);
  assert.equal(hasLegacyStatusPresentationConfig({
    mode: "icon_only",
    entities: [{ icon: "mdi:lightbulb" }],
  }), false);
});

test("status config ordering migrates root area counts into grouped items", () => {
  const ordered = orderStatusConfig({
    type: "custom:orbit-status-card",
    mode: "icon_only",
    state_source: "area_count",
    area: "kitchen",
    domain: "light",
    entities: ["light.ceiling", { entity: "light.table" }],
  });

  assert.equal(ordered.state_source, undefined);
  assert.deepEqual(ordered.entities[0], {
    state_source: "area_count",
    area: "kitchen",
    domain: "light",
  });
  assert.deepEqual(ordered.entities[1], {
    state_source: "area_count",
    area: "kitchen",
    domain: "light",
  });
});

test("clearing a status entity removes dependent presentation and actions", () => {
  const item = {
    entity: "",
    color: "red",
    icon: "mdi:alert",
    tap_action: { action: "more-info" },
  };

  cleanClearedStatusItem(item);

  assert.equal(item.entity, "");
  assert.equal(item.color, undefined);
  assert.equal(item.icon, undefined);
  assert.equal(item.tap_action, undefined);
});
