import {
  formatEntityState,
  getNativeStateActiveState,
} from "./entities.js";

const TEMPLATE_RESULT_PREFIX = "__ORBIT_TEMPLATE_RESULT_START_8C4F2A__";
const TEMPLATE_RESULT_SUFFIX = "__ORBIT_TEMPLATE_RESULT_END_8C4F2A__";

export function migrateLegacyTemplate(template) {
  if (typeof template !== "string") return template;

  const trimmed = template.trim();

  if (!trimmed || hasNativeTemplateSyntax(trimmed)) {
    return template;
  }

  return `{{ ${trimmed} }}`;
}

export function hasNativeTemplateSyntax(template) {
  return /{{|{%|{#/.test(template || "");
}

export function syncTemplateSubscriptions(entries = []) {
  const connection = this.hass?.connection;

  if (!this.isConnected || !connection?.subscribeMessage) {
    disconnectTemplateSubscriptions.call(this);
    return;
  }

  const subscriptions = getSubscriptionMap(this);
  const configSignature = safeStringify(this._config || {});
  const desired = new Map();

  for (const entry of entries) {
    const template = migrateLegacyTemplate(entry?.template || "")?.trim();

    if (!template) continue;

    const entityId = entry?.entityId || "";
    const id = getTemplateId(template, entityId);

    desired.set(id, {
      id,
      template,
      entityId,
      configSignature,
    });
  }

  for (const [id, record] of subscriptions) {
    const next = desired.get(id);

    if (!next || next.configSignature !== record.configSignature) {
      disconnectRecord(record);
      subscriptions.delete(id);
    }
  }

  for (const descriptor of desired.values()) {
    if (subscriptions.has(descriptor.id)) continue;

    subscribeTemplate.call(this, descriptor);
  }
}

export function disconnectTemplateSubscriptions() {
  const subscriptions = this.__orbitTemplateSubscriptions;

  if (!subscriptions) return;

  for (const record of subscriptions.values()) {
    disconnectRecord(record);
  }

  subscriptions.clear();
}

export function evaluateStateTemplate(template, entityId = "") {
  if (!template) return null;

  const normalizedTemplate = migrateLegacyTemplate(template)?.trim();
  const subscriptions = this.__orbitTemplateSubscriptions;
  const record = subscriptions?.get(
    getTemplateId(normalizedTemplate, entityId)
  ) || [...(subscriptions?.values() || [])].find(
    (entry) => entry.template === normalizedTemplate
  );

  return record?.result ?? null;
}

export function getTemplateError(template, entityId = "") {
  if (!template) return "";

  const normalizedTemplate = migrateLegacyTemplate(template)?.trim();
  const record = this.__orbitTemplateSubscriptions?.get(
    getTemplateId(normalizedTemplate, entityId)
  );

  return record?.error || "";
}

export function getTemplateResultActiveState(result, domain = "") {
  const normalized = String(result ?? "").trim().toLowerCase();
  const numericResult = Number(normalized);

  if (normalized && Number.isFinite(numericResult)) {
    return numericResult !== 0;
  }

  if (["true", "yes"].includes(normalized)) return true;
  if (["false", "no"].includes(normalized)) return false;

  return getNativeStateActiveState(normalized, domain);
}

export function formatTemplateState(result, hass = null, domain = "") {
  const value = String(result ?? "").trim();
  const nativeValue = getNativeTemplateState(value, hass, domain);

  if (nativeValue) return nativeValue;

  if (!value.includes("_")) {
    return value.replace(/^\p{L}/u, (letter) => letter.toLocaleUpperCase());
  }

  return value
    .replace(/_+/g, " ")
    .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase());
}

function getNativeTemplateState(value, hass, domain) {
  if (!value || !hass) return "";

  const normalizedValue = value.toLowerCase();
  const domains = domain
    ? [domain]
    : getNativeTemplateStateDomains(hass);
  const translatedValues = new Set();

  for (const nativeDomain of domains) {
    const keys = [
      `component.${nativeDomain}.entity_component._.state.${normalizedValue}`,
      `state_badge.${nativeDomain}.${normalizedValue}`,
    ];

    for (const key of keys) {
      const translated = hass.localize?.(key);

      if (translated && translated !== key) translatedValues.add(translated);
    }
  }

  if (translatedValues.size === 1) {
    return [...translatedValues][0];
  }

  if (!domain) return "";

  const formattedValue = formatEntityState(
    {
      entity_id: `${domain}.orbit_template_state`,
      state: value,
      attributes: {},
    },
    hass
  );

  return formattedValue && formattedValue !== value ? formattedValue : "";
}

function getNativeTemplateStateDomains(hass) {
  const configuredDomains = Object.keys(hass.states || {})
    .map((entityId) => entityId.split(".")[0])
    .filter(Boolean);

  return [...new Set([
    ...configuredDomains,
    ...NATIVE_TEMPLATE_STATE_DOMAINS,
  ])];
}

const NATIVE_TEMPLATE_STATE_DOMAINS = [
  "alarm_control_panel",
  "alert",
  "automation",
  "binary_sensor",
  "calendar",
  "camera",
  "climate",
  "cover",
  "device_tracker",
  "fan",
  "humidifier",
  "input_boolean",
  "lawn_mower",
  "light",
  "lock",
  "media_player",
  "person",
  "plant",
  "remote",
  "script",
  "siren",
  "sun",
  "switch",
  "timer",
  "update",
  "vacuum",
  "valve",
  "water_heater",
];

export function getColorTemplateEntries(config) {
  const templates = new Map();

  collectColorTemplates(config, templates);

  return [...templates.values()];
}

export function getIconTemplateEntries(config) {
  const templates = new Map();

  collectIconTemplates(config, templates);

  return [...templates.values()];
}

function collectColorTemplates(value, templates, key = "", entityId = "") {
  if (Array.isArray(value)) {
    value.forEach((item) =>
      collectColorTemplates(item, templates, "", entityId)
    );
    return;
  }

  if (!value || typeof value !== "object") {
    if (
      typeof value === "string" &&
      (key === "color" || key.endsWith("_color")) &&
      hasNativeTemplateSyntax(value)
    ) {
      const id = getTemplateId(value, entityId);
      templates.set(id, { template: value, entityId });
    }
    return;
  }

  const localEntityId = value.entity || value.main_entity || entityId;

  Object.entries(value).forEach(([childKey, childValue]) =>
    collectColorTemplates(childValue, templates, childKey, localEntityId)
  );
}

function collectIconTemplates(value, templates, key = "", entityId = "") {
  if (Array.isArray(value)) {
    value.forEach((item) =>
      collectIconTemplates(item, templates, "", entityId)
    );
    return;
  }

  if (!value || typeof value !== "object") {
    if (
      typeof value === "string" &&
      (/(^|_)icon$/.test(key) ||
        key === "icon_template" ||
        key.endsWith("_icon_template")) &&
      hasNativeTemplateSyntax(value)
    ) {
      const id = getTemplateId(value, entityId);
      templates.set(id, { template: value, entityId });
    }
    return;
  }

  const localEntityId = value.entity || value.main_entity || entityId;

  Object.entries(value).forEach(([childKey, childValue]) => {
    const iconPrefix = childKey.match(
      /^(.*)_icon(?:_template)?$/
    )?.[1];
    const iconEntityId = iconPrefix !== undefined
      ? value[iconPrefix] || localEntityId
      : localEntityId;

    collectIconTemplates(
      childValue,
      templates,
      childKey,
      iconEntityId
    );
  });
}

function subscribeTemplate(descriptor) {
  const subscriptions = getSubscriptionMap(this);
  const { id, template, entityId, configSignature } = descriptor;
  const record = {
    configSignature,
    template,
    entityId,
    result: null,
    error: "",
    subscription: undefined,
  };

  subscriptions.set(id, record);

  const wrappedTemplate = [
    "{% set entity = states[orbit_entity_id] if orbit_entity_id else none %}",
    TEMPLATE_RESULT_PREFIX,
    template,
    TEMPLATE_RESULT_SUFFIX,
  ].join("");

  const subscription = this.hass.connection.subscribeMessage(
    (message) => {
      if (subscriptions.get(id) !== record) return;

      if ("error" in message) {
        record.error = formatTemplateError(message.error);
        record.result = null;
      } else {
        record.error = "";
        record.result = extractTemplateResult(message.result);
      }

      this._templateRevision = (this._templateRevision || 0) + 1;
    },
    {
      type: "render_template",
      template: wrappedTemplate,
      variables: {
        config: this._config || {},
        orbit_entity_id: entityId,
      },
      strict: true,
      report_errors: true,
    }
  );

  record.subscription = subscription;
  subscription.catch((error) => {
    if (subscriptions.get(id) !== record) return;

    record.subscription = undefined;
    record.error = formatTemplateError(error);
    record.result = null;
    this._templateRevision = (this._templateRevision || 0) + 1;
  });
}

function extractTemplateResult(result) {
  const renderedResult = String(result ?? "");
  const resultStart = renderedResult.indexOf(TEMPLATE_RESULT_PREFIX);
  const resultEnd = renderedResult.lastIndexOf(TEMPLATE_RESULT_SUFFIX);

  return resultStart !== -1 && resultEnd > resultStart
    ? renderedResult.slice(
        resultStart + TEMPLATE_RESULT_PREFIX.length,
        resultEnd
      ).trim()
    : renderedResult.trim();
}

function getSubscriptionMap(host) {
  if (!host.__orbitTemplateSubscriptions) {
    host.__orbitTemplateSubscriptions = new Map();
  }

  return host.__orbitTemplateSubscriptions;
}

function getTemplateId(template, entityId) {
  return JSON.stringify([template || "", entityId || ""]);
}

function disconnectRecord(record) {
  record.subscription
    ?.then((unsubscribe) => unsubscribe())
    .catch(() => {});
}

function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch (_error) {
    return "";
  }
}

function formatTemplateError(error) {
  if (!error) return "Template rendering failed";
  if (typeof error === "string") return error;
  if (error.message) return error.message;

  try {
    return JSON.stringify(error);
  } catch (_jsonError) {
    return String(error);
  }
}
