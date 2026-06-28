import { html } from "lit";
import { renderNamePicker } from "../../../common/editor/helpers/name-picker.js";
import {
  renderEntitySelector,
  renderInteractionsSection,
} from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";

export function renderStatusSection() {
  const mode = this._config?.mode || "standard";
  const isIconOnly = mode === "icon_only";
  const isPerson = mode === "person";
  const cardActionDefault =
    isIconOnly || isPerson
      ? "more-info"
      : "navigate";
  const effectiveCardAction =
    this._config?.tap_action?.action ||
    cardActionDefault;
  const mainEntityActionDefault =
    isIconOnly || isPerson
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
              this._updateConfig({
                mode: e.detail.value || "standard",
              })}
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
            ${renderStatusNamePicker.call(this)}

            ${isPerson
              ? html`
                  ${this._renderEntity("Person entity", "main_entity")}
                  ${this._renderEntity("Tracker entity", "tracker_entity")}
                  ${this._renderEntity("ETA entity", "eta_entity")}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_1", { index: 1 })}
                  ${this._renderEntity("Battery entity {index}", "battery_entity_2", { index: 2 })}
                  <div class="color-pair">
                    ${this._renderColor(["Accent", "Active", "Color"], "accent_on_color")}
                    ${this._renderColor(["Accent", "Inactive", "Color"], "accent_off_color")}
                  </div>
                `
              : html`
                  <div class="field">
                    <label>${this._t("Main entity")}</label>

                    ${renderEntitySelector.call(this, {
                      value: this._config?.main_entity || "",
                      filterOptions: STATUS_MAIN_ENTITY_DOMAIN_FILTERS,
                      onValueChanged: (value) =>
                        this._handleEntityUpdate
                          ? this._handleEntityUpdate("main_entity", value)
                          : this._handleConfigUpdate("main_entity", value),
                    })}
                  </div>
                  <div class="color-pair">
                    ${this._renderColor(["Accent", "Active", "Color"], "accent_on_color")}
                    ${this._renderColor(["Accent", "Inactive", "Color"], "accent_off_color")}
                  </div>
                  ${renderStatusIconSource.call(this)}
                  ${this._renderTemplateInput("State template", "state_template")}
                  ${this._renderTemplateInput("Label template", "label_template")}
                `}

            ${this._config?.main_entity
              ? renderInteractionsSection.call(this, {
                  interactions: [
                    {
                      key: "tap_action",
                      formKey: "tap_action",
                      label: "Tap behavior",
                      defaultAction: cardActionDefault,
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
                    {
                      key: "main_entity_tap_action",
                      formKey: "icon_tap_action",
                      label: "Icon tap behavior",
                      defaultAction: mainEntityActionDefault,
                      defaultVisible: true,
                    },
                    {
                      key: "main_entity_hold_action",
                      formKey: "icon_hold_action",
                      label: "Icon hold behavior",
                      defaultAction: "none",
                    },
                    {
                      key: "main_entity_double_tap_action",
                      formKey: "icon_double_tap_action",
                      label: "Icon double tap behavior",
                      defaultAction: "none",
                    },
                  ],
                  context: {
                    entity_id: this._config.main_entity,
                    area_id: this._config.area,
                  },
                })
              : ""}
          </div>
        `}
  `;
}

