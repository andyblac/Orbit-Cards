// ==============================
// orbit-deck-card.js
// ==============================

import { LitElement, html } from "lit";
import { registerOrbitCard } from "../common/helpers/card-registration.js";
import { CARD_VERSIONS } from "../version.js";
import { deckCardStyles } from "./deck/styles/deck-card-styles.js";

import "../editors/deck-card-editor.js";

class OrbitDeckCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _deckCards: { state: true },
      _selectedIndex: { state: true },
    };
  }

  constructor() {
    super();
    this._config = {};
    this._deckCards = [];
    this._selectedIndex = 0;
    this._cardHelpers = null;
    this._cardBuildKey = "";
  }

  static getConfigElement() {
    return document.createElement("orbit-deck-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:orbit-deck-card",
      layout: "wrap",
      decks: [],
    };
  }

  getLayoutOptions() {
    const items = getDeckItems(this._config);
    const count = Math.max(items.length, 1);
    const columns = this._getColumnCount(count);

    return {
      grid_columns: Math.max(1, columns * 2),
      grid_min_columns: 1,
      grid_rows: "auto",
    };
  }

  setConfig(config) {
    this._config = {
      ...config,
      layout: config?.layout === "tabs" ? "tabs" : "wrap",
    };

    this._selectedIndex = Math.min(
      this._selectedIndex || 0,
      Math.max(0, getDeckItems(this._config).length - 1)
    );

    this._scheduleCardBuild();
  }

  updated(changedProps) {
    if (changedProps.has("hass")) {
      this._deckCards.forEach((entry) => {
        if (entry.element) {
          entry.element.hass = this.hass;
        }
      });
    }
  }

  _getColumnCount(count) {
    if (this._config?.layout === "tabs") {
      return 1;
    }

    return Math.max(
      1,
      Math.min(count, Number(this._config?.items_per_row) || 1)
    );
  }

  async _scheduleCardBuild() {
    const decks = getDeckItems(this._config);
    const buildKey = JSON.stringify(decks.map((item) => item.card || {}));

    if (buildKey === this._cardBuildKey) {
      return;
    }

    this._cardBuildKey = buildKey;
    this._deckCards = decks.map((item) => ({ item }));

    const helpers = await this._loadCardHelpers();
    const entries = decks.map((item) => this._createDeckEntry(item, helpers));

    if (buildKey === this._cardBuildKey) {
      this._deckCards = entries;
    }
  }

  async _loadCardHelpers() {
    if (!this._cardHelpers && window.loadCardHelpers) {
      this._cardHelpers = await window.loadCardHelpers();
    }

    return this._cardHelpers;
  }

  _createDeckEntry(item, helpers) {
    const cardConfig = item?.card || {};

    if (!cardConfig.type) {
      return {
        item,
        error: "No card type configured",
      };
    }

    try {
      const element = helpers.createCardElement(cardConfig);
      element.hass = this.hass;
      element.addEventListener(
        "ll-rebuild",
        () => this._scheduleCardBuild(),
        { once: true }
      );

      return {
        item,
        element,
      };
    } catch (err) {
      return {
        item,
        error: err?.message || "Unable to create card",
      };
    }
  }

  _selectTab(index) {
    this._selectedIndex = index;
  }

  _renderDeckEntry(entry) {
    if (entry?.element) {
      return entry.element;
    }

    return html`
      <ha-card class="deck-error-card">
        <div class="deck-error-title">Configuration error</div>
        <div>${entry?.error || "No card configured"}</div>
      </ha-card>
    `;
  }

  _renderWrap(decks) {
    const columns = this._getColumnCount(decks.length || 1);
    const rows = chunkItems(this._deckCards, columns);

    return html`
      <ha-card
        class="deck-card wrap"
        style="--deck-columns:${columns};"
      >
        <div class="deck-wrap">
          ${rows.map((row) => html`
            <div class="deck-row">
              ${row.map((entry) => html`
                <div class="deck-item">
                  ${this._renderDeckEntry(entry)}
                </div>
              `)}
              ${renderRowSpacers(row.length, columns)}
            </div>
          `)}
        </div>
      </ha-card>
    `;
  }

  _renderTabs(decks) {
    const selectedIndex = Math.min(
      this._selectedIndex || 0,
      Math.max(0, decks.length - 1)
    );
    const selectedEntry = this._deckCards[selectedIndex];

    return html`
      <ha-card class="deck-card tabs">
        <div class="deck-tabs" role="tablist">
          ${decks.map((item, index) => html`
            <button
              type="button"
              class="deck-tab ${index === selectedIndex ? "active" : ""}"
              role="tab"
              aria-selected=${index === selectedIndex ? "true" : "false"}
              @click=${() => this._selectTab(index)}
            >
              ${item.attributes?.icon
                ? html`<ha-icon .icon=${item.attributes.icon}></ha-icon>`
                : ""}
              <span>${item.attributes?.name || `Card ${index + 1}`}</span>
            </button>
          `)}
        </div>
        <div class="deck-tab-content">
          ${this._renderDeckEntry(selectedEntry)}
        </div>
      </ha-card>
    `;
  }

  render() {
    const decks = getDeckItems(this._config);

    if (!decks.length) {
      return html`
        <ha-card class="deck-card empty">
          <div>Add card</div>
        </ha-card>
      `;
    }

    return this._config?.layout === "tabs"
      ? this._renderTabs(decks)
      : this._renderWrap(decks);
  }

  static styles = deckCardStyles;
}

function getDeckItems(config = {}) {
  return Array.isArray(config?.decks)
    ? config.decks.map((item) => ({
        attributes: item?.attributes || {},
        card: item?.card || {},
      }))
    : [];
}

function chunkItems(items, size = 1) {
  const chunkSize = Math.max(1, size);
  const rows = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    rows.push(items.slice(index, index + chunkSize));
  }

  return rows;
}

function renderRowSpacers(itemCount, columnCount) {
  return Array.from({ length: Math.max(0, columnCount - itemCount) }, () => html`
    <div class="deck-spacer"></div>
  `);
}

registerOrbitCard({
  tag: "orbit-deck-card",
  cardClass: OrbitDeckCard,
  name: "Orbit Deck Card",
  description: "Wrap or tab any Lovelace cards",
  version: CARD_VERSIONS.deck,
});
