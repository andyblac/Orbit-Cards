export function getEntityDomain(entityId = "") {
  return entityId.split(".")[0] || "";
}

export function getEntityAreaId(hass, entityId) {
  const entity = hass?.entities?.[entityId];

  if (entity?.area_id) {
    return entity.area_id;
  }

  const deviceId = entity?.device_id;

  return deviceId ? hass?.devices?.[deviceId]?.area_id || "" : "";
}

export function isNumericEntity(hass, entityId) {
  const state = hass?.states?.[entityId]?.state;

  return state !== "" && Number.isFinite(Number(state));
}
