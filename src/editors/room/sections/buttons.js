import { html } from "lit";

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

  return html`
    <div class="sub-section selected-button-section">
      ${this._renderEntity("Entity", key)}

      <div class="color-pair">
        ${this._renderColor("ON Color", `${key}_on_color`)}
        ${this._renderColor("OFF Color", `${key}_off_color`)}
      </div>

      ${this._renderIconInput("Icon", `${key}_icon`)}
      <div class="icon-pair">
        ${this._renderIconInput("ON Icon", `${key}_icon_on`)}
        ${this._renderIconInput("OFF Icon", `${key}_icon_off`)}
      </div>

      ${this._renderTemplateInput("State Template", `${key}_state_template`)}

      ${this._renderActionSelector(
        "Tap Action",
        `${key}_tap_action`,
        "toggle"
      )}

      ${this._renderActionSelector(
        "Hold Action",
        `${key}_hold_action`,
        "more-info"
      )}
    </div>
  `;
}
