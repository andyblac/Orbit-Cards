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

  if (Array.isArray(nextConfig.entities)) {
    const migratedEntities = nextConfig.entities.map((item) => {
      if (!item || typeof item === "string") return item;

      const nextItem = { ...item };
      const itemMigrated = migrateTemplateKeys(nextItem);

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
