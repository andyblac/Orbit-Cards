import assert from "node:assert/strict";
import test from "node:test";

import {
  formatAreaStatusText,
  getAreaStatusIconSource,
  getAreaStatusSource,
  getAreaStatusTemplateEntries,
} from "../src/cards/area/helpers/model.js";
import {
  disconnectTemplateSubscriptions,
  evaluateStateTemplate,
  syncTemplateSubscriptions,
} from "../src/common/helpers/templates.js";

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

test("Area status sources default to entity and are independent for all three slots", () => {
  const config = {
    status1: "sensor.temperature",
    status1_template: "{{ 20 }}",
  };
  for (const index of [1, 2, 3]) {
    const key = `status${index}`;
    assert.equal(getAreaStatusSource(config, key), "entity");
    const next = { ...config, [`${key}_source`]: "template", [`${key}_template`]: "{{ 0 }}" };
    assert.equal(getAreaStatusSource(next, key), "template");
    assert.deepEqual(getAreaStatusTemplateEntries(next), [
      { template: "{{ 0 }}", entityId: next[key] || "" },
    ]);
    assert.equal(next.status1, "sensor.temperature");
  }
  assert.deepEqual(getAreaStatusTemplateEntries(config), []);
  assert.deepEqual(getAreaStatusTemplateEntries({ status1_source: "template" }), []);
});

test("Area status templates use shared live subscriptions and unsubscribe when switched back", async () => {
  const callbacks = [];
  let unsubscribed = 0;
  const host = {
    isConnected: true,
    _config: {
      status1_source: "template",
      status1_template: "{{ states('sensor.temperature') }}°C",
      status2_source: "template",
      status2_template: "{{ 0 }}",
      status3_source: "template",
      status3_template: "{{ false }}",
    },
    hass: {
      connection: {
        subscribeMessage(callback, message) {
          assert.equal(message.type, "render_template");
          callbacks.push(callback);
          return Promise.resolve(() => { unsubscribed++; });
        },
      },
    },
  };
  const sync = () => syncTemplateSubscriptions.call(host, getAreaStatusTemplateEntries(host._config));
  const result = (index) => evaluateStateTemplate.call(host, host._config[`status${index}_template`], "");
  sync();
  assert.equal(callbacks.length, 3);
  assert.equal(result(1), null);
  callbacks[0]({ result: "20°C" });
  callbacks[1]({ result: "0" });
  callbacks[2]({ result: "false" });
  assert.equal(result(1), "20°C");
  assert.equal(result(2), "0");
  assert.equal(result(3), "false");
  const revision = host._templateRevision;
  callbacks[0]({ result: "21°C" });
  assert.equal(result(1), "21°C");
  assert.equal(host._templateRevision, revision + 1);
  sync();
  assert.equal(callbacks.length, 3, "unchanged renders reuse subscriptions");
  callbacks[0]({ error: "Template error" });
  assert.equal(result(1), null);
  callbacks[0]({ result: "22°C" });
  assert.equal(result(1), "22°C");
  host._config = { ...host._config, status1_source: "entity", status2_source: "entity", status3_source: "entity" };
  sync();
  await Promise.resolve();
  assert.equal(unsubscribed, 3);
  assert.equal(result(1), null);
  disconnectTemplateSubscriptions.call(host);
});
