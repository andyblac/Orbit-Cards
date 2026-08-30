import { getEntityColor } from "./icons.js";
import { getEntityAreaId } from "./suggestions.js";
import { getNativeEntityBadgeColor } from "./status-badge.js";

const ACTIVE_ENTITY_CONTROLS = {
  light: { service: "turn_off", icon: "mdi:power" },
  switch: { service: "turn_off", icon: "mdi:power" },
  fan: { service: "turn_off", icon: "mdi:power" },
  cover: { service: "close_cover", icon: "mdi:window-shutter" },
  lock: { service: "lock", icon: "mdi:lock" },
  media_player: { service: "turn_off", icon: "mdi:power" },
  climate: { service: "turn_off", icon: "mdi:power" },
};

const nameCollators = new Map();
const durationFormatters = new Map();

export function getActiveEntityControl(hass, stateObj) {
  const domain = stateObj?.entity_id?.split(".")[0] || "";
  const control = ACTIVE_ENTITY_CONTROLS[domain];

  if (!control) return null;
  if (domain === "cover" && !(stateObj.attributes?.supported_features & 2)) {
    return null;
  }
  if (domain === "lock" && !(stateObj.attributes?.supported_features & 1)) {
    return null;
  }
  if (
    hass?.services?.[domain] &&
    !hass.services[domain][control.service]
  ) {
    return null;
  }

  return { domain, ...control };
}

export function getActiveEntityGroupControl(controllable) {
  if (!controllable.length) return null;

  const firstControl = controllable[0].control;
  return controllable.every(({ control }) =>
    control.domain === firstControl.domain &&
    control.service === firstControl.service
  )
    ? firstControl
    : null;
}

export function getActiveEntityName(hass, stateObj) {
  const name = hass?.formatEntityName?.(stateObj) ||
    stateObj?.attributes?.friendly_name ||
    stateObj?.entity_id ||
    "";
  const areaName = getActiveEntityAreaName(hass, stateObj);

  if (!areaName || name.length <= areaName.length) return name;

  const areaPrefix = new RegExp(
    `^${escapeRegExp(areaName)}(?:\\s*[-–—:|]\\s*|\\s+)`,
    "i"
  );

  return name.replace(areaPrefix, "").trim() || name;
}

export function getActiveEntityAreaName(hass, stateObj) {
  const areaId =
    getEntityAreaId(hass, stateObj?.entity_id) ||
    stateObj?.attributes?.area_id ||
    "";

  return hass?.areas?.[areaId]?.name?.trim() || "";
}

export function getActiveEntityPowerState(
  hass,
  stateObj,
  extendedRegistryEntry = null,
  powerStates = getActiveEntityPowerStates(hass)
) {
  const entityId = stateObj?.entity_id || "";
  const deviceId = hass?.entities?.[entityId]?.device_id;

  if (!deviceId) return null;

  const candidates = powerStates.filter((candidate) =>
    hass?.entities?.[candidate.entity_id]?.device_id === deviceId
  );

  if (candidates.length === 1) return candidates[0];
  if (candidates.length > 1) {
    return getNamedPowerState(
      hass,
      stateObj,
      candidates,
      extendedRegistryEntry
    );
  }

  const areaId = getEntityAreaId(hass, entityId);
  if (!areaId) return null;

  const areaName = hass?.areas?.[areaId]?.name?.trim() || "";
  const targetName = normalizeEntityMatchName(
    getActiveEntityName(hass, stateObj)
  );
  const areaCandidates = powerStates.filter((candidate) => {
    if (getEntityAreaId(hass, candidate.entity_id) !== areaId) return false;

    const candidateDeviceId =
      hass?.entities?.[candidate.entity_id]?.device_id;
    const candidateDevice = hass?.devices?.[candidateDeviceId];
    const candidateDeviceName = candidateDevice?.name_by_user ||
      candidateDevice?.name ||
      "";

    return normalizeEntityMatchName(
      removeAreaNamePrefix(candidateDeviceName, areaName)
    ) === targetName;
  });

  return areaCandidates.length === 1 ? areaCandidates[0] : null;
}

export function getActiveEntityPowerStates(hass) {
  return Object.values(hass?.states || {}).filter((candidate) =>
    candidate?.entity_id?.startsWith("sensor.") &&
    candidate.attributes?.device_class === "power" &&
    Number.isFinite(Number(candidate.state))
  );
}

