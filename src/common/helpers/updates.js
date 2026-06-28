export function shouldUpdateForEntities(changedProps, entityIds, options = {}) {
  if (!changedProps.has("hass")) return true;

  if (changedProps.has("_config")) {
    return true;
  }

  if ([...changedProps.keys()].some((key) => key !== "hass")) {
    return true;
  }

  if (options.hasTemplates) return true;

  const oldHass = changedProps.get("hass");
  const newHass = this.hass;

  if (!oldHass || !newHass) return true;

  const ids = [...new Set(entityIds.filter(Boolean))];

  if (!ids.length && !options.includeZones) {
    return false;
  }

  if (
    ids.some(
      (entityId) =>
        oldHass.states?.[entityId] !==
        newHass.states?.[entityId]
    )
  ) {
    return true;
  }

  if (options.includeZones) {
    return didZoneStateChange(oldHass, newHass);
  }

  return false;
}

export function hasTemplateConfig(config) {
  return Object.keys(config || {}).some((key) =>
    key.endsWith("_template")
  );
}

function didZoneStateChange(oldHass, newHass) {
  const zoneIds = new Set([
    ...Object.keys(oldHass.states || {}),
    ...Object.keys(newHass.states || {}),
  ].filter((entityId) => entityId.startsWith("zone.")));

  return [...zoneIds].some(
    (entityId) =>
      oldHass.states?.[entityId] !==
      newHass.states?.[entityId]
  );
}
