import { LitElement, css, html } from "lit";

import {
  connectEditorPopoverClose,
  disconnectEditorPopoverClose,
  getColorPickerValue,
  getColorStyle,
  getInlineSvg,
  isImageIcon,
  loadLocalIconFiles,
  mergeConfig,
  renderColor,
  renderColorPair,
  renderIconInput,
  resolveIconPath,
} from "../common/editor/helpers/helpers.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import { renderInteractionsSection } from "../common/editor/helpers/renders.js";
import { updateEditorDocumentationContext } from "../common/helpers/documentation.js";
import { sharedSvgCache } from "../common/helpers/svg-cache.js";
import { localize } from "../common/localize.js";
import {
  getStatusBadgeDeviceClassOptions,
  getStatusBadgeAreaIds,
  getStatusBadgeAreaName,
  getStatusBadgeStateSource,
  normalizeStatusBadgeConfig,
  CURRENT_STATE_ACTION,
  STATUS_BADGE_DOMAINS,
} from "../common/helpers/status-badge.js";
import {
  disconnectTemplateSubscriptions,
  evaluateStateTemplate,
  getColorTemplateEntries,
  getIconTemplateEntries,
  syncTemplateSubscriptions,
} from "../common/helpers/templates.js";
import { CARD_VERSIONS } from "../version.js";
import { migrateStatusBadgeConfig } from "../common/helpers/config-migration.js";
import {
  renderBadgeIconControl,
  renderBadgeStateControl,
} from "../common/editor/renders/status-state-controls.js";

const STATE_CONTENT_ENTITY_ID = "sensor.orbit_status_badge_preview";

