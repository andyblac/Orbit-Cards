import {
  getStatusActiveState,
  getStatusAttribute,
  getStatusColor,
  getStatusNavigationPath,
} from "./attributes.js";
import {
  getActiveZoneIndex,
} from "../../../common/helpers/zones.js";

export function updateStatusCard(changedProps) {
  if (!changedProps.has("_config") && !changedProps.has("hass")) return;

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

  const entityId = this._config.main_entity;
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
      entity: config.main_entity,
      accent_on_color: config.accent_on_color,
      accent_off_color: config.accent_off_color,
      main_entity_icon: config.main_entity_icon,
      main_entity_icon_on: config.main_entity_icon_on,
      main_entity_icon_off: config.main_entity_icon_off,
      state_template: config.state_template,
      label_template: config.label_template,
      tap_action: config.tap_action,
      main_entity_tap_action: config.main_entity_tap_action,
      main_entity_hold_action: config.main_entity_hold_action,
    },
  ];
}

function getStatusState(item, rootConfig = {}) {
  const entityId = item.entity || rootConfig.main_entity;
  const stateObj =
    entityId && this.hass
      ? this.hass.states[entityId]
      : null;

  const config = {
    ...rootConfig,
    ...item,
    main_entity: entityId,
  };

  const isIconOnly =
    config.mode === "icon_only";

  const cardName =
    (!isIconOnly
      ? config.status_name
      : null) ||
    getStatusAttribute(stateObj, "friendly_name") ||
    entityId ||
    "Status";

  const templatedState =
    config.state_template
      ? this._evaluateStateTemplate(
          config.state_template,
          entityId
        )
      : null;

  const templatedLabel =
    config.label_template
      ? this._evaluateStateTemplate(
          config.label_template,
          entityId
        )
      : null;

  const statusText =
    templatedLabel ??
    (
      getStatusAttribute(stateObj, "label") ||
      (stateObj
        ? this.formatState(stateObj)
        : "")
    );

  const customIcon =
    config.main_entity_icon;

  const customIconOn =
    config.main_entity_icon_on;

  const customIconOff =
    config.main_entity_icon_off;

  const isOn = getStatusActiveState(
    stateObj,
    (entity) => this._getEntityActiveState(entity),
    templatedState
  );

  const icon =
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
  const iconColor = isOn
    ? this._computeFullColor(statusColor)
    : this._computeIconColor(statusColor);

  return {
    ...item,
    entityId,
    cardName,
    statusText,
    icon,
    navigationPath,
    nameColor,
    statusColor: statusColorValue,
    circleColor,
    iconColor,
  };
}

function applyStatusState(state) {
  this._cardName = state.cardName || "Status";
  this._statusText = state.statusText || "";
  this._icon = state.icon || "mdi:information-outline";
  this._navigationPath = state.navigationPath || "";
  this._nameColor = state.nameColor || this._nameColor;
  this._statusColor = state.statusColor || this._statusColor;
  this._circleColor = state.circleColor || this._circleColor;
  this._iconColor = state.iconColor || this._iconColor;
}

function updatePersonStatusCard() {
  const personId = this._config.main_entity;
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

  this._cardName =
    this._config.status_name ||
    getStatusAttribute(personObj, "friendly_name") ||
    getStatusAttribute(trackerObj, "friendly_name") ||
    personId ||
    trackerId ||
    "Person";

  const templatedLabel =
    this._config.label_template
      ? this._evaluateStateTemplate(
          this._config.label_template,
          trackerId
        )
      : null;

  const baseStatus =
    templatedLabel ??
    (
      trackerObj
        ? formatPersonTrackerState(trackerObj)
        : ""
    );

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
  if (state === "home") return "Home";
  if (state === "not_home") return "Away";

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
  let color = "green";

  if (Number.isFinite(value)) {
    if (value <= 15) {
      color = "red";
    } else if (value <= 30) {
      color = "amber";
    }
  }

  return {
    entityId,
    icon:
      stateObj.attributes?.icon ||
      "mdi:battery",
    color: this._computeFullColor(color),
  };
}
