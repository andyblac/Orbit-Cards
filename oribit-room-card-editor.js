// ==========================================
// Orbit Room Card Editor (FULL VERSION)
// COLLAPSIBLE SECTIONS
// ==========================================

import { LitElement, html, css } from "https://unpkg.com/lit@2/index.js?module";

class OrbitRoomCardEditor extends LitElement {

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _collapsed: { state: true },
  };

  constructor() {
    super();
    this._config = this._config || {};
    this._collapsed = {
      room: false,
      status: true,
      buttons: true,
      curve: true,

      button1: true,
      button2: true,
      button3: true,
      button4: true,

      curve1: true,
      curve2: true,
      curve3: true,
      curve4: true,
      curve5: true,
      curve6: true,
    };
  }

  setConfig(config) {
    this._config = config || {};
  }

  // updated(changedProps) {
  //   if (changedProps.has("hass")) {
  //   }
  // }

  _updateConfig(changes) {
    this._config = {
      ...(this._config || {}),
      ...changes,
    };

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: {
        config: this._config,
      },
      bubbles: true,
      composed: true,
    }));
  }

  // =========================
  // COLLAPSE
  // =========================

  _toggleSection(section) {
    this._collapsed = {
      ...this._collapsed,
      [section]: !this._collapsed?.[section],
    };
    this.requestUpdate("_collapsed");
  }

  _renderSectionHeader(title, key) {
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

  _renderSubSectionHeader(title, key) {
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
  // =========================
  // INPUTS
  // =========================

  _handleInput(key, e) {
    this._updateConfig({
      [key]: e.target.value,
    });
  }

  _handleConfigUpdate(key, value) {
    this._updateConfig({
      [key]: value,
    });
  }

  _renderInput(label, key, placeholder = "") {
    return html`
      <div class="field">
        <label>${label}</label>

        <input
          .value=${this._config?.[key] || ""}
          placeholder=${placeholder}
          @input=${(e) => this._handleInput(key, e)}
        />
      </div>
    `;
  }

  _renderEntity(label, key) {
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

  _renderArea(label, key) {
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

  _renderColor(label, key) {
    const value = this._config?.[key] || "";

    return html`
      <div class="field">
        <label>${label}</label>

        <div class="color-row">
          <input
            .value=${value}
            placeholder="green / blue / theme / light / #hex / rgb()"
            @input=${(e) =>
              this._handleConfigUpdate(key, e.target.value)}
          />

          <div
            class="color-preview"
            style=${this._getColorStyle(value)}
          ></div>
        </div>
      </div>
    `;
  }

  _renderIconInput(
    label,
    key,
    placeholder = "mdi:lightbulb or icon.svg"
  ) {
    const value = this._config?.[key] || "";

    return html`
      <div class="field">
        <label>${label}</label>

        <div class="icon-input-row">

          <input
            .value=${value}
            placeholder=${placeholder}
            @input=${(e) =>
              this._handleConfigUpdate(
                key,
                e.target.value
              )}
          />

          <div class="icon-preview">

            ${value
              ? this._isImageIcon(value)
                ? html`
                    <img
                      src="${this._resolveIconPath(value)}"
                      class="preview-image"
                    />
                  `
                : html`
                    <ha-icon
                      .icon=${value}
                    ></ha-icon>
                  `
              : html`
                  <ha-icon
                    icon="mdi:image-outline"
                  ></ha-icon>
                `}
          </div>

        </div>
      </div>
    `;
  }

  _renderTemplateInput(label, key) {
    return html`
      <div class="field">
        <label>${label}</label>

        <input
          .value=${this._config?.[key] || ""}
          placeholder="states[entity.entity_id].attributes.percentage > 50"
          @input=${(e) =>
            this._handleConfigUpdate(
              key,
              e.target.value
            )}
        />
      </div>
    `;
  }
  
  // =========================
  // ICON HELPERS
  // =========================

  _isImageIcon(icon) {
    if (!icon) return false;

    return (
      icon.endsWith(".svg") ||
      icon.endsWith(".png") ||
      icon.endsWith(".gif") ||
      icon.endsWith(".webp")
    );
  }

  _resolveIconPath(iconPath) {
    if (!iconPath) return "";

    if (
      iconPath.startsWith("/") ||
      iconPath.startsWith("http")
    ) {
      return iconPath;
    }

    return `/local/icons/${iconPath}`;
  }

  _renderActionSelector(label, key, defaultAction = "toggle") {
    const raw = this._config?.[key];

    const value =
      raw && typeof raw === "object"
        ? raw
        : { action: defaultAction };

    return html`
      <div class="field">
        <label>${label}</label>

        <select
          .value=${value.action || defaultAction}
          @change=${(e) =>
            this._updateConfig({
              [key]: {
                ...value,
                action: e.target.value,
              },
            })}
        >
          <option value="toggle">toggle</option>
          <option value="more-info">more-info</option>
          <option value="call-service">call-service</option>
          <option value="none">none</option>
        </select>

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
      </div>
    `;
  }

  _getColorStyle(value) {
    if (!value) {
      return "background-color: rgb(var(--color-theme));";
    }

    const v = value.toString().trim().toLowerCase();

    if (
      v.startsWith("#") ||
      v.startsWith("rgb(") ||
      v.startsWith("hsl(")
    ) {
      return `background-color:${v};`;
    }

    const cleaned = v.replace(/[^a-z0-9-_]/g, "");
    if (!cleaned) return "background-color: rgb(var(--color-theme));";
    return `background-color: rgb(var(--color-${cleaned}));`;
  }

  // =========================
  // RENDER
  // =========================

  _renderRoomSection() {
    return html`
      <div class="section">
        ${this._renderSectionHeader("Room", "room")}

        ${this._collapsed.room
          ? ""
          : html`

              <!-- ROOM SETTINGS -->
              ${this._renderInput("Room Name", "room_name")}

              <!-- ROOM / CARD NAVIGATION -->
              <div class="field">
                <label>Room Navigation Path</label>

                <input
                  .value=${this._config?.navigate?.navigation_path || ""}
                  placeholder="/lovelace/home"
                  @input=${(e) => {
                    this._updateConfig({
                      navigate: {
                        navigation_path: e.target.value,
                      },
                    });
                  }}
                />
              </div>

              ${this._renderArea("Area", "area")}
              ${this._renderColor("Room Color", "room_color")}
              ${this._renderColor("Status Color", "status_color")}

              <!-- MAIN ENTITY -->
              ${this._renderEntity("Main Entity", "main_entity")}
              ${this._renderIconInput(
                "Main Icon",
                "main_icon"
              )}

              ${this._renderIconInput(
                "Main ON Icon",
                "main_icon_on"
              )}

              ${this._renderIconInput(
                "Main OFF Icon",
                "main_icon_off"
              )}

              ${this._config?.main_entity
                ? html`
                    ${this._renderActionSelector(
                      "Main Entity Action",
                      "tap_action",
                      "more-info"
                    )}
                  `
                : ""}

            `}
      </div>
    `;
  }

  _renderStatusSection() {
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

  _renderButtonsSection() {
    return html`
      <div class="section">
        ${this._renderSectionHeader("Buttons", "buttons")}

        ${!this._collapsed.buttons
          ? html`

              ${[1, 2, 3, 4].map(
                (i) => html`
                  <div class="sub-section">

                    ${this._renderSubSectionHeader(
                      `Button ${i}`,
                      `button${i}`
                    )}

                    ${!this._collapsed[`button${i}`]
                      ? html`

                          ${this._renderEntity(
                            `Entity`,
                            `button${i}`
                          )}

                          ${this._renderColor(
                            `ON Color`,
                            `button${i}_on_color`
                          )}

                          ${this._renderColor(
                            `OFF Color`,
                            `button${i}_off_color`
                          )}

                          ${this._renderIconInput(
                            `Icon`,
                            `button${i}_icon`
                          )}

                          ${this._renderIconInput(
                            `ON Icon`,
                            `button${i}_icon_on`
                          )}

                          ${this._renderIconInput(
                            `OFF Icon`,
                            `button${i}_icon_off`
                          )}

                          ${this._renderTemplateInput(
                            `State Template`,
                            `button${i}_state_template`
                          )}

                          ${this._renderActionSelector(
                            `Tap Action`,
                            `button${i}_tap_action`
                          )}

                        `
                      : ""}

                  </div>
                `
              )}

            `
          : ""}
      </div>
    `;
  }

  _renderCurveSection() {
    return html`
      <div class="section">
        ${this._renderSectionHeader("Curve Buttons", "curve")}

        ${!this._collapsed.curve
          ? html`

              <!-- GLOBAL POSITION LOCK -->
              <div class="field">
                <label>Lock Curve Button Positions</label>

                <select
                  .value=${this._config?.curve_buttons_lock_position
                    ? "true"
                    : "false"}
                  @change=${(e) =>
                    this._updateConfig({
                      curve_buttons_lock_position:
                        e.target.value === "true",
                    })}
                >
                  <option value="false">Disabled</option>
                  <option value="true">Enabled</option>
                </select>
              </div>

              </div>

              <div class="curve-divider"></div>

              ${[1, 2, 3, 4, 5, 6].map(
                (i) => html`
                  <div class="sub-section">

                    ${this._renderSubSectionHeader(
                      `Curve Button ${i}`,
                      `curve${i}`
                    )}

                    ${!this._collapsed[`curve${i}`]
                      ? html`

                          ${this._renderEntity(
                            `Entity`,
                            `curve_button${i}`
                          )}

                          ${this._renderIconInput(
                            `Icon`,
                            `curve_button${i}_icon`
                          )}

                          ${this._renderIconInput(
                            `ON Icon`,
                            `curve_button${i}_icon_on`
                          )}

                          ${this._renderIconInput(
                            `OFF Icon`,
                            `curve_button${i}_icon_off`
                          )}

                          ${this._renderTemplateInput(
                            `State Template`,
                            `curve_button${i}_state_template`
                          )}

                          ${this._renderActionSelector(
                            `Tap Action`,
                            `curve_button${i}_tap_action`,
                            "more-info"
                          )}

                        `
                      : ""}

                  </div>
                `
              )}
            `
          : ""}
      </div>
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        ${this._renderRoomSection()}
        ${this._renderStatusSection()}
        ${this._renderButtonsSection()}
        ${this._renderCurveSection()}
      </div>
    `;
  }

  // =========================
  // STYLES
  // =========================

  static styles = css`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 14px;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 12px;

      padding: 14px;

      border-radius: 14px;

      background: var(--secondary-background-color);
    }

    .sub-section {
      display: flex;
      flex-direction: column;
      gap: 8px;

      padding-bottom: 12px;
      margin-bottom: 12px;

      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .sub-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }

    .curve-divider {
      height: 1px;

      margin: 4px 0 6px 0;

      background: rgba(255, 255, 255, 0.08);
    }

    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      cursor: pointer;

      user-select: none;

      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;

      opacity: 0.75;

      transition: opacity 0.2s ease;
    }

    .section-header:hover {
      opacity: 1;
    }

    .sub-section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      cursor: pointer;

      user-select: none;

      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;

      opacity: 0.72;

      padding-bottom: 6px;

      transition: opacity 0.2s ease;
    }

    .sub-section-header:hover {
      opacity: 1;
    }

    .collapse-icon {
      font-size: 18px;
      line-height: 1;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    label {
      font-size: 12px;
      opacity: 0.7;
    }

    input,
    select {
      width: 100%;

      padding: 10px 12px;

      border: none;
      border-radius: 10px;

      background: var(--card-background-color);
      color: inherit;

      outline: none;
      box-sizing: border-box;
    }

    .entity-row {
      display: flex;
      align-items: stretch;
      gap: 8px;
      width: 100%;
    }

    .entity-picker {
      flex: 1;
      min-width: 0;
    }

    .entity-picker::part(root),
    .entity-picker * {
      box-sizing: border-box;
    }

    .entity-selector {
      flex: 1;
      min-width: 0;
    }

    .entity-selector ha-selector {
      width: 100%;
      display: block;
    }

    .clear-button {
      flex: 0 0 42px;

      width: 42px;
      min-width: 42px;
      height: auto;

      border: none;
      border-radius: 10px;

      background: var(--card-background-color);
      color: inherit;

      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 18px;
      line-height: 1;

      transition: background 0.2s ease;
    }

    .clear-button:hover {
      background: rgba(255, 255, 255, 0.14);
    }

    .color-row {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .color-row input {
      flex: 1;
    }

    .color-preview {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.15);
    }

    .icon-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .icon-input-row input {
      flex: 1;
    }

    .icon-preview {
      width: 42px;
      height: 42px;

      min-width: 42px;

      border-radius: 10px;

      background: #000; /* FORCE black background */

      display: flex;
      align-items: center;
      justify-content: center;

      overflow: hidden;
    }

    /* Force SVG/IMG icons to appear white */
    .icon-preview img {
      width: 24px;
      height: 24px;
      object-fit: contain;

      filter: brightness(0) invert(1);
    }

    .icon-preview ha-icon {
      --mdc-icon-size: 24px;
    }

    .inline-field {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .inline-label {
      width: 80px;
      min-width: 80px;

      font-size: 12px;
      opacity: 0.7;

      text-transform: lowercase;
    }

    .inline-field input {
      flex: 1;
    }

    .preview-image {
      width: 24px;
      height: 24px;

      object-fit: contain;
    }

    .preview-image {
      width: 24px;
      height: 24px;

      object-fit: contain;
    }
  `;
}

customElements.define(
  "orbit-room-card-editor",
  OrbitRoomCardEditor
);