class OrbitStatusBadgeEditor extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _colorPickerKey: { state: true },
    _colorPickerTab: { state: true },
    _iconPickerKey: { state: true },
    _iconPickerTab: { state: true },
    _orbitIconFiles: { state: true },
    _orbitIconFilesLoading: { state: true },
    _localIconFiles: { state: true },
    _localIconFilesLoading: { state: true },
    _contentExpanded: { state: true },
    _stateTypeExpanded: { state: true },
    _templateRevision: { state: true },
  };

  constructor() {
    super();
    this._config = {};
    this._colorPickerKey = "";
    this._colorPickerTab = "picker";
    this._iconPickerKey = "";
    this._iconPickerTab = "ha";
    this._orbitIconFiles = [];
    this._orbitIconFilesLoading = false;
    this._localIconFiles = [];
    this._localIconFilesLoading = false;
    this._contentExpanded = false;
    this._stateTypeExpanded = false;
    this._namePickerEnhanceFrame = undefined;
    this._namePickerEnhanceAttempts = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    connectEditorPopoverClose(this);
    updateEditorDocumentationContext(this, "orbit-status-badge");
    queueMicrotask(() => this._syncTemplateSubscriptions());
  }

  disconnectedCallback() {
    if (this._namePickerEnhanceFrame !== undefined) {
      cancelAnimationFrame(this._namePickerEnhanceFrame);
      this._namePickerEnhanceFrame = undefined;
    }
    disconnectTemplateSubscriptions.call(this);
    disconnectEditorPopoverClose(this);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has("hass") || changedProperties.has("_config")) {
      this._syncTemplateSubscriptions();
      this._namePickerEnhanceAttempts = 0;
    }

    this._scheduleNamePickerEnhancement();
  }

  _scheduleNamePickerEnhancement() {
    if (
      getStatusBadgeStateSource(this._config) !== "template" ||
      this._namePickerEnhanceFrame !== undefined
    ) {
      return;
    }

    this._namePickerEnhanceFrame = requestAnimationFrame(() => {
      this._namePickerEnhanceFrame = undefined;
      this._namePickerEnhanceAttempts += 1;
      this._enhanceNamePicker();
    });
  }

  _syncTemplateSubscriptions() {
    const stateSource = getStatusBadgeStateSource(this._config);
    const templates = [
      this._config?.state_template,
      this._config?.active_template,
      this._config?.inactive_template,
      this._config?.name_template,
    ];
    const badgeMode = this._config?.display_style === "badge";
    const selectedTemplates = stateSource === "template"
      ? badgeMode
        ? [
            this._config?.active_template,
            this._config?.inactive_template,
          ]
        : templates
      : [];
    const stateEntries = selectedTemplates
      .filter(Boolean)
      .map((template) => ({ template, entityId: "" }));
    const entries = [
      ...stateEntries,
      ...getColorTemplateEntries(this._config),
      ...getIconTemplateEntries(this._config),
    ];

    syncTemplateSubscriptions.call(
      this,
      entries
    );
  }

  _enhanceNamePicker() {
    const selector = this.shadowRoot?.querySelector(
      ".status-badge-name-selector"
    );
    const picker = findElementInShadowTree(
      selector,
      "ha-entity-name-picker"
    );

    if (!picker) {
      if (this._namePickerEnhanceAttempts < 10) {
        this._scheduleNamePickerEnhancement();
      }
      return;
    }
    this._namePickerEnhanceAttempts = 0;
    if (picker.__orbitTemplateNameEnhanced) return;

    const getFilteredItems = picker._getFilteredItems;
    const validTypes = picker._validTypes;
    const formatItem = picker._formatItem;
    const pickerValueChanged = picker._pickerValueChanged;

    if (
      typeof getFilteredItems !== "function" ||
      typeof validTypes !== "function" ||
      typeof formatItem !== "function" ||
      typeof pickerValueChanged !== "function"
    ) {
      return;
    }

    picker.__orbitTemplateNameEnhanced = true;
    picker._validTypes = (entityId) => new Set([
      ...validTypes.call(picker, entityId),
      "template",
    ]);
    picker._formatItem = (item) => item?.type === "template"
      ? this._t("Template")
      : formatItem.call(picker, item);
    picker._getFilteredItems = () => {
      const items = getFilteredItems.call(picker);
      const selectedItems = getNativeNamePickerItems(picker.value);
      const editingTemplate = picker._editIndex != null &&
        selectedItems[picker._editIndex]?.type === "template";
      const hasTemplate = selectedItems.some(
        (item) => item?.type === "template"
      );

      if (!hasTemplate || editingTemplate) {
        const renderedName = String(evaluateStateTemplate.call(
          this,
          this._config?.name_template,
          ""
        ) ?? "").trim();
        const primary = this._t("Template");
        const secondary = renderedName || this._t("Not configured");

        items.push({
          id: "___template___",
          primary,
          secondary,
          search_labels: {
            id: "___template___",
            primary,
            secondary,
          },
          sorting_label: primary,
        });
      }

      return items;
    };
    picker._pickerValueChanged = (event) => {
      if (event.detail?.value !== "___template___") {
        pickerValueChanged.call(picker, event);
        return;
      }

      event.stopPropagation();
      if (picker.disabled) return;

      const items = getNativeNamePickerItems(picker.value);
      const templateItem = { type: "template" };

      if (picker._editIndex != null) {
        items[picker._editIndex] = templateItem;
        picker._editIndex = undefined;
      } else {
        items.push(templateItem);
      }

      picker._setValue(items);
      if (picker._picker) picker._picker.value = undefined;
    };
    picker.requestUpdate();
  }

  setConfig(config) {
    const { config: migratedConfig, migrated } =
      migrateStatusBadgeConfig(config || {});
    const normalizedConfig = normalizeStatusBadgeConfig(migratedConfig);
    const orderedConfig = orderStatusBadgeConfig(normalizedConfig);
    const orderChanged = !hasSameConfigSerialization(
      migratedConfig,
      orderedConfig
    );
    this._config = orderedConfig;
    if (migrated || orderChanged) {
      queueMicrotask(() => this._dispatchConfigChanged(this._config));
    }
  }

  _t(key, replacements) {
    return localize(this.hass, key, replacements);
  }

  _updateConfig(changes) {
    this._config = orderStatusBadgeConfig(
      normalizeStatusBadgeConfig(
        mergeConfig(this._config, changes)
      )
    );
    this._dispatchConfigChanged(this._config);
  }

  _dispatchConfigChanged(config) {
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  _handleConfigUpdate(key, value) {
    const nativeColorDefault =
      ["color_on", "color_off"].includes(key) &&
      (!value || value === "theme");
    this._updateConfig({
      [key]: nativeColorDefault || value === "" ? undefined : value,
    });
  }

  _renderColor(label, key, previewValue) {
    return renderColor.call(this, label, key, previewValue);
  }

  _renderColorPair(options) {
    return renderColorPair.call(this, options);
  }

  _renderIconInput(label, key, placeholder = "mdi:lightbulb or icon.svg") {
    return renderIconInput.call(this, label, key, placeholder);
  }

  _getColorStyle(value) {
    return getColorStyle(value);
  }

  _getColorPickerValue(value) {
    return getColorPickerValue(value);
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
    return getInlineSvg.call(this, path, { forceColor: true });
  }

  _getDeviceClassOptions() {
    return getStatusBadgeDeviceClassOptions(this.hass, this._config);
  }

  _getStateContentHass() {
    const now = new Date().toISOString();
    const areaName = getStatusBadgeAreaName(this.hass, this._config);
    const nameTemplate = this._config?.name_template?.trim() || "";
    const templateName = getStatusBadgeStateSource(this._config) === "template"
      ? String(
          evaluateStateTemplate.call(this, nameTemplate, "") ?? ""
        ).trim()
      : "";
    const previewState = {
      entity_id: STATE_CONTENT_ENTITY_ID,
      state: "on",
      attributes: {
        count: 2,
        friendly_name: templateName || areaName || "Orbit status",
      },
      last_changed: now,
      last_updated: now,
      context: { id: "", parent_id: null, user_id: null },
    };

    return {
      ...this.hass,
      entities: {
        ...(this.hass?.entities || {}),
        [STATE_CONTENT_ENTITY_ID]: {
          entity_id: STATE_CONTENT_ENTITY_ID,
          platform: "orbit",
          area_id: getStatusBadgeAreaIds(this._config)[0] || null,
          device_id: null,
        },
      },
      states: {
        ...(this.hass?.states || {}),
        [STATE_CONTENT_ENTITY_ID]: previewState,
      },
    };
  }

  render() {
    const badgeMode = this._config?.display_style === "badge";
    const deviceClassOptions = this._getDeviceClassOptions();
    const domainConfig = STATUS_BADGE_DOMAINS.find(
      (item) => item.value === this._config?.domain
    );
    const displayedElements = [
      ...(this._config?.show_name === true ? ["name"] : []),
      ...(this._config?.show_state !== false ? ["state"] : []),
      ...(this._config?.show_icon !== false ? ["icon"] : []),
    ];
    const stateSource = getStatusBadgeStateSource(this._config);
    const selectedEntity = this._config?.entity || "";
    const stateContentHass = stateSource === "entity" && selectedEntity
      ? this.hass
      : this._getStateContentHass();
    const stateContentEntityId = stateSource === "entity" && selectedEntity
      ? selectedEntity
      : STATE_CONTENT_ENTITY_ID;

    return html`
      <div class="wrapper">
        <div class="section">
          <div class="field editor-button-toggle-field mode-field">
            <div class="field-header">
              <label>${this._t("Mode")}</label>
              <ha-selector
                class="editor-header-button-toggle"
                .hass=${this.hass}
                .selector=${{
                  button_toggle: {
                    options: [
                      { label: this._t("Header"), value: "header" },
                      { label: this._t("Badge"), value: "badge" },
                    ],
                  },
                }}
                .value=${badgeMode ? "badge" : "header"}
                @value-changed=${(e) =>
                  this._handleConfigUpdate(
                    "display_style",
                    e.detail.value === "badge" ? "badge" : undefined
                  )}
              ></ha-selector>
            </div>
          </div>

          <ha-expansion-panel
            class="state-type-panel"
            outlined
            .expanded=${this._stateTypeExpanded}
            @expanded-changed=${(e) => {
              this._stateTypeExpanded = e.detail.expanded;
            }}
          >
            <ha-icon
              slot="leading-icon"
              icon="mdi:format-list-bulleted-type"
            ></ha-icon>
            <div slot="header" role="heading" aria-level="3">
              ${this._t("State type")}
            </div>
            <div class="content-panel-body">
              ${renderBadgeStateControl.call(this, {
                stateSource,
                domainConfig,
                deviceClassOptions,
                badgeMode,
                areaMultiple: true,
              })}
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel
            class="content-panel"
            outlined
            .expanded=${this._contentExpanded}
            @expanded-changed=${(e) => {
              this._contentExpanded = e.detail.expanded;
            }}
          >
            <ha-icon slot="leading-icon" icon="mdi:text-short"></ha-icon>
            <div slot="header" role="heading" aria-level="3">
              ${this._t("Content")}
            </div>
            <div class="content-panel-body">
              ${badgeMode
                ? this._renderColor(
                    ["Background", "Color"],
                    "card_color",
                    "primary-color"
                  )
                : html`
                    <div class="field">
                      <ha-selector
                        class=${stateSource === "template"
                          ? "status-badge-name-selector"
                          : ""}
                        .hass=${stateContentHass}
                        .label=${this.hass?.localize(
                          "ui.panel.lovelace.editor.card.generic.name"
                        ) || this._t("Name")}
                        .helper=${this.hass?.localize(
                          "ui.panel.lovelace.editor.card.heading.entity_config.name_helper"
                        ) || this._t("Visible if selected in state content")}
                        .selector=${{
                          entity_name: {
                            entity_id: stateContentEntityId,
                          },
                        }}
                        .value=${this._config?.name}
                        @value-changed=${(e) =>
                          this._handleConfigUpdate("name", e.detail.value)}
                      ></ha-selector>
                    </div>
                  `}

              ${this._renderColorPair({
                label: "Color",
                onKey: "color_on",
                offKey: "color_off",
                onPreviewValue: badgeMode ? "white" : "theme",
                offPreviewValue: badgeMode ? "white" : "theme",
              })}

              ${renderBadgeIconControl.call(this, stateSource)}

              ${!badgeMode
                ? html`
                    <div class="field">
                      <label>${this.hass?.localize(
                        "ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements"
                      ) || this._t("Displayed elements")}</label>
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{
                          select: {
                            mode: "list",
                            multiple: true,
                            options: [
                              {
                                value: "name",
                                label: this.hass?.localize(
                                  "ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.name"
                                ) || this._t("Name"),
                              },
                              {
                                value: "state",
                                label: this.hass?.localize(
                                  "ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.state"
                                ) || this._t("State"),
                              },
                              {
                                value: "icon",
                                label: this.hass?.localize(
                                  "ui.panel.lovelace.editor.card.heading.entity_config.displayed_elements_options.icon"
                                ) || this._t("Icon"),
                              },
                            ],
                          },
                        }}
                        .value=${displayedElements}
                        @value-changed=${(e) => {
                          const value = e.detail.value || [];
                          this._updateConfig({
                            show_name: value.includes("name")
                              ? true
                              : undefined,
                            show_state: value.includes("state")
                              ? undefined
                              : false,
                            show_icon: value.includes("icon")
                              ? undefined
                              : false,
                          });
                        }}
                      ></ha-selector>
                    </div>
                    ${stateSource !== "template"
                      ? html`
                          <div class="field">
                            <ha-selector
                              .hass=${stateContentHass}
                              .label=${this.hass?.localize(
                                "ui.panel.lovelace.editor.card.heading.entity_config.state_content"
                              ) || this._t("State content")}
                              .selector=${{
                                ui_state_content: {
                                  entity_id: stateContentEntityId,
                                  allow_name: true,
                                },
                              }}
                              .value=${this._config?.state_content ||
                                (stateSource === "entity"
                                  ? "state"
                                  : "count")}
                              @value-changed=${(e) =>
                                this._handleConfigUpdate(
                                  "state_content",
                                  (() => {
                                    const value = e.detail.value;
                                    const defaultValue = stateSource === "entity"
                                      ? "state"
                                      : "count";
                                    return !value || value === defaultValue
                                      ? undefined
                                      : value;
                                  })()
                                )}
                            ></ha-selector>
                          </div>
                        `
                      : ""}
                  `
                : ""}
            </div>
          </ha-expansion-panel>

          ${renderInteractionsSection.call(this, {
            interactions: [
              {
                key: "tap_action",
                formKey: "tap_action",
                label: "Tap behavior",
                defaultAction: stateSource === "entity"
                  ? "more-info"
                  : stateSource === "area_count"
                    ? CURRENT_STATE_ACTION
                    : "none",
                defaultVisible: true,
                customDefaultLabel: stateSource === "area_count"
                  ? CURRENT_STATE_ACTION
                  : undefined,
              },
              {
                key: "hold_action",
                formKey: "hold_action",
                label: "Hold behavior",
                defaultAction: "none",
              },
              {
                key: "double_tap_action",
                formKey: "double_tap_action",
                label: "Double tap behavior",
                defaultAction: "none",
              },
            ],
            context: {
              entity_id: this._config?.entity,
              area_id: this._config?.area,
            },
          })}
        </div>

        <div class="editor-version">
          ${this._t("Orbit Status Badge v{version}", {
            version: CARD_VERSIONS.statusBadge,
          })}
        </div>
      </div>
    `;
  }

  static styles = [
    ...editorStyles,
    css`
      .content-panel,
      .state-type-panel {
        display: block;
        --expansion-panel-content-padding: 0;
        border-radius: var(--ha-border-radius-md);
        --ha-card-border-radius: var(--ha-border-radius-md);
      }

      .content-panel > [slot="header"],
      .state-type-panel > [slot="header"] {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
      }

      .content-panel ha-icon,
      .state-type-panel ha-icon {
        color: var(--secondary-text-color);
      }

      .content-panel-body {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
      }

      .native-picker-label {
        display: block;
      }
    `,
  ];

}

