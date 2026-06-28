import {
  getColorMix,
  isCssColor,
} from "../../../common/helpers/colors.js";
import { getDefaultEntityAction } from "../../../common/helpers/default-actions.js";

export function updateAreaCard(changedProps) {
  if (!changedProps.has("_config") && !changedProps.has("hass")) return;

  this._cardName = this._getCardName("");

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
  const iconSource =
    getMainEntityIconSource(this._config, areaId, mainEntity);
  const useCustomIcon =
    iconSource === "custom";

  const areaIcon =
    areaId && this.hass?.areas?.[areaId]
      ? this.hass.areas[areaId].icon || "mdi:sofa"
      : "mdi:sofa";

  const entityIcon =
    mainStateObj
      ? mainStateObj.attributes?.icon ||
        this.hass?.entities?.[mainEntity]?.icon ||
      this._getDefaultDomainIcon(
        mainStateObj.entity_id.split(".")[0],
        mainStateObj
      ) ||
        "mdi:sofa"
      : "mdi:sofa";

  const autoIcon =
    iconSource === "area"
      ? areaIcon
      : iconSource === "entity"
        ? entityIcon
        : mainStateObj
          ? entityIcon
          : areaIcon;

  const selectedIconKey =
    useCustomIcon && isOn && customIconOn
        ? "main_entity_icon_on"
        : useCustomIcon && !isOn && customIconOff
          ? "main_entity_icon_off"
          : useCustomIcon && customIcon
            ? "main_entity_icon"
            : "";

  this._icon =
    useCustomIcon
      ? (isOn ? customIconOn : customIconOff) ||
        customIcon ||
        autoIcon
      : autoIcon;

  this._iconSvgForceColor =
    selectedIconKey
      ? this._getSvgColorOverride(selectedIconKey)
      : true;

  this._statusItems = getStatusItems.call(this);

  this._buttonModels = getButtonModels.call(this);
  this._curveButtonModels = getCurveButtonModels.call(this);
  this._actionButtonModel = getActionButtonModel.call(this);
}

function getStatusItems() {
  return [1, 2, 3]
    .map((index) => {
      const entityId = this._config[`status${index}`];

      if (!entityId) return null;

      const stateObj = this.hass?.states[entityId];
      const iconKey = `status${index}`;
      const customIcon = this._config[`${iconKey}_icon`] || "";
      const iconSource = getStatusIconSource.call(
        this,
        iconKey,
        entityId
      );
      const icon = iconSource === "custom"
        ? customIcon
        : iconSource === "entity"
          ? stateObj?.attributes?.icon ||
            this.hass?.entities?.[entityId]?.icon ||
            this._getDefaultDomainIcon(
              entityId.split(".")[0],
              stateObj
            ) ||
            ""
          : "";

      return {
        entityId,
        text: formatStatusText.call(
          this,
          stateObj,
          this._config[`status${index}_decimal_places`]
        ),
        icon,
        iconPath: this._isImageIcon(icon)
          ? this._resolveIconPath(icon)
          : "",
        isImage: this._isImageIcon(icon),
        isHaIcon: isHaIconName(icon),
      };
    })
    .filter(Boolean);
}

function isHaIconName(icon) {
  return /^[a-z0-9_-]+:/i.test(icon || "");
}

function getStatusIconSource(key, entityId = "") {
  const savedSource = this._config?.[`${key}_icon_source`];
  const hasEntity = Boolean(entityId || this._config?.[key]);
  const hasCustomIcon = Boolean(this._config?.[`${key}_icon`]);

  if (savedSource === "custom") return "custom";
  if (savedSource === "none") return "none";
  if (savedSource === "entity" && hasEntity) return "entity";
  if (hasCustomIcon) return "custom";

  return "none";
}

