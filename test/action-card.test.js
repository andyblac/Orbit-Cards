import assert from "node:assert/strict";
import test from "node:test";

import {
  getActionItemIconSource,
  getActionItems,
  isActionEntityRunning,
} from "../src/cards/action/helpers/model.js";

test("Action Card normalizes root and grouped action items", () => {
  assert.deepEqual(getActionItems({
    main_entity: "script.arrive_home",
    icon: "mdi:home",
    tap_action: { action: "toggle" },
  }), [{
    entity: "script.arrive_home",
    color: undefined,
    icon_source: undefined,
    icon: "mdi:home",
    icon_svg_color_override: undefined,
    tap_action: { action: "toggle" },
    hold_action: undefined,
    double_tap_action: undefined,
  }]);

  assert.deepEqual(getActionItems({
    entities: ["script.one", { entity: "script.two" }],
  }), [
    { entity: "script.one" },
    { entity: "script.two" },
  ]);
});

test("Action Card identifies running entities and icon sources", () => {
  assert.equal(isActionEntityRunning({
    entity_id: "script.arrive_home",
    state: "on",
    attributes: {},
  }), true);
  assert.equal(isActionEntityRunning({
    entity_id: "vacuum.downstairs",
    state: "cleaning",
    attributes: { current: 1 },
  }), true);
  assert.equal(isActionEntityRunning(null), false);

  assert.equal(getActionItemIconSource({
    icon_source: "template",
    icon: "{{ 'mdi:home' }}",
  }, "script.arrive_home"), "template");
  assert.equal(getActionItemIconSource({
    icon: "mdi:home",
  }, ""), "custom");
});
