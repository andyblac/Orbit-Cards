import { html } from "lit";

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
      <span>${title}</span>

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
      <span>${title}</span>

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

export function renderColorControl(label, pickerKey, value, onUpdate) {
  const isOpen = this._colorPickerKey === pickerKey;
  const activeTab = this._colorPickerTab || "picker";
  const defaultTab = getDefaultColorTab(value);

  return html`
    <div class="field">
      <label>${label}</label>

      <div class="color-row">
        <input
          .value=${value}
          placeholder="green / blue / theme / light / #hex / rgb()"
          @input=${(e) =>
            onUpdate(e.target.value)}
        />

        <div
          class="color-preview"
          style=${this._getColorStyle(value)}
          title="Choose colour"
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
                    Picker
                    <input
                      class="tab-color-picker"
                      type="color"
                      .value=${this._getColorPickerValue(value)}
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
                    Theme
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
                        .value=${this._getColorPickerValue(value)}
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

  if (!color) return "picker";

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
      : { action: defaultAction };

  const value =
    raw && typeof raw === "object"
      ? raw
      : defaultValue;

  return html`
    <div class="field">
      <label>${label}</label>

      <select
        .value=${value.action || defaultValue.action}
        @change=${(e) =>
          this._updateConfig({
            [key]: {
              ...getActionDefaults(
                e.target.value,
                value
              ),
            },
          })}
      >
        <option value="toggle">toggle</option>
        <option value="more-info">more-info</option>
        <option value="navigate">navigate</option>
        <option value="call-service">call-service</option>
        <option value="popup">popup</option>
        <option value="none">none</option>
      </select>

      ${value.action === "navigate"
        ? html`
            <div class="inline-field">
              <span class="inline-label">path</span>

              <input
                .value=${value.navigation_path || ""}
                placeholder="/lovelace/home"
                @input=${(e) =>
                  this._updateConfig({
                    [key]: {
                      ...value,
                      navigation_path: e.target.value,
                    },
                  })}
              />
            </div>
          `
        : ""}

      ${value.action === "call-service"
        ? html`

            <!-- SERVICE -->
            <div class="inline-field">
              <span class="inline-label">service</span>

              <input
                .value=${value.service || ""}
                placeholder="button.press"
                @input=${(e) =>
                  this._updateConfig({
                    [key]: {
                      ...value,
                      service: e.target.value,
                    },
                  })}
              />
            </div>

            <!-- ENTITY ID -->
            <div class="inline-field">
              <span class="inline-label">entity_id</span>

              <input
                .value=${value.service_data?.entity_id || ""}
                placeholder="button.hot_water_low"
                @input=${(e) =>
                  this._updateConfig({
                    [key]: {
                      ...value,
                      service_data: {
                        ...(value.service_data || {}),
                        entity_id: e.target.value,
                      },
                    },
                  })}
              />
            </div>

          `
        : ""}

      ${value.action === "popup"
        ? html`
            <div class="inline-field">
              <span class="inline-label">title</span>

              <input
                .value=${value.popup_title || ""}
                placeholder="Security"
                @input=${(e) =>
                  this._updateConfig({
                    [key]: {
                      ...value,
                      popup_title: e.target.value,
                    },
                  })}
              />
            </div>

            <div class="inline-field">
              <span class="inline-label">content</span>

              <input
                .value=${typeof value.popup_content === "string"
                  ? value.popup_content
                  : value.popup_content
                    ? JSON.stringify(value.popup_content)
                    : ""}
                placeholder=""
                @input=${(e) =>
                  this._updateConfig({
                    [key]: {
                      ...value,
                      popup_content: e.target.value,
                    },
                  })}
              />
            </div>
          `
        : ""}
    </div>
  `;
}

function getActionDefaults(action, currentValue) {
  const value = {
    ...currentValue,
    action,
  };

  if (action !== "popup") return value;

  return {
    ...value,
    popup_title:
      value.popup_title ||
      "Security",
    popup_content:
      value.popup_content ||
      {
        type: "vertical-stack",
        cards: [
          {
            type: "tile",
            entity: "alarm_control_panel.house_alarm",
            vertical: true,
          },
        ],
      },
    style:
      value.style ||
      "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;",
  };
}

export function renderEntity(label, key) {
  return html`
    <div class="field">
      <label>${label}</label>

      <div class="entity-row">
        <ha-selector
          class="entity-picker"
          .hass=${this.hass}
          .selector=${{ entity: {} }}
          .value=${this._config?.[key] || ""}
          @value-changed=${(e) =>
            this._handleConfigUpdate(key, e.detail.value || "")}
        ></ha-selector>

        ${this._config?.[key]
          ? html`
              <button
                type="button"
                class="clear-button"
                @click=${() =>
                  this._updateConfig({
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
      <label>${label}</label>

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
