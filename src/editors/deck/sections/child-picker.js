import { html } from "lit";

export function renderChildTypeTabs() {
  const selectedType = this._childPickerType;

  return html`
    <div class="editor-tabs deck-child-type-tabs" role="tablist">
      ${[
        ["badge", "Badges"],
        ["card", "Cards"],
      ].map(([type, label]) => html`
        <button
          type="button"
          class="editor-tab ${selectedType === type ? "active" : ""}"
          role="tab"
          aria-selected=${selectedType === type ? "true" : "false"}
          @click=${() => {
            this._childPickerType = type;
          }}
        >
          ${this._t(label)}
        </button>
      `)}
    </div>
  `;
}

export function renderChildPicker(index, item) {
  return this._childPickerType === "badge"
    ? this._renderBadgePicker(index, item)
    : this._renderCardPicker(index, item);
}

export function renderBadgePicker(index, item) {
  if (item?.badge?.type) {
    if (!customElements.get("hui-badge-element-editor")) {
      this._ensureNativeBadgeEditor();
      return html`
        <div class="deck-card-picker-loading">
          <ha-spinner></ha-spinner>
        </div>
      `;
    }

    return html`
      <hui-badge-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${item.badge}
        @config-changed=${(ev) => {
          ev.stopPropagation();
          this._updateDeckBadge(index, ev.detail.config);
        }}
      ></hui-badge-element-editor>
    `;
  }

  if (!this.hass || !this.lovelace) {
    return html``;
  }

  if (!customElements.get("hui-badge-picker")) {
    this._ensureNativeBadgePicker();
    return html`
      <div class="deck-card-picker-loading">
        <ha-spinner></ha-spinner>
      </div>
    `;
  }

  return html`
    <hui-badge-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .badgePicked=${(badge) => this._updateDeckBadge(index, badge)}
      @config-changed=${(ev) => {
        ev.stopPropagation();
        this._updateDeckBadge(index, ev.detail.config);
      }}
    ></hui-badge-picker>
  `;
}

export function renderCardPicker(index, item) {
  if (item?.card?.type) {
    return html`
      <hui-card-element-editor
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${item.card}
        .showVisibilityTab=${["wrap", "tabs"].includes(
          this._config?.layout || "wrap"
        )}
        @config-changed=${(ev) => {
          ev.stopPropagation();
          this._updateDeckCard(index, ev.detail.config);
        }}
      ></hui-card-element-editor>
    `;
  }

  if (!this.hass || !this.lovelace) {
    return html``;
  }

  if (!customElements.get("hui-card-picker")) {
    this._ensureNativeCardPicker();
    return html`
      <hui-card-element-editor
        class="native-picker-preloader"
        .hass=${this.hass}
        .lovelace=${this.lovelace}
        .value=${{ type: "vertical-stack", cards: [] }}
        @config-changed=${(ev) => ev.stopPropagation()}
      ></hui-card-element-editor>
      <div class="deck-card-picker-loading">
        <ha-spinner></ha-spinner>
      </div>
    `;
  }

  return html`
    <hui-card-picker
      .hass=${this.hass}
      .lovelace=${this.lovelace}
      .cardPicked=${(card) => this._updateDeckCard(index, card)}
      @config-changed=${(ev) => {
        ev.stopPropagation();
        this._updateDeckCard(index, ev.detail.config);
      }}
    ></hui-card-picker>
  `;
}
