export function getCardName(config, hass, fallback = "Card") {
  if (config.name) return config.name;
  if (config.card_name) return config.card_name;
  if (config.room_name) {
    return formatCardNameValue(
      config.room_name,
      config,
      hass,
      fallback
    );
  }
  if (config.status_name) {
    return formatCardNameValue(
      config.status_name,
      config,
      hass,
      fallback
    );
  }

  const areaId = config.area;

  if (areaId && hass?.areas?.[areaId]) {
    return hass.areas[areaId].name || fallback;
  }

  return fallback;
}

export function formatCardNameValue(value, config, hass, fallback = "") {
  if (typeof value === "string") return value;

  const items = Array.isArray(value)
    ? value
    : [value];
  const text = items
    .map((item) =>
      formatCardNameItem(item, config, hass, fallback))
    .filter(Boolean)
    .join(" ");

  return text;
}

function formatCardNameItem(item, config, hass, fallback) {
  if (!item) return "";
  if (typeof item === "string") return item;
  if (item.type === "text") return item.text || "";
  if (item.type === "area") return getAreaName(config, hass) || "";
  if (item.type === "floor") return getFloorName(config, hass) || "";

  const stateObj = getNameContextState(config, hass);

  if (stateObj && typeof hass?.formatEntityName === "function") {
    return hass.formatEntityName(stateObj, {
      type: item.type,
    }) || "";
  }

  return item.type === "entity"
    ? stateObj?.attributes?.friendly_name ||
      stateObj?.entity_id ||
      ""
    : "";
}

function getAreaName(config, hass) {
  const areaId = config.area;

  if (areaId && hass?.areas?.[areaId]) {
    return hass.areas[areaId].name || "";
  }

  const stateObj = getNameContextState(config, hass);

  return stateObj &&
    typeof hass?.formatEntityName === "function"
    ? hass.formatEntityName(stateObj, { type: "area" })
    : "";
}

function getFloorName(config, hass) {
  const areaId = config.area;
  const floorId =
    areaId && hass?.areas?.[areaId]
      ? hass.areas[areaId].floor_id
      : "";

  if (floorId && hass?.floors?.[floorId]) {
    return hass.floors[floorId].name || "";
  }

  const stateObj = getNameContextState(config, hass);

  return stateObj &&
    typeof hass?.formatEntityName === "function"
    ? hass.formatEntityName(stateObj, { type: "floor" })
    : "";
}

function getNameContextState(config, hass) {
  const entityId = config.main_entity || config.entity || "";

  return entityId && hass?.states
    ? hass.states[entityId]
    : null;
}
