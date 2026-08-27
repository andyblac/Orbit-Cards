import {
  computeFullColor,
  resolveColorTemplate,
} from "../../common/helpers/colors.js";
import {
  formatDeviceClass,
  getNativeEntityBadgeColor,
  getStatusBadgeActiveEntities,
  getStatusBadgeDeviceClasses,
  getStatusBadgeDomainConfig,
  getStatusBadgeAreaName,
  getStatusBadgeStateSource,
} from "../../common/helpers/status-badge.js";
import {
  evaluateStateTemplate,
  formatTemplateState,
  getTemplateResultActiveState,
} from "../../common/helpers/templates.js";
import { resolveIconTemplate } from "../../common/helpers/icons.js";

export function getStatusBadgeModel() {
  const stateSource = getStatusBadgeStateSource(this._config);
  const entities = this._getEntities();
  const activeEntities = getStatusBadgeActiveEntities(
    entities,
    this._config
  );
  const templateResult = stateSource === "template"
    ? evaluateStateTemplate.call(
        this,
        this._config?.state_template,
        ""
      ) ?? "unavailable"
    : "";
  const activeTemplate = this._config?.active_template?.trim() || "";
  const activeTemplateResult = stateSource === "template" && activeTemplate
    ? evaluateStateTemplate.call(this, activeTemplate, "")
    : null;
  const inactiveTemplate = this._config?.inactive_template?.trim() || "";
  const inactiveTemplateResult = stateSource === "template" &&
      inactiveTemplate
    ? evaluateStateTemplate.call(this, inactiveTemplate, "")
    : null;
  const templateDomain = entities[0]?.entity_id?.split(".")[0] ||
    this._config?.domain || "";
  const inactiveTemplateActive = Boolean(inactiveTemplate) &&
    getTemplateResultActiveState(inactiveTemplateResult, templateDomain);
  const computedIsOn = stateSource === "template"
    ? getTemplateResultActiveState(
        activeTemplateResult ?? templateResult,
        templateDomain
      )
    : activeEntities.length > 0;
  const isOn = this._config?.display_style === "badge" &&
      !this._config?.card_visibility
    ? true
    : computedIsOn;
  const selectedEntity = entities[0];
  const deviceClasses = getStatusBadgeDeviceClasses(this._config);
  const primaryDeviceClass = deviceClasses[0] || "";
  const domain = selectedEntity?.entity_id.split(".")[0] ||
    this._config?.domain || "";
  const domainConfig = getStatusBadgeDomainConfig(domain);
  const iconSource = this._config?.icon_source ||
    (this._config?.icon ? "custom" : "domain");
  const basicIcon = resolveIconTemplate.call(
    this,
    this._config?.icon,
    selectedEntity?.entity_id || ""
  );
  const stateIcon = iconSource === "template"
    ? basicIcon
    : isOn
    ? this._config?.icon_on || basicIcon
    : this._config?.icon_off || basicIcon;
  const icon = ["custom", "template"].includes(iconSource)
    ? stateIcon || domainConfig.icon
    : domainConfig.icon;
  const configuredColorValue =
    this._config?.color_source === "template"
      ? this._config?.color
      : isOn
        ? this._config?.color_on ??
          (this._config?.color_source ? undefined : this._config?.color)
        : this._config?.color_off;
  const configuredColor = resolveColorTemplate.call(
    this,
    configuredColorValue
  );
  const hasIconColorOverride = Boolean(configuredColor && ![
    "theme",
    "state",
    "state-active",
    "state-inactive",
  ].includes(configuredColor));
  const colorInput = !configuredColor || [
    "theme",
    "state",
    "state-active",
    "state-inactive",
  ].includes(configuredColor)
    ? "theme"
    : configuredColor;
  const nameTemplate = stateSource === "template"
    ? this._config?.name_template?.trim() || ""
    : "";
  const nameTemplateResult = nameTemplate
    ? evaluateStateTemplate.call(this, nameTemplate, "")
    : null;
  const templatedName = String(nameTemplateResult ?? "").trim();
  const representativeStateObj = stateSource === "template" &&
      !selectedEntity
    ? {
        entity_id: "sensor.orbit_status_badge_template",
        state: templateResult || "unavailable",
        attributes: {
          friendly_name: templatedName || "Template",
        },
      }
    : activeEntities[0] || entities[0] || {
        entity_id: `${domain || "sensor"}.orbit_status_badge`,
        state: isOn ? "on" : "off",
        attributes: primaryDeviceClass
          ? { device_class: primaryDeviceClass }
          : {},
      };
  const iconStateObj = ["entity", "template"].includes(stateSource)
    ? representativeStateObj
    : {
        entity_id: `${domain}.orbit_status_badge`,
        state: representativeStateObj.state,
        attributes: primaryDeviceClass
          ? { device_class: primaryDeviceClass }
          : {},
      };
  const nativeColorIsActive = iconStateObj.entity_id?.startsWith("sensor.")
    ? false
    : isOn;
  const areaName = getStatusBadgeAreaName(this.hass, this._config);
  const configuredName = this._config?.name;
  const deviceClassLabel = deviceClasses
    .map((deviceClass) => formatDeviceClass(deviceClass))
    .join(", ");
  const entityLabel = selectedEntity && this.hass?.formatEntityName
    ? this.hass.formatEntityName(selectedEntity)
    : "";
  const defaultLabel = entityLabel || (stateSource === "template"
    ? "Template"
    : areaName || deviceClassLabel || domainConfig.label);
  const label = configuredName && this.hass?.formatEntityName
    ? this.hass.formatEntityName(
        representativeStateObj,
        replaceTemplateNameItem(configuredName, templatedName)
      ) ||
      defaultLabel
    : defaultLabel;
  const iconKey = iconSource === "custom"
    ? (isOn && this._config?.icon_on
        ? "icon_on"
        : !isOn && this._config?.icon_off
          ? "icon_off"
          : this._config?.icon
            ? "icon"
            : "")
    : iconSource === "template" && basicIcon
      ? "icon"
      : "";

  return {
    entities,
    activeEntities,
    isOn,
    inactiveTemplateActive,
    count: activeEntities.length,
    displayValue: stateSource === "template"
      ? formatTemplateState(templateResult, this.hass, templateDomain)
      : stateSource === "entity"
        ? representativeStateObj.state
        : activeEntities.length,
    label,
    icon,
    iconKey,
    iconSource,
    stateSource,
    representativeStateObj,
    iconStateObj,
    displayStateObj: ["entity", "template"].includes(stateSource)
      ? representativeStateObj
      : {
          entity_id: "sensor.orbit_status_badge_count",
          state: isOn ? "on" : "off",
          attributes: {
            count: activeEntities.length,
            friendly_name: label,
          },
          last_changed: representativeStateObj.last_changed,
          last_updated: representativeStateObj.last_updated,
          context: representativeStateObj.context,
        },
    defaultStateContent: stateSource === "area_count" ? "count" : "state",
    hasIconColorOverride,
    iconColor: colorInput === "theme"
      ? getNativeEntityBadgeColor(iconStateObj, nativeColorIsActive)
      : computeFullColor.call(this, colorInput),
  };
}

function replaceTemplateNameItem(value, templatedName) {
  const replaceItem = (item) => item?.type === "template"
    ? { type: "text", text: templatedName }
    : item;

  return Array.isArray(value)
    ? value.map(replaceItem)
    : replaceItem(value);
}
