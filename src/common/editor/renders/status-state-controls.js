import { html } from "lit";
import {
  formatDeviceClass,
  getStatusBadgeDeviceClasses,
  getStatusBadgeHideItems,
  getStatusBadgeSensorThreshold,
  serializeStatusBadgeHideItems,
  STATUS_BADGE_NON_NUMERIC_SENSOR_DEVICE_CLASSES,
  STATUS_BADGE_DOMAINS,
} from "../../helpers/status-badge.js";
import {
  getTemplateError,
  hasNativeTemplateSyntax,
} from "../../helpers/templates.js";

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
                {
                  label: this._t("Template"),
                  value: "template",
                },
              ],
            },
          }}
          .value=${iconSource}
          @value-changed=${(e) => {
            const value = e.detail.value;

            if (
              iconSource !== value &&
              [iconSource, value].includes("template")
            ) {
              this._handleConfigUpdate("icon", "");
            }

            if (["custom", "template"].includes(value)) {
              this._handleConfigUpdate("icon_source", value);
              return;
            }

            this._updateConfig({
              icon_source: undefined,
              icon: undefined,
              icon_on: undefined,
              icon_off: undefined,
            });
          }}
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
      ${iconSource === "template"
        ? html`
            <div class="field icon-source-template-field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${this._config?.icon || ""}
                @value-changed=${(event) =>
                  this._handleConfigUpdate(
                    "icon",
                    event.detail.value || ""
                  )}
              ></ha-selector>
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
  showInactiveTemplate = badgeMode,
  showNameTemplate = !badgeMode,
  preserveStateConfig = false,
  renderEntityPicker,
  areaMultiple = false,
  renderAreaPicker,
}) {
  const domainValue = this._config?.domain || "";
  const selectedDeviceClasses = getStatusBadgeDeviceClasses(this._config);
  const numericSensorDeviceClasses = getNumericSensorDeviceClasses(
    this.hass,
    domainValue,
    selectedDeviceClasses
  );
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
                      thresholds: undefined,
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
                        thresholds: undefined,
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
                        thresholds: undefined,
                        state_template: undefined,
                        name_template: undefined,
                        state_content: undefined,
                      }
              );
              return;
            }
            if (preserveStateConfig) {
              this._updateConfig({
                state_source: value === "entity" ? undefined : value,
              });
              return;
            }
            this._updateConfig(
              value === "entity"
                ? {
                    state_source: undefined,
                    area: undefined,
                    domain: undefined,
                    device_class: undefined,
                    thresholds: undefined,
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
                      thresholds: undefined,
                      state_content: undefined,
                    }
            );
          }}
        ></ha-selector>
      </div>

      ${!badgeMode && stateSource === "entity"
        ? renderEntityPicker
          ? renderEntityPicker()
          : html`
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
            ${renderAreaPicker
              ? renderAreaPicker()
              : areaMultiple
                ? renderStatusAreaPicker.call(this, {
                    config: this._config,
                    updateConfig: (changes) => this._updateConfig(changes),
                  })
              : html`
                  <div class="field">
                    <span class="native-picker-label">${this._t("Area")}</span>
                    <ha-selector
                      .hass=${this.hass}
                      .label=${""}
                      .selector=${{ area: {} }}
                      .required=${false}
                      .value=${this._config?.area || ""}
                      @value-changed=${(e) =>
                        this._handleConfigUpdate(
                          "area",
                          e.detail.value || ""
                        )}
                    ></ha-selector>
                  </div>
                `}

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
                  threshold: undefined,
                  thresholds: undefined,
                })}
              ></ha-generic-picker>
            </div>

            ${domainConfig?.requiresDeviceClass &&
              deviceClassOptions.length > 0
              ? html`
                  <div class="field">
                    <label>${this._t("Device class")}</label>
                    <div class="status-badge-device-class-options">
                      ${deviceClassOptions.map((option) => {
                        return html`
                          <ha-checkbox
                            .checked=${selectedDeviceClasses.includes(
                              option.value
                            )}
                            .value=${option.value}
                            @change=${(e) => {
                              const value = e.target.checked
                                ? [...new Set([
                                    ...selectedDeviceClasses,
                                    option.value,
                                  ])]
                                : selectedDeviceClasses.filter(
                                    (item) => item !== option.value
                                  );

                              this._updateConfig({
                                device_class: value.length
                                  ? value
                                  : undefined,
                                threshold: value.includes("battery")
                                  ? this._config?.threshold
                                  : undefined,
                                thresholds: pruneSensorThresholds(
                                  this._config?.thresholds,
                                  value
                                ),
                              });
                            }}
                          >${option.label}</ha-checkbox>
                        `;
                      })}
                    </div>
                  </div>
                `
              : ""}

            ${selectedDeviceClasses.includes("battery")
              ? html`
                  <div class="field">
                    <ha-selector
                      .hass=${this.hass}
                      .label=${this._t("Threshold")}
                      .selector=${{
                        number: {
                          min: 0,
                          max: 100,
                          step: 1,
                          mode: "box",
                          unit_of_measurement: "%",
                        },
                      }}
                      .value=${this._config?.threshold ?? 20}
                      @value-changed=${(e) =>
                        this._handleConfigUpdate(
                          "threshold",
                          e.detail.value === "" ||
                            e.detail.value === undefined
                            ? undefined
                            : Number(e.detail.value)
                        )}
                    ></ha-selector>
                  </div>
                `
              : ""}

            ${numericSensorDeviceClasses.map((deviceClass) => {
              const rule = getSensorThresholdRule(
                this._config,
                deviceClass
              );
              const unit = getSensorDeviceClassUnit(
                this.hass,
                deviceClass
              );

              return html`
                <div class="field sensor-threshold-field">
                  <div class="field-header">
                    <label>${formatDeviceClass(deviceClass)}</label>
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{
                        button_toggle: {
                          options: [
                            {
                              label: this._t(
                                deviceClass === "signal_strength"
                                  ? "Stronger"
                                  : "Above"
                              ),
                              value: "above",
                            },
                            {
                              label: this._t(
                                deviceClass === "signal_strength"
                                  ? "Weaker"
                                  : "Below"
                              ),
                              value: "below",
                            },
                          ],
                        },
                      }}
                      .value=${rule.direction}
                      @value-changed=${(e) => updateSensorThreshold.call(
                        this,
                        deviceClass,
                        { direction: e.detail.value }
                      )}
                    ></ha-selector>
                  </div>
                  <ha-selector
                    .hass=${this.hass}
                    .label=${this._t("Threshold")}
                    .selector=${{
                      number: {
                        step: 0.1,
                        mode: "box",
                        ...(unit ? { unit_of_measurement: unit } : {}),
                      },
                    }}
                    .value=${rule.value}
                    @value-changed=${(e) => updateSensorThreshold.call(
                      this,
                      deviceClass,
                      {
                        value: e.detail.value === "" ||
                          e.detail.value === undefined
                          ? 0
                          : Number(e.detail.value),
                      }
                    )}
                  ></ha-selector>
                </div>
              `;
            })}

            ${renderAreaCountHidePicker.call(this)}
          `
          : selectedType === "template"
            ? html`
              ${!badgeMode
                ? renderEntityPicker
                  ? renderEntityPicker("")
                  : html`
                    <ha-selector
                      .hass=${this.hass}
                      .label=${""}
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
                  this._config?.active_template,
                  this._config?.entity || ""
                )}
              </div>
              ${showInactiveTemplate
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
                        this._config?.inactive_template,
                        this._config?.entity || ""
                      )}
                    </div>
                  `
                : ""}
              ${showNameTemplate
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
  const hideLowSensors = selectedItems.some(
    (item) => item.type === "low"
  );
  const showLowSensors = getStatusBadgeDeviceClasses(
    this._config
  ).includes("battery");
  const selectedLabels = selectedItems
    .filter((item) => item.type === "label")
    .map((item) => item.label);

  const updateHideConfig = ({
    hidden = hideHiddenEntities,
    low = hideLowSensors,
    labels = selectedLabels,
  } = {}) => {
    this._updateConfig({
      hide: serializeStatusBadgeHideItems([
        ...(hidden ? [{ type: "hidden" }] : []),
        ...(low ? [{ type: "low" }] : []),
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

        ${showLowSensors
          ? html`
              <button
                type="button"
                class=${hideLowSensors
                  ? "name-picker-chip"
                  : "name-picker-add-chip"}
                @click=${() =>
                  updateHideConfig({ low: !hideLowSensors })}
              >
                <ha-icon icon=${hideLowSensors
                  ? "mdi:battery-alert"
                  : "mdi:plus"}></ha-icon>
                <span>${this._t("Low sensors")}</span>
                ${hideLowSensors
                  ? html`<ha-icon
                      class="name-picker-chip-remove"
                      icon="mdi:close"
                    ></ha-icon>`
                  : ""}
              </button>
            `
          : ""}
      </div>

      ${showLowSensors
        ? html`
            <div class="status-area-count-low-sensors-hint">
              ${this._t(
                "Low sensors are only used when a device has no percentage sensor."
              )}
            </div>
          `
        : ""}

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

function getNumericSensorDeviceClasses(hass, domain, deviceClasses) {
  if (domain !== "sensor") return [];

  return deviceClasses.filter((deviceClass) =>
    deviceClass !== "battery" &&
    !STATUS_BADGE_NON_NUMERIC_SENSOR_DEVICE_CLASSES.has(deviceClass) &&
    Object.values(hass?.states || {}).some((stateObj) =>
      stateObj.entity_id.startsWith("sensor.") &&
      stateObj.attributes?.device_class === deviceClass
    )
  );
}

function getSensorThresholdRule(config = {}, deviceClass) {
  return getStatusBadgeSensorThreshold(config, deviceClass);
}

function updateSensorThreshold(deviceClass, changes = {}) {
  const current = getSensorThresholdRule(this._config, deviceClass);
  this._updateConfig({
    thresholds: {
      ...(this._config?.thresholds || {}),
      [deviceClass]: { ...current, ...changes },
    },
  });
}

function pruneSensorThresholds(thresholds = {}, deviceClasses = []) {
  const pruned = Object.fromEntries(
    Object.entries(thresholds || {}).filter(([deviceClass]) =>
      deviceClasses.includes(deviceClass) && deviceClass !== "battery"
    )
  );

  return Object.keys(pruned).length ? pruned : undefined;
}

function getSensorDeviceClassUnit(hass, deviceClass) {
  if (deviceClass === "power") return "W";

  return Object.values(hass?.states || {}).find((stateObj) =>
    stateObj.entity_id.startsWith("sensor.") &&
    stateObj.attributes?.device_class === deviceClass &&
    stateObj.attributes?.unit_of_measurement
  )?.attributes?.unit_of_measurement || "";
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

export function renderStatusAreaPicker({
  config = this._config || {},
  updateConfig = (changes) => this._updateConfig(changes),
} = {}) {
  const multiple = Array.isArray(config.area);
  const selectedAreas = multiple ? config.area : [];
  const areas = Object.values(this.hass?.areas || {}).sort((left, right) =>
    (left.name || left.area_id).localeCompare(right.name || right.area_id)
  );
  const options = [
    { value: "__multiple__", label: this._t("Multiple") },
    ...areas.map((area) => ({
      value: area.area_id,
      label: area.name || area.area_id,
    })),
  ];

  return html`
    <div class="field">
      <ha-selector
        .hass=${this.hass}
        .label=${this._t("Area")}
        .selector=${{ select: { mode: "dropdown", options } }}
        .value=${multiple ? "__multiple__" : config.area || ""}
        @value-changed=${(event) => {
          const value = event.detail.value || "";
          updateConfig({
            area: value === "__multiple__"
              ? config.area
                ? [config.area].flat().filter(Boolean)
                : []
              : value,
          });
        }}
      ></ha-selector>
    </div>

    ${multiple
      ? html`
          <div class="field">
            <label>${this._t("Areas")}</label>
            <div class="status-badge-device-class-options">
              ${areas.map((area) => html`
                <ha-checkbox
                  .checked=${selectedAreas.includes(area.area_id)}
                  @change=${(event) => updateConfig({
                    area: event.target.checked
                      ? [...new Set([...selectedAreas, area.area_id])]
                      : selectedAreas.filter(
                          (areaId) => areaId !== area.area_id
                        ),
                  })}
                >${area.name || area.area_id}</ha-checkbox>
              `)}
            </div>
          </div>
        `
      : ""}
  `;
}
