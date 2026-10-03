import assert from "node:assert/strict";
import test from "node:test";

import { getInteractionConfigChanges } from
  "../src/common/editor/helpers/actions.js";

test("partial interaction changes preserve omitted sibling actions", () => {
  const interactions = [
    {
      key: "tap_action",
      formKey: "tap_action",
      defaultAction: "current-activity",
      customActions: ["current-activity"],
    },
    {
      key: "entity_tap_action",
      formKey: "icon_tap_action",
      defaultAction: "Current state",
      customActions: ["current-activity"],
    },
  ];
  const config = {
    entity_tap_action: { action: "current-activity" },
  };

  assert.deepEqual(
    getInteractionConfigChanges(
      { tap_action: { action: "more-info" } },
      interactions,
      config
    ),
    {
      tap_action: { action: "more-info" },
    }
  );
});

test("explicitly cleared interaction fields still clear their action", () => {
  const interactions = [{
    key: "entity_tap_action",
    formKey: "icon_tap_action",
    defaultAction: "Current state",
    customActions: ["current-activity"],
  }];

  assert.deepEqual(
    getInteractionConfigChanges(
      { icon_tap_action: undefined },
      interactions,
      { entity_tap_action: { action: "current-activity" } }
    ),
    {
      entity_tap_action: undefined,
    }
  );
});

test("only the interaction that originated the form event is changed", () => {
  const interactions = [
    {
      key: "tap_action",
      formKey: "tap_action",
      defaultAction: "current-activity",
      customActions: ["current-activity"],
    },
    {
      key: "entity_tap_action",
      formKey: "icon_tap_action",
      defaultAction: "Current state",
      customActions: ["current-activity"],
    },
  ];
  const config = {
    entity_tap_action: { action: "current-activity" },
  };

  assert.deepEqual(
    getInteractionConfigChanges(
      {
        tap_action: { action: "navigate" },
        icon_tap_action: "__default__",
      },
      interactions,
      config,
      ["tap_action"]
    ),
    {
      tap_action: { action: "navigate", navigation_path: "" },
    }
  );
});

test("removed optional interaction clears only that action", () => {
  const interactions = [
    {
      key: "tap_action",
      defaultAction: "more-info",
    },
    {
      key: "hold_action",
      defaultAction: "none",
    },
  ];

  assert.deepEqual(
    getInteractionConfigChanges(
      { tap_action: { action: "more-info" } },
      interactions,
      { hold_action: { action: "navigate" } },
      ["hold_action"]
    ),
    {
      hold_action: undefined,
    }
  );
});

test("native choices from the compact action picker become action configs", () => {
  const interactions = [{
    key: "tap_action",
    defaultAction: "Current state",
    customActions: ["current-activity"],
  }];

  assert.deepEqual(
    getInteractionConfigChanges(
      { tap_action: "more-info" },
      interactions,
      {},
      ["tap_action"]
    ),
    {
      tap_action: { action: "more-info" },
    }
  );
});
