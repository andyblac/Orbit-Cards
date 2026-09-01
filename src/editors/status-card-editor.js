// ==========================================
// Orbit Status Card Editor
// ==========================================

import { LitElement, html } from "lit";

import {
  getColorStyle,
  getColorPickerValue,
  isImageIcon,
  renderInteractionsSection,
  renderEntity,
  renderArea,
  renderColor,
  renderColorControl,
  renderColorPair,
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
import {
  migrateStatusCardConfig,
} from "../common/helpers/config-migration.js";
import { localize } from "../common/localize.js";
import { CARD_VERSIONS } from "../version.js";
import {
  updateEditorDocumentationContext,
} from "../common/helpers/documentation.js";
import {
  CURRENT_ACTIVITY_ACTION,
  getStatusBadgeStateSource,
  loadStatusBadgeDeviceClasses,
  pickStatusSourceConfig,
} from "../common/helpers/status-badge.js";
import {
  cleanClearedStatusItem,
  getCustomStatusActionLabel,
  hasLegacyStatusPresentationConfig,
  orderStatusConfig,
  PERSON_ENTITY_DEPENDENT_KEYS,
  STATUS_ENTITY_DEPENDENT_KEYS,
  STATUS_GROUP_ROOT_KEYS,
  TRACKER_ENTITY_DEPENDENT_KEYS,
} from "./status/config.js";

export const STATUS_PREVIEW_SELECTED_INDEX = Symbol.for(
  "orbit-status-card-preview-selected-index"
);

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
    _statusStateTypeExpanded: { state: true },
    _statusContentExpanded: { state: true },
    _deviceClassRevision: { state: true },
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
    this._statusStateTypeExpanded = false;
    this._statusContentExpanded = false;
    this._deviceClassRevision = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    connectEditorPopoverClose(this);
    updateEditorDocumentationContext(this, "orbit-status-card");
  }

  disconnectedCallback() {
    disconnectEditorPopoverClose(this);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has("hass")) this._loadDeviceClasses();
  }

  _loadDeviceClasses() {
    const connection = this.hass?.connection;
    if (!connection || connection === this._deviceClassConnection) return;

    this._deviceClassConnection = connection;
    loadStatusBadgeDeviceClasses(this.hass).then(() => {
      if (this._deviceClassConnection === connection) {
        this._deviceClassRevision += 1;
      }
    });
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
    const presentationMigrated = hasLegacyStatusPresentationConfig(
      config || {}
    );
    const {
      config: migratedConfig,
      migrated,
    } = migrateStatusCardConfig(config || {});

    this._config = orderStatusConfig(migratedConfig || {});
    this._selectedStatusIndex = Math.min(
      this._selectedStatusIndex || 0,
      this._getStatusItems(this._config).length - 1
    );

    if (migrated || presentationMigrated) {
      this._queueConfigMigration();
    }
  }

  _queueConfigMigration() {
    if (this._configMigrationQueued) return;

    this._configMigrationQueued = true;
    Promise.resolve().then(() => {
      this._configMigrationQueued = false;

      this.dispatchEvent(new CustomEvent("config-changed", {
        detail: {
          config: this._getPreviewConfig(
            orderStatusConfig(this._config)
          ),
        },
        bubbles: true,
        composed: true,
      }));
    });
  }

  _updateConfig(changes) {
    this._config = orderStatusConfig(
      mergeConfig(this._config, changes)
    );

    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: {
        config: this._getPreviewConfig(),
      },
      bubbles: true,
      composed: true,
    }));
  }

  _getPreviewConfig(config = this._config) {
    return {
      ...config,
      [STATUS_PREVIEW_SELECTED_INDEX]: this._selectedStatusIndex || 0,
    };
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

    if (
      key === "entity" &&
      getStatusBadgeStateSource(this._config) !== "entity"
    ) {
      this._handleConfigUpdate(key, value);
      return;
    }

    if (key === "entity") {
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
        "entity",
        PERSON_ENTITY_DEPENDENT_KEYS
      ));
      return;
    }

    this._updateConfig(clearEntityConfig(
      "entity",
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
        entity: config?.entity || "",
        ...pickStatusSourceConfig(config),
        color_source: config?.color_source ||
          config?.accent_color_source || "",
        color: config?.color || config?.accent_color || "",
        accent_color_source: config?.accent_color_source || "",
        accent_color: config?.accent_color || "",
        color_on: config?.color_on || "",
        color_off: config?.color_off || "",
        icon_source: config?.icon_source ||
          config?.entity_icon_source || "",
        icon: config?.icon || config?.entity_icon || "",
        icon_on: config?.icon_on || config?.entity_icon_on || "",
        icon_off: config?.icon_off || config?.entity_icon_off || "",
        entity_icon_source: config?.entity_icon_source || "",
        entity_icon_template: config?.entity_icon_template || "",
        entity_icon: config?.entity_icon || "",
        entity_icon_on: config?.entity_icon_on || "",
        entity_icon_off: config?.entity_icon_off || "",
        state_template: config?.state_template || "",
        label_template: config?.label_template || "",
        name_template: config?.name_template || "",
        tap_action: config?.tap_action,
        hold_action: config?.hold_action,
        double_tap_action: config?.double_tap_action,
        entity_tap_action: config?.entity_tap_action,
        entity_hold_action: config?.entity_hold_action,
        entity_double_tap_action:
          config?.entity_double_tap_action,
      },
    ];
  }

  _handleStatusModeChange(nextMode) {
    if (this._config?.mode === "icon_only" && nextMode === "standard") {
      const items = this._getStatusItems();
      const selectedIndex = Math.min(
        this._selectedStatusIndex || 0,
        items.length - 1
      );
      const item = items[selectedIndex] || {};

      this._updateConfig({
        ...clearKeys(STATUS_GROUP_ROOT_KEYS),
        mode: nextMode,
        entities: undefined,
        entity: item.entity || undefined,
        ...pickStatusSourceConfig(item),
        color_source: item.color_source,
        color: item.color,
        accent_color_source: item.accent_color_source,
        accent_color: item.accent_color,
        color_on: item.color_on,
        color_off: item.color_off,
        icon_source: item.icon_source,
        icon: item.icon,
        icon_on: item.icon_on,
        icon_off: item.icon_off,
        entity_icon_source: item.entity_icon_source,
        entity_icon_template: item.entity_icon_template,
        entity_icon: item.entity_icon,
        entity_icon_on: item.entity_icon_on,
        entity_icon_off: item.entity_icon_off,
        state_template: item.state_template,
        label_template: item.label_template,
        name_template: item.name_template,
        tap_action: item.tap_action,
        hold_action: item.hold_action,
        double_tap_action: item.double_tap_action,
        entity_tap_action: item.entity_tap_action,
        entity_hold_action: item.entity_hold_action,
        entity_double_tap_action:
          item.entity_double_tap_action,
      });
      return;
    }

    this._updateConfig({
      mode: nextMode,
      ...(nextMode === "icon_only" ? {} : { entities: undefined }),
    });
  }

  _selectStatusItem(index) {
    this._selectedStatusIndex = index;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: {
        config: this._getPreviewConfig(),
      },
      bubbles: true,
      composed: true,
    }));
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

  _duplicateStatusItem(index) {
    const items = this._getStatusItems();
    const item = items[index];

    if (!item) {
      return;
    }

    const nextItems = [...items];
    nextItems.splice(index + 1, 0, structuredClone(item));

    this._selectedStatusIndex = index + 1;
    this._updateConfig(clearKeys(
      STATUS_GROUP_ROOT_KEYS,
      { entities: nextItems }
    ));
  }

  _removeStatusItem(index) {
    const items = this._getStatusItems();

    if (items.length <= 1) {
      this._updateConfig(clearEntityConfig(
        "entity",
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

    if (
      changes.entity === "" &&
      getStatusBadgeStateSource(nextItem) === "entity"
    ) {
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

    if (
      changes.entity === "" &&
      getStatusBadgeStateSource(nextItem) === "entity"
    ) {
      this._updateConfig(clearEntityConfig(
        "entity",
        STATUS_ENTITY_DEPENDENT_KEYS
      ));
      return;
    }

    this._updateConfig({
      entity: nextItem.entity || "",
      ...pickStatusSourceConfig(nextItem),
      color_source: nextItem.color_source || "",
      color: nextItem.color || "",
      accent_color_source: nextItem.accent_color_source || "",
      accent_color: nextItem.accent_color || "",
      color_on: nextItem.color_on || "",
      color_off: nextItem.color_off || "",
      icon_source: nextItem.icon_source || "",
      icon: nextItem.icon || "",
      icon_on: nextItem.icon_on || "",
      icon_off: nextItem.icon_off || "",
      entity_icon_source: nextItem.entity_icon_source || "",
      entity_icon_template: nextItem.entity_icon_template || "",
      entity_icon: nextItem.entity_icon || "",
      entity_icon_on: nextItem.entity_icon_on || "",
      entity_icon_off: nextItem.entity_icon_off || "",
      state_template: nextItem.state_template || "",
      label_template: nextItem.label_template || "",
      name_template: nextItem.name_template || "",
      tap_action: nextItem.tap_action,
      hold_action: nextItem.hold_action,
      double_tap_action: nextItem.double_tap_action,
      entity_tap_action: nextItem.entity_tap_action,
      entity_hold_action: nextItem.entity_hold_action,
      entity_double_tap_action:
        nextItem.entity_double_tap_action,
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

  _renderColor(label, key, previewValue) {
    return renderColor.call(this, label, key, previewValue);
  }

  _renderColorControl(label, pickerKey, value, onUpdate, previewValue) {
    return renderColorControl.call(
      this,
      label,
      pickerKey,
      value,
      onUpdate,
      previewValue
    );
  }

  _renderColorPair(options) {
    return renderColorPair.call(this, options);
  }

  _renderEntity(label, key, replacements) {
    return renderEntity.call(this, label, key, replacements);
  }

  _renderStatusItemInteractions(
    index,
    item,
    cardActionDefault,
    mainEntityActionDefault
  ) {
    const scopedEditor = {
      hass: this.hass,
      _config: item,
      _t: (key, replacements) =>
        this._t(key, replacements),
      requestUpdate: () => this.requestUpdate(),
      _updateConfig: (changes) =>
        this._updateStatusItem(index, changes),
    };

    return renderInteractionsSection.call(scopedEditor, {
      interactions: [
        {
          key: "tap_action",
          formKey: "tap_action",
          label: "Tap behavior",
          defaultAction: cardActionDefault,
          customActions: [CURRENT_ACTIVITY_ACTION],
          defaultVisible: true,
          customDefaultLabel: getCustomStatusActionLabel(
            cardActionDefault
          ),
        },
        {
          key: "hold_action",
          formKey: "hold_action",
          label: "Hold behavior",
          defaultAction: "none",
          customActions: [CURRENT_ACTIVITY_ACTION],
        },
        {
          key: "double_tap_action",
          formKey: "double_tap_action",
          label: "Double tap behavior",
          defaultAction: "none",
          customActions: [CURRENT_ACTIVITY_ACTION],
        },
        {
          key: "entity_tap_action",
          formKey: "icon_tap_action",
          label: "Icon tap behavior",
          defaultAction: mainEntityActionDefault,
          customActions: [CURRENT_ACTIVITY_ACTION],
          customDefaultLabel: getCustomStatusActionLabel(
            mainEntityActionDefault
          ),
        },
        {
          key: "entity_hold_action",
          formKey: "icon_hold_action",
          label: "Icon hold behavior",
          defaultAction: "none",
          customActions: [CURRENT_ACTIVITY_ACTION],
        },
        {
          key: "entity_double_tap_action",
          formKey: "icon_double_tap_action",
          label: "Icon double tap behavior",
          defaultAction: "none",
          customActions: [CURRENT_ACTIVITY_ACTION],
        },
      ],
      context: {
        entity_id: item.entity,
        area_id: this._config?.area,
      },
    });
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

if (!customElements.get("orbit-status-card-editor")) {
  customElements.define(
    "orbit-status-card-editor",
    OrbitStatusCardEditor
  );
}
