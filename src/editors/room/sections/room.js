import { html } from "lit";

export function renderRoomSection() {
    return html`
      <div class="section">
        ${this._renderSectionHeader("Room", "room")}

        ${this._collapsed.room
          ? ""
          : html`

              <!-- ROOM SETTINGS -->
              ${this._renderInput("Room Name", "room_name")}

              <!-- ROOM / CARD NAVIGATION -->
              <div class="field">
                <label>Room Navigation Path</label>

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
              ${this._renderColor("Accent Color", "accent_color")}
              ${this._renderColor("Status Color", "status_color")}

              <!-- MAIN ENTITY -->
              ${this._renderEntity("Main Entity", "main_entity")}
              ${this._renderIconInput(
                "Main Entity Icon",
                "main_entity_icon"
              )}

              ${this._renderIconInput(
                "Main Entity ON Icon",
                "main_entity_icon_on"
              )}

              ${this._renderIconInput(
                "Main Entity OFF Icon",
                "main_entity_icon_off"
              )}

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

            `}
      </div>
    `;
  }
