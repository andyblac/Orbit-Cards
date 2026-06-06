import {
  getColorMix,
  isCssColor,
} from "../../../common/helpers/colors.js";

export function updateRoomCard(changedProps) {
  if (!changedProps.has("_config") && !changedProps.has("hass")) return;

  this._cardName = this._getCardName("Room");

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
    this._config.main_entity_icon;

  const customIconOn =
    this._config.main_entity_icon_on;

  const customIconOff =
    this._config.main_entity_icon_off;

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

  const selectedIconKey =
    isOn && customIconOn
      ? "main_entity_icon_on"
      : !isOn && customIconOff
        ? "main_entity_icon_off"
        : customIcon
          ? "main_entity_icon"
          : "";

  this._icon =
    (isOn ? customIconOn : customIconOff) ||
    customIcon ||
    autoIcon;

  this._iconSvgForceColor =
    selectedIconKey
      ? this._getSvgColorOverride(selectedIconKey)
      : true;

  const statusEntities = [
    this._config.status1,
    this._config.status2,
    this._config.status3,
  ].filter(Boolean);

  this._statusText = statusEntities
    .map((id) => this.hass?.states[id])
    .map((s) => (s ? this.formatState(s) : "—"))
    .join(" | ");

  this._buttonModels = getButtonModels.call(this);
  this._curveButtonModels = getCurveButtonModels.call(this);
}

function getButtonModels() {
  return [
    this._config.button1,
    this._config.button2,
    this._config.button3,
    this._config.button4,
  ]
    .filter(Boolean)
    .map((entityId, index) =>
      getRoomButtonModel.call(
        this,
        "button",
        entityId,
        index,
        {
          defaultAction: { action: "toggle" },
          defaultHoldAction: { action: "more-info" },
          getIconColor: getButtonIconColor,
          getBackgroundColor: getButtonBackgroundColor,
        }
      )
    )
    .filter(Boolean);
}

function getCurveButtonModels() {
  const lockPositions =
    this._config?.curve_buttons_lock_position ?? false;

  const curveButtons = [
    this._config.curve_button1,
    this._config.curve_button2,
    this._config.curve_button3,
    this._config.curve_button4,
    this._config.curve_button5,
    this._config.curve_button6,
  ];

  const activeCurveButtons = curveButtons.filter(Boolean);

  return curveButtons
    .map((entityId, index) => {
      if (!lockPositions && !entityId) return null;

      if (lockPositions && !entityId) {
        return {
          empty: true,
          position: index,
        };
      }

      const model = getRoomButtonModel.call(
        this,
        "curve_button",
        entityId,
        index,
        {
          defaultAction: { action: "more-info" },
          defaultHoldAction: null,
          getIconColor: getCurveButtonIconColor,
          getBackgroundColor: null,
        }
      );

      if (!model) return null;

      model.position = lockPositions
        ? index
        : activeCurveButtons.indexOf(entityId);

      return model;
    })
    .filter(Boolean);
}

function getRoomButtonModel(prefix, entityId, index, options) {
  const stateObj = this.hass?.states[entityId];

  if (!stateObj) return null;

  const key = `${prefix}${index + 1}`;
  const stateTemplate = this._config?.[`${key}_state_template`];
  const evaluatedState = this._evaluateStateTemplate(
    stateTemplate,
    entityId
  );

  const isOn =
    evaluatedState === null || evaluatedState === undefined
      ? this._getEntityActiveState(stateObj)
      : evaluatedState === true ||
        evaluatedState === "on";

  const icon = getButtonIcon.call(
    this,
    key,
    entityId,
    stateObj,
    isOn
  );

  const isImage = this._isImageIcon(icon);

  return {
    entityId,
    holdAction:
      this._config?.[`${key}_hold_action`] ||
      options.defaultHoldAction,
    tapAction:
      this._config?.[`${key}_tap_action`] ||
      options.defaultAction,
    backgroundColor: options.getBackgroundColor
      ? options.getBackgroundColor.call(this, key, stateObj, isOn)
      : "",
    icon,
    iconColor: options.getIconColor.call(this, key, stateObj, isOn),
    iconPath: isImage
      ? this._resolveIconPath(icon)
      : "",
    svgForceColor: getButtonSvgColorOverride.call(this, key, isOn),
    isImage,
  };
}

function getButtonSvgColorOverride(key, isOn) {
  const customIcon = this._config?.[`${key}_icon`];
  const customIconOn = this._config?.[`${key}_icon_on`];
  const customIconOff = this._config?.[`${key}_icon_off`];

  const iconKey =
    isOn && customIconOn
      ? `${key}_icon_on`
      : !isOn && customIconOff
        ? `${key}_icon_off`
        : customIcon
          ? `${key}_icon`
          : "";

  return iconKey
    ? this._getSvgColorOverride(iconKey)
    : true;
}

function getButtonIcon(key, entityId, stateObj, isOn) {
  const customIcon = this._config?.[`${key}_icon`];
  const customIconOn = this._config?.[`${key}_icon_on`];
  const customIconOff = this._config?.[`${key}_icon_off`];
  const domain = entityId.split(".")[0];

  const defaultIcon =
    this._getDefaultDomainIcon(domain, stateObj);

  const entityIcon =
    stateObj?.attributes?.icon ||
    this.hass?.entities?.[entityId]?.icon;

  return (
    (isOn ? customIconOn : customIconOff) ||
    customIcon ||
    entityIcon ||
    defaultIcon ||
    "mdi:help-circle"
  );
}

function getButtonBackgroundColor(key, stateObj, isOn) {
  if (isOn) {
    return this._computeButtonBackground(
      getResolvedButtonOnColor.call(this, key, stateObj)
    );
  }

  const offColor =
    this._config[`${key}_off_color`] || "theme";

  if (isCssColor(offColor)) {
    return `color-mix(in srgb, transparent, ${offColor} 90%)`;
  }

  if (!offColor || offColor === "theme") {
    return "rgba(var(--color-theme),0.05)";
  }

  return getColorMix(offColor, 10);
}

function getButtonIconColor(key, stateObj, isOn) {
  if (isOn) {
    return this._computeFullColor(
      getResolvedButtonOnColor.call(this, key, stateObj)
    );
  }

  const offColor =
    this._config[`${key}_off_color`] || "theme";

  if (offColor.startsWith("rgba(")) return offColor;

  if (isCssColor(offColor)) {
    return `color-mix(in srgb, transparent, ${offColor} 80%)`;
  }

  return getColorMix(offColor, 20);
}

function getResolvedButtonOnColor(key, stateObj) {
  const onColor =
    this._config[`${key}_on_color`] || "theme";

  if (onColor !== "light") return onColor;

  return (
    this._getEntityColor(stateObj) ||
    this._config.accent_color ||
    "theme"
  );
}

function getCurveButtonIconColor(_key, _stateObj, isOn) {
  const roomColor = this._config.accent_color || "theme";

  if (roomColor === "theme") {
    return isOn
      ? "rgba(var(--color-theme),0.7)"
      : "rgba(var(--color-theme),0.2)";
  }

  if (isCssColor(roomColor)) {
    return isOn
      ? roomColor
      : `color-mix(in srgb, ${roomColor} 40%, transparent)`;
  }

  return isOn
    ? this._computeFullColor(roomColor)
    : getColorMix(roomColor, 40);
}
