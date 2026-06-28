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

  return {
    config: migrated ? nextConfig : config,
    migrated,
  };
}
