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
  return getNativeStateActiveState(stateObj.state, domain);
}

export function getNativeStateActiveState(stateValue, domain = "") {
  const state = String(stateValue ?? "").trim().toLowerCase();

  if (ALWAYS_INACTIVE_STATES.has(state)) return false;
  if (!domain) return !NATIVE_INACTIVE_STATES.has(state);

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

const NATIVE_INACTIVE_STATES = new Set([
  "",
  "false",
  "off",
  "no",
  "none",
  "null",
  "unknown",
  "unavailable",
  "closed",
  "closing",
  "locked",
  "locking",
  "unlocking",
  "jammed",
  "not_home",
  "idle",
  "standby",
  "docked",
  "disarmed",
  "below_horizon",
]);

const ALWAYS_INACTIVE_STATES = new Set([
  "",
  "false",
  "off",
  "no",
  "none",
  "null",
  "unknown",
  "unavailable",
]);

export function isEntityUnavailable(stateObj) {
  return stateObj?.state?.toString().toLowerCase() === "unavailable";
}
