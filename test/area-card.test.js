import assert from "node:assert/strict";
import test from "node:test";

import {
  formatAreaStatusText,
  getAreaStatusIconSource,
} from "../src/cards/area/helpers/model.js";

test("Area Card formats numeric and fallback status text", () => {
  const stateObj = {
    state: "21.26",
    attributes: { unit_of_measurement: "°C" },
  };

  assert.equal(
    formatAreaStatusText(stateObj, 1, () => "fallback"),
    "21.3°C"
  );
  assert.equal(
    formatAreaStatusText({ state: "unknown", attributes: {} }, 1, () => "fallback"),
    "fallback"
  );
  assert.equal(formatAreaStatusText(null, 1, () => "fallback"), "—");
});

test("Area Card resolves saved and inferred status icon sources", () => {
  assert.equal(getAreaStatusIconSource({
    status1_icon_source: "entity",
    status1: "sensor.temperature",
  }, "status1", "sensor.temperature"), "entity");
  assert.equal(getAreaStatusIconSource({
    status1_icon: "mdi:thermometer",
  }, "status1"), "custom");
  assert.equal(getAreaStatusIconSource({}, "status1"), "none");
});
