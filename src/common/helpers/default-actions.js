const SERVICE_ACTION_DOMAINS = {
  automation: "automation.trigger",
  button: "button.press",
  input_button: "input_button.press",
  scene: "scene.turn_on",
  script: "script.turn_on",
};

const TOGGLE_ACTION_DOMAINS = new Set([
  "alarm_control_panel",
  "climate",
  "cover",
  "fan",
  "humidifier",
  "input_boolean",
  "light",
  "lock",
  "media_player",
  "remote",
  "siren",
  "switch",
  "vacuum",
  "water_heater",
]);

export function getDefaultEntityAction(entityId, fallbackAction = "more-info") {
  const domain = entityId?.split(".")[0];

  if (!domain) {
    return {
      action: fallbackAction,
    };
  }

  const service = SERVICE_ACTION_DOMAINS[domain];

  if (service) {
    return {
      action: "call-service",
      service,
      service_data: {
        entity_id: entityId,
      },
    };
  }

  if (TOGGLE_ACTION_DOMAINS.has(domain)) {
    return {
      action: "toggle",
    };
  }

  return {
    action: fallbackAction,
  };
}
