import { html } from "lit";

function t(editor, key) {
  if (Array.isArray(key)) {
    return formatComposedLabel(
      editor,
      key.map((part) => t(editor, part))
    );
  }

  return editor._t
    ? editor._t(key)
    : key;
}

function formatComposedLabel(editor, parts) {
  const language =
    editor?.hass?.locale?.language ||
    editor?.hass?.language ||
    "en";

  if (!language.toLowerCase().startsWith("en")) {
    return parts.join(" ");
  }

  return parts
    .map((part, index) =>
      index === 0 ? part : lowercaseFirstLetter(part))
    .join(" ");
}

function lowercaseFirstLetter(value = "") {
  return value.replace(/^(\p{L})/u, (letter) =>
    letter.toLocaleLowerCase()
  );
}

/* ==========================================
 * COLLAPSE HELPERS
 * ========================================== */

export function renderInput(label, key, placeholder, options = {}) {
    const externalLabel = options.externalLabel === true;
    const value = options.value ?? this._config?.[key] ?? "";
    const handleValueChanged = options.onValueChanged ||
      ((nextValue) =>
        this._handleConfigUpdate(
          key,
          nextValue
        ));

    return html`
      <div class="field">
        ${externalLabel ? html`<label>${t(this, label)}</label>` : ""}

        <ha-selector
          .hass=${this.hass}
          .label=${externalLabel ? "" : t(this, label)}
          .selector=${{
            text: {},
          }}
          .value=${value}
          .placeholder=${placeholder}
          @value-changed=${(e) =>
            handleValueChanged(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
  }

export function renderTemplateInput(label, key, options = {}) {
    const value = options.value ?? this._config?.[key] ?? "";
    const helper =
      options.helper ??
      "states[entity.entity_id].attributes.percentage > 50";
    const handleValueChanged = options.onValueChanged ||
      ((nextValue) =>
        this._handleConfigUpdate(
          key,
          nextValue
        ));

    return html`
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .label=${t(this, label)}
          .selector=${{
            text: {},
          }}
          .value=${value}
          .placeholder=${helper}
          @value-changed=${(e) =>
            handleValueChanged(e.detail.value || "")}
        ></ha-selector>
      </div>
    `;
  }

export function renderNumberInput(label, key, options = {}) {
  const value = options.value ?? this._config?.[key] ?? "";
  const min = options.min ?? 0;
  const step = options.step ?? 1;
  const handleValueChanged = options.onValueChanged ||
    ((nextValue) =>
      this._handleConfigUpdate(
        key,
        nextValue
      ));

  return html`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${t(this, label)}
        .selector=${{
          number: {
            min,
            step,
            mode: "box",
          },
        }}
        .value=${value}
        @value-changed=${(e) =>
          handleValueChanged(e.detail.value)}
      ></ha-selector>
    </div>
  `;
}
  
