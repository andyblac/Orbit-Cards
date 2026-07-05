// ==========================================
// Orbit Deck Card Editor
// ==========================================

import { LitElement, html, css } from "lit";
import {
  connectEditorPopoverClose,
  disconnectEditorPopoverClose,
  getColorStyle,
  getColorPickerValue,
  mergeConfig,
  renderColorControl,
  renderInput,
  renderNumberInput,
} from "../common/editor/helpers/helpers.js";
import {
  getGroupedEditorState,
  renderGroupedEditorOptions,
} from "../common/editor/helpers/group-options.js";
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
    _colorPickerKey: { state: true },
    _colorPickerTab: { state: true },
    _cardSectionExpanded: { state: true },
  };

  constructor() {
    super();
    this._config = {};
    this._selectedTab = "setup";
    this._selectedDeckIndex = 0;
    this._colorPickerKey = "";
    this._colorPickerTab = "picker";
    this._cardSectionExpanded = true;
  }

  connectedCallback() {
    super.connectedCallback();
    connectEditorPopoverClose(this);
  }

  disconnectedCallback() {
    disconnectEditorPopoverClose(this);
    super.disconnectedCallback();
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

  _getColorPickerValue(value) {
    return getColorPickerValue(value);
  }

  _getColorStyle(value) {
    return getColorStyle(value);
  }

  _updateConfig(changes) {
    this._config = orderDeckConfig(
      mergeConfig(this._config, changes)
    );

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: {
        config: this._getPreviewConfig(),
      },
      bubbles: true,
      composed: true,
    }));
  }

  _getPreviewConfig() {
    return {
      ...this._config,
      [DECK_PREVIEW_SELECTED_INDEX]: this._selectedDeckIndex || 0,
    };
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
          ...this._getPreviewConfig(),
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
    this.requestUpdate();
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
    const items = this._getDeckItems();

    if (index >= items.length) {
      this._selectedDeckIndex = items.length;
      this._updateConfig({
        decks: [
          ...items,
          {
            attributes: {},
            card,
          },
        ],
      });
      return;
    }

    this._updateDeckItem(index, { card });
  }

  _renderInput(label, key, placeholder = "", options = {}) {
    return renderInput.call(this, label, key, placeholder, options);
  }

  _renderNumberInput(label, key, options = {}) {
    return renderNumberInput.call(this, label, key, options);
  }

  _renderColorControl(label, pickerKey, value, onUpdate, previewValue = value) {
    return renderColorControl.call(
      this,
      label,
      pickerKey,
      value,
      onUpdate,
      previewValue
    );
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
              ${tab === "setup" ? this._t("Setup") : this._t("Card")}
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
                  label: this._t("Wrap"),
                  value: "wrap",
                },
                {
                  label: this._t("Tabs"),
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
    const items = this._getDeckItems();

    return html`
      <div class="section">
        ${this._config?.layout === "wrap"
          ? renderGroupedEditorOptions.call(this, {
              itemCount: items.length,
              classPrefix: "action",
              wrapEnabled: true,
              showWrapToggle: false,
              perRowKey: "items_per_row",
              perRowLabel: "Items per row",
              defaultPerRow: 1,
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
              <div class="field-grid two-columns deck-tab-colors">
                ${this._renderColorControl(
                  "Tab color",
                  "tab_color",
                  this._config?.tab_color || "",
                  (value) => this._updateConfig({ tab_color: value || undefined }),
                  "primary-text-color"
                )}
                ${this._renderColorControl(
                  "Active tab color",
                  "tab_active_color",
                  this._config?.tab_active_color || "",
                  (value) => this._updateConfig({ tab_active_color: value || undefined }),
                  "primary-color"
                )}
                ${this._renderColorControl(
                  "Tab background color",
                  "tab_background_color",
                  this._config?.tab_background_color || "",
                  (value) => this._updateConfig({ tab_background_color: value || undefined }),
                  "card-background-color"
                )}
              </div>
            `}
      </div>
    `;
  }

  _renderTabWidthModeControl() {
    return html`
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Tab width")}</label>

          <ha-selector
            class="editor-header-button-toggle deck-tab-width-toggle"
            .hass=${this.hass}
            .selector=${{
              button_toggle: {
                options: [
                  {
                    label: this._t("Equal"),
                    value: "equal",
                  },
                  {
                    label: this._t("Dynamic"),
                    value: "dynamic",
                  },
                  {
                    label: this._t("User"),
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
    const {
      itemsPerRow,
      shouldWrapTabs,
    } = getGroupedEditorState({
      config: this._config,
      itemCount: items.length,
      wrapEnabled: this._config?.layout === "wrap",
      defaultPerRow: 1,
    });

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

          ${items.length > 0 && selectedIndex < items.length
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

  _renderDeckStyleControls(index, item) {
    const attributes = item?.attributes || {};
    const isTabs = this._config?.layout === "tabs";
    const schemaFields = [
      ...(isTabs
        ? [
            {
              name: "",
              type: "grid",
              schema: [
                {
                  name: "tab_icon",
                  selector: { icon: {} },
                },
                {
                  name: "tab_name",
                  selector: { text: {} },
                },
              ],
            },
          ]
        : []),
      ...(isTabs && this._config?.tab_width_mode === "user"
        ? [
            {
              name: "tab_width",
              selector: { text: {} },
            },
          ]
        : []),
      {
        name: "padding_top",
        selector: { text: {} },
      },
      {
        name: "padding_right",
        selector: { text: {} },
      },
      {
        name: "padding_bottom",
        selector: { text: {} },
      },
      {
        name: "padding_left",
        selector: { text: {} },
      },
    ];

    const schema = [
      {
        name: "style",
        type: "expandable",
        flatten: true,
        expanded: false,
        icon: "mdi:palette",
        schema: schemaFields,
      },
    ];
    const data = {
      tab_icon: attributes.icon || "",
      tab_name: attributes.name || "",
      tab_width: attributes.width || "",
      padding_top: attributes.padding_top || "",
      padding_right: attributes.padding_right || "",
      padding_bottom: attributes.padding_bottom || "",
      padding_left: attributes.padding_left || "",
    };

    return html`
      <ha-form
        class="deck-style-form"
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(item) => {
          if (item.name === "style") return this._t("Style");
          if (item.name === "tab_icon") return this._t("Tab icon");
          if (item.name === "tab_name") return this._t("Tab name");
          if (item.name === "tab_width") return this._t("Tab width");
          if (item.name === "padding_top") return this._t("Top");
          if (item.name === "padding_right") return this._t("Right");
          if (item.name === "padding_bottom") return this._t("Bottom");
          if (item.name === "padding_left") return this._t("Left");
          return this._t(item.name);
        }}
        @value-changed=${(ev) => {
          ev.stopPropagation();
          const value = ev.detail.value || {};
          const changes = {
            padding_top: value.padding_top || undefined,
            padding_right: value.padding_right || undefined,
            padding_bottom: value.padding_bottom || undefined,
            padding_left: value.padding_left || undefined,
          };

          if (isTabs) {
            changes.icon = value.tab_icon || undefined;
            changes.name = value.tab_name || undefined;

            if (this._config?.tab_width_mode === "user") {
              changes.width = value.tab_width || undefined;
            }
          }

          this._updateDeckAttributes(index, changes);
        }}
      ></ha-form>
    `;
  }

  _renderDeckCardSection(index, item) {
    const expanded = this._cardSectionExpanded !== false;

    return html`
      <ha-expansion-panel
        class="deck-card-section"
        outlined
        .expanded=${expanded}
        @expanded-changed=${(ev) => {
          this._cardSectionExpanded = ev.detail.expanded;
        }}
      >
        <ha-icon slot="leading-icon" icon="mdi:cards-outline"></ha-icon>
        <div slot="header" role="heading" aria-level="3">
          ${this._t("Card")}
        </div>
        <div class="deck-card-section-content">
          <div class="deck-card-editor-frame">
            ${this._renderCardPicker(index, item)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  async _ensureNativeCardPicker() {
    if (this._cardPickerLoadRequested) {
      return;
    }

    this._cardPickerLoadRequested = true;

    try {
      if (window.loadCardHelpers) {
        await window.loadCardHelpers();
      }

      await Promise.race([
        customElements.whenDefined("hui-card-picker"),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
    } catch (_err) {
      // HA does not expose a public card picker loader for custom editors.
    } finally {
      this._cardPickerLoadRequested = false;
      this.requestUpdate();
    }
  }

  _renderCard() {
    const items = this._getDeckItems();
    const selectedIndex = Math.min(
      this._selectedDeckIndex || 0,
      items.length
    );
    const selectedItem = items[selectedIndex];
    const isNewItem = selectedIndex === items.length;

    return html`
      <div class="section">
        ${this._renderDeckTabs(items, selectedIndex)}

        ${selectedItem || isNewItem
          ? html`
              ${selectedItem && this._config?.layout === "tabs"
                ? html`
                    <label class="deck-default-toggle">
                      <span>${this._t("Default")}</span>
                      <ha-switch
                        .checked=${!!selectedItem.attributes?.default}
                        @change=${(ev) => this._setDefaultDeck(selectedIndex, ev.target.checked)}
                      ></ha-switch>
                    </label>
                  `
                : ""}

              ${selectedItem
                ? this._renderDeckStyleControls(selectedIndex, selectedItem)
                : ""}

              ${this._renderDeckCardSection(selectedIndex, selectedItem)}
            `
          : html`<div class="deck-empty-editor">${this._t("Add a card to start.")}</div>`}
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

      .deck-tab-colors {
        margin-top: 12px;
      }

      .deck-style-form {
        display: block;
        margin: 14px 0 0;
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

      .deck-card-section {
        display: block;
        margin: 0 0 18px;
        --expansion-panel-content-padding: 0;
        border-radius: var(--ha-border-radius-md);
        --ha-card-border-radius: var(--ha-border-radius-md);
      }

      .deck-card-section-content {
        padding: 12px;
      }

      .deck-card-section ha-icon {
        color: var(--secondary-text-color);
      }

      .deck-card-picker-loading {
        width: 100%;
        min-height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .native-picker-preloader {
        display: none;
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
  "separate_cards",
  "tab_font_size",
  "tab_width_mode",
  "tab_color",
  "tab_active_color",
  "tab_background_color",
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

  const cleanedItem = {
    ...item,
    attributes: cleanObject(item.attributes || {}),
    card: item.card || {},
  };

  DECK_ITEM_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(cleanedItem, key)) {
      ordered[key] = cleanedItem[key];
      usedKeys.add(key);
    }
  });

  Object.keys(cleanedItem).forEach((key) => {
    if (!usedKeys.has(key)) {
      ordered[key] = cleanedItem[key];
    }
  });

  return ordered;
}

function cleanObject(value = {}) {
  return Object.entries(value).reduce((result, [key, itemValue]) => {
    if (itemValue !== undefined && itemValue !== "") {
      result[key] = itemValue;
    }

    return result;
  }, {});
}
