import {
  getStatusActiveState,
  getStatusAttribute,
  getStatusColor,
  getStatusNavigationPath,
} from "./attributes.js";

export function updateStatusCard(changedProps) {
  if (!changedProps.has("_config") && !changedProps.has("hass")) return;

  const entityId = this._config.main_entity;
  const stateObj =
    entityId && this.hass
      ? this.hass.states[entityId]
      : null;

  this._cardName =
    this._config.status_name ||
    this._config.card_name ||
    this._config.name ||
    getStatusAttribute(stateObj, "friendly_name") ||
    entityId ||
    "Status";

  this._statusText =
    this._config.status_text ||
    getStatusAttribute(stateObj, "label") ||
    (stateObj
    ? this.formatState(stateObj)
    : "");

  const customIcon =
    this._config.icon;

  const customIconOn =
    this._config.icon_on;

  const customIconOff =
    this._config.icon_off;

  const isOn = getStatusActiveState(
    stateObj,
    (entity) => this._getEntityActiveState(entity)
  );

  this._icon =
    (isOn ? customIconOn : customIconOff) ||
    customIcon ||
    getStatusAttribute(stateObj, "icon") ||
    (stateObj
      ? this._getDefaultDomainIcon(
          stateObj.entity_id.split(".")[0],
          stateObj
        )
      : "mdi:information-outline");

  const statusColor = getStatusColor(this._config, stateObj);

  this._navigationPath = getStatusNavigationPath(
    this._config,
    stateObj
  );

  this._nameColor = this._computeFullColor(
    this._config.name_color || statusColor
  );

  this._statusColor = this._computeFullColor(
    this._config.status_color || statusColor
  );

  this._circleColor = this._computeCircleColor(statusColor);

  this._iconColor = isOn
    ? this._computeFullColor(statusColor)
    : this._computeIconColor(statusColor);
}
