import { resolveIconTemplate } from "../../../common/helpers/icons.js";

export function updateActionCard(changedProps) {
  if (
    !changedProps.has("_config") &&
    !changedProps.has("hass") &&
    !changedProps.has("_templateRevision")
  ) return;

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
      color: config.color,
      icon_source: config.icon_source,
      icon: config.icon,
      icon_svg_color_override:
        config.icon_svg_color_override,
      tap_action: config.tap_action,
      hold_action: config.hold_action,
      double_tap_action: config.double_tap_action,
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
    item.color || this._config.color || "theme";
  this._orbitColorTemplateEntityId = entityId || "";

  const isRunning = isActionEntityRunning(stateObj);
  const cardBackground = this._computeCircleColor(accentColor);
  const iconColor = isRunning
    ? this._computeFullColor(accentColor)
    : this._computeIconColor(accentColor);
  this._orbitColorTemplateEntityId = "";
  const iconSource = getItemIconSource(item, entityId);
  const customIcon =
    ["custom", "template"].includes(iconSource)
      ? resolveIconTemplate.call(
          this,
          item.icon,
          entityId
        )
      : "";

  const selectedIconKey =
    ["custom", "template"].includes(iconSource) && customIcon
      ? "icon"
      : "";

  const icon = customIcon || (entityId && !stateObj
    ? "mdi:alert-circle-outline"
    : "mdi:play-circle");

  return {
    ...item,
    entityId,
    stateObj,
    useStateIcon: Boolean(stateObj) &&
      iconSource !== "template" &&
      !customIcon,
    icon,
    iconColor: entityId && !stateObj
      ? "var(--error-color)"
      : iconColor,
    cardBackground,
    isRunning,
    svgForceColor: selectedIconKey
      ? this._getSvgColorOverride(item, selectedIconKey)
      : true,
  };
}

function getItemIconSource(item, entityId) {
  const savedSource = item.icon_source;
  const hasEntity = Boolean(entityId);
  const hasCustomIcon = Boolean(item.icon);

  if (savedSource === "custom") return "custom";
  if (savedSource === "template") return "template";
  if (savedSource === "entity" && hasEntity) return "entity";
  if (hasCustomIcon) return "custom";
  if (hasEntity) return "entity";

  return "entity";
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