function formatStatusText(stateObj, decimalPlaces) {
  if (!stateObj) return "—";

  if (decimalPlaces === undefined || decimalPlaces === "") {
    return this.formatState(stateObj);
  }

  const places = Number(decimalPlaces);
  const value = Number(stateObj.state);

  if (!Number.isFinite(places) || !Number.isFinite(value)) {
    return this.formatState(stateObj);
  }

  const unit = stateObj.attributes.unit_of_measurement || "";

  return `${value.toFixed(Math.max(0, places))}${unit}`;
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
      getAreaButtonModel.call(
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

      const model = getAreaButtonModel.call(
        this,
        "curve_button",
        entityId,
        index,
        {
          defaultAction: { action: "more-info" },
          defaultHoldAction: null,
          getIconColor: getCurveButtonOverrideIconColor,
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

function getActionButtonModel() {
  const entityId = this._config.action_button;

  if (!entityId) return null;

  return getAreaButtonModel.call(
    this,
    "action_button",
    entityId,
    0,
    {
      key: "action_button",
      defaultAction: getDefaultEntityAction(entityId),
      defaultHoldAction: null,
      getIconColor: getActionButtonIconColor,
      getBackgroundColor: null,
    }
  );
}

function getAreaButtonModel(prefix, entityId, index, options) {
  const stateObj = this.hass?.states[entityId];

  if (!stateObj) return null;

  const key = options.key || `${prefix}${index + 1}`;
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
    doubleTapAction:
      this._config?.[`${key}_double_tap_action`] ||
      null,
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
  if (getButtonIconSource.call(this, key) !== "custom") {
    return true;
  }

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
  const iconSource = getButtonIconSource.call(this, key, entityId);

  const defaultIcon =
    this._getDefaultDomainIcon(domain, stateObj);

  const entityIcon =
    stateObj?.attributes?.icon ||
    this.hass?.entities?.[entityId]?.icon ||
    defaultIcon ||
    "mdi:help-circle";

  if (iconSource === "entity") {
    return entityIcon;
  }

  return (
    (isOn ? customIconOn : customIconOff) ||
    customIcon ||
    entityIcon
  );
}

function getButtonIconSource(key, entityId = "") {
  const savedSource = this._config?.[`${key}_icon_source`];
  const hasEntity = Boolean(entityId || this._config?.[key]);
  const hasCustomIcon = Boolean(
    this._config?.[`${key}_icon`] ||
    this._config?.[`${key}_icon_on`] ||
    this._config?.[`${key}_icon_off`]
  );

  if (savedSource === "custom") return "custom";
  if (savedSource === "entity" && hasEntity) return "entity";
  if (hasCustomIcon) return "custom";
  if (hasEntity) return "entity";

  return "entity";
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
  const areaColor = this._config.accent_color || "theme";

  if (areaColor === "theme") {
    return isOn
      ? "rgba(var(--color-theme),0.7)"
      : "rgba(var(--color-theme),0.2)";
  }

  if (isCssColor(areaColor)) {
    return isOn
      ? areaColor
      : `color-mix(in srgb, ${areaColor} 40%, transparent)`;
  }

  return isOn
    ? this._computeFullColor(areaColor)
    : getColorMix(areaColor, 40);
}

function getCurveButtonOverrideIconColor(key, stateObj, isOn) {
  const customColor = isOn
    ? this._config[`${key}_on_color`]
    : this._config[`${key}_off_color`];

  const hasCustomColor =
    Boolean(customColor) &&
    customColor !== "theme";

  return hasCustomColor
    ? getButtonIconColor.call(this, key, stateObj, isOn)
    : getCurveButtonIconColor.call(this, key, stateObj, isOn);
}

function getActionButtonIconColor(key, stateObj, isOn) {
  const customColor = isOn
    ? this._config[`${key}_on_color`]
    : this._config[`${key}_off_color`];

  const hasCustomColor =
    Boolean(customColor) &&
    customColor !== "theme";

  return hasCustomColor
    ? getButtonIconColor.call(this, key, stateObj, isOn)
    : getCurveButtonIconColor.call(this, key, stateObj, isOn);
}

function getMainEntityIconSource(config = {}, areaId, mainEntity) {
  const savedSource = config.main_entity_icon_source;
  const hasArea = Boolean(areaId);
  const hasEntity = Boolean(mainEntity);

  if (savedSource === "custom") {
    return savedSource;
  }

  if (savedSource === "area" && hasArea) return "area";
  if (savedSource === "entity" && hasEntity) return "entity";

  if (hasArea) return "area";
  if (hasEntity) return "entity";

  return "area";
}
