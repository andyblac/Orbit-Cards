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
  renderIconInput,
  renderInteractionsSection,
  resolveIconPath,
} from "../common/editor/helpers/helpers.js";
import { editorStyles } from "../common/editor/styles/editor-styles.js";
import { updateEditorDocumentationContext } from "../common/helpers/documentation.js";
import { sharedSvgCache } from "../common/helpers/svg-cache.js";
import { localize } from "../common/localize.js";
import {
  getStatusBadgeStateSource,
  normalizeStatusBadgeColors,
  STATUS_BADGE_DOMAINS,
} from "../common/helpers/status-badge.js";
import {
  disconnectTemplateSubscriptions,
  getTemplateError,
  syncTemplateSubscriptions,
} from "../common/helpers/templates.js";
import { CARD_VERSIONS } from "../version.js";

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
  }

  connectedCallback() {
    super.connectedCallback();
    connectEditorPopoverClose(this);
    updateEditorDocumentationContext(this, "orbit-status-badge");
    queueMicrotask(() => this._syncTemplateSubscriptions());
  }

  disconnectedCallback() {
    disconnectTemplateSubscriptions.call(this);
    disconnectEditorPopoverClose(this);
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has("hass") || changedProperties.has("_config")) {
      this._syncTemplateSubscriptions();
    }
  }

  _syncTemplateSubscriptions() {
    const stateSource = getStatusBadgeStateSource(this._config);
    const templates = [
      this._config?.state_template,
      this._config?.active_template,
    ].filter(Boolean);

    syncTemplateSubscriptions.call(
      this,
      stateSource === "template"
        ? templates.map((template) => ({ template, entityId: "" }))
        : []
    );
  }

  setConfig(config) {
    const sourceConfig = config || {};
    const normalizedConfig = normalizeStatusBadgeColors(sourceConfig);
    const needsSanitizing =
      JSON.stringify(sourceConfig) !== JSON.stringify(normalizedConfig);

    this._config = normalizedConfig;

    if (needsSanitizing) {
      const pendingConfig = normalizedConfig;
      this.updateComplete.then(() => {
        if (this._config !== pendingConfig) return;
        this._dispatchConfigChanged(pendingConfig);
      });
    }
  }

  _t(key, replacements) {
    return localize(this.hass, key, replacements);
  }

  _updateConfig(changes) {
    this._config = normalizeStatusBadgeColors(
      mergeConfig(this._config, changes)
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
      ["accent_on_color", "accent_off_color"].includes(key) &&
      (!value || value === "theme");
    this._updateConfig({
      [key]: nativeColorDefault || value === "" ? undefined : value,
    });
  }

  _renderColor(label, key, previewValue) {
    return renderColor.call(this, label, key, previewValue);
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
    const domain = this._config?.domain || "";
    const configured = this._config?.device_class || "";
    const deviceClasses = new Set();

    if (!domain) return [];

    Object.values(this.hass?.states || {}).forEach((stateObj) => {
      if (!stateObj.entity_id.startsWith(`${domain}.`)) return;

      const deviceClass = stateObj.attributes?.device_class;
      if (deviceClass) deviceClasses.add(deviceClass);
    });

    if (configured) deviceClasses.add(configured);

    return [...deviceClasses]
      .sort((left, right) => left.localeCompare(right))
      .map((deviceClass) => ({
        value: deviceClass,
        label: formatDeviceClass(deviceClass),
      }));
  }

  _getStateContentHass() {
    const now = new Date().toISOString();
    const areaName = this.hass?.areas?.[this._config?.area]?.name;
    const previewState = {
      entity_id: STATE_CONTENT_ENTITY_ID,
      state: "on",
      attributes: {
        count: 2,
        friendly_name: areaName || "Orbit status",
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
          area_id: this._config?.area || null,
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
    const deviceClassOptions = this._getDeviceClassOptions();
    const domainConfig = STATUS_BADGE_DOMAINS.find(
      (item) => item.value === this._config?.domain
    );
    const displayedElements = [
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
              <div class="field">
                <ha-selector
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

              <div class="color-pair">
                ${this._renderColor(
                  ["Active", "Color"],
                  "accent_on_color"
                )}
                ${this._renderColor(
                  ["Inactive", "Color"],
                  "accent_off_color"
                )}
              </div>

              ${renderBadgeIconControl.call(this, stateSource)}

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
                      show_state: value.includes("state") ? undefined : false,
                      show_icon: value.includes("icon") ? undefined : false,
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
                          (stateSource === "entity" ? "state" : "count")}
                        @value-changed=${(e) =>
                          this._handleConfigUpdate("state_content", (() => {
                            const value = e.detail.value;
                            const defaultValue = stateSource === "entity"
                              ? "state"
                              : "count";
                            return !value || value === defaultValue
                              ? undefined
                              : value;
                          })())}
                      ></ha-selector>
                    </div>
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
                  : "none",
                defaultVisible: true,
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
              area_id: stateSource === "area_count"
                ? this._config?.area
                : undefined,
              entity_id: stateSource === "entity"
                ? this._config?.entity
                : undefined,
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

customElements.define(
  "orbit-status-badge-editor",
  OrbitStatusBadgeEditor
);

function renderBadgeIconControl(stateSource = "entity") {
  const iconSource = this._config?.icon_source ||
    (this._config?.icon ? "custom" : "domain");

  return html`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${this._t("Icon")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{
            button_toggle: {
              options: [
                {
                  label: this._t(
                    stateSource === "entity"
                      ? "Entity"
                      : stateSource === "area_count"
                        ? "Domain"
                        : "Default"
                  ),
                  value: "domain",
                },
                {
                  label: this._t("Custom"),
                  value: "custom",
                },
              ],
            },
          }}
          .value=${iconSource}
          @value-changed=${(e) =>
            e.detail.value === "custom"
              ? this._handleConfigUpdate("icon_source", "custom")
              : this._updateConfig({
                  icon_source: undefined,
                  icon: undefined,
                  icon_on: undefined,
                  icon_off: undefined,
                })}
        ></ha-selector>
      </div>

      ${iconSource === "custom"
        ? html`
            ${this._renderIconInput("", "icon")}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], "icon_on")}
              ${this._renderIconInput(["Inactive", "Icon"], "icon_off")}
            </div>
          `
        : ""}
    </div>
  `;
}

function renderBadgeStateControl({
  stateSource,
  domainConfig,
  deviceClassOptions,
}) {
  const domainValue = this._config?.domain || "";

  return html`
    <div class="field main-entity-icon-source-field">
      <div class="field-header">
        <label>${this._t("Type")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{
            button_toggle: {
              options: [
                {
                  label: this._t("Entity"),
                  value: "entity",
                },
                {
                  label: this._t("Area Count"),
                  value: "area_count",
                },
                {
                  label: this._t("Template"),
                  value: "template",
                },
              ],
            },
          }}
          .value=${stateSource}
          @value-changed=${(e) => {
            const value = e.detail.value || "entity";
            this._updateConfig(
              value === "entity"
                ? {
                    state_source: undefined,
                    area: undefined,
                    domain: undefined,
                    device_class: undefined,
                    state_template: undefined,
                    active_template: undefined,
                    state_content: undefined,
                  }
                : value === "area_count"
                  ? {
                      state_source: "area_count",
                      entity: undefined,
                      state_template: undefined,
                      active_template: undefined,
                      state_content: undefined,
                    }
                  : {
                      state_source: "template",
                      entity: undefined,
                      area: undefined,
                      domain: undefined,
                      device_class: undefined,
                      state_content: undefined,
                    }
            );
          }}
        ></ha-selector>
      </div>

      ${stateSource === "entity"
        ? html`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) =>
                this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
          `
        : stateSource === "area_count"
          ? html`
            <div class="field">
              <span class="native-picker-label">${this._t("Area")}</span>
              <ha-selector
                .hass=${this.hass}
                .label=${""}
                .selector=${{ area: {} }}
                .required=${false}
                .value=${this._config?.area || ""}
                @value-changed=${(e) =>
                  this._handleConfigUpdate("area", e.detail.value || "")}
              ></ha-selector>
            </div>

            <div class="field">
              <ha-generic-picker
                .hass=${this.hass}
                .value=${domainValue}
                .label=${this._t("Domain")}
                .placeholder=${this._t("Domain")}
                use-top-label
                .getItems=${() => getDomainPickerItems.call(this)}
                .valueRenderer=${(domain) =>
                  renderDomainPickerValue.call(this, domain)}
                .rowRenderer=${renderDomainPickerRow}
                @value-changed=${(e) => this._updateConfig({
                  domain: e.detail.value || undefined,
                  device_class: undefined,
                })}
              ></ha-generic-picker>
            </div>

            ${domainConfig?.requiresDeviceClass &&
              deviceClassOptions.length > 0
              ? html`
                  <div class="field">
                    <ha-generic-picker
                      .hass=${this.hass}
                      .value=${this._config?.device_class || ""}
                      .label=${this._t("Device class")}
                      .placeholder=${this._t("Device class")}
                      use-top-label
                      .getItems=${() =>
                        getDeviceClassPickerItems.call(
                          this,
                          domainValue,
                          deviceClassOptions
                        )}
                      .valueRenderer=${(deviceClass) =>
                        renderDeviceClassPickerValue.call(
                          this,
                          domainValue,
                          deviceClass
                        )}
                      .rowRenderer=${(item, index) =>
                        renderDeviceClassPickerRow(item, index)}
                      @value-changed=${(e) =>
                        this._handleConfigUpdate(
                          "device_class",
                          e.detail.value || undefined
                        )}
                    ></ha-generic-picker>
                  </div>
                `
              : ""}
          `
          : html`
              <div class="field">
                <ha-selector
                  .hass=${this.hass}
                  .label=${this._t("Display template")}
                  .selector=${{ template: {} }}
                  .value=${this._config?.state_template || ""}
                  @value-changed=${(e) =>
                    this._handleConfigUpdate(
                      "state_template",
                      e.detail.value || ""
                    )}
                ></ha-selector>
                ${renderTemplateError.call(
                  this,
                  this._config?.state_template
                )}
              </div>
              <div class="field">
                <ha-selector
                  .hass=${this.hass}
                  .label=${this._t("Active template")}
                  .selector=${{ template: {} }}
                  .value=${this._config?.active_template || ""}
                  @value-changed=${(e) =>
                    this._handleConfigUpdate(
                      "active_template",
                      e.detail.value || undefined
                    )}
                ></ha-selector>
                ${renderTemplateError.call(
                  this,
                  this._config?.active_template
                )}
              </div>
            `}
    </div>
  `;
}

