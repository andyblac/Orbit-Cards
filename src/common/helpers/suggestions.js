export function getEntityDomain(entityId = "") {
  return entityId.split(".")[0] || "";
}

export function getEntityAreaId(hass, entityId) {
  return hass?.entities?.[entityId]?.area_id || "";
}

export function isNumericEntity(hass, entityId) {
  const state = hass?.states?.[entityId]?.state;

  return state !== "" && Number.isFinite(Number(state));
}
