// ==========================================
// Orbit Action Card Editor
// ==========================================

import { LitElement, css, html } from "lit";

import {
  getColorStyle,
  isImageIcon,
  renderActionSelector,
  renderColor,
  renderEntity,
  getInlineSvg,
  resolveIconPath,
  renderIconInput,
} from "../common/editor/helpers/helpers.js";

import { renderActionSection } from "./action/sections/action.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";

class OrbitActionCardEditor extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _selectedActionIndex: { state: true },
  };

  constructor() {
    super();
    this._config = this._config || {};
    this._selectedActionIndex = 0;
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

  _renderEntity(label, key) {
    return renderEntity.call(this, label, key);
  }

  _renderIconInput(label, key, placeholder = "mdi:palette or icon.svg") {
    return renderIconInput.call(this, label, key, placeholder);
  }

  _renderActionItemIconInput(label, key, index, placeholder = "mdi:palette or icon.svg") {
    const items = this._getActionItems();
    const item = items[index] || {};
    const scopedEditor = {
      _config: item,
      _isImageIcon: (icon) => this._isImageIcon(icon),
      _resolveIconPath: (path) => this._resolveIconPath(path),
      _getInlineSvg: (path) => this._getInlineSvg(path),
      _handleConfigUpdate: (fieldKey, value) =>
        this._updateActionItem(index, {
          [fieldKey]: value,
        }),
    };

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
    return getInlineSvg.call(this, path);
  }

  _renderActionSection() {
    return renderActionSection.call(this);
  }

  render() {
    return html`
      <div class="wrapper">
        ${this._renderActionSection()}
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
        justify-content: flex-end;
        margin-bottom: 4px;
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
    `,
  ];
}

customElements.define(
  "orbit-action-card-editor",
  OrbitActionCardEditor
);
