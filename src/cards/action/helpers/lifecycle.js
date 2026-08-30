import { resolveIconTemplate } from "../../../common/helpers/icons.js";
import {
  getActionItemIconSource,
  getActionItems,
  isActionEntityRunning,
} from "./model.js";

export { getActionItems } from "./model.js";

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
  const iconSource = getActionItemIconSource(item, entityId);
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
