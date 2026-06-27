import { html } from "lit";
import { renderNavigationSelector } from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";

export function renderRoomSection() {
  return html`
    <div class="section">
      ${this._renderInput("Name", "room_name")}
      ${this._renderArea("Area", "area")}

      <div class="field">
        <label>${this._t("Navigation Path")}</label>

        ${renderNavigationSelector.call(this, {
          value: this._config?.navigate?.navigation_path || "",
          onValueChanged: (value) =>
            this._updateConfig({
              navigate: {
                ...this._config?.navigate,
                navigation_path: value,
              },
            }),
        })}
      </div>

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
      ${renderMainEntityIconControls.call(this)}

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

function renderMainEntityIconControls() {
  return renderIconSourceControl.call(this, {
    label: "Main Entity Icon",
    sourceKey: "main_entity_icon_source",
    entityKey: "main_entity",
    areaKey: "area",
    allowArea: true,
    customIconKeys: [
      "main_entity_icon",
      "main_entity_icon_on",
      "main_entity_icon_off",
    ],
    renderCustom() {
      return html`
        ${this._renderIconInput("", "main_entity_icon")}

        <div class="icon-pair">
          ${this._renderIconInput(
            "ON Icon",
            "main_entity_icon_on"
          )}
          ${this._renderIconInput(
            "OFF Icon",
            "main_entity_icon_off"
          )}
        </div>
      `;
    },
  });
}
