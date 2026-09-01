import { getEntityAreaId } from "./suggestions.js";
import {
  formatEntityState,
  getEntityActiveState,
} from "./entities.js";
import { migrateStatusBadgeConfig } from "./config-migration.js";
import { localize } from "../localize.js";

export const STATUS_BADGE_UNAVAILABLE_DOMAIN = "unavailable";

export const STATUS_BADGE_DOMAINS = [
  {
    value: STATUS_BADGE_UNAVAILABLE_DOMAIN,
    label: "Unavailable",
    icon: "mdi:alert-circle-outline",
    staticIcon: true,
  },
  { value: "light", label: "Lights", icon: "mdi:lightbulb" },
  {
    value: "switch",
    label: "Switches",
    icon: "mdi:toggle-switch",
    requiresDeviceClass: true,
  },
  { value: "fan", label: "Fans", icon: "mdi:fan" },
  {
    value: "cover",
    label: "Covers",
    icon: "mdi:window-shutter",
  },
  { value: "lock", label: "Locks", icon: "mdi:lock" },
  { value: "media_player", label: "Media players", icon: "mdi:play-box-multiple" },
  { value: "climate", label: "Climate", icon: "mdi:thermostat" },
  {
    value: "binary_sensor",
    label: "Binary sensors",
    icon: "mdi:radiobox-marked",
    requiresDeviceClass: true,
  },
  {
    value: "sensor",
    label: "Sensors",
    icon: "mdi:gauge",
    requiresDeviceClass: true,
  },
];

export const CURRENT_STATE_ACTION = "Current state";
export const CURRENT_ACTIVITY_ACTION = "current-activity";
export const STATUS_BADGE_NON_NUMERIC_SENSOR_DEVICE_CLASSES = new Set([
  "date",
  "enum",
  "timestamp",
  "uptime",
]);
export const STATUS_SOURCE_CONFIG_KEYS = [
  "state_source",
  "area",
  "domain",
  "domains",
  "device_class",
  "threshold",
  "thresholds",
  "hide",
  "active_template",
  "inactive_template",
];

export function pickStatusSourceConfig(config = {}) {
  return Object.fromEntries(
    STATUS_SOURCE_CONFIG_KEYS.map((key) => [key, config[key]])
  );
}

export function getStatusBadgeDefaultTapAction(config = {}) {
  const stateSource = getStatusBadgeStateSource(config);

  if (stateSource === "entity") return { action: "more-info" };
  if (stateSource === "area_count") {
    return { action: CURRENT_STATE_ACTION };
  }

  return { action: "none" };
}

const STATUS_BADGE_DOMAIN_CONFIG = new Map(
  STATUS_BADGE_DOMAINS.map((item) => [item.value, item])
);

const STATUS_BADGE_DEVICE_CLASS_RESOURCES = new WeakMap();

export async function loadStatusBadgeDeviceClasses(hass) {
  const connection = hass?.connection;
  if (!connection?.sendMessagePromise) return {};

  let entry = STATUS_BADGE_DEVICE_CLASS_RESOURCES.get(connection);
  if (!entry) {
    entry = {
      resources: {},
      promise: connection.sendMessagePromise({
        type: "frontend/get_icons",
        category: "entity_component",
      }).then((result) => {
        entry.resources = result?.resources || {};
        return entry.resources;
      }).catch(() => entry.resources),
    };
    STATUS_BADGE_DEVICE_CLASS_RESOURCES.set(connection, entry);
  }

  return entry.promise;
}

export function getStatusBadgeDomainConfig(domain = "") {
  return STATUS_BADGE_DOMAIN_CONFIG.get(domain) || {
    value: domain,
    label: domain ? domain.replaceAll("_", " ") : "Status",
    icon: "mdi:shape",
  };
}

export function getStatusBadgeDomains(config = {}) {
  const configured = Array.isArray(config?.domains) && config.domains.length
    ? config.domains
    : Array.isArray(config?.domain)
      ? config.domain
      : [config?.domain];

  return [...new Set(configured.filter((domain) =>
    typeof domain === "string" && domain.trim()
  ).map((domain) => domain.trim()))];
}

