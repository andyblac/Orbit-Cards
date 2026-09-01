import { clearKeys } from "../../common/editor/helpers/config.js";
import { hasNativeTemplateSyntax } from "../../common/helpers/templates.js";
import {
  CURRENT_ACTIVITY_ACTION,
  CURRENT_STATE_ACTION,
  getStatusBadgeStateSource,
  pickStatusSourceConfig,
  STATUS_SOURCE_CONFIG_KEYS,
} from "../../common/helpers/status-badge.js";

export const STATUS_ENTITY_DEPENDENT_KEYS = [
  ...STATUS_SOURCE_CONFIG_KEYS,
  "color_source",
  "color",
  "color_on",
  "color_off",
  "icon_source",
  "icon",
  "icon_on",
  "icon_off",
  "icon_svg_color_override",
  "icon_on_svg_color_override",
  "icon_off_svg_color_override",
  "state_template",
  "label_template",
  "name_template",
  "tap_action",
  "hold_action",
  "double_tap_action",
  "entity_tap_action",
  "entity_hold_action",
  "entity_double_tap_action",
];

export const STATUS_GROUP_ROOT_KEYS = [
  "entity",
  ...STATUS_ENTITY_DEPENDENT_KEYS,
];

export const PERSON_ENTITY_DEPENDENT_KEYS = [
  "tracker_entity",
  "eta_entity",
  "battery_entity_1",
  "battery_entity_2",
  "color_source",
  "color",
  "color_on",
  "color_off",
  "tap_action",
  "hold_action",
  "double_tap_action",
  "entity_tap_action",
  "entity_hold_action",
  "entity_double_tap_action",
];

export const TRACKER_ENTITY_DEPENDENT_KEYS = ["eta_entity"];

const STATUS_ITEM_KEYS = [
  "state_source",
  "entity",
  "area",
  "domain",
  "domains",
  "device_class",
  "threshold",
  "thresholds",
  "hide",
  "active_template",
  "inactive_template",
  "entity_tap_action",
  "entity_hold_action",
  "entity_double_tap_action",
  "color_source",
  "color",
  "color_on",
  "color_off",
  "icon_source",
  "icon",
  "icon_on",
  "icon_off",
  "icon_svg_color_override",
  "icon_on_svg_color_override",
  "icon_off_svg_color_override",
  "state_template",
  "label_template",
  "name_template",
  "tap_action",
  "hold_action",
  "double_tap_action",
];

const STATUS_STATE_CONFIG_ORDER = [
  "state_source",
  "entity",
  "area",
  "domain",
  "domains",
  "device_class",
  "threshold",
  "thresholds",
  "hide",
  "active_template",
  "inactive_template",
];

const STATUS_COLOR_ICON_CONFIG_ORDER = [
  "color_source",
  "color",
  "color_on",
  "color_off",
  "icon_source",
  "icon",
  "icon_on",
  "icon_off",
  "icon_svg_color_override",
  "icon_on_svg_color_override",
  "icon_off_svg_color_override",
];

const STATUS_CARD_INTERACTION_CONFIG_ORDER = [
  "tap_action",
  "hold_action",
  "double_tap_action",
];

const STATUS_ENTITY_INTERACTION_CONFIG_ORDER = [
  "entity_tap_action",
  "entity_hold_action",
  "entity_double_tap_action",
];

const STATUS_STANDARD_CONFIG_ORDER = [
  "type",
  "mode",
  ...STATUS_STATE_CONFIG_ORDER,
  ...STATUS_ENTITY_INTERACTION_CONFIG_ORDER,
  "name",
  "name_template",
  ...STATUS_COLOR_ICON_CONFIG_ORDER,
  "state_template",
  "label_template",
  ...STATUS_CARD_INTERACTION_CONFIG_ORDER,
  "grid_options",
  "view_layout",
];

