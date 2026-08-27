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

  if (!state) return false;
  if (!domain) return !NATIVE_INACTIVE_STATES.has(state);

  if (TIMESTAMP_STATE_DOMAINS.has(domain)) {
    return state !== "unavailable";
  }

  if (["unavailable", "unknown"].includes(state)) return false;
  if (state === "off" && domain !== "alert") return false;

  switch (domain) {
    case "alarm_control_panel":
      return state !== "disarmed";

    case "alert":
      return state !== "idle";

    case "cover":
    case "valve":
      return state !== "closed";

    case "device_tracker":
    case "person":
      return state !== "not_home";

    case "lawn_mower":
      return !["docked", "paused"].includes(state);

    case "lock":
      return state !== "locked";

    case "media_player":
      return state !== "standby";

    case "vacuum":
      return !["idle", "docked", "paused"].includes(state);

    case "plant":
      return state === "problem";

    case "group":
      return ["on", "home", "open", "locked", "problem"].includes(state);

    case "timer":
      return state === "active";

    case "camera":
      return ["streaming", "recording"].includes(state);

    default:
      return true;
  }
}

const TIMESTAMP_STATE_DOMAINS = new Set([
  "ai_task",
  "button",
  "conversation",
  "datetime",
  "event",
  "image",
  "infrared",
  "input_button",
  "notify",
  "radio_frequency",
  "scene",
  "stt",
  "tag",
  "tts",
  "wake_word",
]);

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

export function isEntityUnavailable(stateObj) {
  return stateObj?.state?.toString().toLowerCase() === "unavailable";
}

export function getEntityIssue(entityId, stateObj) {
  if (isEntityUnavailable(stateObj)) return "unavailable";
  if (entityId && !stateObj) return "missing";

  return null;
}