function getNamedPowerState(
  hass,
  stateObj,
  candidates,
  extendedRegistryEntry
) {
  const entityId = stateObj?.entity_id || "";
  const targetNames = [...new Set([
    ...getEntityMatchNames(hass, stateObj),
    ...getSwitchAsXSourceNames(
      hass,
      stateObj,
      extendedRegistryEntry
    ),
  ])];
  const targetObjectId = normalizeEntityMatchName(
    entityId.split(".")[1] || ""
  );
  const scored = candidates.map((candidate) => {
    const candidateName = normalizeEntityMatchName(
      getActiveEntityName(hass, candidate)
    );
    const candidateObjectId = normalizeEntityMatchName(
      candidate.entity_id.split(".")[1] || ""
    );
    let score = 0;

    if (candidateObjectId === `${targetObjectId}power`) score += 4;
    if (targetNames.some((name) => candidateName === `${name}power`)) {
      score += 4;
    }
    if (targetObjectId && candidateObjectId.startsWith(targetObjectId)) {
      score += 1;
    }
    if (targetNames.some((name) => candidateName.startsWith(name))) {
      score += 1;
    }

    return { candidate, score };
  }).sort((left, right) => right.score - left.score);

  return scored[0].score >= 4 && scored[0].score > (scored[1]?.score || 0)
    ? scored[0].candidate
    : null;
}

export function getActiveEntityNameCollator(hass) {
  const locale = hass?.locale?.language || hass?.language || "en";

  if (!nameCollators.has(locale)) {
    nameCollators.set(locale, new Intl.Collator(locale, {
      numeric: true,
      sensitivity: "base",
    }));
  }

  return nameCollators.get(locale);
}

export function getActiveEntityFormattedState(hass, stateObj) {
  if (!stateObj) return "";

  const formattedState = hass?.formatEntityState?.(stateObj);

  if (formattedState) return formattedState;

  const state = String(stateObj?.state || "").replaceAll("_", " ");

  return state
    ? state[0].toUpperCase() + state.slice(1)
    : "";
}

export function compareActiveEntityNames(collator, a, b) {
  return collator.compare(a.name, b.name) ||
    a.stateObj.entity_id.localeCompare(b.stateObj.entity_id);
}

export function getActiveEntitiesDialogWidth(controls, groupControl) {
  const longestNameLength = controls.reduce(
    (length, { name, areaName }) => Math.max(
      length,
      name.length,
      areaName?.length || 0
    ),
    0
  );
  const contentWidth = 132 + (longestNameLength * 8);
  const headerWidth = groupControl ? 360 : 280;

  return Math.min(520, Math.max(headerWidth, contentWidth));
}

export function formatActiveEntityDuration(hass, stateObj, now = Date.now()) {
  const changedAt = Date.parse(stateObj?.last_changed || "");

  if (!Number.isFinite(changedAt)) return "";

  const elapsed = Math.max(0, now - changedAt);
  let unit;
  let value;

  if (elapsed >= 86_400_000) {
    unit = "days";
    value = Math.round(elapsed / 86_400_000);
  } else if (elapsed >= 3_600_000) {
    unit = "hours";
    value = Math.round(elapsed / 3_600_000);
  } else {
    unit = "minutes";
    value = Math.max(1, Math.round(elapsed / 60_000));
  }

  const locale = String(
    hass?.locale?.language || hass?.language || "en"
  ).replace("_", "-");

  try {
    const formatted = getDurationFormatter(locale).format({ [unit]: value });

    return locale.toLowerCase().startsWith("en")
      ? formatted.replace(
          /\b(days?|hours?|minutes?)\b/,
          (word) => word[0].toUpperCase() + word.slice(1)
        )
      : formatted;
  } catch (_err) {
    const singular = unit.slice(0, -1);
    const label = value === 1 ? singular : unit;

    return `${value} ${label[0].toUpperCase()}${label.slice(1)}`;
  }
}

export function getActiveEntityServiceName(hass, control) {
  return hass?.services?.[control.domain]?.[control.service]?.name;
}

export function getActiveEntityIconStyle(stateObj) {
  const color = getEntityColor(stateObj) ||
    getNativeEntityBadgeColor(stateObj, true);

  return `color:${color};--mdc-icon-size:36px`;
}

