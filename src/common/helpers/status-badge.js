export const STATUS_BADGE_DOMAINS = [
  { value: "light", label: "Lights", icon: "mdi:lightbulb" },
  {
    value: "switch",
    label: "Switches",
    icon: "mdi:toggle-switch",
    requiresDeviceClass: true,
  },
  { value: "fan", label: "Fans", icon: "mdi:fan" },
  { value: "cover", label: "Covers", icon: "mdi:window-shutter" },
  { value: "lock", label: "Locks", icon: "mdi:lock" },
  { value: "media_player", label: "Media players", icon: "mdi:play-box-multiple" },
  { value: "climate", label: "Climate", icon: "mdi:thermostat" },
  {
    value: "binary_sensor",
    label: "Binary sensors",
    icon: "mdi:radiobox-marked",
    requiresDeviceClass: true,
  },
];

const STATUS_BADGE_DOMAIN_CONFIG = new Map(
  STATUS_BADGE_DOMAINS.map((item) => [item.value, item])
);

export function getStatusBadgeDomainConfig(domain = "") {
  return STATUS_BADGE_DOMAIN_CONFIG.get(domain) || {
    value: domain,
    label: domain ? domain.replaceAll("_", " ") : "Status",
    icon: "mdi:shape",
  };
}

export function getStatusBadgeStateSource(config = {}) {
  const inferredStateSource =
    config.state_template
      ? "template"
      : !config.entity && (config.area || config.domain || config.device_class)
        ? "area_count"
        : "entity";
  const stateSource = config.state_source || inferredStateSource;

  if (["entity", "area_count", "template"].includes(stateSource)) {
    return stateSource;
  }

  throw new Error(
    `Invalid state_source "${stateSource}". Expected "entity", "area_count", or "template".`
  );
}

export function validateStatusBadgeConfig(config = {}) {
  const stateSource = getStatusBadgeStateSource(config);
  const domainConfig = config.domain
    ? getStatusBadgeDomainConfig(config.domain)
    : undefined;

  if (
    stateSource === "area_count" &&
    domainConfig?.requiresDeviceClass &&
    !config.device_class
  ) {
    throw new Error(
      `Orbit Status Badge requires "device_class" for domain "${config.domain}".`
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
  return items.map((item) => item?.type === "hidden"
    ? "hidden"
    : { label: item?.label }
  );
}

export function shouldHideStatusBadgeEntity(hass, entityId, config = {}) {
  const hideItems = getStatusBadgeHideItems(config);
  const entity = hass?.entities?.[entityId];

  return hideItems.some((item) => {
    if (item.type === "hidden") return Boolean(entity?.hidden_by);

    return item.type === "label" &&
      Array.isArray(entity?.labels) &&
      entity.labels.includes(item.label);
  });
}

export function normalizeStatusBadgeColors(config = {}) {
  let stateSource = getStatusBadgeStateSource(config);
  const legacyExampleColors =
    config.accent_on_color === "amber" &&
    config.accent_off_color === "grey";
  const useDefaults =
    config.color_mode === "native" ||
    legacyExampleColors;
  const normalized = { ...config };

  Object.keys(normalized).forEach((key) => {
    if (normalized[key] === "" || normalized[key] === undefined) {
      delete normalized[key];
    }
  });

  // Match native badge config behaviour: only persist values that differ from
  // the runtime defaults.
  if (normalized.show_state === true) delete normalized.show_state;
  if (normalized.show_icon === true) delete normalized.show_icon;
  if (normalized.show_name === false) delete normalized.show_name;
  if (normalized.show_entity_picture === false) {
    delete normalized.show_entity_picture;
  }
  if (
    normalized.display_style &&
    normalized.display_style !== "badge"
  ) {
    delete normalized.display_style;
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
  if (
    normalized.card_visibility === "template" &&
    normalized.card_visibility_template
  ) {
    normalized.active_template = normalized.card_visibility_template;
    normalized.state_source = "template";
    delete normalized.entity;
    delete normalized.area;
    delete normalized.domain;
    delete normalized.device_class;
    delete normalized.state_template;
    delete normalized.name_template;
  }
  delete normalized.card_visibility_template;
  stateSource = getStatusBadgeStateSource(normalized);
  delete normalized.remove_shadow;
  delete normalized.badge_size;

  if (stateSource === "entity") {
    delete normalized.state_source;
    delete normalized.area;
    delete normalized.domain;
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
    if (normalized.tap_action?.action === "active-entities") {
      delete normalized.tap_action;
    }
  } else {
    normalized.state_source = "template";
    if (normalized.display_style !== "badge") {
      delete normalized.entity;
    }
    delete normalized.area;
    delete normalized.domain;
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
    useDefaults ||
    ["", "theme", "state", "state-active"].includes(
      normalized.accent_on_color
    )
  ) {
    delete normalized.accent_on_color;
  }

  if (
    useDefaults ||
    ["", "theme", "state", "state-inactive"].includes(
      normalized.accent_off_color
    )
  ) {
    delete normalized.accent_off_color;
  }

  delete normalized.color_mode;

  return normalized;
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
