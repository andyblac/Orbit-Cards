import { html } from "lit";
import { getDefaultEntityAction } from "../../../common/helpers/default-actions.js";

export function renderCurvedButtonsSection() {
  const selected = this._selectedCurveButtonIndex || 1;

  return html`
    <div class="section">
      <label class="editor-toggle-row">
        <span>${this._t("Lock Curve Button Positions")}</span>
        <ha-switch
          .checked=${Boolean(this._config?.curve_buttons_lock_position)}
          @change=${(e) =>
            this._updateConfig({
              curve_buttons_lock_position: e.target.checked,
            })}
        ></ha-switch>
      </label>

      <div class="curve-divider"></div>

      ${renderCurveButtonMenu.call(
        this,
        [1, 2, 3, 4, 5, 6],
        selected,
        (index) => {
          this._selectedCurveButtonIndex = index;
        }
      )}

      ${renderButtonFields.call(
        this,
        `curve_button${selected}`,
        "",
        "more-info",
        { index: selected }
      )}
    </div>
  `;
}

export function renderActionButtonSection() {
  const defaultAction = getDefaultEntityAction(this._config?.action_button);

  return html`
    <div class="section">
      ${renderActionEntityFilterMenu.call(this)}

      ${renderButtonFields.call(
        this,
        "action_button",
        "",
        defaultAction,
        {},
        {
          showColors: true,
          filteredEntity: true,
        }
      )}
    </div>
  `;
}

function renderCurveButtonMenu(items, selected, onSelect) {
  return html`
    <div class="editor-segment-menu">
      ${items.map((index) => html`
        <button
          type="button"
          class="editor-segment-item ${selected === index ? "active" : ""}"
          @click=${() => onSelect(index)}
        >
          ${this._t("Button {index}", { index })}
        </button>
      `)}
    </div>
  `;
}

function renderButtonFields(
  key,
  title,
  defaultAction,
  replacements = {},
  options = {}
) {
  return html`
    <div class="sub-section selected-button-section">
      ${title
        ? html`
            <div class="sub-section-title">
              ${this._t(title, replacements)}
            </div>
          `
        : ""}

      ${options.filteredEntity
        ? renderFilteredActionEntity.call(this, "Entity", key)
        : this._renderEntity("Entity", key)}

      ${options.showColors
        ? html`
            <div class="color-pair">
              ${renderAccentOverrideColor.call(
                this,
                "ON Color",
                `${key}_on_color`
              )}
              ${renderAccentOverrideColor.call(
                this,
                "OFF Color",
                `${key}_off_color`
              )}
            </div>
          `
        : ""}

      ${this._renderIconInput("Icon", `${key}_icon`)}
      <div class="icon-pair">
        ${this._renderIconInput("ON Icon", `${key}_icon_on`)}
        ${this._renderIconInput("OFF Icon", `${key}_icon_off`)}
      </div>

      ${this._renderTemplateInput("State Template", `${key}_state_template`)}

      ${this._renderActionSelector(
        "Tap Action",
        `${key}_tap_action`,
        defaultAction
      )}

      ${this._renderActionSelector(
        "Hold Action",
        `${key}_hold_action`,
        "none"
      )}
    </div>
  `;
}

const ACTION_BUTTON_DOMAIN_FILTERS = [
  {
    label: "All",
    value: "all",
    domains: null,
  },
  {
    label: "Automations",
    value: "automation",
    domains: ["automation"],
  },
  {
    label: "Buttons",
    value: "button",
    domains: ["button", "input_button", "input_boolean"],
  },
  {
    label: "Cameras",
    value: "camera",
    domains: ["camera"],
  },
  {
    label: "Scenes",
    value: "scene",
    domains: ["scene"],
  },
  {
    label: "Scripts",
    value: "script",
    domains: ["script"],
  },
];

function renderActionEntityFilterMenu() {
  const activeFilter =
    this._roomActionButtonDomainFilter || "all";

  return html`
    <div class="action-domain-filters">
      ${ACTION_BUTTON_DOMAIN_FILTERS.map((filter) => html`
        <button
          type="button"
          class=${filter.value === activeFilter ? "active" : ""}
          @click=${() => {
            this._roomActionButtonDomainFilter = filter.value;
          }}
        >
          ${this._t(filter.label)}
        </button>
      `)}
    </div>
  `;
}

function renderFilteredActionEntity(label, key) {
  const activeFilter =
    this._roomActionButtonDomainFilter || "all";
  const filter =
    ACTION_BUTTON_DOMAIN_FILTERS.find(
      (item) => item.value === activeFilter
    ) || ACTION_BUTTON_DOMAIN_FILTERS[0];

  const entitySelector = filter.domains
    ? {
        entity: {
          domain: filter.domains,
        },
      }
    : {
        entity: {},
      };

  return html`
    <div class="field">
      <label>${this._t(label)}</label>

      <div class="entity-row">
        <ha-selector
          class="entity-picker"
          .hass=${this.hass}
          .selector=${entitySelector}
          .value=${this._config?.[key] || ""}
          @value-changed=${(e) =>
            this._handleEntityUpdate
              ? this._handleEntityUpdate(key, e.detail.value || "")
              : this._handleConfigUpdate(key, e.detail.value || "")}
        ></ha-selector>

        ${this._config?.[key]
          ? html`
              <button
                type="button"
                class="clear-button"
                @click=${() =>
                  this._handleEntityUpdate
                    ? this._handleEntityUpdate(key, "")
                    : this._updateConfig({
                        [key]: "",
                      })}
              >
                ✕
              </button>
            `
          : ""}
      </div>
    </div>
  `;
}

function renderAccentOverrideColor(label, key) {
  const rawValue = this._config?.[key] || "";
  const value = rawValue === "theme" ? "" : rawValue;
  const previewValue = value || this._config?.accent_color || "theme";

  return this._renderColorControl(
    label,
    key,
    value,
    (nextValue) => this._handleConfigUpdate(key, nextValue),
    previewValue
  );
}
