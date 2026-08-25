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

export function migrateStatusCardConfig(config = {}) {
  const nextConfig = { ...(config || {}) };
  let migrated = migrateTemplateKeys(nextConfig);

  migrated = migrateStatusName(nextConfig) || migrated;

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
      const itemMigrated = templateMigrated || nameMigrated;

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
