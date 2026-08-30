import assert from "node:assert/strict";
import test from "node:test";

import {
  withCommonCardInteractions,
} from "../src/common/helpers/card-interactions.js";

const CommonInteractions = withCommonCardInteractions(class {});

test("shared interactions suppress handled browser events", () => {
  const calls = [];
  const card = new CommonInteractions();

  card._stopEvent({
    preventDefault: () => calls.push("preventDefault"),
    stopPropagation: () => calls.push("stopPropagation"),
    stopImmediatePropagation: () => calls.push("stopImmediatePropagation"),
  });

  assert.deepEqual(calls, [
    "preventDefault",
    "stopPropagation",
    "stopImmediatePropagation",
  ]);
});

test("shared interactions cancel pending double taps", async () => {
  const card = new CommonInteractions();
  let fired = false;

  card._doubleTapTimer = setTimeout(() => {
    fired = true;
  }, 10);
  card._clearDoubleTapTimer();

  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(fired, false);
  assert.equal(card._doubleTapTimer, null);
});

test("shared long press delegates to the card-specific action handler", async () => {
  class TestCard extends CommonInteractions {
    get _LONG_PRESS_DELAY() {
      return 1;
    }

    _handleAction(action, entityId) {
      this.result = { action, entityId };
    }
  }

  const card = new TestCard();
  card._startLongPress(
    { stopPropagation() {} },
    "light.kitchen",
    { action: "more-info" }
  );

  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.deepEqual(card.result, {
    action: { action: "more-info" },
    entityId: "light.kitchen",
  });
  assert.equal(card._longPressTriggered, true);
});

test("shared navigation updates history and emits Home Assistant's event", () => {
  const originalHistory = globalThis.history;
  const originalWindow = globalThis.window;
  const observed = {};

  globalThis.history = {
    pushState(_state, _title, path) {
      observed.path = path;
    },
  };
  globalThis.window = {
    dispatchEvent(event) {
      observed.event = event;
    },
  };

  try {
    new CommonInteractions()._navigate("/dashboard-main/home");
  } finally {
    globalThis.history = originalHistory;
    globalThis.window = originalWindow;
  }

  assert.equal(observed.path, "/dashboard-main/home");
  assert.equal(observed.event.type, "location-changed");
  assert.deepEqual(observed.event.detail, { replace: false });
});
