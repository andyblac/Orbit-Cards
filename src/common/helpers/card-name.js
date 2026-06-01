export function getCardName(config, hass, fallback = "Card") {
  if (config.name) return config.name;
  if (config.card_name) return config.card_name;
  if (config.room_name) return config.room_name;

  const areaId = config.area;

  if (areaId && hass?.areas?.[areaId]) {
    return hass.areas[areaId].name || fallback;
  }

  return fallback;
}
