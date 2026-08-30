export function getActionItems(config = {}) {
  if (Array.isArray(config.entities) && config.entities.length) {
    return config.entities.map((item) =>
      typeof item === "string" ? { entity: item } : item || {}
    );
  }

  return [{
    entity: config.main_entity,
    color: config.color,
    icon_source: config.icon_source,
    icon: config.icon,
    icon_svg_color_override: config.icon_svg_color_override,
    tap_action: config.tap_action,
    hold_action: config.hold_action,
    double_tap_action: config.double_tap_action,
  }];
}

export function getActionItemIconSource(item, entityId) {
  const savedSource = item.icon_source;
  const hasEntity = Boolean(entityId);
  const hasCustomIcon = Boolean(item.icon);

  if (savedSource === "custom") return "custom";
  if (savedSource === "template") return "template";
  if (savedSource === "entity" && hasEntity) return "entity";
  if (hasCustomIcon) return "custom";
  return "entity";
}

export function isActionEntityRunning(stateObj) {
  if (!stateObj) return false;

  const domain = stateObj.entity_id?.split(".")[0];
  const current = Number(stateObj.attributes?.current);

  if (Number.isFinite(current) && current > 0) return true;
  return domain === "script" && stateObj.state === "on";
}
