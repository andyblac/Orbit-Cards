import { html } from "lit";
import { renderNamePicker } from "../../../common/editor/helpers/name-picker.js";
import {
  renderInteractionsSection,
} from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";

export function renderAreaSection() {
  return html`
    <div class="section">
      ${renderAreaNamePicker.call(this)}

      ${this._renderArea("Area", "area")}

      ${this._renderColor(["Accent", "Color"], "accent_color")}

      ${this._renderEntity("Main entity", "main_entity")}
      ${renderMainEntityIconControls.call(this)}

      ${renderInteractionsSection.call(this, {
        interactions: [
          {
            key: "tap_action",
            formKey: "tap_action",
            label: "Tap behavior",
            defaultAction: getCardTapDefaultAction(this._config),
            defaultVisible: true,
            displayDefaultValue: true,
          },
          {
            key: "hold_action",
            formKey: "hold_action",
            label: "Hold behavior",
            defaultAction: "none",
          },
          {
            key: "double_tap_action",
            formKey: "double_tap_action",
            label: "Double tap behavior",
            defaultAction: "none",
          },
          this._config?.main_entity
            ? {
                key: "main_entity_tap_action",
                formKey: "icon_tap_action",
                label: "Icon tap behavior",
                defaultAction: "more-info",
                defaultVisible: true,
              }
            : null,
          this._config?.main_entity
            ? {
                key: "main_entity_hold_action",
                formKey: "icon_hold_action",
                label: "Icon hold behavior",
                defaultAction: "none",
              }
            : null,
          this._config?.main_entity
            ? {
                key: "main_entity_double_tap_action",
                formKey: "icon_double_tap_action",
                label: "Icon double tap behavior",
                defaultAction: "none",
              }
            : null,
        ],
        context: {
          entity_id: this._config?.main_entity,
          area_id: this._config?.area,
        },
      })}
    </div>
  `;
}

function getCardTapDefaultAction(config = {}) {
  return {
    action: "navigate",
    navigation_path:
      config.tap_action?.navigation_path ||
      config.navigate?.navigation_path ||
      config.navigation_path ||
      "/lovelace/home",
  };
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
