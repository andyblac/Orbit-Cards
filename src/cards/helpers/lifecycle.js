export function applyConfig(config) {
  this._config = config;

  this._roomColor = this._computeFullColor(config.room_color);
  this._statusColor = this._computeFullColor(config.status_color || config.room_color);
  this._iconColor = this._computeIconColor(config.room_color);
  this._circleColor = this._computeCircleColor(config.room_color);
}

export function updateCard(changedProps) {
  if (!changedProps.has("_config") && !changedProps.has("hass")) return;

  this._roomName = this._getRoomName();

  const mainEntity = this._config.main_entity || this._config.entity;
  const areaId = this._config.area;

  const mainStateObj =
    mainEntity && this.hass
      ? this.hass.states[mainEntity]
      : null;

  const isOn =
    mainStateObj
      ? this._getEntityActiveState(mainStateObj)
      : false;

  this._iconColor = this._getMainIconColor(
    mainStateObj,
    isOn
  );

  const customIcon =
    this._config.main_icon;

  const customIconOn =
    this._config.main_icon_on;

  const customIconOff =
    this._config.main_icon_off;

  let autoIcon = "mdi:sofa";

  if (mainStateObj) {
    autoIcon =
      mainStateObj.attributes?.icon ||
      this._getDefaultDomainIcon(
        mainStateObj.entity_id.split(".")[0],
        mainStateObj
      ) ||
      "mdi:sofa";
  } else if (
    areaId &&
    this.hass?.areas?.[areaId]
  ) {
    autoIcon =
      this.hass.areas[areaId].icon ||
      "mdi:sofa";
  }

  this._icon =
    (isOn ? customIconOn : customIconOff) ||
    customIcon ||
    autoIcon;

  const statusEntities = [
    this._config.status1,
    this._config.status2,
    this._config.status3,
  ].filter(Boolean);

  this._statusText = statusEntities
    .map((id) => this.hass?.states[id])
    .map((s) => (s ? this.formatState(s) : "—"))
    .join(" | ");
}
