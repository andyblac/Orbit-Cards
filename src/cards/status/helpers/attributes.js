export function getStatusAttribute(stateObj, key) {
  const value = stateObj?.attributes?.[key];

  if (value === null || value === undefined) return null;
  if (typeof value === "string" && value.trim() === "") return null;

  return value;
}

export function getConfiguredNavigationPath(config) {
  const path = config.navigate?.navigation_path;

  if (typeof path !== "string") return null;

  const trimmed = path.trim();

  return trimmed || null;
}

export function getStatusColor(config, stateObj) {
  return (
    config.accent_color ||
    getStatusAttribute(stateObj, "color") ||
    "theme"
  );
}

export function getStatusActiveState(
  stateObj,
  getEntityActiveState = null
) {
  if (!stateObj) return false;

  const state = stateObj.state?.toString().trim().toLowerCase();

  const isActiveStatusState = ![
    "",
    "0",
    "off",
    "false",
    "idle",
    "standby",
    "unknown",
    "unavailable",
    "none",
  ].includes(state);

  if (!isActiveStatusState) return false;

  const domain = stateObj.entity_id?.split(".")[0];

  if (["sensor", "input_text", "input_select", "select"].includes(domain)) {
    return true;
  }

  return typeof getEntityActiveState === "function"
    ? getEntityActiveState(stateObj)
    : true;
}

export function getStatusNavigationPath(config, stateObj) {
  const navigation = getStatusAttribute(stateObj, "navigation");

  const navigationPath =
    typeof navigation === "string"
      ? navigation.trim()
      : navigation?.navigation_path;

  return (
    getConfiguredNavigationPath(config) ||
    navigationPath ||
    "/lovelace/home"
  );
}
