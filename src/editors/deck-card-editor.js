// ==========================================
// Orbit Deck Card Editor
// ==========================================

import { LitElement, html, css } from "lit";
import {
  mergeConfig,
  renderInput,
  renderNumberInput,
} from "../common/editor/helpers/helpers.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import { actionEditorStyles } from "../common/editor/styles/action-editor.js";
import { localize } from "../common/localize.js";
import { CARD_VERSIONS } from "../version.js";

export const DECK_PREVIEW_SELECTED_INDEX = Symbol.for(
  "orbit-deck-card-preview-selected-index"
);

class OrbitDeckCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    lovelace: { attribute: false },
    _config: { state: true },
    _selectedTab: { state: true },
    _selectedDeckIndex: { state: true },
  };

  constructor() {
    super();
    this._config = {};
    this._selectedTab = "setup";
    this._selectedDeckIndex = 0;
  }

  setConfig(config) {
    this._config = {
      ...(config || {}),
      layout: config?.layout === "tabs" ? "tabs" : "wrap",
    };
    this._selectedDeckIndex = Math.min(
      this._selectedDeckIndex || 0,
      Math.max(0, this._getDeckItems().length - 1)
    );
  }

  _t(key, replacements) {
    return localize(this.hass, key, replacements);
  }

  _updateConfig(changes) {
    this._config = orderDeckConfig(
      mergeConfig(this._config, changes)
    );

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: {
        config: this._config,
      },
      bubbles: true,
      composed: true,
    }));
  }

  _getDeckItems(config = this._config) {
    return Array.isArray(config?.decks)
      ? config.decks.map((item) => ({
          attributes: item?.attributes || {},
          card: item?.card || {},
        }))
      : [];
  }

  _selectDeckItem(index) {
    this._selectedDeckIndex = index;
    this._dispatchPreviewSelection(index);
  }

  _dispatchPreviewSelection(index) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: {
        config: {
          ...this._config,
          [DECK_PREVIEW_SELECTED_INDEX]: index,
        },
      },
      bubbles: true,
      composed: true,
    }));
  }

  _addDeckItem() {
    const items = this._getDeckItems();

    this._selectedDeckIndex = items.length;
    this._selectedTab = "card";
    this._updateConfig({
      decks: [
        ...items,
        {
          attributes: {},
          card: {},
        },
      ],
    });
  }

  _removeDeckItem(index) {
    const items = this._getDeckItems();
    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);

    this._selectedDeckIndex = Math.max(
      0,
      Math.min(index, nextItems.length - 1)
    );

    this._updateConfig({
      decks: nextItems,
    });
  }

  _duplicateDeckItem(index) {
    const items = this._getDeckItems();
    const item = items[index];

    if (!item) {
      return;
    }

    const nextItems = [...items];
    nextItems.splice(index + 1, 0, structuredClone(item));

    this._selectedDeckIndex = index + 1;
    this._updateConfig({ decks: nextItems });
  }

  _moveDeckItem(index, direction) {
    const items = this._getDeckItems();
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= items.length) {
      return;
    }

    const nextItems = [...items];
    const [item] = nextItems.splice(index, 1);
    nextItems.splice(nextIndex, 0, item);

    this._selectedDeckIndex = nextIndex;
    this._updateConfig({ decks: nextItems });
  }

  _updateDeckItem(index, changes) {
    const items = this._getDeckItems();
    const nextItems = [...items];
    nextItems[index] = {
      ...(nextItems[index] || {}),
      ...changes,
    };

    this._updateConfig({ decks: nextItems });
  }

  _updateDeckAttributes(index, changes) {
    const items = this._getDeckItems();
    const item = items[index] || {};

    this._updateDeckItem(index, {
      attributes: {
        ...(item.attributes || {}),
        ...changes,
      },
    });
  }

  _updateDeckCard(index, card) {
    this._updateDeckItem(index, { card });
  }

  _renderInput(label, key, placeholder = "", options = {}) {
    return renderInput.call(this, label, key, placeholder, options);
  }

  _renderNumberInput(label, key, options = {}) {
    return renderNumberInput.call(this, label, key, options);
  }

  _renderSubTabs() {
    return html`
      <div class="deck-subtabs-row">
        <div class="editor-tabs deck-subtabs">
          ${["setup", "card"].map((tab) => html`
            <button
              type="button"
              class="editor-tab ${this._selectedTab === tab ? "active" : ""}"
              @click=${() => { this._selectedTab = tab; }}
            >
              ${tab === "setup" ? "Setup" : "Card"}
            </button>
          `)}
        </div>

        <ha-selector
          class="editor-header-button-toggle deck-layout-toggle"
          .hass=${this.hass}
          .selector=${{
            button_toggle: {
              options: [
                {
                  label: "Wrap",
                  value: "wrap",
                },
                {
                  label: "Tabs",
                  value: "tabs",
                },
              ],
            },
          }}
          .value=${this._config?.layout || "wrap"}
          @value-changed=${(e) =>
            this._updateConfig({
              layout: e.detail.value || "wrap",
            })}
        ></ha-selector>
      </div>
    `;
  }

  _renderSetup() {
    return html`
      <div class="section">
        ${this._config?.layout === "wrap"
          ? this._renderNumberInput("Items per row", "items_per_row", {
              value: this._config?.items_per_row || 1,
              min: 1,
              step: 1,
              onValueChanged: (value) =>
                this._updateConfig({
                  items_per_row: Math.max(1, Number(value) || 1),
                }),
            })
          : html`
              ${this._renderTabWidthModeControl()}
              ${this._renderInput("Tab font size", "tab_font_size", "18px", {
                value: this._config?.tab_font_size || "",
                onValueChanged: (value) =>
                  this._updateConfig({
                    tab_font_size: value || undefined,
                  }),
              })}
            `}
      </div>
    `;
  }

  _renderTabWidthModeControl() {
    return html`
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>Tab width</label>

          <ha-selector
            class="editor-header-button-toggle deck-tab-width-toggle"
            .hass=${this.hass}
            .selector=${{
              button_toggle: {
                options: [
                  {
                    label: "Equal",
                    value: "equal",
                  },
                  {
                    label: "Dynamic",
                    value: "dynamic",
                  },
                  {
                    label: "User",
                    value: "user",
                  },
                ],
              },
            }}
            .value=${this._config?.tab_width_mode || "dynamic"}
            @value-changed=${(e) =>
              this._updateConfig({
                tab_width_mode: e.detail.value || "dynamic",
              })}
          ></ha-selector>
        </div>
      </div>
    `;
  }

  _renderDeckTabs(items, selectedIndex) {
    const itemsPerRow = Math.max(
      1,
      Number(this._config?.items_per_row) || 1
    );
    const shouldWrapTabs =
      this._config?.layout === "wrap" &&
      items.length > itemsPerRow;

    return html`
      <div
        class="action-tabs ${shouldWrapTabs ? "wrapped" : ""} ${items.length > 1 ? "has-tools" : ""}"
        style=${shouldWrapTabs
          ? `--action-tabs-per-row: ${itemsPerRow};`
          : ""}
      >
        <div class="action-tab-items">
          ${items.map((_, index) => html`
            <button
              type="button"
              class="action-tab ${index === selectedIndex ? "active" : ""}"
              @click=${() => this._selectDeckItem(index)}
            >
              ${index + 1}
            </button>
          `)}
        </div>

        <div class="action-editor-tools">
          <button
            type="button"
            class="action-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addDeckItem()}
          >
            +
          </button>

          ${items.length > 0
            ? html`
                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Duplicate")}
                  @click=${() => this._duplicateDeckItem(selectedIndex)}
                >
                  <ha-icon icon="mdi:content-copy"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button action-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeDeckItem(selectedIndex)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${selectedIndex === 0}
                  @click=${() => this._moveDeckItem(selectedIndex, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${selectedIndex === items.length - 1}
                  @click=${() => this._moveDeckItem(selectedIndex, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              `
            : ""}
        </div>
      </div>
    `;
  }

  _renderCardPicker(index, item) {
    if (item?.card?.type) {
      return html`
        <hui-card-element-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          .value=${item.card}
          @config-changed=${(ev) => {
            ev.stopPropagation();
            this._updateDeckCard(index, ev.detail.config);
          }}
        ></hui-card-element-editor>
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

  _renderCard() {
    const items = this._getDeckItems();
    const selectedIndex = Math.min(
      this._selectedDeckIndex || 0,
      Math.max(0, items.length - 1)
    );
    const selectedItem = items[selectedIndex];

    return html`
      <div class="section">
        ${this._renderDeckTabs(items, selectedIndex)}

        ${selectedItem
          ? html`
              ${this._config?.layout === "tabs"
                ? html`
                    <div class="field-grid two-columns">
                      ${this._renderInput("Tab icon", "tab_icon", "mdi:home", {
                        value: selectedItem.attributes?.icon || "",
                        onValueChanged: (value) =>
                          this._updateDeckAttributes(selectedIndex, {
                            icon: value || undefined,
                          }),
                      })}

                      ${this._renderInput("Tab name", "tab_name", "", {
                        value: selectedItem.attributes?.name || "",
                        onValueChanged: (value) =>
                          this._updateDeckAttributes(selectedIndex, {
                            name: value || undefined,
                          }),
                      })}
                    </div>

                    <label class="deck-default-toggle">
                      <span>Default</span>
                      <ha-switch
                        .checked=${!!selectedItem.attributes?.default}
                        @change=${(ev) => this._setDefaultDeck(selectedIndex, ev.target.checked)}
                      ></ha-switch>
                    </label>

                    ${this._config?.tab_width_mode === "user"
                      ? this._renderInput("Tab width", "tab_width", "120px", {
                          value: selectedItem.attributes?.width || "",
                          onValueChanged: (value) =>
                            this._updateDeckAttributes(selectedIndex, {
                              width: value || undefined,
                            }),
                        })
                      : ""}
                  `
                : ""}

              <div class="sub-section-title">Card:</div>
              <div class="deck-card-editor-frame">
                ${this._renderCardPicker(selectedIndex, selectedItem)}
              </div>
            `
          : html`<div class="deck-empty-editor">Add a card to start.</div>`}
      </div>
    `;
  }

  _setDefaultDeck(index, enabled) {
    const items = this._getDeckItems().map((item, itemIndex) => ({
      ...item,
      attributes: {
        ...(item.attributes || {}),
        default: enabled && itemIndex === index ? true : undefined,
      },
    }));

    this._updateConfig({ decks: items });
  }

  render() {
    return html`
      <div class="wrapper">
        ${this._renderSubTabs()}
        ${this._selectedTab === "setup"
          ? this._renderSetup()
          : this._renderCard()}

        <div class="editor-version">
          ${this._t("Orbit Deck Card v{version}", {
            version: CARD_VERSIONS.deck,
          })}
        </div>
      </div>
    `;
  }

  static styles = [
    editorStyles,
    actionEditorStyles,
    css`
      .deck-subtabs-row {
        display: flex;
        align-items: end;
        gap: 12px;
        border-bottom: 1px solid var(--orbit-editor-border);
        margin-bottom: 12px;
      }

      .deck-subtabs {
        flex: 1 1 auto;
        border-bottom: none;
      }

      .deck-layout-toggle {
        width: auto;
        min-width: 180px;
        margin-bottom: 6px;
      }

      .deck-tab-width-toggle {
        width: auto;
        min-width: 260px;
      }

      .field-grid.two-columns {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 12px;
      }

      .deck-default-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin: 6px 0 16px;
      }

      .deck-card-editor-frame {
        min-height: 160px;
      }

      .deck-empty-editor {
        color: var(--secondary-text-color);
        padding: 24px 0;
      }
    `,
  ];
}

customElements.define(
  "orbit-deck-card-editor",
  OrbitDeckCardEditor
);

const DECK_CONFIG_ORDER = [
  "type",
  "layout",
  "items_per_row",
  "tab_font_size",
  "tab_width_mode",
  "decks",
  "grid_options",
  "view_layout",
];

const DECK_ITEM_KEYS = [
  "attributes",
  "card",
];

function orderDeckConfig(config) {
  const ordered = {};
  const usedKeys = new Set();

  DECK_CONFIG_ORDER.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      ordered[key] = key === "decks" && Array.isArray(config[key])
        ? config[key].map(orderDeckItem)
        : config[key];
      usedKeys.add(key);
    }
  });

  Object.keys(config).forEach((key) => {
    if (!usedKeys.has(key)) {
      ordered[key] = config[key];
    }
  });

  return ordered;
}

function orderDeckItem(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return item;
  }

  const ordered = {};
  const usedKeys = new Set();

  DECK_ITEM_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      ordered[key] = item[key];
      usedKeys.add(key);
    }
  });

  Object.keys(item).forEach((key) => {
    if (!usedKeys.has(key)) {
      ordered[key] = item[key];
    }
  });

  return ordered;
}