const STATUS_PERSON_CONFIG_ORDER = [
  "type",
  "mode",
  "name",
  "name_template",
  "entity",
  "tracker_entity",
  "eta_entity",
  "battery_entity_1",
  "battery_entity_2",
  ...STATUS_ENTITY_INTERACTION_CONFIG_ORDER,
  ...STATUS_COLOR_ICON_CONFIG_ORDER,
  ...STATUS_CARD_INTERACTION_CONFIG_ORDER,
  "grid_options",
  "view_layout",
];

const STATUS_ICON_ONLY_CONFIG_ORDER = [
  "type",
  "mode",
  "wrap",
  "separate_cards",
  "items_per_row",
  "entities",
  ...STATUS_CARD_INTERACTION_CONFIG_ORDER,
  "grid_options",
  "view_layout",
];

export function cleanClearedStatusItem(item) {
  Object.assign(item, clearKeys(STATUS_ENTITY_DEPENDENT_KEYS));
}

export function orderStatusConfig(config) {
  const cleanedConfig = migrateStatusPresentationConfig(
    cleanEmptyStatusValues(config)
  );
  if (cleanedConfig.mode !== "icon_only") delete cleanedConfig.entities;
  moveRootAreaCountToStatusItems(cleanedConfig);
  if (
    cleanedConfig.mode !== "person" &&
    cleanedConfig.mode !== "icon_only"
  ) {
    cleanedConfig.state_source = getStatusBadgeStateSource(cleanedConfig);
  }
  cleanAreaCountEntity(cleanedConfig);
  cleanDefaultStatusActions(cleanedConfig);
  const ordered = {};
  const usedKeys = new Set();

  getStatusConfigOrder(cleanedConfig).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(cleanedConfig, key)) {
      ordered[key] =
        key === "entities" && Array.isArray(cleanedConfig[key])
          ? cleanedConfig[key].map(orderStatusItem)
          : cleanedConfig[key];
      usedKeys.add(key);
    }
  });

  Object.keys(cleanedConfig).forEach((key) => {
    if (!usedKeys.has(key)) ordered[key] = cleanedConfig[key];
  });

  return ordered;
}

export function migrateStatusPresentationConfig(config = {}) {
  const migrated = { ...config };

  if (
    migrated.color_source === undefined &&
    migrated.accent_color_source !== undefined
  ) {
    migrated.color_source = migrated.accent_color_source;
  }
  if (
    migrated.color === undefined &&
    (migrated.color_source === "template" ||
      hasNativeTemplateSyntax(migrated.accent_color)) &&
    migrated.accent_color !== undefined
  ) {
    migrated.color = migrated.accent_color;
  }
  if (migrated.color_source !== undefined) delete migrated.accent_color_source;
  if (migrated.color !== undefined) delete migrated.accent_color;

  if (
    migrated.icon_source === undefined &&
    migrated.entity_icon_source !== undefined
  ) {
    migrated.icon_source = migrated.entity_icon_source;
  }
  if (migrated.icon_source === "template" && migrated.icon === undefined) {
    migrated.icon = migrated.icon_template ||
      migrated.entity_icon_template ||
      migrated.entity_icon;
  }

  const iconKeyPairs = [
    ["icon", "entity_icon"],
    ["icon_on", "entity_icon_on"],
    ["icon_off", "entity_icon_off"],
    ["icon_svg_color_override", "entity_icon_svg_color_override"],
    ["icon_on_svg_color_override", "entity_icon_on_svg_color_override"],
    ["icon_off_svg_color_override", "entity_icon_off_svg_color_override"],
  ];

  iconKeyPairs.forEach(([nextKey, legacyKey]) => {
    if (
      migrated[nextKey] === undefined &&
      migrated[legacyKey] !== undefined &&
      !(nextKey === "icon" && migrated.icon_source === "template")
    ) {
      migrated[nextKey] = migrated[legacyKey];
    }
    delete migrated[legacyKey];
  });

  delete migrated.entity_icon_source;
  delete migrated.entity_icon_template;
  delete migrated.icon_template;
  return migrated;
}