export function getStatusBadgeStateSource(config = {}) {
  const stateSource = config.state_source || "entity";

  if (["entity", "area_count", "template"].includes(stateSource)) {
    return stateSource;
  }

  throw new Error(
    `Invalid state_source "${stateSource}". Expected "entity", "area_count", or "template".`
  );
}

export function validateStatusBadgeConfig(config = {}) {
  const stateSource = getStatusBadgeStateSource(config);
  const domains = getStatusBadgeDomains(config);
  const requiresDeviceClass = domains.some((domain) =>
    getStatusBadgeDomainConfig(domain).requiresDeviceClass
  );

  if (
    stateSource === "area_count" &&
    requiresDeviceClass &&
    getStatusBadgeDeviceClasses(config).length === 0
  ) {
    throw new Error(
      `Orbit Status Badge requires "device_class" for the selected domains.`
    );
  }

  return stateSource;
}

export function getStatusBadgeHideItems(config = {}) {
  if (!Object.prototype.hasOwnProperty.call(config, "hide")) {
    return [{ type: "hidden" }];
  }

  if (!Array.isArray(config.hide)) return [];

  const items = [];
  const labels = new Set();
  let hasHidden = false;

  config.hide.forEach((item) => {
    if (item === "hidden" && !hasHidden) {
      hasHidden = true;
      items.push({ type: "hidden" });
      return;
    }

    if (item === "low" && !items.some((entry) => entry.type === "low")) {
      items.push({ type: "low" });
      return;
    }

    const label = typeof item?.label === "string"
      ? item.label.trim()
      : "";

    if (!label || labels.has(label)) return;

    labels.add(label);
    items.push({ type: "label", label });
  });

  return items;
}

export function serializeStatusBadgeHideItems(items = []) {
  return items.map((item) =>
    ["hidden", "low"].includes(item?.type)
      ? item.type
      : { label: item?.label }
  );
}

export function shouldHideStatusBadgeEntity(hass, entityId, config = {}) {
  const hideItems = getStatusBadgeHideItems(config);
  const entity = hass?.entities?.[entityId];

  return hideItems.some((item) => {
    if (item.type === "hidden") {
      return Boolean(entity?.hidden_by || entity?.hidden);
    }

    if (item.type === "low") {
      const stateObj = hass?.states?.[entityId];
      return entityId.startsWith("binary_sensor.") &&
        stateObj?.attributes?.device_class === "battery";
    }

    return item.type === "label" &&
      Array.isArray(entity?.labels) &&
      entity.labels.includes(item.label);
  });
}

