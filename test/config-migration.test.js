import test from "node:test";
import assert from "node:assert/strict";

import {
  migrateAreaCardConfig,
  migrateDeckCardConfig,
  migrateStatusCardConfig,
} from "../src/common/helpers/config-migration.js";

test("Area Card migration renames legacy type, name, and presentation keys", () => {
  const source = {
    type: "custom:orbit-room-card",
    room_name: "Study",
    accent_color: "amber",
    main_entity_icon: "mdi:desk",
    state_template: "states('light.study')",
  };
  const result = migrateAreaCardConfig(source);

  assert.equal(result.migrated, true);
  assert.deepEqual(result.config, {
    type: "custom:orbit-area-card",
    area_name: "Study",
    color: "amber",
    icon: "mdi:desk",
    state_template: "{{ states('light.study') }}",
  });
  assert.deepEqual(source, {
    type: "custom:orbit-room-card",
    room_name: "Study",
    accent_color: "amber",
    main_entity_icon: "mdi:desk",
    state_template: "states('light.study')",
  });
});

test("Status Card migration normalizes grouped items independently", () => {
  const result = migrateStatusCardConfig({
    type: "custom:orbit-status-card",
    entities: [
      { entity: "light.study", status_name: "Study" },
      { state_template: "states('sensor.power')" },
    ],
  });

  assert.equal(result.migrated, true);
  assert.deepEqual(result.config.entities, [
    { entity: "light.study", name: "Study" },
    {
      state_template: "{{ states('sensor.power') }}",
      state_source: "template",
    },
  ]);
});

test("Deck Card migration recursively updates Orbit children", () => {
  const result = migrateDeckCardConfig({
    type: "custom:orbit-deck-card",
    decks: [{
      card: {
        type: "custom:orbit-deck-card-dev",
        decks: [{
          card: {
            type: "custom:orbit-room-card-dev",
            room_name: "Kitchen",
          },
        }],
      },
    }],
  });

  assert.equal(result.migrated, true);
  assert.deepEqual(result.config.decks[0].card.decks[0].card, {
    type: "custom:orbit-room-card-dev",
    area_name: "Kitchen",
  });
});

test("migration preserves object identity when no changes are required", () => {
  const source = { type: "custom:orbit-area-card", area: "study" };
  const result = migrateAreaCardConfig(source);

  assert.equal(result.migrated, false);
  assert.equal(result.config, source);
});
