import { html } from "lit";

export function renderCurvedButtonsSection() {
  const selected = this._selectedCurveButtonIndex || 1;

  return html`
    <div class="section">
      <div class="field">
        <label>${this._t("Lock Curve Button Positions")}</label>

        <select
          .value=${this._config?.curve_buttons_lock_position
            ? "true"
            : "false"}
          @change=${(e) =>
            this._updateConfig({
              curve_buttons_lock_position:
                e.target.value === "true",
            })}
        >
          <option value="false">${this._t("Disabled")}</option>
          <option value="true">${this._t("Enabled")}</option>
        </select>
      </div>

      <div class="curve-divider"></div>

      ${renderCurveButtonMenu.call(
        this,
        [1, 2, 3, 4, 5, 6],
        selected,
        (index) => {
          this._selectedCurveButtonIndex = index;
        }
      )}

      ${renderCurveButtonFields.call(this, selected)}
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

function renderCurveButtonFields(index) {
  const key = `curve_button${index}`;

  return html`
    <div class="sub-section selected-button-section">
      ${this._renderEntity("Entity", key)}

      ${this._renderIconInput("Icon", `${key}_icon`)}
      ${this._renderIconInput("ON Icon", `${key}_icon_on`)}
      ${this._renderIconInput("OFF Icon", `${key}_icon_off`)}

      ${this._renderTemplateInput("State Template", `${key}_state_template`)}

      ${this._renderActionSelector(
        "Tap Action",
        `${key}_tap_action`,
        "more-info"
      )}

      ${this._renderActionSelector(
        "Hold Action",
        `${key}_hold_action`,
        "none"
      )}
    </div>
  `;
}