export function normalizeStatusBadgeConfig(config = {}) {
  const migratedConfig = migrateStatusBadgeConfig(config).config;
  const stateSource = getStatusBadgeStateSource(migratedConfig);
  const normalized = { ...migratedConfig };

  Object.keys(normalized).forEach((key) => {
    if (normalized[key] === "" || normalized[key] === undefined) {
      delete normalized[key];
    }
  });

  if (
    stateSource === "area_count" &&
    getStatusBadgeDomains(normalized).includes(STATUS_BADGE_UNAVAILABLE_DOMAIN)
  ) {
    delete normalized.device_class;
    delete normalized.threshold;
    delete normalized.thresholds;
  }

  const deviceClasses = getStatusBadgeDeviceClasses(normalized);
  const usesBatteryThreshold = stateSource === "area_count" &&
    deviceClasses.includes("battery");
  const usesSensorThresholds = stateSource === "area_count" &&
    getStatusBadgeDomains(normalized).includes("sensor");

  if (deviceClasses.length === 0) {
    delete normalized.device_class;
  } else {
    normalized.device_class = deviceClasses.length === 1
      ? deviceClasses[0]
      : deviceClasses;
  }

  if (!usesBatteryThreshold) {
    delete normalized.threshold;
  } else {
    const threshold = Number(normalized.threshold);
    if (!Number.isFinite(threshold) || threshold === 20) {
      delete normalized.threshold;
    } else {
      normalized.threshold = Math.min(100, Math.max(0, threshold));
    }
  }

  if (!usesSensorThresholds) {
    delete normalized.thresholds;
  } else {
    const thresholds = Object.fromEntries(
      Object.entries(normalized.thresholds || {}).flatMap(
        ([deviceClass, rule]) => {
          if (
            !deviceClasses.includes(deviceClass) ||
            deviceClass === "battery"
          ) {
            return [];
          }

          const value = Number(rule?.value);
          const defaultDirection = getStatusBadgeSensorDefaultDirection(
            deviceClass
          );
          const direction = ["above", "below"].includes(rule?.direction)
            ? rule.direction
            : defaultDirection;
          if (!Number.isFinite(value)) return [];
          if (value === 0 && direction === defaultDirection) return [];

          return [[deviceClass, { value, direction }]];
        }
      )
    );

    if (Object.keys(thresholds).length) normalized.thresholds = thresholds;
    else delete normalized.thresholds;
  }

  delete normalized.include_low_sensors;

  // Match native badge config behaviour: only persist values that differ from
  // the runtime defaults.
  if (normalized.show_state === true) delete normalized.show_state;
  if (normalized.show_icon === true) delete normalized.show_icon;
  if (normalized.show_name === false) delete normalized.show_name;
  if (normalized.show_entity_picture === false) {
    delete normalized.show_entity_picture;
  }
  if (Object.prototype.hasOwnProperty.call(normalized, "hide")) {
    const hideItems = getStatusBadgeHideItems(normalized);

    normalized.hide = serializeStatusBadgeHideItems(hideItems);
    if (
      normalized.hide.length === 1 &&
      normalized.hide[0] === "hidden"
    ) {
      delete normalized.hide;
    }
  }
  if (normalized.card_visibility === "always") {
    delete normalized.card_visibility;
  }
  if (stateSource === "entity") {
    delete normalized.state_source;
    delete normalized.area;
    delete normalized.domain;
    delete normalized.domains;
    delete normalized.device_class;
    delete normalized.state_template;
    delete normalized.active_template;
    delete normalized.inactive_template;
    delete normalized.name_template;
    delete normalized.hide;
    if (normalized.state_content === "state") {
      delete normalized.state_content;
    }
    if (normalized.tap_action?.action === "more-info") {
      delete normalized.tap_action;
    }
  } else if (stateSource === "area_count") {
    normalized.state_source = "area_count";
    delete normalized.entity;
    delete normalized.state_template;
    delete normalized.active_template;
    delete normalized.inactive_template;
    delete normalized.name_template;
    if (normalized.state_content === "count") {
      delete normalized.state_content;
    }
    if (normalized.tap_action?.action === CURRENT_STATE_ACTION) {
      delete normalized.tap_action;
    }
  } else {
    normalized.state_source = "template";
    if (normalized.display_style !== "badge") {
      delete normalized.entity;
    }
    delete normalized.area;
    delete normalized.domain;
    delete normalized.domains;
    delete normalized.device_class;
    delete normalized.hide;
    if (normalized.state_content === "state") {
      delete normalized.state_content;
    }
    if (normalized.tap_action?.action === "none") {
      delete normalized.tap_action;
    }
  }

  if (normalized.hold_action?.action === "none") {
    delete normalized.hold_action;
  }
  if (normalized.double_tap_action?.action === "none") {
    delete normalized.double_tap_action;
  }

  if (normalized.icon_source === "domain") {
    delete normalized.icon_source;
    delete normalized.icon;
    delete normalized.icon_on;
    delete normalized.icon_off;
  }

  // Native state colours are runtime defaults. Keep the YAML clean unless a
  // real colour override has been selected.
  if (
    ["", "theme", "state", "state-active"].includes(
      normalized.color_on
    )
  ) {
    delete normalized.color_on;
  }

  if (
    ["", "theme", "state", "state-inactive"].includes(
      normalized.color_off
    )
  ) {
    delete normalized.color_off;
  }

  return normalized;
}

