// ==========================================
// Orbit Room Card Editor (FULL VERSION)
// COLLAPSIBLE SECTIONS
// ==========================================

import { LitElement, css, html } from "lit";

import {
  getColorStyle,
  getColorPickerValue,
  isImageIcon,
  toggleSection,
  renderSectionHeader,
  renderSubSectionHeader,
  renderStatusSection,
  renderActionSelector,
  renderEntity,
  renderArea,
  renderColor,
  renderColorControl,
  renderInput,
  renderTemplateInput,
  getInlineSvg,
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
    _collapsed: { state: true },
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
    this._colorPickerKey = "";
    this._colorPickerTab = "picker";
    this._iconPickerKey = "";
    this._iconPickerTab = "ha";
    this._orbitIconFiles = [];
    this._orbitIconFilesLoading = false;
    this._localIconFiles = [];
    this._localIconFilesLoading = false;
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
  
  // HELPERS //
  
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
    const nextConfig = {
      ...(this._config || {}),
      ...changes,
    };

    Object.keys(nextConfig).forEach((key) => {
      if (nextConfig[key] === undefined) {
        delete nextConfig[key];
      }
    });

    this._config = nextConfig;

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

  _renderSectionHeader(title, key) {
    return renderSectionHeader.call(this, title, key);
  }

  _renderSubSectionHeader(title, key) {
    return renderSubSectionHeader.call(this, title, key);
  }

  _toggleSection(section) {
    return toggleSection.call(this, section);
  }

  // =========================
  // INPUTS
  // =========================

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

    if (key !== "main_entity") {
      this._handleConfigUpdate(key, value);
      return;
    }

    this._updateConfig({
      main_entity: "",
      main_entity_icon: undefined,
      main_entity_icon_on: undefined,
      main_entity_icon_off: undefined,
      main_entity_tap_action: undefined,
      main_entity_hold_action: undefined,
    });
  }

  _clearButtonEntity(key) {
    this._updateConfig({
      [key]: "",
      [`${key}_on_color`]: undefined,
      [`${key}_off_color`]: undefined,
      [`${key}_icon`]: undefined,
      [`${key}_icon_on`]: undefined,
      [`${key}_icon_off`]: undefined,
      [`${key}_state_template`]: undefined,
      [`${key}_tap_action`]: undefined,
      [`${key}_hold_action`]: undefined,
    });
  }

  _clearCurveButtonEntity(key) {
    this._updateConfig({
      [key]: "",
      [`${key}_icon`]: undefined,
      [`${key}_icon_on`]: undefined,
      [`${key}_icon_off`]: undefined,
      [`${key}_state_template`]: undefined,
      [`${key}_tap_action`]: undefined,
      [`${key}_hold_action`]: undefined,
    });
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

  // =========================
  // ICON HELPERS
  // =========================

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

  // =========================
  // RENDER
  // =========================

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
    return renderStatusSection.call(this);
  }

  _renderButtonsSection() {
    return renderButtonsSection.call(this);
  }

  _renderCurvedButtonsSection() {
    return renderCurvedButtonsSection.call(this);
  }

  render() {
    return html`
      <div class="wrapper">
        ${this._renderRoomSection()}
        ${this._renderStatusSection()}
        ${this._renderButtonsSection()}
        ${this._renderCurvedButtonsSection()}
        <div class="editor-version">
          Orbit Room Card v${CARD_VERSIONS.room}
        </div>
      </div>
    `;
  }

  // =========================
  // STYLES
  // =========================

  static styles = [
    editorStyles,
    css`
      .editor-version {
        padding: 0 14px;
        font-size: 11px;
        opacity: 0.5;
        text-align: right;
      }
    `,
  ];
}

customElements.define(
  "orbit-room-card-editor",
  OrbitRoomCardEditor
);
