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
  const record = this.__orbitTemplateSubscriptions?.get(
    getTemplateId(normalizedTemplate, entityId)
  );

  return record?.result ?? null;
}

export function getTemplateResultActiveState(result) {
  const normalized = String(result ?? "").trim().toLowerCase();

  if (
    !normalized ||
    [
      "false",
      "off",
      "no",
      "none",
      "null",
      "unknown",
      "unavailable",
    ].includes(normalized)
  ) {
    return false;
  }

  const numericResult = Number(normalized);

  return Number.isFinite(numericResult)
    ? numericResult !== 0
    : true;
}

function subscribeTemplate(descriptor) {
  const subscriptions = getSubscriptionMap(this);
  const { id, template, entityId, configSignature } = descriptor;
  const record = {
    configSignature,
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
        record.error = message.error || "Template rendering failed";
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
    record.error = error?.message || String(error);
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
