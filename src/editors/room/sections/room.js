import { html } from "lit";

export function renderRoomSection() {
  return html`
    <div class="section">
      ${this._renderInput("Name", "room_name")}

      <div class="field">
        <label>${this._t("Navigation Path")}</label>

        <input
          .value=${this._config?.navigate?.navigation_path || ""}
          placeholder="/lovelace/home"
          @input=${(e) => {
            this._updateConfig({
              navigate: {
                navigation_path: e.target.value,
              },
            });
          }}
        />
      </div>

      ${this._renderArea("Area", "area")}
      <div class="color-pair">
        ${this._renderColor("Accent Color", "accent_color")}
        ${this._renderColorControl(
          "Status Color",
          "status_color",
          this._config?.status_color || this._config?.accent_color || "",
          (value) => this._handleConfigUpdate("status_color", value),
          this._config?.status_color || this._config?.accent_color || ""
        )}
      </div>

      ${this._renderEntity("Main Entity", "main_entity")}
      ${this._renderIconInput(
        "Main Entity Icon",
        "main_entity_icon"
      )}

      <div class="icon-pair">
        ${this._renderIconInput(
          "Main Entity ON Icon",
          "main_entity_icon_on"
        )}
        ${this._renderIconInput(
          "Main Entity OFF Icon",
          "main_entity_icon_off"
        )}
      </div>

      ${this._config?.main_entity
        ? html`
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
