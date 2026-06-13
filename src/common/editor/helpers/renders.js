import { html } from "lit";

function t(editor, key, replacements) {
  return editor._t
    ? editor._t(key, replacements)
    : key;
}

/* ==========================================
 * COLLAPSE HELPERS
 * ========================================== */

export function renderSectionHeader(title, key) {
  return html`
    <div
      class="section-header"
      @click=${(e) => {
        e.preventDefault();
        e.stopPropagation();

        this._toggleSection(key);
      }}
    >
      <span>${t(this, title)}</span>

      <span class="collapse-icon">
        ${this._collapsed[key] ? "+" : "−"}
      </span>
    </div>
  `;
}

export function renderSubSectionHeader(title, key) {
  return html`
    <div
      class="sub-section-header"
      @click=${(e) => {
        e.preventDefault();
        e.stopPropagation();

        this._toggleSection(key);
      }}
    >
      <span>${t(this, title)}</span>

      <span class="collapse-icon">
        ${this._collapsed[key] ? "+" : "−"}
      </span>
    </div>
  `;
}

export function renderColor(label, key) {
  const value = this._config?.[key] || "";

  return renderColorControl.call(
    this,
    label,
    key,
    value,
    (nextValue) => this._handleConfigUpdate(key, nextValue)
  );
}

export function renderColorControl(
  label,
  pickerKey,
  value,
  onUpdate,
  previewValue = value
) {
  const isOpen = this._colorPickerKey === pickerKey;
  const activeTab = this._colorPickerTab || "picker";
  const defaultTab = getDefaultColorTab(value);

  return html`
    <div class="field">
      <label>${t(this, label)}</label>

      <div class="color-row">
        <input
          .value=${value}
          placeholder="green / blue / light / #hex / rgb()"
          @input=${(e) =>
            onUpdate(e.target.value)}
        />

        <div
          class="color-preview"
          style=${this._getColorStyle(previewValue)}
          title=${t(this, "Choose colour")}
          @click=${(e) => {
            e.preventDefault();
            e.stopPropagation();

            this._colorPickerKey = isOpen ? "" : pickerKey;
            this._colorPickerTab = defaultTab;
          }}
        >
        </div>

        ${isOpen
          ? html`
              <div
                class="color-popover"
                @click=${(e) => e.stopPropagation()}
              >
                <div class="color-tabs">
                  <button
                    type="button"
                    class=${activeTab === "picker" ? "active" : ""}
                    @click=${() => {
                      this._colorPickerTab = "picker";
                    }}
                  >
                    ${t(this, "Picker")}
                    <input
                      class="tab-color-picker"
                      type="color"
                      .value=${this._getColorPickerValue(previewValue)}
                      @input=${(e) => onUpdate(e.target.value)}
                      @change=${(e) => onUpdate(e.target.value)}
                    />
                  </button>
                  <button
                    type="button"
                    class=${activeTab === "theme" ? "active" : ""}
                    @click=${() => {
                      this._colorPickerTab = "theme";
                    }}
                  >
                    ${t(this, "Theme")}
                  </button>
                </div>

                ${activeTab === "theme"
                  ? html`
                      <div class="theme-colors">
                        ${THEME_COLOR_OPTIONS.map(
                          (color) => html`
                            <button
                              type="button"
                              class="theme-color-option"
                              title=${color}
                              @click=${() => {
                                onUpdate(color);
                                this._colorPickerKey = "";
                              }}
                            >
                              <span
                                class="theme-color-swatch"
                                style=${this._getColorStyle(color)}
                              ></span>
                              <span>${color}</span>
                            </button>
                          `
                        )}
                      </div>
                    `
                  : html`
                      <input
                        class="native-color-picker"
                        type="color"
                        .value=${this._getColorPickerValue(previewValue)}
                        @input=${(e) => onUpdate(e.target.value)}
                        @change=${(e) => onUpdate(e.target.value)}
                      />
                    `}
              </div>
            `
          : ""}
      </div>
    </div>
  `;
}

const THEME_COLOR_OPTIONS = [
  "theme",
  "red",
  "green",
  "yellow",
  "amber",
  "blue",
  "purple",
  "violet",
  "grey",
  "orange",
  "gold",
  "brown",
  "primary-color",
  "accent-color",
  "state-icon-color",
  "state-light-active-color",
  "google-red",
  "google-green",
  "google-yellow",
  "google-blue",
  "google-violet",
  "google-grey",
  "color-red",
  "color-green",
  "color-yellow",
  "color-amber",
  "color-blue",
  "color-purple",
  "color-violet",
  "color-grey",
  "color-darkgrey",
  "color-pink",
  "color-orange",
  "color-gold",
  "color-brown",
];

function getDefaultColorTab(value) {
  const color = value?.toString().trim();

  if (!color) return "theme";

  return (
    color.startsWith("#") ||
    color.startsWith("rgb") ||
    color.startsWith("hsl")
  )
    ? "picker"
    : "theme";
}


export function renderStatusSection() {
  return html`
    <div class="section">
      ${this._renderSectionHeader("Status Sensors", "status")}
      ${!this._collapsed.status
        ? html`
            ${this._renderEntity("Status 1", "status1")}
            ${this._renderEntity("Status 2", "status2")}
            ${this._renderEntity("Status 3", "status3")}
          `
        : ""}
    </div>
  `;
}


