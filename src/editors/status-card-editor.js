// ==========================================
// Orbit Status Card Editor
// ==========================================

import { LitElement, css, html } from "lit";

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
  getInlineSvg,
  resolveIconPath,
  renderIconInput,
  loadLocalIconFiles,
} from "../common/editor/helpers/helpers.js";

import { renderStatusSection } from "./status/sections/status.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";
import { CARD_VERSIONS } from "../version.js";

class OrbitStatusCardEditor extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _selectedStatusIndex: { state: true },
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
    this._selectedStatusIndex = 0;
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
    this._selectedStatusIndex = Math.min(
      this._selectedStatusIndex || 0,
      this._getStatusItems(config).length - 1
    );
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

  _handleInput(key, e) {
    this._updateConfig({
      [key]: e.target.value,
    });
  }

  _handleConfigUpdate(key, value) {
    this._updateConfig({ [key]: value });
  }

  _handleEntityUpdate(key, value) {
    if (value) {
      this._handleConfigUpdate(key, value);
      return;
    }

    if (key === "main_entity") {
      this._clearMainEntity();
      return;
    }

    if (key === "tracker_entity") {
      this._updateConfig({
        tracker_entity: "",
        eta_entity: undefined,
      });
      return;
    }

    this._handleConfigUpdate(key, value);
  }

  _clearMainEntity() {
    if (this._config?.mode === "person") {
      this._updateConfig({
        main_entity: "",
        tracker_entity: undefined,
        eta_entity: undefined,
        battery_entity_1: undefined,
        battery_entity_2: undefined,
        accent_on_color: undefined,
        accent_off_color: undefined,
        tap_action: undefined,
        main_entity_tap_action: undefined,
        main_entity_hold_action: undefined,
      });
      return;
    }

    this._updateConfig({
      main_entity: "",
      accent_on_color: undefined,
      accent_off_color: undefined,
      main_entity_icon: undefined,
      main_entity_icon_on: undefined,
      main_entity_icon_off: undefined,
      state_template: undefined,
      label_template: undefined,
      tap_action: undefined,
      main_entity_tap_action: undefined,
      main_entity_hold_action: undefined,
    });
  }

  _getStatusItems(config = this._config) {
    if (Array.isArray(config?.entities) && config.entities.length) {
      return config.entities.map((item) =>
        typeof item === "string"
          ? { entity: item }
          : item || {}
      );
    }

    return [
      {
        entity: config?.main_entity || "",
        accent_on_color: config?.accent_on_color || "",
        accent_off_color: config?.accent_off_color || "",
        main_entity_icon: config?.main_entity_icon || "",
        main_entity_icon_on: config?.main_entity_icon_on || "",
        main_entity_icon_off: config?.main_entity_icon_off || "",
        state_template: config?.state_template || "",
        label_template: config?.label_template || "",
        tap_action: config?.tap_action,
        main_entity_tap_action: config?.main_entity_tap_action,
        main_entity_hold_action: config?.main_entity_hold_action,
      },
    ];
  }

  _selectStatusItem(index) {
    this._selectedStatusIndex = index;
  }

  _addStatusItem() {
    const items = this._getStatusItems();

    this._selectedStatusIndex = items.length;
    this._updateConfig({
      main_entity: undefined,
      accent_on_color: undefined,
      accent_off_color: undefined,
      main_entity_icon: undefined,
      main_entity_icon_on: undefined,
      main_entity_icon_off: undefined,
      state_template: undefined,
      label_template: undefined,
      tap_action: undefined,
      main_entity_tap_action: undefined,
      main_entity_hold_action: undefined,
      entities: [
        ...items,
        {
          entity: "",
        },
      ],
    });
  }

  _removeStatusItem(index) {
    const items = this._getStatusItems();

    if (items.length <= 1) {
      this._updateConfig({
        main_entity: "",
        main_entity_icon: "",
        main_entity_icon_on: "",
        main_entity_icon_off: "",
        state_template: "",
        label_template: "",
        tap_action: undefined,
        main_entity_tap_action: undefined,
        main_entity_hold_action: undefined,
      });
      return;
    }

    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    this._selectedStatusIndex = Math.max(
      0,
      Math.min(index, nextItems.length - 1)
    );

    this._updateConfig({
      entities: nextItems,
    });
  }

  _moveStatusItem(index, direction) {
    const items = this._getStatusItems();
    const nextIndex = index + direction;

    if (
      nextIndex < 0 ||
      nextIndex >= items.length
    ) {
      return;
    }

    const nextItems = [...items];
    const [item] = nextItems.splice(index, 1);
    nextItems.splice(nextIndex, 0, item);

    this._selectedStatusIndex = nextIndex;
    this._updateConfig({
      main_entity: undefined,
      accent_on_color: undefined,
      accent_off_color: undefined,
      main_entity_icon: undefined,
      main_entity_icon_on: undefined,
      main_entity_icon_off: undefined,
      state_template: undefined,
      label_template: undefined,
      tap_action: undefined,
      main_entity_tap_action: undefined,
      main_entity_hold_action: undefined,
      entities: nextItems,
    });
  }

  _updateStatusItem(index, changes) {
    const items = this._getStatusItems();
    const nextItem = {
      ...(items[index] || {}),
      ...changes,
    };

    if (changes.entity === "") {
      cleanClearedStatusItem(nextItem);
    }

    if (Array.isArray(this._config?.entities)) {
      const nextItems = [...items];
      nextItems[index] = nextItem;

      const configChanges = {
        entities: nextItems,
      };

      if (nextItems.length > 1) {
        configChanges.main_entity = undefined;
        configChanges.accent_on_color = undefined;
        configChanges.accent_off_color = undefined;
        configChanges.main_entity_icon = undefined;
        configChanges.main_entity_icon_on = undefined;
        configChanges.main_entity_icon_off = undefined;
        configChanges.state_template = undefined;
        configChanges.label_template = undefined;
        configChanges.tap_action = undefined;
        configChanges.main_entity_tap_action = undefined;
        configChanges.main_entity_hold_action = undefined;
      }

      this._updateConfig(configChanges);
      return;
    }

    if (changes.entity === "") {
      this._updateConfig({
        main_entity: "",
        accent_on_color: undefined,
        accent_off_color: undefined,
        main_entity_icon: undefined,
        main_entity_icon_on: undefined,
        main_entity_icon_off: undefined,
        state_template: undefined,
        label_template: undefined,
        tap_action: undefined,
        main_entity_tap_action: undefined,
        main_entity_hold_action: undefined,
      });
      return;
    }

    this._updateConfig({
      main_entity: nextItem.entity || "",
      accent_on_color: nextItem.accent_on_color || "",
      accent_off_color: nextItem.accent_off_color || "",
      main_entity_icon: nextItem.main_entity_icon || "",
      main_entity_icon_on: nextItem.main_entity_icon_on || "",
      main_entity_icon_off: nextItem.main_entity_icon_off || "",
      state_template: nextItem.state_template || "",
      label_template: nextItem.label_template || "",
      tap_action: nextItem.tap_action,
      main_entity_tap_action: nextItem.main_entity_tap_action,
      main_entity_hold_action: nextItem.main_entity_hold_action,
    });
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

  _renderColorControl(label, pickerKey, value, onUpdate) {
    return renderColorControl.call(
      this,
      label,
      pickerKey,
      value,
      onUpdate
    );
  }

  _renderEntity(label, key) {
    return renderEntity.call(this, label, key);
  }

  _renderActionSelector(label, key, defaultAction) {
    return renderActionSelector.call(this, label, key, defaultAction);
  }

  _renderStatusItemActionSelector(label, key, index, defaultAction) {
    const items = this._getStatusItems();
    const item = items[index] || {};
    const scopedEditor = {
      _config: item,
      _updateConfig: (changes) =>
        this._updateStatusItem(index, changes),
    };

    return renderActionSelector.call(
      scopedEditor,
      label,
      key,
      defaultAction
    );
  }

  _renderArea(label, key) {
    return renderArea.call(this, label, key);
  }

  _renderIconInput(label, key, placeholder = "mdi:information-outline or icon.svg") {
    return renderIconInput.call(this, label, key, placeholder);
  }

  _loadLocalIconFiles(currentIcon = "") {
    return loadLocalIconFiles.call(this, currentIcon);
  }

  _renderStatusItemIconInput(label, key, index, placeholder = "mdi:information-outline or icon.svg") {
    const items = this._getStatusItems();
    const item = items[index] || {};
    const scopedEditor = {
      _config: item,
      _iconPickerPrefix: `status-${index}-icon`,
      _isImageIcon: (icon) => this._isImageIcon(icon),
      _resolveIconPath: (path) => this._resolveIconPath(path),
      _getInlineSvg: (path) => this._getInlineSvg(path),
      _loadLocalIconFiles: (currentIcon) =>
        this._loadLocalIconFiles(currentIcon),
      requestUpdate: () => this.requestUpdate(),
      renderRoot: this.renderRoot,
      _handleConfigUpdate: (fieldKey, value) =>
        this._updateStatusItem(index, {
          [fieldKey]: value,
        }),
    };

    Object.defineProperties(scopedEditor, {
      _iconPickerKey: {
        get: () => this._iconPickerKey,
        set: (value) => {
          this._iconPickerKey = value;
        },
      },
      _iconPickerTab: {
        get: () => this._iconPickerTab,
        set: (value) => {
          this._iconPickerTab = value;
        },
      },
      _localIconFiles: {
        get: () => this._localIconFiles,
        set: (value) => {
          this._localIconFiles = value;
        },
      },
      _orbitIconFiles: {
        get: () => this._orbitIconFiles,
        set: (value) => {
          this._orbitIconFiles = value;
        },
      },
      _localIconFilesLoading: {
        get: () => this._localIconFilesLoading,
        set: (value) => {
          this._localIconFilesLoading = value;
        },
      },
      _orbitIconFilesLoading: {
        get: () => this._orbitIconFilesLoading,
        set: (value) => {
          this._orbitIconFilesLoading = value;
        },
      },
    });

    return renderIconInput.call(
      scopedEditor,
      label,
      key,
      placeholder
    );
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

  _renderStatusSection() {
    return renderStatusSection.call(this);
  }

  render() {
    return html`
      <div class="wrapper">
        ${this._renderStatusSection()}
        <div class="editor-version">
          Orbit Status Card v${CARD_VERSIONS.status}
        </div>
      </div>
    `;
  }

  static styles = [
    editorStyles,
    css`
      .status-wrap-toggle {
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 1;
      }

      .status-wrap-toggle input {
        width: auto;
        margin: 0;
      }

      .status-group-options {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }

      .status-tabs {
        display: flex;
        align-items: end;
        gap: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        margin-bottom: 12px;
        overflow-x: auto;
      }

      .status-tab,
      .status-tab-add {
        border: none;
        background: transparent;
        color: inherit;
        min-width: 44px;
        height: 42px;
        padding: 0 12px;
        font: inherit;
        font-weight: 700;
        opacity: 0.6;
        cursor: pointer;
      }

      .status-tab.active {
        color: var(--primary-color);
        opacity: 1;
        border-bottom: 3px solid var(--primary-color);
      }

      .status-tab-add {
        margin-left: auto;
        font-size: 24px;
        opacity: 0.9;
      }

      .status-editor-tools {
        display: flex;
        gap: 8px;
        margin-left: auto;
        justify-content: flex-end;
      }

      .status-tool-button {
        width: 44px;
        height: 44px;
        border: none;
        border-radius: 10px;
        background: var(--card-background-color);
        color: inherit;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .status-tool-button:disabled {
        opacity: 0.35;
        cursor: default;
      }

      .status-tool-button ha-icon {
        --mdc-icon-size: 22px;
      }

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
  "orbit-status-card-editor",
  OrbitStatusCardEditor
);

function cleanClearedStatusItem(item) {
  item.accent_on_color = undefined;
  item.accent_off_color = undefined;
  item.main_entity_icon = undefined;
  item.main_entity_icon_on = undefined;
  item.main_entity_icon_off = undefined;
  item.state_template = undefined;
  item.label_template = undefined;
  item.tap_action = undefined;
  item.main_entity_tap_action = undefined;
  item.main_entity_hold_action = undefined;
}
