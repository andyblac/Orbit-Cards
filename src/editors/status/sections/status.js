import { html } from "lit";

export function renderStatusSection() {
  return html`
    <div class="section">
      ${this._renderInput("Status Name", "status_name")}
      ${this._renderInput("Status Text", "status_text")}
      ${this._renderColor("Accent Color", "accent_color")}
      ${this._renderColor("Name Color", "name_color")}
      ${this._renderColor("Status Color", "status_color")}
      ${this._renderEntity("Main Entity", "main_entity")}
      ${this._renderIconInput("Main Icon", "icon")}
      ${this._renderIconInput("Main ON Icon", "icon_on")}
      ${this._renderIconInput("Main OFF Icon", "icon_off")}

      ${this._config?.main_entity
        ? html`
            ${this._renderActionSelector(
              "Card Action",
              "tap_action",
              "navigate"
            )}
            ${this._renderActionSelector(
              "Main Entity Action",
              "main_entity_tap_action",
              "more-info"
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