export function renderActionSelector(label, key, defaultAction) {
  const raw = this._config?.[key];
  const defaultValue =
    typeof defaultAction === "object"
      ? defaultAction
      : { action: defaultAction || "none" };

  const value =
    raw && typeof raw === "object"
      ? normalizeActionValue(raw, defaultValue)
      : defaultValue;

  return html`
    <div class="field">
      <label>${t(this, label)}</label>

      <select
        .value=${value.action || defaultValue.action}
        @change=${(e) =>
          this._updateConfig({
            [key]: getActionDefaults(
              e.target.value,
              value
            ),
          })}
      >
        <option value="toggle">${t(this, "toggle")}</option>
        <option value="more-info">${t(this, "more-info")}</option>
        <option value="navigate">${t(this, "navigate")}</option>
        <option value="call-service">${t(this, "call-service")}</option>
        <option value="popup">${t(this, "popup")}</option>
        <option value="none">${t(this, "none")}</option>
      </select>

      ${value.action === "navigate"
        ? html`
            <div class="inline-field">
              <span class="inline-label">${t(this, "path")}</span>

              <input
                .value=${value.navigation_path || ""}
                placeholder="/lovelace/home"
                @input=${(e) =>
                  this._updateConfig({
                    [key]: cleanActionConfig({
                      ...value,
                      navigation_path: e.target.value,
                    }),
                  })}
              />
            </div>
          `
        : ""}

      ${value.action === "call-service"
        ? html`

            <!-- SERVICE -->
            <div class="inline-field">
              <span class="inline-label">${t(this, "service")}</span>

              <input
                .value=${value.service || ""}
                placeholder="button.press"
                @input=${(e) =>
                  this._updateConfig({
                    [key]: cleanActionConfig({
                      ...value,
                      service: e.target.value,
                    }),
                  })}
              />
            </div>

            <!-- ENTITY ID -->
            <div class="inline-field">
              <span class="inline-label">${t(this, "entity_id")}</span>

              <input
                .value=${value.service_data?.entity_id || ""}
                placeholder="button.hot_water_low"
                @input=${(e) =>
                  this._updateConfig({
                    [key]: cleanActionConfig({
                      ...value,
                      service_data: {
                        ...(value.service_data || {}),
                        entity_id: e.target.value,
                      },
                    }),
                  })}
              />
            </div>

          `
        : ""}

      ${value.action === "popup"
        ? html`
            <div class="inline-field">
              <span class="inline-label">${t(this, "title")}</span>

              <input
                .value=${value.popup_title || ""}
                placeholder="Security"
                @input=${(e) =>
                  this._updateConfig({
                    [key]: cleanActionConfig({
                      ...value,
                      popup_title: e.target.value,
                    }),
                  })}
              />
            </div>

            <div class="inline-field">
              <span class="inline-label">${t(this, "content")}</span>

              <input
                .value=${typeof value.popup_content === "string"
                  ? value.popup_content
                  : value.popup_content
                    ? JSON.stringify(value.popup_content)
                    : ""}
                placeholder=""
                @input=${(e) =>
                  this._updateConfig({
                    [key]: cleanActionConfig({
                      ...value,
                      popup_content: e.target.value,
                    }),
                  })}
              />
            </div>
          `
        : ""}
    </div>
  `;
}

function getActionDefaults(action, currentValue) {
  const value = cleanActionConfig({
    ...currentValue,
    action,
  });

  if (action !== "popup") return value;

  return cleanActionConfig({
    ...value,
    popup_title: value.popup_title || t(this, "Security"),
    popup_content: value.popup_content || {
        type: "vertical-stack",
        cards: [
          {
            type: "tile",
            entity: "alarm_control_panel.house_alarm",
            vertical: true,
          },
        ],
      },
    style: value.style ||
      "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;",
  });
}

function normalizeActionValue(value, defaultValue) {
  return cleanActionConfig({
    ...defaultValue,
    ...value,
    action: value.action || defaultValue.action || "none",
  });
}

function cleanActionConfig(value) {
  const action = value?.action || "none";
  const config = { action };

  if (action === "navigate") {
    config.navigation_path = value.navigation_path || "";
    return config;
  }

  if (action === "call-service") {
    config.service = value.service || "";

    if (value.service_data) {
      config.service_data = { ...value.service_data };
    }

    return config;
  }

  if (action === "popup") {
    config.popup_title = value.popup_title || "";
    config.popup_content = value.popup_content || "";

    if (value.style) {
      config.style = value.style;
    }

    if (value.card_mod) {
      config.card_mod = value.card_mod;
    }

    return config;
  }

  return config;
}

export function renderEntity(label, key) {
  return html`
    <div class="field">
      <label>${t(this, label)}</label>

      <div class="entity-row">
        <ha-selector
          class="entity-picker"
          .hass=${this.hass}
          .selector=${{ entity: {} }}
          .value=${this._config?.[key] || ""}
          @value-changed=${(e) =>
            this._handleEntityUpdate
              ? this._handleEntityUpdate(key, e.detail.value || "")
              : this._handleConfigUpdate(key, e.detail.value || "")}
        ></ha-selector>

        ${this._config?.[key]
          ? html`
              <button
                type="button"
                class="clear-button"
                @click=${() =>
                  this._handleEntityUpdate
                    ? this._handleEntityUpdate(key, "")
                    : this._updateConfig({
                        [key]: "",
                      })}
              >
                ✕
              </button>
            `
          : ""}
      </div>
    </div>
  `;
}

export function renderArea(label, key) {
  return html`
    <div class="field">
      <label>${t(this, label)}</label>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ area: {} }}
        .value=${this._config?.[key] || ""}
        @value-changed=${(e) =>
          this._updateConfig({
            [key]: e.detail.value,
          })}
      ></ha-selector>
    </div>
  `;
}
