export function updateActionCard(changedProps) {
  if (!changedProps.has("_config") && !changedProps.has("hass")) return;

  this._actions = getActionItems(this._config).map((item) =>
    getActionState.call(this, item)
  );
}

export function getActionItems(config = {}) {
  if (Array.isArray(config.entities) && config.entities.length) {
    return config.entities.map((item) =>
      typeof item === "string"
        ? { entity: item }
        : item || {}
    );
  }

  return [
    {
      entity: config.main_entity,
      accent_color: config.accent_color,
      main_entity_icon: config.main_entity_icon,
      main_entity_icon_svg_color_override:
        config.main_entity_icon_svg_color_override,
      tap_action: config.tap_action,
      hold_action: config.hold_action,
    },
  ];
}

function getActionState(item) {
  const entityId = item.entity || item.main_entity;
  const stateObj =
    entityId && this.hass
      ? this.hass.states[entityId]
      : null;

  const accentColor =
    item.accent_color || this._config.accent_color || "theme";

  const isRunning = isActionEntityRunning(stateObj);
  const cardBackground = this._computeCircleColor(accentColor);
  const iconColor = isRunning
    ? this._computeFullColor(accentColor)
    : this._computeIconColor(accentColor);

  const selectedIconKey =
    item.main_entity_icon
      ? "main_entity_icon"
      : item.icon
        ? "icon"
        : "";

  const icon =
    item.main_entity_icon ||
    item.icon ||
    stateObj?.attributes?.icon ||
    (
      stateObj
        ? this._getDefaultDomainIcon(
            stateObj.entity_id.split(".")[0],
            stateObj
          )
        : "mdi:play-circle"
    );

  return {
    ...item,
    entityId,
    icon,
    iconColor,
    cardBackground,
    isRunning,
    svgForceColor: selectedIconKey
      ? this._getSvgColorOverride(item, selectedIconKey)
      : true,
  };
}

function isActionEntityRunning(stateObj) {
  if (!stateObj) return false;

  const domain = stateObj.entity_id?.split(".")[0];
  const current = Number(stateObj.attributes?.current);

  if (Number.isFinite(current) && current > 0) {
    return true;
  }

  return domain === "script" && stateObj.state === "on";
}