export function formatDeviceClass(deviceClass = "") {
  return deviceClass
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getStatusBadgeDeviceClassLabel(deviceClass = "") {
  // Home Assistant's entity_component `<device_class>.name` translation is
  // the default entity name, not a label for the class itself. For example,
  // switch.outlet is "Socket" in en-GB even though the class is "Outlet".
  return formatDeviceClass(deviceClass);
}

export function getStatusBadgeActivityTitleDetail(hass, config = {}) {
  const deviceClasses = getStatusBadgeDeviceClasses(config);

  if (deviceClasses.length) {
    return deviceClasses
      .map((deviceClass) => getStatusBadgeDeviceClassLabel(deviceClass))
      .join(", ");
  }

  return getStatusBadgeDomains(config)
    .map((domain) => localize(hass, getStatusBadgeDomainConfig(domain).label))
    .join(", ");
}

export function getStatusBadgeDeviceClasses(config = {}) {
  const configured = Array.isArray(config?.device_class)
    ? config.device_class
    : [config?.device_class];

  return [...new Set(
    configured
      .filter((deviceClass) => typeof deviceClass === "string")
      .map((deviceClass) => deviceClass.trim())
      .filter(Boolean)
  )];
}

export function getStatusBadgeThreshold(config = {}) {
  const threshold = Number(config.threshold);

  return Number.isFinite(threshold)
    ? Math.min(100, Math.max(0, threshold))
    : 20;
}

export function getStatusBadgeSensorThreshold(config = {}, deviceClass = "") {
  const configured = config.thresholds?.[deviceClass] || {};
  const value = Number(configured.value);
  const defaultDirection = getStatusBadgeSensorDefaultDirection(deviceClass);

  return {
    value: Number.isFinite(value) ? value : 0,
    direction: ["above", "below"].includes(configured.direction)
      ? configured.direction
      : defaultDirection,
  };
}

export function getStatusBadgeSensorDefaultDirection(deviceClass = "") {
  return deviceClass === "signal_strength" ? "below" : "above";
}

export function getStatusBadgeThresholdDisplayState(hass, config = {}) {
  if (!hasStatusBadgeThresholdRule(config)) return "";

  const deviceClasses = getStatusBadgeDeviceClasses(config);

  if (deviceClasses.length !== 1) return "";

  const deviceClass = deviceClasses[0];
  let direction;
  let value;
  let unit;

  if (deviceClass === "battery") {
    direction = "below";
    value = getStatusBadgeThreshold(config);
    unit = "%";
  } else if (
    getStatusBadgeDomains(config).includes("sensor") &&
    !STATUS_BADGE_NON_NUMERIC_SENSOR_DEVICE_CLASSES.has(deviceClass)
  ) {
    const threshold = getStatusBadgeSensorThreshold(config, deviceClass);
    direction = threshold.direction;
    value = threshold.value;
    unit = getStatusBadgeSensorUnit(hass, deviceClass);
  } else {
    return "";
  }

  const directionLabel = localize(
    hass,
    direction === "below" ? "Below" : "Above"
  ).replace(/^\p{L}/u, (letter) => letter.toLocaleLowerCase());
  const formattedThreshold = formatEntityState(
    {
      entity_id: "sensor.orbit_status_threshold",
      state: String(value),
      attributes: {
        device_class: deviceClass,
        ...(unit ? { unit_of_measurement: unit } : {}),
      },
    },
    hass
  );

  return `${directionLabel} ${formattedThreshold}`;
}

export function hasStatusBadgeThresholdRule(config = {}) {
  if (getStatusBadgeStateSource(config) !== "area_count") return false;

  return getStatusBadgeDeviceClasses(config).some((deviceClass) =>
    deviceClass === "battery" ||
    getStatusBadgeDomains(config).includes("sensor") &&
      !STATUS_BADGE_NON_NUMERIC_SENSOR_DEVICE_CLASSES.has(deviceClass)
  );
}

export function getStatusBadgeSensorUnit(hass, deviceClass) {
  if (deviceClass === "power") return "W";

  return Object.values(hass?.states || {}).find((stateObj) =>
    stateObj.entity_id.startsWith("sensor.") &&
    stateObj.attributes?.device_class === deviceClass &&
    stateObj.attributes?.unit_of_measurement
  )?.attributes?.unit_of_measurement || "";
}

export function getStatusBadgeActiveEntities(entities = [], config = {},
  isActive = getEntityActiveState) {
  const isAreaCount = getStatusBadgeStateSource(config) === "area_count";
  if (
    isAreaCount &&
    getStatusBadgeDomains(config).includes(STATUS_BADGE_UNAVAILABLE_DOMAIN)
  ) return entities;

  const deviceClasses = getStatusBadgeDeviceClasses(config);
  const usesBatteryThreshold = isAreaCount &&
    deviceClasses.includes("battery");
  const usesSensorThresholds = isAreaCount &&
    getStatusBadgeDomains(config).includes("sensor");

  if (!usesBatteryThreshold && !usesSensorThresholds) {
    return entities.filter(isActive);
  }

  const threshold = getStatusBadgeThreshold(config);

  return entities.filter((stateObj) => {
    const deviceClass = stateObj?.attributes?.device_class;

    if (deviceClass === "battery" && usesBatteryThreshold) {
      const batteryLevel = getNumericSensorState(stateObj?.state);

      return Number.isFinite(batteryLevel)
        ? batteryLevel <= threshold
        : stateObj?.entity_id?.startsWith("binary_sensor.") &&
          isActive(stateObj);
    }

    if (stateObj?.entity_id?.startsWith("sensor.") && usesSensorThresholds) {
      if (STATUS_BADGE_NON_NUMERIC_SENSOR_DEVICE_CLASSES.has(deviceClass)) {
        return isAvailableSensorState(stateObj?.state);
      }

      const value = deviceClass === "power"
        ? getPowerStateWatts(stateObj)
        : getNumericSensorState(stateObj?.state);

      if (Number.isFinite(value)) {
        const rule = getStatusBadgeSensorThreshold(config, deviceClass);
        return rule.direction === "below"
          ? value <= rule.value
          : value > rule.value;
      }

      return false;
    }

    return isActive(stateObj);
  });
}

function isAvailableSensorState(state) {
  const value = state?.toString().trim().toLowerCase();
  return Boolean(value) && !["unknown", "unavailable", "none"].includes(value);
}

function getNumericSensorState(state) {
  const text = state?.toString().trim();
  if (!text) return Number.NaN;

  const value = Number(text);
  return Number.isFinite(value) ? value : Number.NaN;
}

function getPowerStateWatts(stateObj) {
  const value = getNumericSensorState(stateObj?.state);
  if (!Number.isFinite(value)) return Number.NaN;

  const unit = stateObj?.attributes?.unit_of_measurement || "W";
  const multiplier = {
    mW: 0.001,
    W: 1,
    kW: 1000,
    MW: 1000000,
    GW: 1000000000,
    TW: 1000000000000,
  }[unit];

  return multiplier === undefined ? Number.NaN : value * multiplier;
}

export function getStatusBadgeEntityDeviceClass(stateObj, domain) {
  return stateObj?.attributes?.device_class ||
    (domain === "switch" ? "switch" : "");
}

export function getStatusBadgeDeviceClassOptions(hass, config = {}) {
  const domains = getStatusBadgeDomains(config);
  const configuredValues = getStatusBadgeDeviceClasses(config);
  const domainsByValue = new Map();

  if (!domains.length) return [];

  const addValue = (value, domain = "") => {
    if (!value) return;
    if (!domainsByValue.has(value)) domainsByValue.set(value, new Set());
    if (domain) domainsByValue.get(value).add(domain);
  };

  const resources = hass?.connection
    ? STATUS_BADGE_DEVICE_CLASS_RESOURCES.get(hass.connection)?.resources || {}
    : {};
  domains.forEach((domain) => {
    Object.keys(resources[domain] || {}).forEach((deviceClass) => {
      if (deviceClass !== "_") addValue(deviceClass, domain);
    });
  });

  Object.values(hass?.states || {}).forEach((stateObj) => {
    const domain = stateObj.entity_id.split(".")[0];
    if (!domains.includes(domain)) return;

    const value = getStatusBadgeEntityDeviceClass(stateObj, domain);
    addValue(value, domain);
  });

  configuredValues.forEach((value) => addValue(value));

  return [...domainsByValue]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([value, optionDomains]) => {
      return {
        value,
        domains: [...optionDomains],
        label: getStatusBadgeDeviceClassLabel(value),
      };
    });
}

