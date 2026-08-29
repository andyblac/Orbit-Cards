import {
  getStatusActiveState,
  getStatusAttribute,
  getStatusColor,
  getStatusNavigationPath,
} from "./attributes.js";
import {
  getActiveZoneIndex,
} from "../../../common/helpers/zones.js";
import {
  formatCardNameValue,
} from "../../../common/helpers/card-name.js";
import { localize } from "../../../common/localize.js";
import { resolveIconTemplate } from "../../../common/helpers/icons.js";
import {
  getStatusBadgeActiveEntities,
  getStatusBadgeAreaEntities,
  getStatusBadgeDeviceClasses,
  getStatusBadgeDomainConfig,
  getStatusBadgeStateSource,
  formatDeviceClass,
  pickStatusSourceConfig,
  STATUS_BADGE_UNAVAILABLE_DOMAIN,
} from "../../../common/helpers/status-badge.js";
import {
  formatTemplateState,
  getTemplateResultActiveState,
} from "../../../common/helpers/templates.js";

export function updateStatusCard(changedProps) {
  if (
    !changedProps.has("_config") &&
    !changedProps.has("hass") &&
    !changedProps.has("_templateRevision")
  ) return;

  if (this._config.mode === "person") {
    updatePersonStatusCard.call(this);
    return;
  }

  if (this._config.mode === "icon_only") {
    const items = getIconOnlyStatusItems(this._config);

    this._statusItems = items.map((item) =>
      getStatusState.call(this, item, this._config)
    );

    applyStatusState.call(
      this,
      this._statusItems[0] || {}
    );
    return;
  }

  const entityId = this._config.entity;
  const statusState = getStatusState.call(
    this,
    {
      entity: entityId,
    },
    this._config
  );

  this._statusItems = [statusState];
  applyStatusState.call(this, statusState);
}

export function getIconOnlyStatusItems(config = {}) {
  if (
    Array.isArray(config.entities) &&
    config.entities.length
  ) {
    return config.entities.map((item) =>
      typeof item === "string"
        ? { entity: item }
        : item || {}
    );
  }

  return [
    {
      entity: config.entity,
      ...pickStatusSourceConfig(config),
      color_source: config.color_source,
      color: config.color,
      color_on: config.color_on,
      color_off: config.color_off,
      icon_source: config.icon_source,
      icon: config.icon,
      icon_on: config.icon_on,
      icon_off: config.icon_off,
      entity_icon_source: config.entity_icon_source,
      entity_icon_template: config.entity_icon_template,
      entity_icon: config.entity_icon,
      entity_icon_on: config.entity_icon_on,
      entity_icon_off: config.entity_icon_off,
      entity_icon_svg_color_override:
        config.entity_icon_svg_color_override,
      entity_icon_on_svg_color_override:
        config.entity_icon_on_svg_color_override,
      entity_icon_off_svg_color_override:
        config.entity_icon_off_svg_color_override,
      state_template: config.state_template,
      label_template: config.label_template,
      name_template: config.name_template,
      tap_action: config.tap_action,
      hold_action: config.hold_action,
      double_tap_action: config.double_tap_action,
      entity_tap_action: config.entity_tap_action,
      entity_hold_action: config.entity_hold_action,
      entity_double_tap_action:
        config.entity_double_tap_action,
    },
  ];
}

