import test from "node:test";
import assert from "node:assert/strict";

import {
  getStatusBadgeActiveEntities,
  getStatusBadgeAreaEntities,
  normalizeStatusBadgeConfig,
} from "../src/common/helpers/status-badge.js";

function state(entityId, value, attributes = {}) {
  return { entity_id: entityId, state: String(value), attributes };
}

test("power thresholds compare supported units in watts", () => {
  const entities = [
    state("sensor.kettle_power", 1.5, {
      device_class: "power",
      unit_of_measurement: "kW",
    }),
    state("sensor.lamp_power", 500, {
      device_class: "power",
      unit_of_measurement: "W",
    }),
    state("sensor.unknown_power", 3, {
      device_class: "power",
      unit_of_measurement: "kWh",
    }),
  ];
  const active = getStatusBadgeActiveEntities(entities, {
    state_source: "area_count",
    domain: "sensor",
    device_class: "power",
    thresholds: { power: { value: 1000, direction: "above" } },
  });

  assert.deepEqual(active.map((item) => item.entity_id), ["sensor.kettle_power"]);
});

test("battery thresholds include low percentage and binary fallbacks", () => {
  const entities = [
    state("sensor.remote_battery", 15, { device_class: "battery" }),
    state("sensor.phone_battery", 80, { device_class: "battery" }),
    state("binary_sensor.lock_battery", "on", { device_class: "battery" }),
  ];
  const active = getStatusBadgeActiveEntities(entities, {
    state_source: "area_count",
    domain: "sensor",
    device_class: "battery",
    threshold: 20,
  });

  assert.deepEqual(active.map((item) => item.entity_id), [
    "sensor.remote_battery",
    "binary_sensor.lock_battery",
  ]);
});

test("area filtering prefers a device percentage battery over its binary fallback", () => {
  const states = {
    "sensor.lock_battery": state("sensor.lock_battery", 18, {
      device_class: "battery",
    }),
    "binary_sensor.lock_battery_low": state("binary_sensor.lock_battery_low", "on", {
      device_class: "battery",
    }),
    "binary_sensor.remote_battery_low": state("binary_sensor.remote_battery_low", "on", {
      device_class: "battery",
    }),
  };
  const hass = {
    states,
    entities: {
      "sensor.lock_battery": { area_id: "hall", device_id: "lock" },
      "binary_sensor.lock_battery_low": { area_id: "hall", device_id: "lock" },
      "binary_sensor.remote_battery_low": { area_id: "hall", device_id: "remote" },
    },
  };
  const result = getStatusBadgeAreaEntities(hass, {
    state_source: "area_count",
    area: "hall",
    domain: "sensor",
    device_class: "battery",
  });

  assert.deepEqual(result.map((item) => item.entity_id).sort(), [
    "binary_sensor.remote_battery_low",
    "sensor.lock_battery",
  ]);
});

test("normalization removes runtime defaults and clamps battery thresholds", () => {
  assert.deepEqual(normalizeStatusBadgeConfig({
    type: "custom:orbit-status-badge",
    state_source: "area_count",
    area: "hall",
    domain: "sensor",
    device_class: ["battery", "battery", ""],
    threshold: 150,
    show_state: true,
    show_icon: true,
    show_name: false,
    tap_action: { action: "Current state" },
  }), {
    type: "custom:orbit-status-badge",
    state_source: "area_count",
    area: "hall",
    domain: "sensor",
    device_class: "battery",
    threshold: 100,
  });
});