export function getStatusBadgeDeviceClassesForDomains(
  hass,
  config = {},
  domains = []
) {
  if (domains.includes(STATUS_BADGE_UNAVAILABLE_DOMAIN)) return [];

  const retainedDomains = new Set(domains);
  const options = new Map(
    getStatusBadgeDeviceClassOptions(hass, config)
      .map((option) => [option.value, option])
  );

  return getStatusBadgeDeviceClasses(config).filter((value) => {
    const optionDomains = options.get(value)?.domains || [];
    return !optionDomains.length || optionDomains.some(
      (domain) => retainedDomains.has(domain)
    );
  });
}

export function getStatusBadgeAreaEntities(hass, config = {}) {
  const areaIds = getStatusBadgeAreaIds(config);
  const domains = getStatusBadgeDomains(config);
  const deviceClasses = getStatusBadgeDeviceClasses(config);

  if (!hass || !areaIds.length || !domains.length) return [];
  if (domains.some((domain) =>
    getStatusBadgeDomainConfig(domain).requiresDeviceClass
  ) && !deviceClasses.length) return [];

  if (domains.includes(STATUS_BADGE_UNAVAILABLE_DOMAIN)) {
    return Object.values(hass.states || {}).filter((stateObj) =>
      stateObj.state === "unavailable" &&
      areaIds.includes(getEntityAreaId(hass, stateObj.entity_id)) &&
      !shouldHideStatusBadgeEntity(hass, stateObj.entity_id, config)
    );
  }

  const includesBatteryFallback = deviceClasses.includes("battery") &&
    domains.some((domain) => ["sensor", "binary_sensor"].includes(domain));
  const entities = Object.values(hass.states || {}).filter((stateObj) => {
    const entityDomain = stateObj.entity_id.split(".")[0];
    const matchesDomain = domains.includes(entityDomain) ||
      includesBatteryFallback &&
        ["sensor", "binary_sensor"].includes(entityDomain);
    const matchesDeviceClass = !deviceClasses.length ||
      deviceClasses.includes(getStatusBadgeEntityDeviceClass(
        stateObj,
        entityDomain
      ));

    return matchesDomain &&
      areaIds.includes(getEntityAreaId(hass, stateObj.entity_id)) &&
      matchesDeviceClass &&
      !shouldHideStatusBadgeEntity(hass, stateObj.entity_id, config);
  });

  return deviceClasses.includes("battery")
    ? preferBatteryPercentageEntities(hass, entities)
    : entities;
}