function getStatusState(item, rootConfig = {}) {
  const config = {
    ...rootConfig,
    ...item,
  };
  const stateSource = getStatusBadgeStateSource(config);
  const configuredEntityId = item.entity || rootConfig.entity;
  const areaEntities = stateSource === "area_count"
    ? getStatusBadgeAreaEntities(this.hass, config)
    : [];
  const activeAreaEntities = getStatusBadgeActiveEntities(
    areaEntities,
    config,
    (stateObj) => this._getEntityActiveState(stateObj)
  );
  const stateObj = stateSource === "area_count"
    ? activeAreaEntities[0] || areaEntities[0] || null
    : configuredEntityId && this.hass
      ? this.hass.states[configuredEntityId]
      : null;
  const entityId = configuredEntityId || stateObj?.entity_id || "";
  const templateDomain = entityId.split(".")[0] || config.domain || "";
  config.entity = entityId;

  const isIconOnly =
    config.mode === "icon_only";

  const hasConfiguredName =
    !isIconOnly &&
    Object.prototype.hasOwnProperty.call(config, "name") &&
    config.name !== undefined &&
    config.name !== "";

  const templatedState = stateSource === "template" && config.state_template
      ? this._evaluateStateTemplate(
          config.state_template,
          entityId
        )
      : null;
  const activeTemplate = stateSource === "template" && config.active_template
    ? this._evaluateStateTemplate(config.active_template, entityId)
    : null;
  const inactiveTemplate = stateSource === "template" &&
      config.inactive_template
    ? this._evaluateStateTemplate(config.inactive_template, entityId)
    : null;

  const templatedName =
    stateSource !== "area_count" && config.name_template
      ? this._evaluateStateTemplate(
          config.name_template,
          entityId
        )
      : null;

  const templatedLabel =
    stateSource === "template" && config.label_template
      ? this._evaluateStateTemplate(
          config.label_template,
          entityId
        )
      : null;

  const cardName = templatedName !== null
    ? String(templatedName)
    : hasConfiguredName
      ? formatCardNameValue(config.name, config, this.hass)
      : stateSource === "area_count"
        ? config.domain === STATUS_BADGE_UNAVAILABLE_DOMAIN
          ? localize(this.hass, "Unavailable")
          : getStatusBadgeDeviceClasses(config).length
            ? getStatusBadgeDeviceClasses(config)
                .map(formatDeviceClass)
                .join(", ")
            : getStatusBadgeDomainConfig(config.domain).label
      : getStatusAttribute(stateObj, "friendly_name") ||
        entityId ||
        localize(this.hass, "Status");

  const statusText = templatedLabel !== null
    ? String(templatedLabel)
    : stateSource === "template"
    ? config.state_template
      ? formatTemplateState(templatedState, this.hass, templateDomain)
      : stateObj
        ? getStatusAttribute(stateObj, "label") ||
          this.formatState(stateObj)
        : ""
    : stateSource === "area_count"
      ? String(activeAreaEntities.length)
      : getStatusAttribute(stateObj, "label") ||
        (stateObj
          ? this.formatState(stateObj)
          : "");

  const customIconOn = config.icon_on ?? config.entity_icon_on;

  const customIconOff = config.icon_off ?? config.entity_icon_off;

  const hasConfiguredStateTemplate = Boolean(
    config.state_template ||
    config.active_template ||
    config.inactive_template
  );
  const isOn = stateSource === "template"
    ? hasConfiguredStateTemplate
      ? getTemplateResultActiveState(activeTemplate, templateDomain)
        ? true
        : getTemplateResultActiveState(inactiveTemplate, templateDomain)
          ? false
          : getTemplateResultActiveState(templatedState, templateDomain)
      : stateObj
        ? getStatusActiveState(
            stateObj,
            (entity) => this._getEntityActiveState(entity)
          )
        : false
    : stateSource === "area_count"
      ? activeAreaEntities.length > 0
      : getStatusActiveState(
          stateObj,
          (entity) => this._getEntityActiveState(entity),
          templatedState
        );
  const iconSource = getStatusIconSource(config, entityId);
  const customIcon = resolveIconTemplate.call(
    this,
    config.icon,
    entityId
  );
  const customStateIcon =
    iconSource === "template"
      ? customIcon
      : iconSource === "custom"
      ? (isOn ? customIconOn : customIconOff) ||
        customIcon ||
        ""
      : "";

  const icon = customStateIcon || (stateSource === "area_count"
    ? getStatusBadgeDomainConfig(config.domain).icon
    : entityId && !stateObj
      ? "mdi:alert-circle-outline"
      : "mdi:information-outline");
  const primaryDeviceClass = getStatusBadgeDeviceClasses(config)[0] || "";
  const useStaticDomainIcon = stateSource === "area_count" &&
    getStatusBadgeDomainConfig(config.domain).staticIcon;
  const nativeIconStateObj = stateSource === "area_count"
    ? {
        entity_id: `${config.domain || "sensor"}.orbit_status_card`,
        state: stateObj?.state ?? (isOn ? "on" : "off"),
        attributes: primaryDeviceClass
          ? { device_class: primaryDeviceClass }
          : {},
      }
    : stateObj;

  const selectedIconKey =
    iconSource === "template" && customIcon
      ? "icon"
    : iconSource === "custom" && isOn && customIconOn
      ? config.icon_on
        ? "icon_on"
        : "entity_icon_on"
    : iconSource === "custom" && !isOn && customIconOff
        ? config.icon_off
          ? "icon_off"
          : "entity_icon_off"
      : iconSource === "custom" && customIcon
          ? config.icon
            ? "icon"
            : "entity_icon"
          : "";

  const statusColor = getStatusColor(
    config,
    stateObj,
    isOn
  );

  const navigationPath = getStatusNavigationPath(
    config,
    stateObj
  );

  const nameColor = this._computeFullColor(statusColor);
  const statusColorValue = this._computeFullColor(statusColor);
  const circleColor = this._computeCircleColor(statusColor);
  const iconColor = entityId && !stateObj
    ? "var(--error-color)"
    : isOn
      ? this._computeFullColor(statusColor)
      : this._computeIconColor(statusColor);

  return {
    ...item,
    entityId,
    stateObj,
    nativeIconStateObj,
    useStateIcon: Boolean(nativeIconStateObj) &&
      iconSource !== "template" &&
      !customStateIcon &&
      !useStaticDomainIcon,
    cardName,
    statusText,
    icon,
    navigationPath,
    nameColor,
    statusColor: statusColorValue,
    circleColor,
    iconColor,
    svgForceColor: selectedIconKey
      ? this._getSvgColorOverride(config, selectedIconKey)
      : true,
    suppressEntityIssueBadge: stateSource === "area_count" &&
      config.domain === STATUS_BADGE_UNAVAILABLE_DOMAIN,
  };
}

