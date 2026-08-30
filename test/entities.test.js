import test from "node:test";
import assert from "node:assert/strict";

import {
  getEntityActiveState,
  getEntityIssue,
  getNativeStateActiveState,
} from "../src/common/helpers/entities.js";

test("native active-state rules follow domain semantics", () => {
  assert.equal(getNativeStateActiveState("off", "light"), false);
  assert.equal(getNativeStateActiveState("on", "light"), true);
  assert.equal(getNativeStateActiveState("locked", "lock"), false);
  assert.equal(getNativeStateActiveState("unlocked", "lock"), true);
  assert.equal(getNativeStateActiveState("closed", "cover"), false);
  assert.equal(getNativeStateActiveState("opening", "cover"), true);
  assert.equal(getNativeStateActiveState("not_home", "person"), false);
  assert.equal(getNativeStateActiveState("Office", "person"), true);
  assert.equal(getNativeStateActiveState("standby", "media_player"), false);
  assert.equal(getNativeStateActiveState("playing", "media_player"), true);
  assert.equal(getNativeStateActiveState("2026-08-30T12:00:00Z", "event"), true);
  assert.equal(getNativeStateActiveState("unavailable", "event"), false);
});

test("entity helpers handle missing and unavailable entities", () => {
  assert.equal(getEntityActiveState(null), false);
  assert.equal(getEntityActiveState({ entity_id: "light.study", state: "on" }), true);
  assert.equal(getEntityIssue("light.study", null), "missing");
  assert.equal(getEntityIssue("light.study", {
    entity_id: "light.study",
    state: "unavailable",
  }), "unavailable");
  assert.equal(getEntityIssue("light.study", {
    entity_id: "light.study",
    state: "off",
  }), null);
});
