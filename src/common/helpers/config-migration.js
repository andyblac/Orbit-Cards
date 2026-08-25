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

  return {
    config: migrated ? nextConfig : config,
    migrated,
  };
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
      const itemMigrated =
        templateMigrated ||
        nameMigrated ||
        actionsMigrated ||
        iconsMigrated;

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

function migrateStatusEntityIcons(config) {
  const iconKeys = [
    "icon_source",
    "icon",
    "icon_on",
    "icon_off",
    "icon_svg_color_override",
    "icon_on_svg_color_override",
    "icon_off_svg_color_override",
  ];
  let migrated = false;

  for (const iconKey of iconKeys) {
    const legacyKey = `main_entity_${iconKey}`;
    const nextKey = `entity_${iconKey}`;

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
