import { html } from "lit";
import {
  renderActionSelector,
} from "../../common/editor/helpers/helpers.js";
import {
  formatDeviceClass,
  getStatusBadgeHideItems,
  serializeStatusBadgeHideItems,
  STATUS_BADGE_DOMAINS,
} from "../../common/helpers/status-badge.js";
import { getTemplateError } from "../../common/helpers/templates.js";

export function renderBadgeInteractions(stateSource) {
  const defaultTapAction = stateSource === "entity"
    ? "more-info"
    : stateSource === "area_count"
      ? "active-entities"
      : "none";
  const activeEntitiesAction = {
    id: "active-entities",
    primary: this._t("Active entities"),
    icon: "mdi:format-list-bulleted",
  };

  return html`
    <ha-expansion-panel
      class="badge-interactions-panel"
      outlined
      .expanded=${this._interactionsExpanded === true}
      @expanded-changed=${(event) => {
        this._interactionsExpanded = event.detail.expanded;
      }}
    >
      <ha-icon slot="leading-icon" icon="mdi:gesture-tap-button"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Interactions")}
      </div>
      <div class="badge-interactions-content">
        ${renderActionSelector.call(
          this,
          "Tap behavior",
          "tap_action",
          defaultTapAction,
          stateSource === "area_count"
            ? { extraActions: [activeEntitiesAction] }
            : undefined
        )}
        ${renderActionSelector.call(
          this,
          "Hold behavior",
          "hold_action",
          "none"
        )}
        ${renderActionSelector.call(
          this,
          "Double tap behavior",
          "double_tap_action",
          "none"
        )}
      </div>
    </ha-expansion-panel>
  `;
}

