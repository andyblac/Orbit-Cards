import assert from "node:assert/strict";
import test from "node:test";

import {
  canExecuteStatusActionWithoutEntity,
  getIndexedStatusAction,
} from "../src/cards/status/helpers/interactions.js";

test("status actions identify operations that do not require an entity", () => {
  for (const action of [
    "navigate",
    "url",
    "perform-action",
    "call-service",
    "fire-dom-event",
    "popup",
    "none",
    "Current state",
    "current-activity",
  ]) {
    assert.equal(canExecuteStatusActionWithoutEntity({ action }), true);
  }

  assert.equal(
    canExecuteStatusActionWithoutEntity({ action: "more-info" }),
    false
  );
  assert.equal(canExecuteStatusActionWithoutEntity({
    action: "more-info",
    entity: "light.kitchen",
  }), true);
});

test("dialog actions retain their grouped status index", () => {
  assert.deepEqual(
    getIndexedStatusAction({ action: "Current state" }, 2),
    { action: "Current state", status_index: 2 }
  );

  const navigate = { action: "navigate", navigation_path: "/home" };
  assert.equal(getIndexedStatusAction(navigate, 2), navigate);
});
