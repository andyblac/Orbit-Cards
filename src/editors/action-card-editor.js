// ==========================================
// Orbit Action Card Editor
// ==========================================

import { LitElement, css, html } from "lit";

import {
  getColorStyle,
  getColorPickerValue,
  isImageIcon,
  renderActionSelector,
  renderColor,
  renderColorControl,
  renderEntity,
  getInlineSvg,
  resolveIconPath,
  renderIconInput,
  loadLocalIconFiles,
} from "../common/editor/helpers/helpers.js";

import { renderActionSection } from "./action/sections/action.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";
import { CARD_VERSIONS } from "../version.js";

class OrbitActionCardEditor extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _selectedActionIndex: { state: true },
    _actionEntityDomainFilter: { state: true },
    _colorPickerKey: { state: true },
    _colorPickerTab: { state: true },
    _iconPickerKey: { state: true },
    _iconPickerTab: { state: true },
    _localIconFiles: { state: true },
    _localIconFilesLoading: { state: true },
  };

  constructor() {
    super();
    this._config = this._config || {};
    this._selectedActionIndex = 0;
    this._actionEntityDomainFilter = "all";
    this._colorPickerKey = "";
    this._colorPickerTab = "picker";
    this._iconPickerKey = "";
    this._iconPickerTab = "ha";
    this._localIconFiles = [];
    this._localIconFilesLoading = false;
  }

  setConfig(config) {
    this._config = config || {};
    this._selectedActionIndex = Math.min(
      this._selectedActionIndex || 0,
      this._getActionItems(config).length - 1
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

  _handleConfigUpdate(key, value) {
    this._updateConfig({ [key]: value });
  }

  _getActionItems(config = this._config) {
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
        accent_color: config?.accent_color || "",
        main_entity_icon: config?.main_entity_icon || "",
        tap_action: config?.tap_action,
        hold_action: config?.hold_action,
      },
    ];
  }

  _selectActionItem(index) {
    this._selectedActionIndex = index;
  }

  _addActionItem() {
    const items = this._getActionItems();

    this._selectedActionIndex = items.length;
    this._updateConfig({
      main_entity: undefined,
      accent_color: undefined,
      main_entity_icon: undefined,
      tap_action: undefined,
      hold_action: undefined,
      entities: [
        ...items,
        {
          entity: "",
        },
      ],
    });
  }

  _removeActionItem(index) {
    const items = this._getActionItems();

    if (items.length <= 1) {
      this._updateConfig({
        main_entity: "",
        main_entity_icon: "",
        tap_action: undefined,
        hold_action: undefined,
      });
      return;
    }

    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    this._selectedActionIndex = Math.max(
      0,
      Math.min(index, nextItems.length - 1)
    );

    this._updateConfig({
      entities: nextItems,
    });
  }

  _moveActionItem(index, direction) {
    const items = this._getActionItems();
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

    this._selectedActionIndex = nextIndex;
    this._updateConfig({
      main_entity: undefined,
      accent_color: undefined,
      main_entity_icon: undefined,
      tap_action: undefined,
      hold_action: undefined,
      entities: nextItems,
    });
  }

  _updateActionItem(index, changes) {
    const items = this._getActionItems();
    const nextItem = {
      ...(items[index] || {}),
      ...changes,
    };

    if (Array.isArray(this._config?.entities)) {
      const nextItems = [...items];
      nextItems[index] = nextItem;

      const changes = {
        entities: nextItems,
      };

      if (nextItems.length > 1) {
        changes.main_entity = undefined;
        changes.accent_color = undefined;
        changes.main_entity_icon = undefined;
        changes.tap_action = undefined;
        changes.hold_action = undefined;
      }

      this._updateConfig(changes);
      return;
    }

    this._updateConfig({
      main_entity: nextItem.entity || "",
      accent_color: nextItem.accent_color || "",
      main_entity_icon: nextItem.main_entity_icon || "",
      tap_action: nextItem.tap_action,
      hold_action: nextItem.hold_action,
    });
  }

  _getColorStyle(value) {
    return getColorStyle(value);
  }

  _getColorPickerValue(value) {
    return getColorPickerValue(value);
  }

  _renderActionSelector(label, key, defaultAction) {
    return renderActionSelector.call(this, label, key, defaultAction);
  }

  _renderActionItemActionSelector(label, key, index, defaultAction) {
    const items = this._getActionItems();
    const item = items[index] || {};
    const scopedEditor = {
      _config: item,
      _updateConfig: (changes) =>
        this._updateActionItem(index, changes),
    };

    return renderActionSelector.call(
      scopedEditor,
      label,
      key,
      defaultAction
    );
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

  _renderIconInput(label, key, placeholder = "mdi:palette or icon.svg") {
    return renderIconInput.call(this, label, key, placeholder);
  }

  _loadLocalIconFiles(currentIcon = "") {
    return loadLocalIconFiles.call(this, currentIcon);
  }

  _renderActionItemIconInput(label, key, index, placeholder = "mdi:palette or icon.svg") {
    const items = this._getActionItems();
    const item = items[index] || {};
    const scopedEditor = {
      _config: item,
      _iconPickerPrefix: `action-${index}-icon`,
      _isImageIcon: (icon) => this._isImageIcon(icon),
      _resolveIconPath: (path) => this._resolveIconPath(path),
      _getInlineSvg: (path) => this._getInlineSvg(path),
      _loadLocalIconFiles: (currentIcon) =>
        this._loadLocalIconFiles(currentIcon),
      requestUpdate: () => this.requestUpdate(),
      renderRoot: this.renderRoot,
      _handleConfigUpdate: (fieldKey, value) =>
        this._updateActionItem(index, {
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
      _localIconFilesLoading: {
        get: () => this._localIconFilesLoading,
        set: (value) => {
          this._localIconFilesLoading = value;
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

  _renderActionSection() {
    return renderActionSection.call(this);
  }

  render() {
    return html`
      <div class="wrapper">
        ${this._renderActionSection()}
        <div class="editor-version">
          Orbit Action Card v${CARD_VERSIONS.action}
        </div>
      </div>
    `;
  }

  static styles = [
    editorStyles,
    css`
      .action-tabs {
        display: flex;
        align-items: end;
        gap: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        margin-bottom: 12px;
        overflow-x: auto;
      }

      .action-group-options {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }

      .action-wrap-toggle {
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 1;
      }

      .action-wrap-toggle input {
        width: auto;
        margin: 0;
      }

      .action-tab,
      .action-tab-add {
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

      .action-tab.active {
        color: var(--primary-color);
        opacity: 1;
        border-bottom: 3px solid var(--primary-color);
      }

      .action-tab-add {
        margin-left: auto;
        font-size: 24px;
        opacity: 0.9;
      }

      .action-editor-tools {
        display: flex;
        gap: 8px;
        margin-left: auto;
        justify-content: flex-end;
      }

      .action-domain-filters {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin: 0 0 10px;
      }

      .action-domain-filters button {
        min-height: 32px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 7px;
        padding: 0 12px;
        background: rgba(255, 255, 255, 0.04);
        color: inherit;
        font: inherit;
        font-size: 13px;
        cursor: pointer;
      }

      .action-domain-filters button.active {
        border-color: var(--primary-color);
        background: color-mix(
          in srgb,
          var(--primary-color) 18%,
          transparent
        );
        color: var(--primary-color);
      }

      .action-tool-button {
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

      .action-tool-button:disabled {
        opacity: 0.35;
        cursor: default;
      }

      .action-tool-button ha-icon {
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
  "orbit-action-card-editor",
  OrbitActionCardEditor
);
