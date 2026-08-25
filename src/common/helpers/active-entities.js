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
  const areaId = getEntityAreaId(hass, stateObj?.entity_id);
  const areaName = hass?.areas?.[areaId]?.name?.trim();

  if (!areaName || name.length <= areaName.length) return name;

  const areaPrefix = new RegExp(
    `^${escapeRegExp(areaName)}(?:\\s*[-–—:|]\\s*|\\s+)`,
    "i"
  );

  return name.replace(areaPrefix, "").trim() || name;
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
    (length, { name }) => Math.max(length, name.length),
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

function getDurationFormatter(locale) {
  if (!durationFormatters.has(locale)) {
    durationFormatters.set(locale, new Intl.DurationFormat(locale, {
      style: "long",
    }));
  }

  return durationFormatters.get(locale);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
