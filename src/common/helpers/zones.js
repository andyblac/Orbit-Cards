const zoneIndexCache = new WeakMap();

export function getActiveZoneIndex(hass) {
  const states = hass?.states;

  if (!states) {
    return {
      zones: [],
      zoneByTrackerState: new Map(),
    };
  }

  const cached = zoneIndexCache.get(states);

  if (cached) return cached;

  const zones = Object.values(states)
    .filter((stateObj) =>
      stateObj.entity_id?.startsWith("zone.") &&
      !stateObj.attributes?.passive
    );

  const zoneByTrackerState = new Map(
    zones.map((zone) => [
      getZoneTrackerState(zone),
      zone,
    ])
  );

  const index = {
    zones,
    zoneByTrackerState,
  };

  zoneIndexCache.set(states, index);

  return index;
}

function getZoneTrackerState(zone) {
  const zoneName =
    zone.attributes?.friendly_name ||
    zone.entity_id.replace(/^zone\./, "");

  return zoneName
    .toLowerCase()
    .replace(/\s+/g, "_");
}