export function hasLegacyStatusPresentationConfig(config = {}) {
  const hasLegacyKeys = (value) => Boolean(
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    (
      value.accent_color_source !== undefined ||
      hasNativeTemplateSyntax(value.accent_color) ||
      value.entity_icon_source !== undefined ||
      value.entity_icon_template !== undefined ||
      value.entity_icon !== undefined ||
      value.entity_icon_on !== undefined ||
      value.entity_icon_off !== undefined ||
      value.icon_template !== undefined
    )
  );

  return hasLegacyKeys(config) ||
    (Array.isArray(config.entities) && config.entities.some(hasLegacyKeys));
}

export function getCustomStatusActionLabel(action) {
  if (action === CURRENT_STATE_ACTION) return CURRENT_STATE_ACTION;
  if (action === CURRENT_ACTIVITY_ACTION) return "Current activity";
  return undefined;
}

function getStatusConfigOrder(config) {
  if (config?.mode === "person") return STATUS_PERSON_CONFIG_ORDER;
  if (config?.mode === "icon_only") return STATUS_ICON_ONLY_CONFIG_ORDER;
  return STATUS_STANDARD_CONFIG_ORDER;
}

function moveRootAreaCountToStatusItems(config) {
  if (
    config?.mode !== "icon_only" ||
    config.state_source !== "area_count" ||
    !Array.isArray(config.entities) ||
    config.entities.length === 0
  ) {
    return;
  }

  const areaCountConfig = pickStatusSourceConfig(config);
  config.entities = config.entities.map((item) => {
    const normalizedItem = typeof item === "string"
      ? { entity: item }
      : { ...(item || {}) };

    if (normalizedItem.state_source === undefined) {
      Object.assign(normalizedItem, areaCountConfig);
      cleanAreaCountEntity(normalizedItem);
    }
    return normalizedItem;
  });

  STATUS_SOURCE_CONFIG_KEYS.forEach((key) => delete config[key]);
}

function orderStatusItem(item) {
  if (typeof item === "string") {
    return orderObjectKeys(
      { state_source: "entity", entity: item },
      STATUS_ITEM_KEYS
    );
  }
  if (!item || typeof item !== "object" || Array.isArray(item)) return item;

  const cleanedItem = migrateStatusPresentationConfig(
    cleanEmptyStatusValues(item)
  );
  cleanedItem.state_source = getStatusBadgeStateSource(cleanedItem);
  cleanAreaCountEntity(cleanedItem);
  cleanDefaultStatusItemActions(cleanedItem);
  return orderObjectKeys(cleanedItem, STATUS_ITEM_KEYS);
}

function cleanAreaCountEntity(config) {
  if (config?.state_source !== "area_count") return;
  delete config.entity;
  delete config.main_entity;
  delete config.include_low_sensors;
}

function cleanDefaultStatusActions(config) {
  if (config?.state_source !== "area_count") return;
  if (config.tap_action?.action === CURRENT_ACTIVITY_ACTION) {
    delete config.tap_action;
  }
  if (config.entity_tap_action?.action === CURRENT_STATE_ACTION) {
    delete config.entity_tap_action;
  }
}

function cleanDefaultStatusItemActions(config) {
  cleanDefaultStatusActions(config);
}

function cleanEmptyStatusValues(config = {}) {
  return Object.fromEntries(
    Object.entries(config).filter(([, value]) =>
      value !== undefined && value !== ""
    )
  );
}

function orderObjectKeys(config, keyOrder) {
  const ordered = {};
  const usedKeys = new Set();

  keyOrder.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      ordered[key] = config[key];
      usedKeys.add(key);
    }
  });
  Object.keys(config).forEach((key) => {
    if (!usedKeys.has(key)) ordered[key] = config[key];
  });
  return ordered;
}
