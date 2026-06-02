import { html } from "lit";

export function renderStatusSection() {
  const mode = this._config?.mode || "standard";
  const isIconOnly = mode === "icon_only";

  return html`
    <div class="section">
      <div class="field">
        <label>Mode</label>

        <select
          .value=${this._config?.mode || "standard"}
          @change=${(e) =>
            this._updateConfig({
              mode: e.target.value,
            })}
        >
          <option value="standard">Standard</option>
          <option value="icon_only">Icon Only</option>
        </select>
      </div>
    </div>

    <div class="section">
      ${isIconOnly
        ? ""
        : this._renderInput("Status Name", "status_name")}
      ${this._renderColor("Accent ON Color", "accent_on_color")}
      ${this._renderColor("Accent OFF Color", "accent_off_color")}
      ${this._renderEntity("Main Entity", "main_entity")}
      ${this._renderInput("State Template", "state_template")}
      ${this._renderInput("Label Template", "label_template")}
      ${this._renderIconInput("Main Icon", "icon")}
      ${this._renderIconInput("Main ON Icon", "icon_on")}
      ${this._renderIconInput("Main OFF Icon", "icon_off")}

      ${this._config?.main_entity
        ? html`
            ${this._renderActionSelector(
              "Card Action",
              "tap_action",
              isIconOnly ? "more-info" : "navigate"
            )}
            ${this._renderActionSelector(
              "Main Entity Action",
              "main_entity_tap_action",
              isIconOnly ? "none" : "more-info"
            )}
            ${this._renderActionSelector(
              "Hold Action",
              "main_entity_hold_action",
              "none"
            )}
          `
        : ""}
    </div>
  `;
}
