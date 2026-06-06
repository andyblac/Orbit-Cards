// ==========================================
// Orbit Action Card Editor
// ==========================================

import { LitElement, html } from "lit";

import {
  getColorStyle,
  getColorPickerValue,
  isImageIcon,
  renderActionSelector,
  renderColor,
  renderColorControl,
  renderEntity,
  clearEntityConfig,
  clearKeys,
  getInlineSvg,
  mergeConfig,
  resolveIconPath,
  renderIconInput,
  loadLocalIconFiles,
} from "../common/editor/helpers/helpers.js";

import { renderActionSection } from "./action/sections/action.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import { actionEditorStyles } from "../common/editor/styles/action-editor.js";
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
    _orbitIconFiles: { state: true },
    _orbitIconFilesLoading: { state: true },
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
    this._orbitIconFiles = [];
    this._orbitIconFilesLoading = false;
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
    this._config = mergeConfig(this._config, changes);

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
    this._updateConfig(clearKeys(
      ACTION_GROUP_ROOT_KEYS,
      {
        entities: [
          ...items,
          {
            entity: "",
          },
        ],
      }
    ));
  }

  _removeActionItem(index) {
    const items = this._getActionItems();

    if (items.length <= 1) {
      this._updateConfig(clearEntityConfig(
        "main_entity",
        ACTION_ENTITY_DEPENDENT_KEYS
      ));
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
    this._updateConfig(clearKeys(
      ACTION_GROUP_ROOT_KEYS,
      { entities: nextItems }
    ));
  }

  _updateActionItem(index, changes) {
    const items = this._getActionItems();
    const nextItem = {
      ...(items[index] || {}),
      ...changes,
    };

    if (changes.entity === "") {
      cleanClearedActionItem(nextItem);
    }

    if (Array.isArray(this._config?.entities)) {
      const nextItems = [...items];
      nextItems[index] = nextItem;

      const configChanges = {
        entities: nextItems,
      };

      if (nextItems.length > 1) {
        Object.assign(
          configChanges,
          clearKeys(ACTION_GROUP_ROOT_KEYS)
        );
      }

      this._updateConfig(configChanges);
      return;
    }

    if (changes.entity === "") {
      this._updateConfig(clearEntityConfig(
        "main_entity",
        ACTION_ENTITY_DEPENDENT_KEYS
      ));
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
    actionEditorStyles,
  ];
}

customElements.define(
  "orbit-action-card-editor",
  OrbitActionCardEditor
);

function cleanClearedActionItem(item) {
  Object.assign(
    item,
    clearKeys(ACTION_ENTITY_DEPENDENT_KEYS)
  );
}

const ACTION_ENTITY_DEPENDENT_KEYS = [
  "accent_color",
  "main_entity_icon",
  "tap_action",
  "hold_action",
];

const ACTION_GROUP_ROOT_KEYS = [
  "main_entity",
  ...ACTION_ENTITY_DEPENDENT_KEYS,
];