function renderStatusNamePicker() {
  return renderNamePicker.call(this, {
    label: "Status name",
    valueKey: "status_name",
    entityKey: "main_entity",
    defaultType: "entity",
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
  const itemsPerRow = Math.max(
    1,
    Number(this._config?.items_per_row) || 3
  );
  const shouldWrapTabs =
    Boolean(this._config?.wrap) &&
    items.length > itemsPerRow;
  const showTabScrollHint =
    (!shouldWrapTabs && items.length > 6) ||
    (shouldWrapTabs && itemsPerRow > 6);

  return html`
    <div class="section">
      <div class="status-group-options">
        <label class="status-wrap-toggle">
          <span>${this._t("Wrap")}</span>
          <ha-switch
            .checked=${!!this._config?.wrap}
            @change=${(e) =>
              this._updateConfig({
                wrap: e.target.checked,
                items_per_row: e.target.checked
                  ? this._config?.items_per_row || 3
                  : this._config?.items_per_row,
              })}
          ></ha-switch>
        </label>

        ${items.length > 1
          ? html`
              <label class="status-wrap-toggle">
                <span>${this._t("Separate cards")}</span>
                <ha-switch
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) =>
                    this._updateConfig({
                      separate_cards: e.target.checked,
                    })}
                ></ha-switch>
              </label>
            `
          : ""}

      ${this._config?.wrap
        ? html`
            <div class="status-per-row-field">
              ${this._renderNumberInput("Items per row", "items_per_row", {
                value: this._config?.items_per_row || 3,
                min: 1,
                step: 1,
                onValueChanged: (value) =>
                  this._updateConfig({
                    items_per_row: Math.max(
                      1,
                      Number(value) || 1
                    ),
                  }),
              })}
            </div>
          `
        : ""}
      </div>

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

      <div class="field">
        <label>${this._t("Main entity")}</label>

        ${renderEntitySelector.call(this, {
          value: selectedItem.entity || "",
          filterOptions: STATUS_MAIN_ENTITY_DOMAIN_FILTERS,
          onValueChanged: (value) =>
            this._updateStatusItem(selectedIndex, {
              entity: value,
            }),
        })}
      </div>

      <div class="color-pair">
        ${renderStatusItemColor.call(
          this,
          ["Accent", "Active", "Color"],
          "accent_on_color",
          selectedIndex,
          selectedItem
        )}
        ${renderStatusItemColor.call(
          this,
          ["Accent", "Inactive", "Color"],
          "accent_off_color",
          selectedIndex,
          selectedItem
        )}
      </div>

      ${renderStatusItemIconSource.call(
        this,
        selectedIndex,
        selectedItem
      )}

      ${renderStatusItemInput.call(
        this,
        "State template",
        "state_template",
        selectedIndex,
        selectedItem
      )}
      ${renderStatusItemInput.call(
        this,
        "Label template",
        "label_template",
        selectedIndex,
        selectedItem
      )}

      ${selectedItem.entity
        ? this._renderStatusItemInteractions(
            selectedIndex,
            selectedItem,
            cardActionDefault,
            mainEntityActionDefault
          )
        : ""}
    </div>
  `;
}

function renderStatusItemInput(label, key, index, item) {
  return this._renderTemplateInput(label, key, {
    value: item[key] || "",
    onValueChanged: (value) =>
      this._updateStatusItem(index, {
        [key]: value,
      }),
  });
}

function renderStatusItemColor(label, key, index, item) {
  return this._renderColorControl(
    label,
    `status-${index}-${key}`,
    item[key] || "",
    (value) =>
      this._updateStatusItem(index, {
        [key]: value,
      })
  );
}

function renderStatusIconSource() {
  return renderIconSourceControl.call(this, {
    label: "Icon",
    sourceKey: "main_entity_icon_source",
    entityKey: "main_entity",
    customIconKeys: [
      "main_entity_icon",
      "main_entity_icon_on",
      "main_entity_icon_off",
    ],
    renderCustom() {
      return html`
        ${this._renderIconInput("", "main_entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(
            ["Active", "Icon"],
            "main_entity_icon_on"
          )}
          ${this._renderIconInput(
            ["Inactive", "Icon"],
            "main_entity_icon_off"
          )}
        </div>
      `;
    },
  });
}

function renderStatusItemIconSource(index, item) {
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
    sourceKey: "main_entity_icon_source",
    entityKey: "entity",
    customIconKeys: [
      "main_entity_icon",
      "main_entity_icon_on",
      "main_entity_icon_off",
    ],
    renderCustom() {
      return html`
        ${this._renderIconInput("", "main_entity_icon")}
        <div class="icon-pair">
          ${this._renderIconInput(
            ["Active", "Icon"],
            "main_entity_icon_on"
          )}
          ${this._renderIconInput(
            ["Inactive", "Icon"],
            "main_entity_icon_off"
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
