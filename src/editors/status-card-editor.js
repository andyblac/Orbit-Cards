// ==========================================
// Orbit Status Card Editor
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
  renderNumberInput,
  renderTemplateInput,
  clearEntityConfig,
  clearKeys,
  connectEditorPopoverClose,
  disconnectEditorPopoverClose,
  getInlineSvg,
  mergeConfig,
  resolveIconPath,
  renderIconInput,
  loadLocalIconFiles,
} from "../common/editor/helpers/helpers.js";

import { renderStatusSection } from "./status/sections/status.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import { statusEditorStyles } from "../common/editor/styles/status-editor.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";
import { localize } from "../common/localize.js";
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
    _iconFileSearch: { state: true },
    _iconFilePickerOpen: { state: true },
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
    this._iconFileSearch = "";
    this._iconFilePickerOpen = false;
    this._orbitIconFiles = [];
    this._orbitIconFilesLoading = false;
    this._localIconFiles = [];
    this._localIconFilesLoading = false;
  }

  connectedCallback() {
    super.connectedCallback();
    connectEditorPopoverClose(this);
  }

  disconnectedCallback() {
    disconnectEditorPopoverClose(this);
    super.disconnectedCallback();
  }

  _getColorStyle(value) {
    return getColorStyle(value);
  }

  _getColorPickerValue(value) {
    return getColorPickerValue(value);
  }

  _t(key, replacements) {
    return localize(this.hass, key, replacements);
  }

  setConfig(config) {
    this._config = config || {};
    this._selectedStatusIndex = Math.min(
      this._selectedStatusIndex || 0,
      this._getStatusItems(config).length - 1
    );
  }

  _updateConfig(changes) {
    this._config = orderStatusConfig(
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
      this._updateConfig(clearEntityConfig(
        "tracker_entity",
        TRACKER_ENTITY_DEPENDENT_KEYS
      ));
      return;
    }

    this._handleConfigUpdate(key, value);
  }

  _clearMainEntity() {
    if (this._config?.mode === "person") {
      this._updateConfig(clearEntityConfig(
        "main_entity",
        PERSON_ENTITY_DEPENDENT_KEYS
      ));
      return;
    }

    this._updateConfig(clearEntityConfig(
      "main_entity",
      STATUS_ENTITY_DEPENDENT_KEYS
    ));
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
        main_entity_icon_source: config?.main_entity_icon_source || "",
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
    this._updateConfig(clearKeys(
      STATUS_GROUP_ROOT_KEYS,
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

  _removeStatusItem(index) {
    const items = this._getStatusItems();

    if (items.length <= 1) {
      this._updateConfig(clearEntityConfig(
        "main_entity",
        STATUS_ENTITY_DEPENDENT_KEYS
      ));
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
    this._updateConfig(clearKeys(
      STATUS_GROUP_ROOT_KEYS,
      { entities: nextItems }
    ));
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
        Object.assign(
          configChanges,
          clearKeys(STATUS_GROUP_ROOT_KEYS)
        );
      }

      this._updateConfig(configChanges);
      return;
    }

    if (changes.entity === "") {
      this._updateConfig(clearEntityConfig(
        "main_entity",
        STATUS_ENTITY_DEPENDENT_KEYS
      ));
      return;
    }

    this._updateConfig({
      main_entity: nextItem.entity || "",
      accent_on_color: nextItem.accent_on_color || "",
      accent_off_color: nextItem.accent_off_color || "",
      main_entity_icon_source: nextItem.main_entity_icon_source || "",
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

  _renderInput(label, key, placeholder = "", options = {}) {
    return renderInput.call(this, label, key, placeholder, options);
  }

  _renderTemplateInput(label, key, options = {}) {
    return renderTemplateInput.call(this, label, key, options);
  }

  _renderNumberInput(label, key, options = {}) {
    return renderNumberInput.call(this, label, key, options);
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

  _renderEntity(label, key, replacements) {
    return renderEntity.call(this, label, key, replacements);
  }

  _renderActionSelector(label, key, defaultAction) {
    return renderActionSelector.call(this, label, key, defaultAction);
  }

  _renderStatusItemActionSelector(label, key, index, defaultAction) {
    const items = this._getStatusItems();
    const item = items[index] || {};
    const scopedEditor = {
      hass: this.hass,
      _config: item,
      _t: (key, replacements) =>
        this._t(key, replacements),
      requestUpdate: () => this.requestUpdate(),
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
      hass: this.hass,
      _config: item,
      _iconPickerPrefix: `status-${index}-icon`,
      _t: (translationKey, replacements) =>
        this._t(translationKey, replacements),
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
          ${this._t("Orbit Status Card v{version}", {
            version: CARD_VERSIONS.status,
          })}
        </div>
      </div>
    `;
  }

  static styles = [
    editorStyles,
    statusEditorStyles,
  ];
}

customElements.define(
  "orbit-status-card-editor",
  OrbitStatusCardEditor
);

function cleanClearedStatusItem(item) {
  Object.assign(
    item,
    clearKeys(STATUS_ENTITY_DEPENDENT_KEYS)
  );
}

const STATUS_ENTITY_DEPENDENT_KEYS = [
  "accent_on_color",
  "accent_off_color",
  "main_entity_icon_source",
  "main_entity_icon",
  "main_entity_icon_on",
  "main_entity_icon_off",
  "state_template",
  "label_template",
  "tap_action",
  "main_entity_tap_action",
  "main_entity_hold_action",
];

const STATUS_GROUP_ROOT_KEYS = [
  "main_entity",
  ...STATUS_ENTITY_DEPENDENT_KEYS,
];

const PERSON_ENTITY_DEPENDENT_KEYS = [
  "tracker_entity",
  "eta_entity",
  "battery_entity_1",
  "battery_entity_2",
  "accent_on_color",
  "accent_off_color",
  "tap_action",
  "main_entity_tap_action",
  "main_entity_hold_action",
];

const TRACKER_ENTITY_DEPENDENT_KEYS = [
  "eta_entity",
];

const STATUS_ITEM_KEYS = [
  "entity",
  "accent_on_color",
  "accent_off_color",
  "main_entity_icon_source",
  "main_entity_icon",
  "main_entity_icon_on",
  "main_entity_icon_off",
  "main_entity_icon_svg_color_override",
  "main_entity_icon_on_svg_color_override",
  "main_entity_icon_off_svg_color_override",
  "state_template",
  "label_template",
  "tap_action",
  "main_entity_tap_action",
  "main_entity_hold_action",
];

const STATUS_CONFIG_ORDER = [
  "type",
  "mode",
  "status_name",
  "main_entity",
  "tracker_entity",
  "eta_entity",
  "battery_entity_1",
  "battery_entity_2",
  "accent_on_color",
  "accent_off_color",
  "main_entity_icon_source",
  "main_entity_icon",
  "main_entity_icon_on",
  "main_entity_icon_off",
  "main_entity_icon_svg_color_override",
  "main_entity_icon_on_svg_color_override",
  "main_entity_icon_off_svg_color_override",
  "state_template",
  "label_template",
  "tap_action",
  "main_entity_tap_action",
  "main_entity_hold_action",
  "wrap",
  "items_per_row",
  "separate_cards",
  "entities",
  "grid_options",
  "view_layout",
];

function orderStatusConfig(config) {
  const ordered = {};
  const usedKeys = new Set();

  STATUS_CONFIG_ORDER.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      ordered[key] =
        key === "entities" && Array.isArray(config[key])
          ? config[key].map(orderStatusItem)
          : config[key];
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

function orderStatusItem(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return item;
  }

  return orderObjectKeys(item, STATUS_ITEM_KEYS);
}

function orderObjectKeys(config, keyOrder) {
  const ordered = {};
  const usedKeys = new Set();

  keyOrder.forEach((key) => {
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