export function renderBadgeIconControl(stateSource = "entity") {
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

export function renderBadgeStateControl({
  stateSource,
  domainConfig,
  deviceClassOptions,
  badgeMode,
}) {
  const domainValue = this._config?.domain || "";
  const selectedType = badgeMode
    ? this._config?.card_visibility || "always"
    : stateSource;
  const typeOptions = badgeMode
    ? [
        { label: this._t("Always"), value: "always" },
        { label: this._t("State"), value: "state" },
        { label: this._t("Template"), value: "template" },
      ]
    : [
        { label: this._t("Entity"), value: "entity" },
        { label: this._t("Area Count"), value: "area_count" },
        { label: this._t("Template"), value: "template" },
      ];

  return html`
    <div class="field main-entity-icon-source-field">
      ${badgeMode
        ? html`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .required=${false}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) =>
                this._handleConfigUpdate(
                  "entity",
                  e.detail.value || ""
                )}
            ></ha-selector>
          `
        : ""}

      <div class="field-header">
        <label>${this._t(badgeMode ? "Visibility" : "State")}</label>
        <ha-selector
          class="main-entity-icon-source-selector"
          .hass=${this.hass}
          .selector=${{
            button_toggle: {
              options: typeOptions,
            },
          }}
          .value=${selectedType}
          @value-changed=${(e) => {
            const value = e.detail.value || (badgeMode ? "always" : "entity");
            if (badgeMode) {
              this._updateConfig(
                value === "always"
                  ? {
                      card_visibility: undefined,
                      state_source: undefined,
                      area: undefined,
                      domain: undefined,
                      device_class: undefined,
                      state_template: undefined,
                      active_template: undefined,
                      inactive_template: undefined,
                      name_template: undefined,
                      state_content: undefined,
                    }
                  : value === "state"
                    ? {
                        card_visibility: "state",
                        state_source: undefined,
                        area: undefined,
                        domain: undefined,
                        device_class: undefined,
                        state_template: undefined,
                        active_template: undefined,
                        inactive_template: undefined,
                        name_template: undefined,
                        state_content: undefined,
                      }
                    : {
                        card_visibility: "template",
                        state_source: "template",
                        area: undefined,
                        domain: undefined,
                        device_class: undefined,
                        state_template: undefined,
                        name_template: undefined,
                        state_content: undefined,
                      }
              );
              return;
            }
            this._updateConfig(
              value === "entity"
                ? {
                    state_source: undefined,
                    area: undefined,
                    domain: undefined,
                    device_class: undefined,
                    state_template: undefined,
                    active_template: undefined,
                    inactive_template: undefined,
                    state_content: undefined,
                  }
                : value === "area_count"
                  ? {
                      state_source: "area_count",
                      entity: undefined,
                      state_template: undefined,
                      active_template: undefined,
                      inactive_template: undefined,
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

      ${!badgeMode && stateSource === "entity"
        ? html`
            <ha-selector
              .hass=${this.hass}
              .label=${this._t("Entity")}
              .selector=${{ entity: {} }}
              .required=${false}
              .value=${this._config?.entity || ""}
              @value-changed=${(e) =>
                this._handleConfigUpdate("entity", e.detail.value || "")}
            ></ha-selector>
          `
        : !badgeMode && stateSource === "area_count"
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

            ${renderAreaCountHidePicker.call(this)}
          `
          : selectedType === "template"
            ? html`
              ${!badgeMode
                ? html`
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
                  `
                : ""}
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
              ${badgeMode
                ? html`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Inactive template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.inactive_template || ""}
                        @value-changed=${(e) =>
                          this._handleConfigUpdate(
                            "inactive_template",
                            e.detail.value || undefined
                          )}
                      ></ha-selector>
                      ${renderTemplateError.call(
                        this,
                        this._config?.inactive_template
                      )}
                    </div>
                  `
                : ""}
              ${!badgeMode
                ? html`
                    <div class="field">
                      <ha-selector
                        .hass=${this.hass}
                        .label=${this._t("Name template")}
                        .selector=${{ template: {} }}
                        .value=${this._config?.name_template || ""}
                        @value-changed=${(e) =>
                          this._handleConfigUpdate(
                            "name_template",
                            e.detail.value || undefined
                          )}
                      ></ha-selector>
                      ${renderTemplateError.call(
                        this,
                        this._config?.name_template
                      )}
                    </div>
                  `
                : ""}
            `
            : ""}
    </div>
  `;
}

function renderTemplateError(template, entityId = "") {
  const error = getTemplateError.call(this, template, entityId);

  return error
    ? html`<ha-alert alert-type="error">${error}</ha-alert>`
    : "";
}

function renderAreaCountHidePicker() {
  const selectedItems = getStatusBadgeHideItems(this._config);
  const hideHiddenEntities = selectedItems.some(
    (item) => item.type === "hidden"
  );
  const selectedLabels = selectedItems
    .filter((item) => item.type === "label")
    .map((item) => item.label);

  const updateHideConfig = ({
    hidden = hideHiddenEntities,
    labels = selectedLabels,
  } = {}) => {
    this._updateConfig({
      hide: serializeStatusBadgeHideItems([
        ...(hidden ? [{ type: "hidden" }] : []),
        ...labels.map((label) => ({ type: "label", label })),
      ]),
    });
  };

  return html`
    <div class="field">
      <label>${this._t("Hide")}</label>

      <div class="status-badge-hide-hidden-row">
        <button
          type="button"
          class=${hideHiddenEntities
            ? "name-picker-chip"
            : "name-picker-add-chip"}
          @click=${() =>
            updateHideConfig({ hidden: !hideHiddenEntities })}
        >
          <ha-icon icon=${hideHiddenEntities
            ? "mdi:eye-off"
            : "mdi:plus"}></ha-icon>
          <span>${this._t("Hidden entities")}</span>
          ${hideHiddenEntities
            ? html`<ha-icon
                class="name-picker-chip-remove"
                icon="mdi:close"
              ></ha-icon>`
            : ""}
        </button>
      </div>

      <ha-selector
        .hass=${this.hass}
        .selector=${{
          label: {
            multiple: true,
          },
        }}
        .value=${selectedLabels}
        @value-changed=${(e) =>
          updateHideConfig({
            labels: Array.isArray(e.detail.value)
              ? e.detail.value
              : [],
          })}
      ></ha-selector>
    </div>
  `;
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
