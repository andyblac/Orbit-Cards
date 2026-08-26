import { html } from "lit";
import { renderNamePicker } from "../../../common/editor/helpers/name-picker.js";
import {
  renderEntitySelector,
  renderInteractionsSection,
} from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";
import {
  getGroupedEditorState,
  renderGroupedEditorOptions,
} from "../../../common/editor/helpers/group-options.js";
import {
  CURRENT_STATE_ACTION,
  getStatusBadgeDeviceClassOptions,
  getStatusBadgeDomainConfig,
  getStatusBadgeStateSource,
} from "../../../common/helpers/status-badge.js";
import {
  renderBadgeStateControl,
  renderStatusAreaPicker,
} from "../../../common/editor/renders/status-state-controls.js";

export function renderStatusSection() {
  const mode = this._config?.mode || "standard";
  const isIconOnly = mode === "icon_only";
  const isPerson = mode === "person";
  const stateSource = isPerson
    ? "entity"
    : getStatusBadgeStateSource(this._config);
  const cardActionDefault =
    stateSource === "area_count"
      ? CURRENT_STATE_ACTION
      : stateSource === "template"
      ? "more-info"
      : isIconOnly || isPerson
      ? "more-info"
      : "navigate";
  const effectiveCardAction =
    this._config?.tap_action?.action ||
    cardActionDefault;
  const mainEntityActionDefault =
    stateSource === "area_count"
      ? CURRENT_STATE_ACTION
      : isIconOnly || isPerson
      ? effectiveCardAction
      : "more-info";

  return html`
    <div class="section">
      <div class="field editor-button-toggle-field">
        <div class="field-header">
          <label>${this._t("Mode")}</label>

          <ha-selector
            class="editor-header-button-toggle status-mode-selector"
            .hass=${this.hass}
            .selector=${{
              button_toggle: {
                options: getStatusModeOptions.call(this),
              },
            }}
            .value=${mode}
            @value-changed=${(e) =>
              this._handleStatusModeChange(
                e.detail.value || "standard"
              )}
          ></ha-selector>
        </div>
      </div>
    </div>

    ${isIconOnly
      ? renderIconOnlyStatusConfig.call(this, {
          cardActionDefault,
          mainEntityActionDefault,
        })
      : html`
          <div class="section">
            ${isPerson
              ? renderStatusContentPanel.call(this, html`
                  ${renderStatusNamePicker.call(this)}
                  ${this._renderEntity("Person entity", "entity")}
                  ${this._renderEntity("Tracker entity", "tracker_entity")}
                  ${this._renderEntity("ETA entity", "eta_entity")}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_1", { index: 1 })}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_2", { index: 2 })}
                  ${this._renderColorPair({
                    label: "Color",
                    onLabel: ["Accent", "Active", "Color"],
                    offLabel: ["Accent", "Inactive", "Color"],
                    onKey: "accent_on_color",
                    offKey: "accent_off_color",
                    sourceKey: "color_source",
                    templateKey: "color",
                    legacySourceKey: "accent_color_source",
                    legacyTemplateKey: "accent_color",
                  })}
                `)
              : html`
                  ${renderStatusStateType.call(
                    this,
                    this._config,
                    "entity",
                    (changes) => this._updateConfig(changes),
                    (value) => this._handleEntityUpdate(
                      "entity",
                      value
                    )
                  )}
                  ${renderStatusContentPanel.call(this, html`
                    ${renderStatusNamePicker.call(this)}
                    ${this._renderColorPair({
                      label: "Color",
                      onLabel: ["Accent", "Active", "Color"],
                      offLabel: ["Accent", "Inactive", "Color"],
                      onKey: "accent_on_color",
                      offKey: "accent_off_color",
                      sourceKey: "color_source",
                      templateKey: "color",
                      legacySourceKey: "accent_color_source",
                      legacyTemplateKey: "accent_color",
                    })}
                    ${renderStatusIconSource.call(this, stateSource)}
                    ${stateSource === "area_count"
                      ? ""
                      : html`
                          ${this._renderTemplateInput(
                            stateSource === "template"
                              ? "State"
                              : "State template",
                            "state_template",
                            {
                              required: stateSource !== "template",
                            }
                          )}
                        `}
                  `)}
                `}

            ${this._config?.entity || stateSource !== "entity"
              ? renderInteractionsSection.call(this, {
                  interactions: [
                    {
                      key: "tap_action",
                      formKey: "tap_action",
                      label: "Tap behavior",
                      defaultAction: cardActionDefault,
                      defaultVisible: true,
                      customDefaultLabel:
                        cardActionDefault === CURRENT_STATE_ACTION
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
                    {
                      key: "entity_tap_action",
                      formKey: "icon_tap_action",
                      label: "Icon tap behavior",
                      defaultAction: mainEntityActionDefault,
                      defaultVisible: true,
                      customDefaultLabel:
                        mainEntityActionDefault === CURRENT_STATE_ACTION
                          ? CURRENT_STATE_ACTION
                          : undefined,
                    },
                    {
                      key: "entity_hold_action",
                      formKey: "icon_hold_action",
                      label: "Icon hold behavior",
                      defaultAction: "none",
                    },
                    {
                      key: "entity_double_tap_action",
                      formKey: "icon_double_tap_action",
                      label: "Icon double tap behavior",
                      defaultAction: "none",
                    },
                  ],
                  context: {
                    entity_id: this._config.entity,
                    area_id: this._config.area,
                  },
                })
              : ""}
          </div>
        `}
  `;
}

function renderStatusNamePicker() {
  const nativeNameKey = "ui.panel.lovelace.editor.card.generic.name";
  const stateSource = getStatusBadgeStateSource(this._config);
  const isAreaCount = stateSource === "area_count";

  return renderNamePicker.call(this, {
    label: this.hass.localize(nativeNameKey),
    valueKey: "name",
    entityKey: "entity",
    defaultType: isAreaCount ? "device_class" : "entity",
    defaultMode: stateSource === "template" ? "template" : "composed",
    modeKey: `name:${stateSource}`,
    templateKey: "name_template",
  });
}

function renderIconOnlyStatusConfig({
  cardActionDefault,
  mainEntityActionDefault,
}) {
  const items = this._getStatusItems();
  const selectedIndex = Math.min(
    this._selectedStatusIndex || 0,
    items.length - 1
  );
  const selectedItem = items[selectedIndex] || {};
  const selectedStateSource = getStatusBadgeStateSource(selectedItem);
  const selectedIsAreaCount = selectedStateSource === "area_count";
  const selectedCardActionDefault = selectedIsAreaCount
    ? CURRENT_STATE_ACTION
    : cardActionDefault;
  const selectedMainEntityActionDefault = selectedIsAreaCount
    ? CURRENT_STATE_ACTION
    : mainEntityActionDefault;
  const {
    itemsPerRow,
    shouldWrapTabs,
    showTabScrollHint,
  } = getGroupedEditorState({
    config: this._config,
    itemCount: items.length,
    defaultPerRow: 3,
  });

  return html`
    <div class="section">
      ${renderGroupedEditorOptions.call(this, {
        itemCount: items.length,
        classPrefix: "status",
        defaultPerRow: 3,
      })}

      <div
        class="status-tabs ${shouldWrapTabs ? "wrapped" : ""} ${showTabScrollHint ? "scroll-hint" : ""} ${items.length > 1 ? "has-tools" : ""}"
        style=${shouldWrapTabs
          ? `--status-tabs-per-row: ${itemsPerRow};`
          : ""}
      >
        <div class="status-tab-items">
          ${items.map((_, index) => html`
            <button
              type="button"
              class="status-tab ${index === selectedIndex ? "active" : ""}"
              @click=${() => this._selectStatusItem(index)}
            >
              ${index + 1}
            </button>
          `)}
        </div>

        ${showTabScrollHint
          ? html`
              <div class="status-tabs-scroll-indicator" aria-hidden="true">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </div>
            `
          : ""}

        <div class="status-editor-tools">
          <button
            type="button"
            class="status-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addStatusItem()}
          >
            +
          </button>

          <button
            type="button"
            class="status-tool-button"
            title=${this._t("Duplicate")}
            @click=${() => this._duplicateStatusItem(selectedIndex)}
          >
            <ha-icon icon="mdi:content-copy"></ha-icon>
          </button>

          ${items.length > 1
            ? html`
                <button
                  type="button"
                  class="status-tool-button status-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeStatusItem(selectedIndex)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${selectedIndex === 0}
                  @click=${() => this._moveStatusItem(selectedIndex, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${selectedIndex === items.length - 1}
                  @click=${() => this._moveStatusItem(selectedIndex, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              `
            : ""}
        </div>
      </div>

      ${renderStatusStateType.call(
        this,
        selectedItem,
        "entity",
        (changes) => this._updateStatusItem(selectedIndex, changes),
        (value) => this._updateStatusItem(selectedIndex, { entity: value })
      )}

      ${renderStatusContentPanel.call(this, html`

        ${this._renderColorPair({
          label: "Color",
          onLabel: ["Accent", "Active", "Color"],
          offLabel: ["Accent", "Inactive", "Color"],
          onKey: "accent_on_color",
          offKey: "accent_off_color",
          sourceKey: "color_source",
          templateKey: "color",
          legacySourceKey: "accent_color_source",
          legacyTemplateKey: "accent_color",
          config: selectedItem,
          pickerPrefix: `status-${selectedIndex}-`,
          onUpdate: (key, value) =>
            this._updateStatusItem(selectedIndex, { [key]: value }),
        })}

        ${renderStatusItemIconSource.call(
          this,
          selectedIndex,
          selectedItem,
          selectedIsAreaCount
        )}

        ${selectedIsAreaCount
          ? ""
          : html`
              ${renderStatusItemInput.call(
                this,
                selectedStateSource === "template"
                  ? "State"
                  : "State template",
                "state_template",
                selectedIndex,
                selectedItem,
                {
                  required: selectedStateSource !== "template",
                }
              )}
            `}
      `)}

      ${selectedItem.entity || selectedStateSource !== "entity"
        ? this._renderStatusItemInteractions(
            selectedIndex,
            selectedItem,
            selectedCardActionDefault,
            selectedMainEntityActionDefault
          )
        : ""}
    </div>
  `;
}

function renderStatusStateType(
  config,
  entityKey,
  updateConfig,
  updateEntity
) {
  const stateConfig = {
    ...config,
    entity: config?.[entityKey] || "",
  };
  const stateSource = getStatusBadgeStateSource(stateConfig);
  const scopedEditor = {
    hass: this.hass,
    _config: stateConfig,
    _t: this._t.bind(this),
    _updateConfig: (changes) => updateConfig(
      mapStatusStateChanges(changes, entityKey)
    ),
    _handleConfigUpdate: (key, value) => updateConfig(
      mapStatusStateChanges({ [key]: value }, entityKey)
    ),
  };

  return html`
    <ha-expansion-panel
      class="state-type-panel"
      outlined
      .expanded=${this._statusStateTypeExpanded === true}
      @expanded-changed=${(event) => {
        this._statusStateTypeExpanded = event.detail.expanded;
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
        ${renderBadgeStateControl.call(scopedEditor, {
          stateSource,
          domainConfig: getStatusBadgeDomainConfig(stateConfig.domain),
          deviceClassOptions: getStatusBadgeDeviceClassOptions(
            this.hass,
            stateConfig
          ),
          badgeMode: false,
          showInactiveTemplate: true,
          showNameTemplate: false,
          preserveStateConfig: true,
          renderAreaPicker: () => renderStatusAreaPicker.call(this, {
            config,
            updateConfig,
          }),
          renderEntityPicker: (label = "Main entity") => html`
            <div class="field">
              ${label ? html`<label>${this._t(label)}</label>` : ""}
              ${renderEntitySelector.call(this, {
                value: config?.[entityKey] || "",
                filterOptions: STATUS_MAIN_ENTITY_DOMAIN_FILTERS,
                onValueChanged: updateEntity,
              })}
            </div>
          `,
        })}
      </div>
    </ha-expansion-panel>
  `;
}

function renderStatusContentPanel(content) {
  return html`
    <ha-expansion-panel
      class="content-panel status-content-panel"
      outlined
      .expanded=${this._statusContentExpanded === true}
      @expanded-changed=${(event) => {
        this._statusContentExpanded = event.detail.expanded;
      }}
    >
      <ha-icon slot="leading-icon" icon="mdi:text-short"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Content")}
      </div>
      <div class="content-panel-body">${content}</div>
    </ha-expansion-panel>
  `;
}

function mapStatusStateChanges(changes, entityKey) {
  const mapped = { ...changes };

  if (Object.prototype.hasOwnProperty.call(mapped, "entity")) {
    mapped[entityKey] = mapped.entity;
    delete mapped.entity;
  }

  return mapped;
}

function renderStatusItemInput(label, key, index, item, options = {}) {
  return this._renderTemplateInput(label, key, {
    ...options,
    value: item[key] || "",
    onValueChanged: (value) =>
      this._updateStatusItem(index, {
        [key]: value,
      }),
  });
}

function renderStatusIconSource(stateSource = "entity") {
  const isAreaCount = stateSource === "area_count";

  return renderIconSourceControl.call(this, {
    label: "Icon",
    sourceKey: "icon_source",
    legacySourceKey: "entity_icon_source",
    templateKey: "icon",
    legacyTemplateKeys: ["entity_icon_template"],
    entityKey: "entity",
    defaultSource: isAreaCount ? "domain" : "entity",
    defaultSourceLabel: isAreaCount ? "Domain" : "Entity",
    customIconKeys: [
      "entity_icon",
      "entity_icon_on",
      "entity_icon_off",
    ],
    renderCustom() {
      return html`
        ${this._renderIconInput("", "entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(
            ["Active", "Icon"],
            "entity_icon_on"
          )}
          ${this._renderIconInput(
            ["Inactive", "Icon"],
            "entity_icon_off"
          )}
        </div>
      `;
    },
  });
}

function renderStatusItemIconSource(index, item, isAreaCount = false) {
  const editor = this;
  const scopedEditor = {
    hass: this.hass,
    _config: item,
    _t: (key, replacements) =>
      this._t(key, replacements),
    _handleConfigUpdate: (fieldKey, value) =>
      editor._updateStatusItem(index, {
        [fieldKey]: value,
      }),
    _renderIconInput: (label, key) =>
      editor._renderStatusItemIconInput(label, key, index),
  };

  return renderIconSourceControl.call(scopedEditor, {
    label: "Icon",
    sourceKey: "icon_source",
    legacySourceKey: "entity_icon_source",
    templateKey: "icon",
    legacyTemplateKeys: ["entity_icon_template"],
    entityKey: "entity",
    defaultSource: isAreaCount ? "domain" : "entity",
    defaultSourceLabel: isAreaCount ? "Domain" : "Entity",
    customIconKeys: [
      "entity_icon",
      "entity_icon_on",
      "entity_icon_off",
    ],
    renderCustom() {
      return html`
        ${this._renderIconInput("", "entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(
            ["Active", "Icon"],
            "entity_icon_on"
          )}
          ${this._renderIconInput(
            ["Inactive", "Icon"],
            "entity_icon_off"
          )}
        </div>
      `;
    },
  });
}

function getStatusModeOptions() {
  return [
    {
      label: this._t("Standard"),
      value: "standard",
    },
    {
      label: this._t("Icon only"),
      value: "icon_only",
    },
    {
      label: this._t("Person"),
      value: "person",
    },
  ];
}

const STATUS_MAIN_ENTITY_DOMAIN_FILTERS = [
  {
    label: "All",
    value: "all",
    domains: null,
  },
  {
    label: "Binary Sensors",
    haDomains: ["binary_sensor"],
    value: "binary_sensor",
    domains: ["binary_sensor"],
  },
  {
    label: "Sensors",
    haDomains: ["sensor"],
    value: "sensor",
    domains: ["sensor"],
  },
];
