// ==========================================
// Orbit Deck Card Editor
// ==========================================

import { LitElement, html } from "lit";
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
import {
  renderInteractionsSection,
} from "../common/editor/helpers/renders.js";
import { localize } from "../common/localize.js";
import { CARD_VERSIONS } from "../version.js";
import {
  updateEditorDocumentationContext,
} from "../common/helpers/documentation.js";
import {
  migrateDeckCardConfig,
} from "../common/helpers/config-migration.js";
import {
  normalizeDeckAttributeLabels,
  normalizeDeckItem,
  orderDeckConfig,
} from "./deck/config.js";
import {
  getDeckChildConfig,
  getDeckChildTypeName,
} from "./deck/item-helpers.js";
import {
  ensureNativeBadgeEditor,
  ensureNativeBadgePicker,
  ensureNativeCardPicker,
  findElementInShadowRoots,
  loadNativeBadgeModule,
} from "./deck/native-pickers.js";
import {
  renderBadgePicker,
  renderCardPicker,
  renderChildPicker,
  renderChildTypeTabs,
} from "./deck/sections/child-picker.js";
import { renderDeckStyleControls } from "./deck/sections/style.js";
import { deckCardEditorStyles } from "./deck/styles.js";

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
    _childPickerType: { state: true },
    _colorPickerKey: { state: true },
    _colorPickerTab: { state: true },
    _styleSectionExpanded: { state: true },
    _cardSectionExpanded: { state: true },
  };

  constructor() {
    super();
    this._config = {};
    this._selectedTab = "setup";
    this._selectedDeckIndex = 0;
    this._childPickerType = "badge";
    this._colorPickerKey = "";
    this._colorPickerTab = "picker";
    this._styleSectionExpanded = false;
    this._cardSectionExpanded = true;
  }

  connectedCallback() {
    super.connectedCallback();
    connectEditorPopoverClose(this);
    this._updateDocumentationContext();
  }

  disconnectedCallback() {
    disconnectEditorPopoverClose(this);
    super.disconnectedCallback();
  }

  setConfig(config) {
    const migrated = migrateDeckCardConfig(config || {});
    const normalized = normalizeDeckAttributeLabels(migrated.config);
    const normalizedConfig = {
      ...normalized.config,
      layout: ["tabs", "overlay"].includes(migrated.config?.layout)
        ? migrated.config.layout
        : "wrap",
    };
    this._config = orderDeckConfig(normalizedConfig);
    this._selectedDeckIndex = Math.min(
      this._selectedDeckIndex || 0,
      Math.max(0, this._getDeckItems().length - 1)
    );
    const selectedItem = this._getDeckItems()[this._selectedDeckIndex];
    this._childPickerType = selectedItem?.badge ? "badge" : "card";
    this._updateDocumentationContext();

    if (migrated.migrated || normalized.changed) {
      queueMicrotask(() => this._dispatchConfigChanged());
    }
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

    this._dispatchConfigChanged();
  }

  _dispatchConfigChanged() {
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
      ? config.decks.map(normalizeDeckItem)
      : [];
  }

  _selectDeckItem(index) {
    const item = this._getDeckItems()[index];

    this._selectedDeckIndex = index;
    this._childPickerType = item?.badge ? "badge" : "card";
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
    this._childPickerType = "badge";
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

    this._updateDeckItem(index, {
      badge: undefined,
      card,
    });
  }

  _updateDeckBadge(index, badge) {
    const items = this._getDeckItems();

    if (index >= items.length) {
      this._selectedDeckIndex = items.length;
      this._updateConfig({
        decks: [
          ...items,
          {
            attributes: {},
            badge,
          },
        ],
      });
      return;
    }

    this._updateDeckItem(index, {
      badge,
      card: undefined,
    });
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
              @click=${() => {
                this._selectedTab = tab;
                this._updateDocumentationContext();
              }}
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
                {
                  label: this._t("Overlay"),
                  value: "overlay",
                },
              ],
            },
          }}
          .value=${this._config?.layout || "wrap"}
          @value-changed=${(e) => {
            this._updateConfig({
              layout: e.detail.value || "wrap",
            });
            this._updateDocumentationContext();
          }}
        ></ha-selector>
      </div>
    `;
  }

  _updateDocumentationContext() {
    const context = this._selectedTab === "card"
      ? "card"
      : `setup-${this._config?.layout || "wrap"}`;

    updateEditorDocumentationContext(this, "orbit-deck-card", context);
  }

  _renderSetup() {
    const items = this._getDeckItems();

    return html`
      <div class="section deck-card-tab-section">
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
          : this._config?.layout === "tabs"
            ? html`
              ${this._renderTabWidthModeControl()}
              ${this._renderInput("Tab font size", "tab_font_size", "18px", {
                value: this._config?.tab_font_size || "",
                onValueChanged: (value) =>
                  this._updateConfig({
                    tab_font_size: value || undefined,
                  }),
              })}
              <label class="deck-tab-divider-row">
                <span>${this._t("Divider")}</span>
                <ha-switch
                  .checked=${this._config?.tab_divider !== false}
                  @change=${(event) =>
                    this._updateConfig({
                      tab_divider: event.target.checked ? undefined : false,
                    })}
                ></ha-switch>
              </label>
              <div class="field-grid two-columns deck-tab-colors">
                ${this._renderColorControl(
                  ["Inactive", "Color"],
                  "tab_color",
                  this._config?.tab_color || "",
                  (value) => this._updateConfig({ tab_color: value || undefined }),
                  "primary-text-color"
                )}
                ${this._renderColorControl(
                  ["Active", "Color"],
                  "tab_active_color",
                  this._config?.tab_active_color || "",
                  (value) => this._updateConfig({ tab_active_color: value || undefined }),
                  "primary-color"
                )}
                ${this._renderColorControl(
                  ["Background", "Color"],
                  "tab_background_color",
                  this._config?.tab_background_color || "",
                  (value) => this._updateConfig({ tab_background_color: value || undefined }),
                  "card-background-color"
                )}
              </div>
              `
            : ""}
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
                    label: this._t("Custom"),
                    value: "custom",
                  },
                ],
              },
            }}
            .value=${this._config?.tab_width_mode || "equal"}
            @value-changed=${(e) =>
              this._updateConfig({
                tab_width_mode: e.detail.value || "equal",
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
              ${this._config?.layout === "overlay" && index === 0
                ? this._t("Main")
                : index + 1}
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

  _renderChildTypeTabs() {
    return renderChildTypeTabs.call(this);
  }

  _renderChildPicker(index, item) {
    return renderChildPicker.call(this, index, item);
  }

  _renderBadgePicker(index, item) {
    return renderBadgePicker.call(this, index, item);
  }

  _renderCardPicker(index, item) {
    return renderCardPicker.call(this, index, item);
  }

  _renderDeckStyleControls(index, item) {
    return renderDeckStyleControls.call(this, index, item);
  }

  _renderAttributeSelector(index, { label, selector, value, changeKey }) {
    return html`
      <ha-selector
        .hass=${this.hass}
        .label=${this._t(label)}
        .selector=${selector}
        .value=${value}
        @value-changed=${(ev) =>
          this._updateDeckAttributes(index, {
            [changeKey]: ev.detail.value || undefined,
          })}
      ></ha-selector>
    `;
  }

  _renderOverlayNumberSelector(
    index,
    { label, value, changeKey, min = 0 }
  ) {
    return renderNumberInput.call(this, label, changeKey, {
      value: value ?? "",
      min,
      onValueChanged: (nextValue) =>
        this._updateDeckAttributes(index, {
          [changeKey]: nextValue === "" || nextValue === null
            ? undefined
            : nextValue,
        }),
    });
  }

  _renderDeckCardSection(index, item) {
    const expanded = this._cardSectionExpanded !== false;

    return html`
      <ha-expansion-panel
        class="deck-card-section"
        outlined
        .expanded=${expanded}
        @expanded-changed=${(ev) => {
          if (ev.target !== ev.currentTarget) return;
          this._cardSectionExpanded = ev.detail.expanded;
        }}
      >
        <ha-icon slot="leading-icon" icon="mdi:cards-outline"></ha-icon>
        <div slot="header" role="heading" aria-level="3">
          ${getDeckChildTypeName(item, this.hass, this._t("Card"))}
        </div>
        <div class="deck-card-section-content">
          ${item?.badge?.type || item?.card?.type
            ? ""
            : this._renderChildTypeTabs()}
          <div class="deck-card-editor-frame">
            ${this._renderChildPicker(index, item)}
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  _renderDeckInteractions(index, item) {
    const attributes = item?.attributes || {};

    return renderInteractionsSection.call(this, {
      expanded: false,
      config: attributes,
      onChange: (changes) => this._updateDeckAttributes(index, changes),
      interactions: [
        {
          key: "tap_action",
          formKey: "tap_action",
          label: "Tap behavior",
        },
        {
          key: "hold_action",
          formKey: "hold_action",
          label: "Hold behavior",
        },
        {
          key: "double_tap_action",
          formKey: "double_tap_action",
          label: "Double tap behavior",
        },
      ],
      context: {
        entity_id: attributes.entity || getDeckChildConfig(item)?.entity,
      },
    });
  }

  async _ensureNativeBadgePicker() {
    return ensureNativeBadgePicker.call(this);
  }

  async _ensureNativeBadgeEditor() {
    return ensureNativeBadgeEditor.call(this);
  }

  async _loadNativeBadgeModule(options) {
    return loadNativeBadgeModule.call(this, options);
  }

  _findElementInShadowRoots(root, predicate) {
    return findElementInShadowRoots.call(this, root, predicate);
  }

  async _ensureNativeCardPicker() {
    return ensureNativeCardPicker.call(this);
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

              ${selectedItem
                ? html`
                    <div class="deck-interactions-section">
                      ${this._renderDeckInteractions(selectedIndex, selectedItem)}
                    </div>
                  `
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

  static styles = deckCardEditorStyles;
}

if (!customElements.get("orbit-deck-card-editor")) {
  customElements.define(
    "orbit-deck-card-editor",
    OrbitDeckCardEditor
  );
}
