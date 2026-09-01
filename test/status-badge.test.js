import test from "node:test";
import assert from "node:assert/strict";

import {
  getStatusBadgeActiveEntities,
  getStatusBadgeAreaEntities,
  getStatusBadgeDeviceClassOptions,
  getStatusBadgeDeviceClassesForDomains,
  loadStatusBadgeDeviceClasses,
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

test("multiple domains combine binary doors and garage covers without shades", () => {
  const states = {
    "binary_sensor.side_door": state("binary_sensor.side_door", "on", {
      device_class: "door",
    }),
    "cover.garage_roller_door": state("cover.garage_roller_door", "open", {
      device_class: "garage",
    }),
    "cover.garage_shade": state("cover.garage_shade", "open", {
      device_class: "shade",
    }),
    "cover.lounge_shade": state("cover.lounge_shade", "open", {
      device_class: "shade",
    }),
  };
  const hass = {
    states,
    entities: {
      "binary_sensor.side_door": { area_id: "garage" },
      "cover.garage_roller_door": { area_id: "garage" },
      "cover.garage_shade": { area_id: "garage" },
      "cover.lounge_shade": { area_id: "lounge" },
    },
  };

  assert.deepEqual(
    getStatusBadgeAreaEntities(hass, {
      state_source: "area_count",
      area: ["garage", "lounge"],
      domain: "binary_sensor",
      domains: ["binary_sensor", "cover"],
      device_class: ["door", "garage"],
    }).map((item) => item.entity_id),
    ["binary_sensor.side_door", "cover.garage_roller_door"]
  );

});

test("device class choices include Home Assistant and discovered subtypes", async () => {
  const connection = {
    sendMessagePromise: async () => ({
      resources: {
        cover: Object.fromEntries([
          "_", "awning", "blind", "curtain", "damper", "door", "garage",
          "gate", "shade", "shutter", "window",
        ].map((value) => [value, {}])),
        media_player: Object.fromEntries([
          "_", "projector", "receiver", "speaker", "tv",
        ].map((value) => [value, {}])),
      },
    }),
  };
  const hass = {
    connection,
    states: {
      "cover.garage": state("cover.garage", "closed", {
        device_class: "garage",
      }),
      "cover.shade": state("cover.shade", "closed", {
        device_class: "shade",
      }),
      "media_player.projector": state("media_player.projector", "off", {
        device_class: "projector",
      }),
      "media_player.speaker": state("media_player.speaker", "off", {
        device_class: "speaker",
      }),
      "media_player.tv": state("media_player.tv", "off", {
        device_class: "tv",
      }),
    },
  };

  await loadStatusBadgeDeviceClasses(hass);

  assert.deepEqual(
    getStatusBadgeDeviceClassOptions(hass, {
      domain: "cover",
      domains: ["cover", "media_player"],
    }).map((option) => option.value),
    [
      "awning",
      "blind",
      "curtain",
      "damper",
      "door",
      "garage",
      "gate",
      "projector",
      "receiver",
      "shade",
      "shutter",
      "speaker",
      "tv",
      "window",
    ]
  );

  assert.deepEqual(
    getStatusBadgeDeviceClassOptions(hass, {
      domains: ["cover", "media_player"],
    }).filter((option) => ["garage", "tv"].includes(option.value)),
    [
      {
        value: "garage",
        domains: ["cover"],
        label: "Garage",
      },
      {
        value: "tv",
        domains: ["media_player"],
        label: "Tv",
      },
    ]
  );

  assert.deepEqual(
    getStatusBadgeDeviceClassesForDomains(hass, {
      domains: ["cover", "media_player"],
      device_class: ["garage", "projector", "custom_class"],
    }, ["cover"]),
    ["garage", "custom_class"]
  );
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
