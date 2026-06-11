// ==========================================
// Orbit Room Card Editor
// ==========================================

import { LitElement, html } from "lit";

import {
  getColorStyle,
  getColorPickerValue,
  isImageIcon,
  renderActionSelector,
  renderEntity,
  renderArea,
  renderColor,
  renderColorControl,
  renderInput,
  renderTemplateInput,
  clearEntityConfig,
  clearPrefixedEntityConfig,
  getInlineSvg,
  mergeConfig,
  resolveIconPath,
  renderIconInput,
  loadLocalIconFiles,
} from "../common/editor/helpers/helpers.js";

import { renderRoomSection } from "./room/sections/room.js";
import { renderButtonsSection } from "./room/sections/buttons.js";
import { renderCurvedButtonsSection } from "./room/sections/curve-buttons.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";
import { CARD_VERSIONS } from "../version.js";

class OrbitRoomCardEditor extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _activeSection: { state: true },
    _selectedStatusIndex: { state: true },
    _selectedButtonIndex: { state: true },
    _selectedCurveButtonIndex: { state: true },
    _colorPickerKey: { state: true },
    _colorPickerTab: { state: true },
    _iconPickerKey: { state: true },
    _iconPickerTab: { state: true },
    _orbitIconFiles: { state: true },
    _orbitIconFilesLoading: { state: true },
    _localIconFiles: { state: true },
    _localIconFilesLoading: { state: true },
  };

  constructor() {
    super();
    this._config = this._config || {};
    this._activeSection = "card";
    this._selectedStatusIndex = 1;
    this._selectedButtonIndex = 1;
    this._selectedCurveButtonIndex = 1;
    this._colorPickerKey = "";
    this._colorPickerTab = "picker";
    this._iconPickerKey = "";
    this._iconPickerTab = "ha";
    this._orbitIconFiles = [];
    this._orbitIconFilesLoading = false;
    this._localIconFiles = [];
    this._localIconFilesLoading = false;
  }
  
  _getColorStyle(value) {
    return getColorStyle(value);
  }

  _getColorPickerValue(value) {
    return getColorPickerValue(value);
  }

  setConfig(config) {
    this._config = config || {};
  }

  _updateConfig(changes) {
    this._config = orderRoomConfig(
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

  _handleInput(key, e) {
    this._updateConfig({
      [key]: e.target.value,
    });
  }

  _handleEntityUpdate(key, value) {
    if (value) {
      this._handleConfigUpdate(key, value);
      return;
    }

    if (key.startsWith("button")) {
      this._clearButtonEntity(key);
      return;
    }

    if (key.startsWith("curve_button")) {
      this._clearCurveButtonEntity(key);
      return;
    }

    if (/^status[1-3]$/.test(key)) {
      this._clearStatusEntity(key);
      return;
    }

    if (key !== "main_entity") {
      this._handleConfigUpdate(key, value);
      return;
    }

    this._updateConfig(clearEntityConfig(
      "main_entity",
      MAIN_ENTITY_DEPENDENT_KEYS
    ));
  }

  _clearStatusEntity(key) {
    this._updateConfig(clearPrefixedEntityConfig(
      key,
      STATUS_ENTITY_DEPENDENT_SUFFIXES
    ));
  }

  _clearButtonEntity(key) {
    this._updateConfig(clearPrefixedEntityConfig(
      key,
      BUTTON_ENTITY_DEPENDENT_SUFFIXES
    ));
  }

  _clearCurveButtonEntity(key) {
    this._updateConfig(clearPrefixedEntityConfig(
      key,
      CURVE_BUTTON_ENTITY_DEPENDENT_SUFFIXES
    ));
  }

  _renderInput(label, key, placeholder = "") {
    return renderInput.call(this, label, key, placeholder);
  }

  _renderTemplateInput(label, key) {
    return renderTemplateInput.call(this, label, key);
  }

  _handleConfigUpdate(key, value) {
    this._updateConfig({[key]: value});
  }

  _renderColor(label, key) {
    return renderColor.call(this, label, key);
  }

  _renderColorControl(label, pickerKey, value, onUpdate) {
    return renderColorControl.call(
      this,
      label,
      pickerKey,
      value,
      onUpdate
    );
  }

  _renderIconInput(label, key, placeholder = "mdi:lightbulb or icon.svg") {
    return renderIconInput.call(this, label, key, placeholder);
  }

  _loadLocalIconFiles(currentIcon = "") {
    return loadLocalIconFiles.call(this, currentIcon);
  }

  _isImageIcon(icon) {
    return isImageIcon(icon);
  }

  _resolveIconPath(path) {
    return resolveIconPath(path);
  }

  _getInlineSvg(path) {
    return getInlineSvg.call(this, path, {
      forceColor: true,
    });
  }

  _renderActionSelector(label, key, defaultAction) {
    return renderActionSelector.call(this, label, key, defaultAction);
  }

  _renderEntity(label, key) {
    return renderEntity.call(this, label, key);
  }

  _renderArea(label, key) {
    return renderArea.call(this, label, key);
  }

  _renderRoomSection() {
    return renderRoomSection.call(this);
  }

  _renderStatusSection() {
    const selected = this._selectedStatusIndex || 1;

    return html`
      <div class="section">
        ${this._renderInput(
          "Separator",
          "status_separator",
          "|"
        )}

        <div
          class="editor-segment-menu"
          style="--editor-segment-columns: 3;"
        >
          ${[1, 2, 3].map((index) => html`
            <button
              type="button"
              class="editor-segment-item ${selected === index ? "active" : ""}"
              @click=${() => {
                this._selectedStatusIndex = index;
              }}
            >
              Status ${index}
            </button>
          `)}
        </div>

        <div class="sub-section selected-button-section">
          ${this._renderEntity(
            "Entity",
            `status${selected}`
          )}

          ${this._renderIconInput(
            "Prefix Icon",
            `status${selected}_icon`,
            "mdi:thermometer / icon.svg / 🌡️"
          )}

          ${this._renderInput(
            "Decimal Places",
            `status${selected}_decimal_places`,
            "entity default"
          )}
        </div>
      </div>
    `;
  }

  _renderButtonsSection() {
    return renderButtonsSection.call(this);
  }

  _renderCurvedButtonsSection() {
    return renderCurvedButtonsSection.call(this);
  }

  _renderEditorTabs() {
    return html`
      <div class="editor-tabs">
        ${ROOM_EDITOR_TABS.map((tab) => html`
          <button
            type="button"
            class="editor-tab ${this._activeSection === tab.key ? "active" : ""}"
            @click=${() => {
              this._activeSection = tab.key;
            }}
          >
            ${tab.label}
          </button>
        `)}
      </div>
    `;
  }

  _renderActiveSection() {
    const activeTab =
      ROOM_EDITOR_TABS.find((tab) => tab.key === this._activeSection) ||
      ROOM_EDITOR_TABS[0];

    return this[activeTab.render]();
  }

  render() {
    return html`
      <div class="wrapper">
        ${this._renderEditorTabs()}
        ${this._renderActiveSection()}
        <div class="editor-version">
          Orbit Room Card v${CARD_VERSIONS.room}
        </div>
      </div>
    `;
  }

  static styles = editorStyles;
}

const ROOM_EDITOR_TABS = [
  {
    key: "card",
    label: "Card",
    render: "_renderRoomSection",
  },
  {
    key: "status",
    label: "Status",
    render: "_renderStatusSection",
  },
  {
    key: "buttons",
    label: "Buttons",
    render: "_renderButtonsSection",
  },
  {
    key: "curve",
    label: "Curve Buttons",
    render: "_renderCurvedButtonsSection",
  },
];

customElements.define(
  "orbit-room-card-editor",
  OrbitRoomCardEditor
);

const MAIN_ENTITY_DEPENDENT_KEYS = [
  "main_entity_icon",
  "main_entity_icon_on",
  "main_entity_icon_off",
  "main_entity_tap_action",
  "main_entity_hold_action",
];

const STATUS_ENTITY_DEPENDENT_SUFFIXES = [
  "_icon",
  "_decimal_places",
];

const BUTTON_ENTITY_DEPENDENT_SUFFIXES = [
  "_on_color",
  "_off_color",
  "_icon",
  "_icon_on",
  "_icon_off",
  "_state_template",
  "_tap_action",
  "_hold_action",
];

const CURVE_BUTTON_ENTITY_DEPENDENT_SUFFIXES = [
  "_icon",
  "_icon_on",
  "_icon_off",
  "_state_template",
  "_tap_action",
  "_hold_action",
];

const ROOM_CONFIG_ORDER = [
  "type",
  "room_name",
  "accent_color",
  "status_color",
  "area",
  "navigate",
  "main_entity",
  "main_entity_icon",
  "main_entity_icon_on",
  "main_entity_icon_off",
  "main_entity_icon_svg_color_override",
  "main_entity_icon_on_svg_color_override",
  "main_entity_icon_off_svg_color_override",
  "main_entity_tap_action",
  "main_entity_hold_action",
  "status_separator",
  ...[1, 2, 3].flatMap((index) => [
    `status${index}`,
    `status${index}_icon`,
    `status${index}_decimal_places`,
  ]),
  ...[1, 2, 3, 4].flatMap((index) => [
    `button${index}`,
    `button${index}_on_color`,
    `button${index}_off_color`,
    `button${index}_icon`,
    `button${index}_icon_on`,
    `button${index}_icon_off`,
    `button${index}_icon_svg_color_override`,
    `button${index}_icon_on_svg_color_override`,
    `button${index}_icon_off_svg_color_override`,
    `button${index}_state_template`,
    `button${index}_tap_action`,
    `button${index}_hold_action`,
  ]),
  "curve_buttons_lock_position",
  ...[1, 2, 3, 4, 5, 6].flatMap((index) => [
    `curve_button${index}`,
    `curve_button${index}_icon`,
    `curve_button${index}_icon_on`,
    `curve_button${index}_icon_off`,
    `curve_button${index}_icon_svg_color_override`,
    `curve_button${index}_icon_on_svg_color_override`,
    `curve_button${index}_icon_off_svg_color_override`,
    `curve_button${index}_state_template`,
    `curve_button${index}_tap_action`,
    `curve_button${index}_hold_action`,
  ]),
  "grid_options",
  "view_layout",
];

function orderRoomConfig(config) {
  const ordered = {};
  const usedKeys = new Set();

  ROOM_CONFIG_ORDER.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      ordered[key] = config[key];
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
