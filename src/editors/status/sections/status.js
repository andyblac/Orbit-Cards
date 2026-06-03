import { html } from "lit";

export function renderStatusSection() {
  const mode = this._config?.mode || "standard";
  const isIconOnly = mode === "icon_only";
  const isPerson = mode === "person";

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
          <option value="person">Person</option>
        </select>
      </div>
    </div>

    <div class="section">
      ${isIconOnly || isPerson
        ? ""
        : this._renderInput("Status Name", "status_name")}
      ${isPerson
        ? html`
            ${this._renderEntity("Person Entity", "main_entity")}
            ${this._renderEntity("Tracker Entity", "tracker_entity")}
            ${this._renderColor("Accent ON Color", "accent_on_color")}
            ${this._renderColor("Accent OFF Color", "accent_off_color")}
            ${this._renderEntity("ETA Entity", "eta_entity")}
            ${this._renderEntity("Battery Entity 1", "battery_entity_1")}
            ${this._renderEntity("Battery Entity 2", "battery_entity_2")}
          `
        : html`
            ${this._renderEntity("Main Entity", "main_entity")}
            ${this._renderColor("Accent ON Color", "accent_on_color")}
            ${this._renderColor("Accent OFF Color", "accent_off_color")}
            ${this._renderIconInput("Main Entity Icon", "main_entity_icon")}
            ${this._renderIconInput("Main Entity ON Icon", "main_entity_icon_on")}
            ${this._renderIconInput("Main Entity OFF Icon", "main_entity_icon_off")}
          `}
      ${isPerson
        ? ""
        : html`
            ${this._renderInput("State Template", "state_template")}
            ${this._renderInput("Label Template", "label_template")}
          `}

      ${this._config?.main_entity
        ? html`
            ${this._renderActionSelector(
              "Card Action",
              "tap_action",
              isIconOnly || isPerson ? "more-info" : "navigate"
            )}
            ${this._renderActionSelector(
              "Main Entity Action",
              "main_entity_tap_action",
              isIconOnly || isPerson ? "none" : "more-info"
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
