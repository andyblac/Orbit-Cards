import { html } from "lit";
import {
  renderEntitySelector,
  renderInteractionsSection,
} from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";

export function renderButtonsSection() {
  const selected = this._selectedButtonIndex || 1;

  return html`
    <div class="section">
      ${renderButtonMenu.call(
        this,
        [1, 2, 3, 4],
        selected,
        (index) => {
          this._selectedButtonIndex = index;
        }
      )}

      ${renderButtonFields.call(this, selected)}
    </div>
  `;
}

function renderButtonMenu(items, selected, onSelect) {
  return html`
    <div
      class="editor-segment-menu"
      style="--editor-segment-columns: 4;"
    >
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

function renderButtonFields(index) {
  const key = `button${index}`;
  const activeFilter = this._areaButtonDomainFilter || "all";

  return html`
    <div class="sub-section selected-button-section">
      <div class="field">
        <label>${this._t("Entity")}</label>

        ${renderEntitySelector.call(this, {
          value: this._config?.[key] || "",
          filterOptions: AREA_BUTTON_DOMAIN_FILTERS,
          activeFilter,
          onValueChanged: (value) =>
            this._handleEntityUpdate
              ? this._handleEntityUpdate(key, value)
              : this._handleConfigUpdate(key, value),
        })}
      </div>

      <div class="color-pair">
        ${this._renderColor(["Active", "Color"], `${key}_on_color`)}
        ${this._renderColor(["Inactive", "Color"], `${key}_off_color`)}
      </div>

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

      ${renderInteractionsSection.call(this, {
        interactions: [
          {
            key: `${key}_tap_action`,
            formKey: "tap_action",
            label: "Tap behavior",
            defaultAction: "toggle",
            defaultVisible: true,
          },
          {
            key: `${key}_hold_action`,
            formKey: "hold_action",
            label: "Hold behavior",
            defaultAction: "more-info",
          },
          {
            key: `${key}_double_tap_action`,
            formKey: "double_tap_action",
            label: "Double tap behavior",
            defaultAction: "none",
          },
        ],
        context: {
          entity_id: this._config?.[key],
          area_id: this._config?.area,
        },
      })}
    </div>
  `;
}

const AREA_BUTTON_DOMAIN_FILTERS = [
  {
    label: "All",
    value: "all",
    domains: null,
  },
  {
    label: "Lights",
    haDomains: ["light"],
    value: "light",
    domains: ["light"],
  },
  {
    label: "Switches",
    haDomains: ["switch"],
    value: "switch",
    domains: ["switch"],
  },
];
