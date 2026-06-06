// ==========================================
// Orbit Room Card Editor
// ==========================================

import { LitElement, html } from "lit";

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
    this._config = mergeConfig(this._config, changes);

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: {
        config: this._config,
      },
      bubbles: true,
      composed: true,
    }));
  }

  _renderSectionHeader(title, key) {
    return renderSectionHeader.call(this, title, key);
  }

  _renderSubSectionHeader(title, key) {
    return renderSubSectionHeader.call(this, title, key);
  }

  _toggleSection(section) {
    return toggleSection.call(this, section);
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

    if (key !== "main_entity") {
      this._handleConfigUpdate(key, value);
      return;
    }

    this._updateConfig(clearEntityConfig(
      "main_entity",
      MAIN_ENTITY_DEPENDENT_KEYS
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

  static styles = editorStyles;
}

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
