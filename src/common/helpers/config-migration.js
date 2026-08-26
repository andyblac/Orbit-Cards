import { migrateLegacyTemplate } from "./templates.js";

export function migrateAreaCardConfig(config = {}) {
  const nextConfig = { ...(config || {}) };
  let migrated = false;

  if (nextConfig.type === "custom:orbit-room-card") {
    nextConfig.type = "custom:orbit-area-card";
    migrated = true;
  }

  if (
    Object.prototype.hasOwnProperty.call(nextConfig, "room_name")
  ) {
    if (
      nextConfig.area_name === undefined &&
      nextConfig.room_name !== undefined &&
      nextConfig.room_name !== ""
    ) {
      nextConfig.area_name = nextConfig.room_name;
    }

    delete nextConfig.room_name;
    migrated = true;
  }

  migrated = migrateTemplateKeys(nextConfig) || migrated;
  migrated = migrateAreaPresentation(nextConfig) || migrated;

  return {
    config: migrated ? nextConfig : config,
    migrated,
  };
}

export function migrateActionCardConfig(config = {}) {
  const nextConfig = { ...(config || {}) };
  let migrated = migrateTemplateKeys(nextConfig);
  migrated = migrateActionPresentation(nextConfig) || migrated;

  if (Array.isArray(nextConfig.entities)) {
    const entities = nextConfig.entities.map((item) => {
      if (!item || typeof item === "string") return item;
      const nextItem = { ...item };
      const templateMigrated = migrateTemplateKeys(nextItem);
      const presentationMigrated = migrateActionPresentation(nextItem);
      const itemMigrated = templateMigrated || presentationMigrated;
      migrated ||= itemMigrated;
      return itemMigrated ? nextItem : item;
    });
    if (migrated) nextConfig.entities = entities;
  }

  return { config: migrated ? nextConfig : config, migrated };
}

export function migrateStatusBadgeConfig(config = {}) {
  const nextConfig = { ...(config || {}) };
  let migrated = migrateTemplateKeys(nextConfig);
  migrated = migrateColorPresentation(nextConfig) || migrated;
  migrated = migrateSharedIconPresentation(nextConfig) || migrated;
  return { config: migrated ? nextConfig : config, migrated };
}

export function migrateDeckCardConfig(config = {}) {
  if (!Array.isArray(config?.decks)) {
    return { config, migrated: false };
  }

  let migrated = false;
  const migratedDecks = config.decks.map((item) => {
    if (!item?.card || typeof item.card !== "object") return item;

    const childMigration = migrateDeckChildCardConfig(item.card);
    if (!childMigration.migrated) return item;

    migrated = true;
    return {
      ...item,
      card: childMigration.config,
    };
  });

  return migrated
    ? {
        config: {
          ...config,
          decks: migratedDecks,
        },
        migrated,
      }
    : { config, migrated };
}

function migrateDeckChildCardConfig(config) {
  if (isOrbitCardType(config, "orbit-status-card")) {
    return migrateStatusCardConfig(config);
  }

  if (
    isOrbitCardType(config, "orbit-area-card") ||
    isOrbitCardType(config, "orbit-room-card")
  ) {
    return migrateAreaCardConfig(config);
  }

  if (isOrbitCardType(config, "orbit-action-card")) {
    return migrateActionCardConfig(config);
  }

  if (isOrbitCardType(config, "orbit-deck-card")) {
    return migrateDeckCardConfig(config);
  }

  return { config, migrated: false };
}

function isOrbitCardType(config, cardType) {
  return config?.type === `custom:${cardType}` ||
    config?.type === `custom:${cardType}-dev`;
}

export function migrateStatusCardConfig(config = {}) {
  const nextConfig = { ...(config || {}) };
  let migrated = migrateTemplateKeys(nextConfig);

  migrated = migrateStatusName(nextConfig) || migrated;
  migrated = migrateStatusEntityActions(nextConfig) || migrated;
  migrated = migrateStatusEntityIcons(nextConfig) || migrated;
  migrated = migrateColorPresentation(nextConfig) || migrated;

  if (Object.prototype.hasOwnProperty.call(nextConfig, "main_entity")) {
    if (
      nextConfig.entity === undefined &&
      nextConfig.main_entity !== undefined &&
      nextConfig.main_entity !== ""
    ) {
      nextConfig.entity = nextConfig.main_entity;
    }

    delete nextConfig.main_entity;
    migrated = true;
  }

  if (Array.isArray(nextConfig.entities)) {
    const migratedEntities = nextConfig.entities.map((item) => {
      if (!item || typeof item === "string") return item;

      const nextItem = { ...item };
      const templateMigrated = migrateTemplateKeys(nextItem);
      const nameMigrated = migrateStatusName(nextItem);
      const actionsMigrated = migrateStatusEntityActions(nextItem);
      const iconsMigrated = migrateStatusEntityIcons(nextItem);
      const colorsMigrated = migrateColorPresentation(nextItem);
      const itemMigrated =
        templateMigrated ||
        nameMigrated ||
        actionsMigrated ||
        iconsMigrated ||
        colorsMigrated;

      migrated ||= itemMigrated;
      return itemMigrated ? nextItem : item;
    });

    if (migrated) {
      nextConfig.entities = migratedEntities;
    }
  }

  return {
    config: migrated ? nextConfig : config,
    migrated,
  };
}

