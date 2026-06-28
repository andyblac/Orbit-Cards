import { html } from "lit";
import { renderNamePicker } from "../../../common/editor/helpers/name-picker.js";
import { renderNavigationSelector } from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";

export function renderAreaSection() {
  return html`
    <div class="section">
      ${renderAreaNamePicker.call(this)}

      <div class="selector-pair">
        ${this._renderArea("Area", "area")}

        <div class="field">
          ${renderNavigationSelector.call(this, {
            label: "Navigation path",
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
      </div>

      ${this._renderColor(["Accent", "Color"], "accent_color")}

      ${this._renderEntity("Main entity", "main_entity")}
      ${renderMainEntityIconControls.call(this)}

      ${this._config?.main_entity
        ? html`
            ${this._renderActionSelector(
              "Icon tap behavior",
              "main_entity_tap_action",
              "more-info"
            )}
            ${this._renderActionSelector(
              "Icon hold behavior",
              "main_entity_hold_action",
              "none"
            )}
          `
        : ""}
    </div>
  `;
}

function renderAreaNamePicker() {
  return renderNamePicker.call(this, {
    label: "Name",
    valueKey: "area_name",
    legacyValueKey: "room_name",
    entityKey: "main_entity",
    areaKey: "area",
    defaultType: "area",
  });
}

function renderMainEntityIconControls() {
  return renderIconSourceControl.call(this, {
    label: "Icon",
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
            ["Active", "Icon"],
            "main_entity_icon_on"
          )}
          ${this._renderIconInput(
            ["Inactive", "Icon"],
            "main_entity_icon_off"
          )}
        </div>
      `;
    },
  });
}
