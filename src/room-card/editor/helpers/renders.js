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