const STATUS_BADGE_STATE_KEYS = [
  "state_source",
  "entity",
  "area",
  "domain",
  "device_class",
  "threshold",
  "thresholds",
  "hide",
  "active_template",
  "inactive_template",
  "name_template",
  "state_template",
];

const STATUS_BADGE_CONTENT_KEYS = [
  "card_color",
  "name",
  "color_source",
  "color",
  "color_on",
  "color_off",
  "icon_source",
  "icon",
  "icon_on",
  "icon_off",
  "icon_svg_color_override",
  "icon_on_svg_color_override",
  "icon_off_svg_color_override",
  "show_name",
  "show_state",
  "show_icon",
  "show_entity_picture",
  "state_content",
];

const STATUS_BADGE_INTERACTION_KEYS = [
  "tap_action",
  "hold_action",
  "double_tap_action",
];

function orderStatusBadgeConfig(config = {}) {
  const badgeMode = config.display_style === "badge";
  const keyOrder = badgeMode
    ? [
        "type",
        "display_style",
        "entity",
        "card_visibility",
        ...STATUS_BADGE_STATE_KEYS.filter((key) => key !== "entity"),
        ...STATUS_BADGE_CONTENT_KEYS,
        ...STATUS_BADGE_INTERACTION_KEYS,
        "grid_options",
        "view_layout",
      ]
    : [
        "type",
        "display_style",
        ...STATUS_BADGE_STATE_KEYS,
        ...STATUS_BADGE_CONTENT_KEYS,
        ...STATUS_BADGE_INTERACTION_KEYS,
        "grid_options",
        "view_layout",
      ];
  const ordered = {};
  const usedKeys = new Set();

  keyOrder.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      ordered[key] = config[key];
      usedKeys.add(key);
    }
  });
  Object.keys(config).forEach((key) => {
    if (!usedKeys.has(key)) ordered[key] = config[key];
  });

  return ordered;
}

function hasSameConfigSerialization(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

customElements.define(
  "orbit-status-badge-editor",
  OrbitStatusBadgeEditor
);

function getNativeNamePickerItems(value) {
  if (!value) return [];
  if (typeof value === "string") {
    return [{ type: "text", text: value }];
  }

  return Array.isArray(value) ? [...value] : [value];
}

function findElementInShadowTree(root, selector) {
  if (!root) return undefined;
  if (root.matches?.(selector)) return root;

  const directMatch = root.shadowRoot?.querySelector(selector);
  if (directMatch) return directMatch;

  for (const child of root.shadowRoot?.querySelectorAll("*") || []) {
    const nestedMatch = findElementInShadowTree(child, selector);
    if (nestedMatch) return nestedMatch;
  }

  return undefined;
}
