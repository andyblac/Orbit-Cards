// ==============================
// orbit-deck-card.js
// ==============================

import { LitElement, html } from "lit";
import { registerOrbitCard } from "../common/helpers/card-registration.js";
import { CARD_VERSIONS } from "../version.js";
import { computeFullColor } from "../common/helpers/colors.js";
import { deckCardStyles } from "./deck/styles/deck-card-styles.js";
import { DECK_PREVIEW_SELECTED_INDEX } from "../editors/deck-card-editor.js";

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
    this._defaultSelectionKey = "";
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

    const decks = getDeckItems(this._config);
    const defaultSelectionKey = getDefaultSelectionKey(decks);
    const defaultIndex = getDefaultDeckIndex(decks);

    if (Number.isInteger(config?.[DECK_PREVIEW_SELECTED_INDEX])) {
      this._selectedIndex = Math.min(
        Math.max(0, config[DECK_PREVIEW_SELECTED_INDEX]),
        Math.max(0, decks.length - 1)
      );
    } else if (defaultSelectionKey !== this._defaultSelectionKey) {
      this._selectedIndex = defaultIndex;
      this._defaultSelectionKey = defaultSelectionKey;
    } else {
      this._selectedIndex = Math.min(
        this._selectedIndex || 0,
        Math.max(0, decks.length - 1)
      );
    }

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

    this._applyDeckPaddingToEntries();
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
      this._deckCards = this._deckCards.map((entry, index) => ({
        ...entry,
        item: decks[index],
      }));
      this._applyDeckPaddingToEntries();
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

  _applyDeckPaddingToEntries() {
    this._deckCards.forEach((entry) => this._applyDeckCardPadding(entry));
  }

  _applyDeckCardPadding(entry) {
    const element = entry?.element;

    if (!element) return;

    const padding = getDeckItemPadding(entry.item);
    const waitForRender =
      element.updateComplete instanceof Promise
        ? element.updateComplete
        : Promise.resolve();

    waitForRender
      .then(() => new Promise((resolve) => requestAnimationFrame(resolve)))
      .then(() => {
        const cardElement = getCardElement(element);

        if (!cardElement) return;

        setPaddingStyle(cardElement, "paddingTop", padding.top);
        setPaddingStyle(cardElement, "paddingRight", padding.right);
        setPaddingStyle(cardElement, "paddingBottom", padding.bottom);
        setPaddingStyle(cardElement, "paddingLeft", padding.left);
      })
      .catch(() => {});
  }

  _renderWrap(decks) {
    const columns = this._getColumnCount(decks.length || 1);
    const rows = chunkItems(this._deckCards, columns);

    return html`
      <ha-card
        class="deck-card wrap ${decks.length > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
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
    const tabWidthMode = getTabWidthMode(this._config);
    const tabStyles = getTabStyleVariables(this._config);

    return html`
      <ha-card
        class="deck-card tabs tab-width-${tabWidthMode}"
        style=${tabStyles}
      >
        <div class="deck-tabs" role="tablist">
          ${decks.map((item, index) => html`
            <button
              type="button"
              class="deck-tab ${index === selectedIndex ? "active" : ""}"
              role="tab"
              aria-selected=${index === selectedIndex ? "true" : "false"}
              style=${tabWidthMode === "user"
                ? `--orbit-deck-tab-width:${item.attributes?.width || "120px"};`
                : ""}
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

function getDefaultDeckIndex(decks = []) {
  return Math.max(
    0,
    decks.findIndex((item) => item.attributes?.default)
  );
}

function getDefaultSelectionKey(decks = []) {
  return decks
    .map((item, index) => item.attributes?.default ? index : "")
    .join(":");
}

function getTabWidthMode(config = {}) {
  return ["equal", "dynamic", "user"].includes(config?.tab_width_mode)
    ? config.tab_width_mode
    : "dynamic";
}

function getTabStyleVariables(config = {}) {
  return [
    config.tab_font_size
      ? `--orbit-deck-tab-font-size:${config.tab_font_size};`
      : "",
    colorVariable("--orbit-deck-tab-color", config.tab_color),
    colorVariable("--orbit-deck-tab-active-color", config.tab_active_color),
    colorVariable("--orbit-deck-tab-background-color", config.tab_background_color),
  ].filter(Boolean).join("");
}

function colorVariable(name, color) {
  return color
    ? `${name}:${computeFullColor(color)};`
    : "";
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

function getDeckItemPadding(item = {}) {
  const attributes = item?.attributes || {};

  return {
    top: normalizePaddingValue(attributes.padding_top),
    right: normalizePaddingValue(attributes.padding_right),
    bottom: normalizePaddingValue(attributes.padding_bottom),
    left: normalizePaddingValue(attributes.padding_left),
  };
}

function normalizePaddingValue(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const text = value.toString().trim();

  if (!text) return "";
  if (/^-?\d+(\.\d+)?$/.test(text)) return `${text}px`;

  return text;
}

function getCardElement(element) {
  if (element.localName === "ha-card") return element;

  return element.shadowRoot?.querySelector("ha-card");
}

function setPaddingStyle(element, property, value) {
  if (value) {
    element.style[property] = value;
    return;
  }

  element.style[property] = "";
}

registerOrbitCard({
  tag: "orbit-deck-card",
  cardClass: OrbitDeckCard,
  name: "Orbit Deck Card",
  description: "Wrap or tab any Lovelace cards",
  version: CARD_VERSIONS.deck,
});
