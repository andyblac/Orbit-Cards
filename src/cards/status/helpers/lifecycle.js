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

  const isIconOnly =
    this._config.mode === "icon_only";

  this._cardName =
    (!isIconOnly
      ? this._config.status_name
      : null) ||
    getStatusAttribute(stateObj, "friendly_name") ||
    entityId ||
    "Status";

  const templatedState =
    this._config.state_template
      ? this._evaluateStateTemplate(
          this._config.state_template,
          entityId
        )
      : null;

  const templatedLabel =
    this._config.label_template
      ? this._evaluateStateTemplate(
          this._config.label_template,
          entityId
        )
      : null;

  this._statusText =
    templatedLabel ??
    (
      getStatusAttribute(stateObj, "label") ||
      (stateObj
        ? this.formatState(stateObj)
        : "")
    );

  const customIcon =
    this._config.main_entity_icon;

  const customIconOn =
    this._config.main_entity_icon_on;

  const customIconOff =
    this._config.main_entity_icon_off;

  const isOn = getStatusActiveState(
    stateObj,
    (entity) => this._getEntityActiveState(entity),
    templatedState
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

  const statusColor = getStatusColor(
    this._config,
    stateObj,
    isOn
  );

  this._navigationPath = getStatusNavigationPath(
    this._config,
    stateObj
  );

  this._nameColor = this._computeFullColor(
    statusColor
  );

  this._statusColor = this._computeFullColor(
    statusColor
  );

  this._circleColor = this._computeCircleColor(statusColor);

  this._iconColor = isOn
    ? this._computeFullColor(statusColor)
    : this._computeIconColor(statusColor);
}
