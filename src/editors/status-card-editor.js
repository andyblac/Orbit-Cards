// ==========================================
// Orbit Status Card Editor
// ==========================================

import { LitElement, html } from "lit";

import {
  getColorStyle,
  isImageIcon,
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

import { renderStatusSection } from "./status/sections/status.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";

class OrbitStatusCardEditor extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  constructor() {
    super();
    this._config = this._config || {};
  }

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

  _handleInput(key, e) {
    this._updateConfig({
      [key]: e.target.value,
    });
  }

  _handleConfigUpdate(key, value) {
    this._updateConfig({ [key]: value });
  }

  _renderInput(label, key, placeholder = "") {
    return renderInput.call(this, label, key, placeholder);
  }

  _renderTemplateInput(label, key) {
    return renderTemplateInput.call(this, label, key);
  }

  _renderColor(label, key) {
    return renderColor.call(this, label, key);
  }

  _renderEntity(label, key) {
    return renderEntity.call(this, label, key);
  }

  _renderActionSelector(label, key, defaultAction) {
    return renderActionSelector.call(this, label, key, defaultAction);
  }

  _renderArea(label, key) {
    return renderArea.call(this, label, key);
  }

  _renderIconInput(label, key, placeholder = "mdi:information-outline or icon.svg") {
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

  _renderStatusSection() {
    return renderStatusSection.call(this);
  }

  render() {
    return html`
      <div class="wrapper">
        ${this._renderStatusSection()}
      </div>
    `;
  }

  static styles = editorStyles;
}

customElements.define(
  "orbit-status-card-editor",
  OrbitStatusCardEditor
);
