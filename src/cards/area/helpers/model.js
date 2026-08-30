export function getAreaStatusIconSource(config, key, entityId = "") {
  const savedSource = config?.[`${key}_icon_source`];
  const hasEntity = Boolean(entityId || config?.[key]);
  const hasCustomIcon = Boolean(config?.[`${key}_icon`]);

  if (savedSource === "custom") return "custom";
  if (savedSource === "template") return "template";
  if (savedSource === "none") return "none";
  if (savedSource === "entity" && hasEntity) return "entity";
  if (hasCustomIcon) return "custom";
  return "none";
}

export function formatAreaStatusText(
  stateObj,
  decimalPlaces,
  formatState
) {
  if (!stateObj) return "—";

  if (decimalPlaces === undefined || decimalPlaces === "") {
    return formatState(stateObj);
  }

  const places = Number(decimalPlaces);
  const value = Number(stateObj.state);

  if (!Number.isFinite(places) || !Number.isFinite(value)) {
    return formatState(stateObj);
  }

  const unit = stateObj.attributes.unit_of_measurement || "";
  return `${value.toFixed(Math.max(0, places))}${unit}`;
}
