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
