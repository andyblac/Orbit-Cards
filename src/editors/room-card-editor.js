// ==========================================
// Orbit Room Card Editor (FULL VERSION)
// COLLAPSIBLE SECTIONS
// ==========================================

import { LitElement, html } from "lit";

import {
  getColorStyle,
  isImageIcon,
  toggleSection,
  renderSectionHeader,
  renderSubSectionHeader,
  renderStatusSection,
  renderActionSelector,
  renderEntity,
  renderArea,
  renderColor,
  renderInput,
  renderTemplateInput,
  getInlineSvg,
  resolveIconPath,
  renderIconInput,
} from "../common/editor/helpers/helpers.js";

import { renderRoomSection } from "./room/sections/room.js";
import { renderButtonsSection } from "./room/sections/buttons.js";
import { renderCurvedButtonsSection } from "./room/sections/curve-buttons.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";


class OrbitRoomCardEditor extends LitElement {
  static svgCache = {};


  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _collapsed: { state: true },
  };

  constructor() {
    super();
    this._config = this._config || {};
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

  setConfig(config) {
    this._config = config || {};
  }

  _updateConfig(changes) {
    this._config = {
      ...(this._config || {}),
      ...changes,
    };

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

  
  // =========================
  // ICON HELPERS
  // =========================

  _renderIconInput(label, key, placeholder = "mdi:lightbulb or icon.svg") {
    return renderIconInput.call(this, label, key, placeholder);
  }

  _isImageIcon(icon) {
    return isImageIcon(icon);
  }

  _resolveIconPath(path) {
    return resolveIconPath(path);
  }

  _getInlineSvg(path) {
    return getInlineSvg.call(this, path);
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
      </div>
    `;
  }

  // =========================
  // STYLES
  // =========================

  static styles = editorStyles;
}

customElements.define(
  "orbit-room-card-editor",
  OrbitRoomCardEditor
);