export function getUnavailableActiveEntityItems(hass, stateObjs = []) {
  const deviceGroups = new Map();
  const ungrouped = [];

  stateObjs.forEach((stateObj) => {
    const deviceId = hass?.entities?.[stateObj.entity_id]?.device_id;

    if (!deviceId) {
      ungrouped.push({ stateObj });
      return;
    }

    deviceGroups.set(deviceId, [
      ...(deviceGroups.get(deviceId) || []),
      stateObj,
    ]);
  });

  const grouped = [...deviceGroups.entries()].flatMap(([
    deviceId,
    deviceStateObjs,
  ]) => {
    if (deviceStateObjs.length === 1) {
      return [{ stateObj: deviceStateObjs[0] }];
    }

    const representative = deviceStateObjs[0];
    const device = hass?.devices?.[deviceId];
    const name = device?.name_by_user ||
      device?.name ||
      getActiveEntityName(hass, representative);
    const lastChanged = getOldestStateTimestamp(
      deviceStateObjs,
      "last_changed"
    );
    const lastUpdated = getOldestStateTimestamp(
      deviceStateObjs,
      "last_updated"
    );

    return [{
      stateObj: {
        ...representative,
        entity_id: `sensor.orbit_unavailable_device_${deviceId}`,
        state: "unavailable",
        attributes: {
          ...representative.attributes,
          friendly_name: name,
        },
        last_changed: lastChanged || representative.last_changed,
        last_updated: lastUpdated || representative.last_updated,
      },
      name,
      areaName: getActiveEntityAreaName(hass, representative),
      icon: "mdi:devices",
      deviceId,
      entityCount: deviceStateObjs.length,
    }];
  });

  return [...grouped, ...ungrouped];
}

function getDurationFormatter(locale) {
  if (!durationFormatters.has(locale)) {
    durationFormatters.set(locale, new Intl.DurationFormat(locale, {
      style: "long",
    }));
  }

  return durationFormatters.get(locale);
}

function getOldestStateTimestamp(stateObjs, key) {
  return stateObjs
    .map((stateObj) => stateObj?.[key])
    .filter(Boolean)
    .sort()[0] || "";
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeEntityMatchName(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();
}

function getEntityMatchNames(hass, stateObj) {
  const registryEntry = hass?.entities?.[stateObj?.entity_id] || {};

  return [...new Set([
    getActiveEntityName(hass, stateObj),
    registryEntry.name,
    stateObj?.attributes?.friendly_name,
  ].map(normalizeEntityMatchName).filter(Boolean))];
}

function getSwitchAsXSourceNames(
  hass,
  stateObj,
  extendedRegistryEntry
) {
  if (!stateObj?.entity_id?.startsWith("light.")) return [];

  const sourceEntityId =
    extendedRegistryEntry?.options?.switch_as_x?.entity_id;
  const sourceStateObj = hass?.states?.[sourceEntityId];

  if (sourceStateObj) {
    return getEntityMatchNames(hass, sourceStateObj);
  }

  const deviceId = hass?.entities?.[stateObj.entity_id]?.device_id;
  if (!deviceId) return [];

  const sources = Object.values(hass?.states || {}).filter((candidate) => {
    if (!candidate?.entity_id?.startsWith("switch.")) return false;

    const registryEntry = hass?.entities?.[candidate.entity_id];
    const candidateChangedAt = Date.parse(candidate.last_changed || "");
    const targetChangedAt = Date.parse(stateObj.last_changed || "");
    const changedTogether = Number.isFinite(candidateChangedAt) &&
      Number.isFinite(targetChangedAt) &&
      Math.abs(candidateChangedAt - targetChangedAt) <= 2_000;

    return registryEntry?.device_id === deviceId &&
      candidate.state === stateObj.state &&
      changedTogether;
  });

  return sources.length === 1
    ? getEntityMatchNames(hass, sources[0])
    : [];
}

function removeAreaNamePrefix(value, areaName) {
  if (!areaName) return value;

  return String(value || "").replace(
    new RegExp(
      `^${escapeRegExp(areaName)}(?:\\s*[-–—:|]\\s*|\\s+)`,
      "i"
    ),
    ""
  ).trim();
}