function getStatusIconSource(config, entityId) {
  const savedSource = config.icon_source ?? config.entity_icon_source;
  const hasEntity = Boolean(entityId);
  const hasCustomIcon = Boolean(
    config.icon ||
    config.icon_on ||
    config.icon_off ||
    config.entity_icon ||
    config.entity_icon_on ||
    config.entity_icon_off
  );

  if (savedSource === "custom") return "custom";
  if (savedSource === "template") return "template";
  if (savedSource === "domain" && config.domain) return "domain";
  if (savedSource === "entity" && hasEntity) return "entity";
  if (hasCustomIcon) return "custom";
  if (config.state_source === "area_count") return "domain";
  if (hasEntity) return "entity";

  return "entity";
}

function applyStatusState(state) {
  this._cardName =
    state.cardName ??
    localize(this.hass, "Status");
  this._statusText = state.statusText || "";
  this._icon = state.icon || "mdi:information-outline";
  this._mainStateObj = state.stateObj || null;
  this._mainIconStateObj = state.nativeIconStateObj || state.stateObj || null;
  this._useNativeMainIcon = state.useStateIcon ?? false;
  this._navigationPath = state.navigationPath || "";
  this._nameColor = state.nameColor || this._nameColor;
  this._statusColor = state.statusColor || this._statusColor;
  this._circleColor = state.circleColor || this._circleColor;
  this._iconColor = state.iconColor || this._iconColor;
  this._iconSvgForceColor = state.svgForceColor ?? true;
}

