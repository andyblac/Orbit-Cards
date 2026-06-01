export function formatEntityState(stateObj) {
  const unit = stateObj.attributes.unit_of_measurement || "";
  const value = stateObj.state;

  if (unit) return `${value}${unit}`;

  return value === "on" || value === "off"
    ? value.toUpperCase()
    : value;
}

export function getEntityActiveState(stateObj) {
  if (!stateObj) return false;

  const domain = stateObj.entity_id.split(".")[0];
  const state = stateObj.state;

  switch (domain) {
    case "cover":
      return ["open", "opening"].includes(state);

    case "lock":
      return state === "unlocked";

    case "person":
      return state === "home";

    case "device_tracker":
      return state !== "not_home";

    case "climate":
      return state !== "off";

    case "media_player":
      return ![
        "off",
        "idle",
        "standby",
        "unavailable",
      ].includes(state);

    case "vacuum":
      return ![
        "docked",
        "idle",
        "off",
      ].includes(state);

    case "alarm_control_panel":
      return state !== "disarmed";

    case "sun":
      return state === "above_horizon";

    default:
      return state === "on";
  }
}