function renderTemplateError(template) {
  const error = getTemplateError.call(this, template, "");

  return error
    ? html`<ha-alert alert-type="error">${error}</ha-alert>`
    : "";
}

function getDomainPickerItems() {
  return STATUS_BADGE_DOMAINS.map((domain) => ({
    id: domain.value,
    primary: this._t(domain.label),
    sorting_label: this._t(domain.label),
    icon: domain.icon,
  }));
}

function renderDomainPickerValue(domainValue) {
  const domain = STATUS_BADGE_DOMAINS.find(
    (item) => item.value === domainValue
  );
  if (!domain) return "";

  return html`
    <ha-icon slot="start" .icon=${domain.icon}></ha-icon>
    <span slot="headline">${this._t(domain.label)}</span>
  `;
}

function renderDomainPickerRow(item, index) {
  return html`
    <ha-combo-box-item type="button" compact .borderTop=${index !== 0}>
      <ha-icon slot="start" .icon=${item.icon}></ha-icon>
      <span slot="headline">${item.primary}</span>
    </ha-combo-box-item>
  `;
}

function getDeviceClassPickerItems(domain, options) {
  return options
    .filter((option) => option.value)
    .map((option) => ({
      id: option.value,
      primary: option.label,
      sorting_label: option.label,
      stateObj: createDeviceClassPickerState(domain, option.value),
    }));
}

function renderDeviceClassPickerValue(domain, deviceClass) {
  if (!deviceClass) return "";

  return html`
    <ha-state-icon
      slot="start"
      .stateObj=${createDeviceClassPickerState(domain, deviceClass)}
    ></ha-state-icon>
    <span slot="headline">${formatDeviceClass(deviceClass)}</span>
  `;
}

function renderDeviceClassPickerRow(item, index) {
  return html`
    <ha-combo-box-item type="button" compact .borderTop=${index !== 0}>
      <ha-state-icon slot="start" .stateObj=${item.stateObj}></ha-state-icon>
      <span slot="headline">${item.primary}</span>
    </ha-combo-box-item>
  `;
}

function createDeviceClassPickerState(domain, deviceClass) {
  return {
    entity_id: `${domain}.orbit_status_badge_picker`,
    state: "off",
    attributes: { device_class: deviceClass },
  };
}

function formatDeviceClass(deviceClass = "") {
  return deviceClass
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
