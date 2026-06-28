import { html } from "lit";
import { renderEntitySelector } from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";
import { getDefaultEntityAction } from "../../../common/helpers/default-actions.js";

export function renderCurvedButtonsSection() {
  const selected = this._selectedCurveButtonIndex || 1;

  return html`
    <div class="section">
      <label class="editor-toggle-row">
        <span>${this._t("Lock curve button positions")}</span>
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
        { index: selected },
        {
          showColors: true,
          filteredEntity: true,
          filterKey: "_areaCurveButtonDomainFilter",
          filters: CURVE_BUTTON_DOMAIN_FILTERS,
        }
      )}
    </div>
  `;
}

export function renderActionButtonSection() {
  const defaultAction = getDefaultEntityAction(this._config?.action_button);

  return html`
    <div class="section">
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
        ? renderFilteredActionEntity.call(this, "Entity", key, options)
        : this._renderEntity("Entity", key)}

      ${options.showColors
        ? html`
            <div class="color-pair">
              ${renderAccentOverrideColor.call(
                this,
                ["Active", "Color"],
                `${key}_on_color`
              )}
              ${renderAccentOverrideColor.call(
                this,
                ["Inactive", "Color"],
                `${key}_off_color`
              )}
            </div>
          `
        : ""}

      ${renderIconSourceControl.call(this, {
        label: "Icon",
        sourceKey: `${key}_icon_source`,
        entityKey: key,
        customIconKeys: [
          `${key}_icon`,
          `${key}_icon_on`,
          `${key}_icon_off`,
        ],
        renderCustom() {
          return html`
            ${this._renderIconInput("", `${key}_icon`)}
            <div class="icon-pair">
              ${this._renderIconInput(["Active", "Icon"], `${key}_icon_on`)}
              ${this._renderIconInput(["Inactive", "Icon"], `${key}_icon_off`)}
            </div>
          `;
        },
      })}

      ${this._renderTemplateInput("State template", `${key}_state_template`)}

      ${this._renderActionSelector(
        "Tap behavior",
        `${key}_tap_action`,
        defaultAction
      )}

      ${this._renderActionSelector(
        "Hold behavior",
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
    haDomains: ["automation"],
    value: "automation",
    domains: ["automation"],
  },
  {
    label: "Buttons",
    haDomains: ["button"],
    value: "button",
    domains: ["button", "input_button", "input_boolean"],
  },
  {
    label: "Cameras",
    haDomains: ["camera"],
    value: "camera",
    domains: ["camera"],
  },
  {
    label: "Scenes",
    haDomains: ["scene"],
    value: "scene",
    domains: ["scene"],
  },
  {
    label: "Scripts",
    haDomains: ["script"],
    value: "script",
    domains: ["script"],
  },
];

const CURVE_BUTTON_DOMAIN_FILTERS = [
  {
    label: "All",
    value: "all",
    domains: null,
  },
  {
    label: "Covers",
    haDomains: ["cover"],
    value: "cover",
    domains: ["cover"],
  },
  {
    label: "Lights",
    haDomains: ["light"],
    value: "light",
    domains: ["light"],
  },
  {
    label: "Sensors",
    haDomains: ["sensor"],
    value: "sensor",
    domains: ["sensor", "binary_sensor"],
  },
  {
    label: "Switches",
    haDomains: ["switch"],
    value: "switch",
    domains: ["switch"],
  },
];

function renderFilteredActionEntity(label, key, options = {}) {
  const activeFilter =
    this[options.filterKey || "_areaActionButtonDomainFilter"] || "all";
  const filters = options.filters || ACTION_BUTTON_DOMAIN_FILTERS;

  return html`
    <div class="field">
      <label>${this._t(label)}</label>

      ${renderEntitySelector.call(this, {
        value: this._config?.[key] || "",
        filterOptions: filters,
        activeFilter,
        onValueChanged: (value) =>
          this._handleEntityUpdate
            ? this._handleEntityUpdate(key, value)
            : this._handleConfigUpdate(key, value),
      })}
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