function migrateActionPresentation(config) {
  let migrated = false;
  migrated = renameConfigKey(config, "accent_color", "color") || migrated;
  migrated = migratePrefixedIcon(config, "main_entity_") || migrated;
  return migrated;
}

function migrateAreaPresentation(config) {
  let migrated = false;
  migrated = renameConfigKey(config, "accent_color", "color") || migrated;
  migrated = migratePrefixedIcon(config, "main_entity_") || migrated;
  migrated = renameConfigKey(
    config,
    "main_entity_state_template",
    "state_template"
  ) || migrated;

  for (const prefix of [
    "status1", "status2", "status3",
    "button1", "button2", "button3", "button4",
    "curve_button1", "curve_button2", "curve_button3",
    "curve_button4", "curve_button5", "curve_button6",
    "action_button",
  ]) {
    const legacyTemplateKey = `${prefix}_icon_template`;
    if (Object.prototype.hasOwnProperty.call(config, legacyTemplateKey)) {
      if (
        config[`${prefix}_icon_source`] === "template" &&
        config[legacyTemplateKey] !== undefined
      ) {
        config[`${prefix}_icon`] = config[legacyTemplateKey];
      } else if (config[`${prefix}_icon`] === undefined) {
        config[`${prefix}_icon`] = config[legacyTemplateKey];
      }
      delete config[legacyTemplateKey];
      migrated = true;
    }
    migrated = renameConfigKey(
      config,
      `${prefix}_on_color`,
      `${prefix}_color_on`
    ) || migrated;
    migrated = renameConfigKey(
      config,
      `${prefix}_off_color`,
      `${prefix}_color_off`
    ) || migrated;
  }

  return migrated;
}

function migrateColorPresentation(config) {
  let migrated = false;
  migrated = renameConfigKey(
    config,
    "accent_color_source",
    "color_source"
  ) || migrated;
  migrated = renameConfigKey(config, "accent_color", "color") || migrated;
  migrated = renameConfigKey(config, "accent_on_color", "color_on") || migrated;
  migrated = renameConfigKey(config, "accent_off_color", "color_off") || migrated;
  return migrated;
}

function migrateSharedIconPresentation(config) {
  if (!Object.prototype.hasOwnProperty.call(config, "icon_template")) {
    return false;
  }
  if (
    config.icon_source === "template" &&
    config.icon_template !== undefined
  ) {
    config.icon = config.icon_template;
  } else if (config.icon === undefined) {
    config.icon = config.icon_template;
  }
  delete config.icon_template;
  return true;
}

function migratePrefixedIcon(config, prefix) {
  let migrated = false;
  for (const suffix of [
    "icon_source",
    "icon_template",
    "icon",
    "icon_on",
    "icon_off",
    "icon_svg_color_override",
    "icon_on_svg_color_override",
    "icon_off_svg_color_override",
  ]) {
    const targetSuffix = suffix === "icon_template" ? "icon" : suffix;
    migrated = renameConfigKey(
      config,
      `${prefix}${suffix}`,
      targetSuffix
    ) || migrated;
  }
  return migrated;
}

function renameConfigKey(config, legacyKey, nextKey) {
  if (!Object.prototype.hasOwnProperty.call(config, legacyKey)) return false;
  if (config[nextKey] === undefined && config[legacyKey] !== undefined) {
    config[nextKey] = config[legacyKey];
  }
  delete config[legacyKey];
  return true;
}

function migrateStatusEntityIcons(config) {
  let migrated = migratePrefixedIcon(config, "entity_");
  migrated = migratePrefixedIcon(config, "main_entity_") || migrated;
  migrated = migrateSharedIconPresentation(config) || migrated;
  return migrated;
}

function migrateStatusEntityActions(config) {
  const actionKeys = [
    "tap_action",
    "hold_action",
    "double_tap_action",
  ];
  let migrated = false;

  for (const actionKey of actionKeys) {
    const legacyKey = `main_entity_${actionKey}`;
    const nextKey = `entity_${actionKey}`;

    if (!Object.prototype.hasOwnProperty.call(config, legacyKey)) {
      continue;
    }

    if (config[nextKey] === undefined && config[legacyKey] !== undefined) {
      config[nextKey] = config[legacyKey];
    }

    delete config[legacyKey];
    migrated = true;
  }

  return migrated;
}

function migrateStatusName(config) {
  if (!Object.prototype.hasOwnProperty.call(config, "status_name")) {
    return false;
  }

  if (
    config.name === undefined &&
    config.status_name !== undefined &&
    config.status_name !== ""
  ) {
    config.name = config.status_name;
  }

  delete config.status_name;
  return true;
}

function migrateTemplateKeys(config) {
  let migrated = false;

  for (const key of Object.keys(config || {})) {
    if (!key.endsWith("_template")) continue;

    const migratedTemplate = migrateLegacyTemplate(config[key]);

    if (migratedTemplate !== config[key]) {
      config[key] = migratedTemplate;
      migrated = true;
    }
  }

  return migrated;
}
