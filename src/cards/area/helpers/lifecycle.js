import {
  getColorMix,
  resolveColorTemplate,
} from "../../../common/helpers/colors.js";
import { getDefaultEntityAction } from "../../../common/helpers/default-actions.js";
import { resolveIconTemplate } from "../../../common/helpers/icons.js";
import {
  getTemplateResultActiveState,
} from "../../../common/helpers/templates.js";

export function updateAreaCard(changedProps) {
  if (
    !changedProps.has("_config") &&
    !changedProps.has("hass") &&
    !changedProps.has("_templateRevision")
  ) return;

  this._cardName = this._getCardName("");

  const mainEntity = this._config.main_entity || this._config.entity;
  const areaId = this._config.area;

  const mainStateObj =
    mainEntity && this.hass
      ? this.hass.states[mainEntity]
      : null;

  const mainStateTemplate = this._config?.state_template;
  const evaluatedMainState = this._evaluateStateTemplate(
    mainStateTemplate,
    mainEntity
  );
  const isOn = mainStateTemplate
    ? getTemplateResultActiveState(
        evaluatedMainState,
        mainEntity?.split(".")[0] || ""
      )
    : mainStateObj
      ? this._getEntityActiveState(mainStateObj)
      : false;

  this._iconColor = this._getMainIconColor(
    mainStateObj,
    isOn
  );

  const customIconOn =
    this._config.icon_on;

  const customIconOff =
    this._config.icon_off;
  const iconSource =
    getMainEntityIconSource(this._config, areaId, mainEntity);
  const customIcon = resolveIconTemplate.call(
    this,
    this._config.icon,
    mainEntity
  );
  const useCustomIcon =
    ["custom", "template"].includes(iconSource);

  const areaIcon =
    areaId && this.hass?.areas?.[areaId]
      ? this.hass.areas[areaId].icon || "mdi:sofa"
      : "mdi:sofa";

  const customStateIcon =
    iconSource === "template"
      ? customIcon
      : useCustomIcon
      ? (isOn ? customIconOn : customIconOff) ||
        customIcon ||
        ""
      : "";

  this._mainStateObj = mainStateObj;
  this._useNativeMainIcon =
    Boolean(mainStateObj) &&
    iconSource !== "area" &&
    iconSource !== "template" &&
    !customStateIcon;

  const selectedIconKey =
    iconSource === "template" && customIcon
      ? "icon"
      : useCustomIcon && isOn && customIconOn
        ? "icon_on"
        : useCustomIcon && !isOn && customIconOff
          ? "icon_off"
          : useCustomIcon && customIcon
            ? "icon"
            : "";

  this._icon = customStateIcon || areaIcon;

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
      const iconSource = getStatusIconSource.call(
        this,
        iconKey,
        entityId
      );
      const customIcon = resolveIconTemplate.call(
        this,
        this._config[`${iconKey}_icon`],
        entityId
      );
      const icon = ["custom", "template"].includes(iconSource)
        ? customIcon
        : !stateObj
          ? "mdi:alert-circle-outline"
          : "";

      return {
        entityId,
        stateObj,
        useStateIcon:
          iconSource === "entity" && Boolean(stateObj),
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
  if (savedSource === "template") return "template";
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
  const isMissing = Boolean(entityId && !stateObj);

  const key = options.key || `${prefix}${index + 1}`;
  const stateTemplate = this._config?.[`${key}_state_template`];
  const evaluatedState = this._evaluateStateTemplate(
    stateTemplate,
    entityId
  );
  const entityDomain = entityId.split(".")[0];

  const isOn = stateTemplate
    ? getTemplateResultActiveState(
        evaluatedState,
        entityDomain
      )
    : PASSIVE_AREA_BUTTON_DOMAINS.has(entityDomain)
      ? false
      : this._getEntityActiveState(stateObj);

  const iconSource = getButtonIconSource.call(
    this,
    key,
    entityId
  );

  const configuredIcon = getButtonIcon.call(this, key, isOn);
  const icon = configuredIcon || (isMissing
    ? "mdi:alert-circle-outline"
    : "");

  const isImage = this._isImageIcon(icon);
  const previousIconState = this._buttonIconStates?.get(key);
  const animateIcon = Boolean(
    previousIconState &&
    previousIconState.entityId === entityId &&
    previousIconState.isOn !== isOn
  );

  if (!this._buttonIconStates) {
    this._buttonIconStates = new Map();
  }

  this._buttonIconStates.set(key, {
    entityId,
    isOn,
  });

  return {
    entityId,
    stateObj,
    useStateIcon:
      Boolean(stateObj) &&
      (iconSource === "entity" ||
        (iconSource !== "template" && !icon)),
    holdAction:
      this._config?.[`${key}_hold_action`] ||
      options.defaultHoldAction,
    doubleTapAction:
      this._config?.[`${key}_double_tap_action`] ||
      null,
    tapAction:
      this._config?.[`${key}_tap_action`] ||
      options.defaultAction,
    backgroundColor: isMissing
      ? "color-mix(in srgb, var(--error-color) 12%, transparent)"
      : options.getBackgroundColor
      ? options.getBackgroundColor.call(this, key, stateObj, isOn)
      : "",
    icon,
    iconColor: isMissing
      ? "var(--error-color)"
      : options.getIconColor.call(this, key, stateObj, isOn),
    iconPath: isImage
      ? this._resolveIconPath(icon)
      : "",
    svgForceColor: getButtonSvgColorOverride.call(this, key, isOn),
    animateIcon,
    isImage,
  };
}

const PASSIVE_AREA_BUTTON_DOMAINS = new Set([
  "ai_task",
  "button",
  "conversation",
  "date",
  "datetime",
  "event",
  "image",
  "infrared",
  "input_button",
  "input_datetime",
  "input_number",
  "input_select",
  "input_text",
  "notify",
  "number",
  "radio_frequency",
  "scene",
  "select",
  "sensor",
  "stt",
  "tag",
  "text",
  "time",
  "tts",
  "wake_word",
  "weather",
]);

function getButtonSvgColorOverride(key, isOn) {
  const iconSource = getButtonIconSource.call(this, key);

  if (!["custom", "template"].includes(iconSource)) {
    return true;
  }

  const customIcon = this._config?.[`${key}_icon`];
  const customIconOn = this._config?.[`${key}_icon_on`];
  const customIconOff = this._config?.[`${key}_icon_off`];

  const iconKey =
    iconSource === "template"
      ? customIcon
        ? `${key}_icon`
        : ""
      : isOn && customIconOn
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

function getButtonIcon(key, isOn) {
  const customIconOn = this._config?.[`${key}_icon_on`];
  const customIconOff = this._config?.[`${key}_icon_off`];
  const iconSource = getButtonIconSource.call(this, key);
  const customIcon = resolveIconTemplate.call(
    this,
    this._config?.[`${key}_icon`],
    this._config?.[key] || ""
  );

  if (iconSource === "entity") {
    return "";
  }

  if (iconSource === "template") return customIcon;

  return (
    (isOn ? customIconOn : customIconOff) ||
    customIcon ||
    ""
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
  if (savedSource === "template") return "template";
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

  const offColor = resolveColorTemplate.call(
    this,
    getConfiguredButtonColor.call(this, key, false)
  );

  if (!offColor || offColor === "theme") {
    return "rgba(var(--color-theme),0.05)";
  }

  return getColorMix.call(this, offColor, 10);
}

function getButtonIconColor(key, stateObj, isOn) {
  if (isOn) {
    return this._computeFullColor(
      getResolvedButtonOnColor.call(this, key, stateObj)
    );
  }

  const offColor = resolveColorTemplate.call(
    this,
    getConfiguredButtonColor.call(this, key, false)
  );

  if (offColor.startsWith("rgba(")) return offColor;

  return this._computeIconColor(offColor);
}

function getResolvedButtonOnColor(key, stateObj) {
  const onColor = resolveColorTemplate.call(
    this,
    getConfiguredButtonColor.call(this, key, true)
  );

  if (onColor !== "light") return onColor;

  return (
    this._getEntityColor(stateObj) ||
    this._config.color ||
    "theme"
  );
}

function getCurveButtonIconColor(_key, _stateObj, isOn) {
  const areaColor = resolveColorTemplate.call(
    this,
    this._config.color || "theme"
  );

  if (areaColor === "theme") {
    return isOn
      ? "rgba(var(--color-theme),0.7)"
      : "rgba(var(--color-theme),0.2)";
  }

  return isOn
    ? this._computeFullColor(areaColor)
    : getColorMix.call(this, areaColor, 40);
}

function getCurveButtonOverrideIconColor(key, stateObj, isOn) {
  const configuredColor = getConfiguredButtonColor.call(this, key, isOn, "");
  const customColor = resolveColorTemplate.call(this, configuredColor);

  const hasCustomColor =
    Boolean(customColor) &&
    customColor !== "theme";

  return hasCustomColor
    ? getCurveButtonCustomIconColor.call(this, key, stateObj, isOn, customColor)
    : getCurveButtonIconColor.call(this, key, stateObj, isOn);
}

function getActionButtonIconColor(key, stateObj, isOn) {
  const configuredColor = getConfiguredButtonColor.call(this, key, isOn, "");
  const customColor = resolveColorTemplate.call(this, configuredColor);

  const hasCustomColor =
    Boolean(customColor) &&
    customColor !== "theme";

  return hasCustomColor
    ? getCurveButtonCustomIconColor.call(this, key, stateObj, isOn, customColor)
    : getCurveButtonIconColor.call(this, key, stateObj, isOn);
}

function getConfiguredButtonColor(key, isOn, fallback = "theme") {
  if (this._config?.[`${key}_color_source`] === "template") {
    return this._config?.[`${key}_color`] || fallback;
  }

  return this._config?.[
    `${key}_color_${isOn ? "on" : "off"}`
  ] || fallback;
}

function getCurveButtonCustomIconColor(key, stateObj, isOn, customColor) {
  if (isOn) {
    return getButtonIconColor.call(this, key, stateObj, true);
  }

  if (customColor.startsWith("rgba(")) return customColor;

  return getColorMix.call(this, customColor, 40);
}

function getMainEntityIconSource(config = {}, areaId, mainEntity) {
  const savedSource = config.icon_source;
  const hasArea = Boolean(areaId);
  const hasEntity = Boolean(mainEntity);

  if (savedSource === "custom") {
    return savedSource;
  }

  if (savedSource === "template") return "template";

  if (savedSource === "area" && hasArea) return "area";
  if (savedSource === "entity" && hasEntity) return "entity";

  if (hasArea) return "area";
  if (hasEntity) return "entity";

  return "area";
}