function updatePersonStatusCard() {
  const personId = this._config.entity;
  const trackerId = this._config.tracker_entity;
  const etaId = this._config.eta_entity;

  const trackerObj =
    trackerId && this.hass
      ? this.hass.states[trackerId]
      : null;

  const personObj =
    personId && this.hass
      ? this.hass.states[personId]
      : null;

  const etaObj =
    etaId && this.hass
      ? this.hass.states[etaId]
      : null;

  const hasConfiguredName =
    Object.prototype.hasOwnProperty.call(this._config, "name") &&
    this._config.name !== undefined &&
    this._config.name !== "";

  this._cardName = hasConfiguredName
    ? formatCardNameValue(
        this._config.name,
        this._config,
        this.hass
      )
    : getStatusAttribute(personObj, "friendly_name") ||
      getStatusAttribute(trackerObj, "friendly_name") ||
      personId ||
      trackerId ||
      localize(this.hass, "Person");

  const templatedName =
    this._config.name_template
      ? this._evaluateStateTemplate(
          this._config.name_template,
          trackerId
        )
      : null;

  if (templatedName !== null) {
    this._cardName = String(templatedName);
  }

  const baseStatus =
    trackerObj
      ? formatPersonTrackerState.call(this, trackerObj)
      : "";

  const eta =
    etaObj &&
    trackerObj?.state !== "home"
      ? this.formatState(etaObj)
      : "";

  this._statusText =
    eta
      ? `${baseStatus} | ${eta}`
      : baseStatus;

  const templatedState =
    this._config.state_template
      ? this._evaluateStateTemplate(
          this._config.state_template,
          trackerId
        )
      : null;

  const isOn = getStatusActiveState(
    trackerObj,
    (entity) => this._getEntityActiveState(entity),
    templatedState
  );

  const statusColor = getStatusColor(
    this._config,
    trackerObj,
    isOn
  );

  this._personPicture =
    getStatusAttribute(personObj, "entity_picture") ||
    getStatusAttribute(trackerObj, "entity_picture") ||
    "";

  this._personZoneIcon = getPersonZoneIcon.call(
    this,
    trackerObj,
    personObj
  );

  this._personBattery1 = getPersonBadge.call(
    this,
    this._config.battery_entity_1
  );

  this._personBattery2 = getPersonBadge.call(
    this,
    this._config.battery_entity_2
  );

  this._icon =
    getStatusAttribute(personObj, "icon") ||
    getStatusAttribute(trackerObj, "icon") ||
    "mdi:account";
  this._navigationPath = getStatusNavigationPath(
    this._config,
    trackerObj
  );
  this._nameColor = this._computeFullColor(statusColor);
  this._statusColor = this._computeFullColor(statusColor);
  this._circleColor = this._computeCircleColor(statusColor);
  this._iconColor = isOn
    ? this._computeFullColor(statusColor)
    : this._computeIconColor(statusColor);
  this._iconSvgForceColor = true;
}

function getPersonZoneIcon(trackerObj, personObj) {
  if (trackerObj?.state === "home") {
    return "mdi:home-variant";
  }

  const zoneIndex = getActiveZoneIndex(this.hass);
  const personId = personObj?.entity_id;

  if (personId) {
    const zone = zoneIndex.zones
      .find((stateObj) =>
        Array.isArray(stateObj.attributes?.persons) &&
        stateObj.attributes.persons.includes(personId)
      );

    if (zone?.attributes?.icon) {
      return zone.attributes.icon;
    }
  }

  const trackerState = trackerObj?.state?.toLowerCase();

  if (trackerState && trackerState !== "not_home") {
    const zone = zoneIndex.zoneByTrackerState.get(trackerState);

    if (zone?.attributes?.icon) {
      return zone.attributes.icon;
    }
  }

  return "mdi:home-minus";
}

function formatPersonTrackerState(stateObj) {
  const state = stateObj?.state;

  if (!state) return "";
  if (state === "home") {
    return localize(this.hass, "Home");
  }

  if (state === "not_home") {
    return localize(this.hass, "Away");
  }

  return state
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getPersonBadge(entityId) {
  const stateObj =
    entityId && this.hass
      ? this.hass.states[entityId]
      : null;

  if (!stateObj) return null;

  const value = Number(stateObj.state);
  let color = "var(--state-icon-color)";

  if (Number.isFinite(value)) {
    color = value >= 70
      ? "var(--state-sensor-battery-high-color)"
      : value >= 30
        ? "var(--state-sensor-battery-medium-color)"
        : "var(--state-sensor-battery-low-color)";
  }

  return {
    entityId,
    stateObj,
    color,
  };
}