function preferBatteryPercentageEntities(hass, entities) {
  const entitiesByDevice = new Map();

  entities.forEach((stateObj) => {
    if (stateObj?.attributes?.device_class !== "battery") {
      entitiesByDevice.set(stateObj.entity_id, [stateObj]);
      return;
    }

    const registryEntry = hass?.entities?.[stateObj.entity_id];
    const deviceKey = registryEntry?.device_id || stateObj.entity_id;
    entitiesByDevice.set(deviceKey, [
      ...(entitiesByDevice.get(deviceKey) || []),
      stateObj,
    ]);
  });

  return [...entitiesByDevice.values()].flatMap((deviceEntities) => {
    // A sensor-domain battery entity is the device's percentage source. Keep
    // preferring it even while its state is temporarily unavailable or
    // malformed; otherwise the binary low-battery fallback can duplicate or
    // incorrectly replace a percentage sensor that does exist.
    const percentageSensors = deviceEntities.filter((stateObj) =>
      stateObj.entity_id.startsWith("sensor.")
    );

    return percentageSensors.length
      ? percentageSensors
      : deviceEntities;
  });
}

export function getStatusBadgeEntities(hass, config = {}) {
  const stateSource = getStatusBadgeStateSource(config);

  if (
    stateSource === "entity" ||
    (config.display_style === "badge" && config.entity)
  ) {
    const entityId = config.entity || config.main_entity || "";
    const stateObj = hass?.states?.[entityId];
    return stateObj ? [stateObj] : [];
  }

  return getStatusBadgeAreaEntities(hass, config);
}

