import test from "node:test";
import assert from "node:assert/strict";

import {
  hasTemplateConfig,
  shouldUpdateForEntities,
} from "../src/common/helpers/updates.js";

function hass(states) {
  return { states };
}

test("entity update gating ignores unrelated Home Assistant changes", () => {
  const light = { entity_id: "light.study", state: "off" };
  const oldHass = hass({
    "light.study": light,
    "sensor.temperature": { entity_id: "sensor.temperature", state: "20" },
  });
  const nextHass = hass({
    "light.study": light,
    "sensor.temperature": { entity_id: "sensor.temperature", state: "21" },
  });
  const context = { hass: nextHass };

  assert.equal(
    shouldUpdateForEntities.call(context, new Map([["hass", oldHass]]), ["light.study"]),
    false
  );
});

test("entity update gating reacts to tracked entities and templates", () => {
  const oldHass = hass({
    "light.study": { entity_id: "light.study", state: "off" },
  });
  const nextHass = hass({
    "light.study": { entity_id: "light.study", state: "on" },
  });
  const changedProps = new Map([["hass", oldHass]]);

  assert.equal(
    shouldUpdateForEntities.call({ hass: nextHass }, changedProps, ["light.study"]),
    true
  );
  assert.equal(
    shouldUpdateForEntities.call(
      { hass: oldHass },
      changedProps,
      [],
      { hasTemplates: true }
    ),
    true
  );
});

test("template detection walks nested configuration", () => {
  assert.equal(hasTemplateConfig({ name: "Kitchen" }), false);
  assert.equal(hasTemplateConfig({ state_template: "states('sensor.a')" }), true);
  assert.equal(hasTemplateConfig({ nested: [{ color: "{{ 'red' }}" }] }), true);
});