export function getStatusBadgeAreaIds(config = {}) {
  return Array.isArray(config.area)
    ? config.area.filter(Boolean)
    : [config.area].filter(Boolean);
}

export function getStatusBadgeAreaName(hass, config = {}) {
  return getStatusBadgeAreaIds(config)
    .map((areaId) => hass?.areas?.[areaId]?.name || areaId)
    .filter(Boolean)
    .join(", ");
}

export function getStatusBadgeAreaEntityIds(hass, config = {}) {
  if (getStatusBadgeDomains(config).includes(STATUS_BADGE_UNAVAILABLE_DOMAIN)) {
    const areaIds = getStatusBadgeAreaIds(config);

    return Object.values(hass?.states || {})
      .filter((stateObj) =>
        areaIds.includes(getEntityAreaId(hass, stateObj.entity_id)) &&
        !shouldHideStatusBadgeEntity(hass, stateObj.entity_id, config)
      )
      .map((stateObj) => stateObj.entity_id);
  }

  return getStatusBadgeAreaEntities(hass, config).map(
    (stateObj) => stateObj.entity_id
  );
}

export function getNativeEntityBadgeColor(stateObj, isActive = false) {
  if (stateObj.state === "unavailable") {
    return "var(--state-unavailable-color)";
  }

  const domain = stateObj.entity_id.split(".")[0];
  const attributes = stateObj.attributes || {};

  if (domain === "light" && isActive && Array.isArray(attributes.rgb_color)) {
    return getNativeLightRgbColor(attributes.rgb_color);
  }

  const state = slugifyState(stateObj.state);
  const activeKey = isActive ? "active" : "inactive";
  const properties = [
    attributes.device_class
      ? `--state-${domain}-${attributes.device_class}-${state}-color`
      : "",
    `--state-${domain}-${state}-color`,
    `--state-${domain}-${activeKey}-color`,
    `--state-${activeKey}-color`,
  ].filter(Boolean);

  return properties.reduceRight(
    (fallback, property) => `var(${property}, ${fallback})`,
    "var(--state-icon-color, var(--secondary-text-color))"
  );
}

function slugifyState(state = "") {
  return state
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function getNativeLightRgbColor(rgbColor) {
  let [hue, saturation, value] = rgbToHsv(rgbColor);

  if (saturation < 0.4) {
    if (saturation < 0.1) value = 225;
    else saturation = 0.4;
  }

  return `#${hsvToRgb(hue, saturation, value)
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function rgbToHsv([red, green, blue]) {
  const [r, g, b] = [red, green, blue].map((channel) => channel / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;

  if (delta) {
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
  }

  return [(hue * 60 + 360) % 360, max ? delta / max : 0, max * 255];
}

function hsvToRgb(hue, saturation, value) {
  const chroma = (value / 255) * saturation;
  const section = hue / 60;
  const x = chroma * (1 - Math.abs((section % 2) - 1));
  const [red, green, blue] =
    section < 1 ? [chroma, x, 0] :
      section < 2 ? [x, chroma, 0] :
        section < 3 ? [0, chroma, x] :
          section < 4 ? [0, x, chroma] :
            section < 5 ? [x, 0, chroma] : [chroma, 0, x];
  const match = value / 255 - chroma;

  return [red, green, blue].map((channel) =>
    Math.round((channel + match) * 255)
  );
}
