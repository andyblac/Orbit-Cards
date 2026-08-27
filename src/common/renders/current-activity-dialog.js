import { html, nothing } from "lit";
import {
  closeCurrentActivityDialog,
  setCurrentActivityScope,
} from "../helpers/current-activity-dialog.js";

export function renderCurrentActivityDialog() {
  if (!this._currentActivityOpen) return nothing;

  if (this._currentActivityCard) {
    this._currentActivityCard.hass = this.hass;
  }

  return html`
    <ha-adaptive-dialog
      class="current-activity-dialog"
      .open=${true}
      width="small"
      @closed=${(event) => {
        event.stopPropagation();
        closeCurrentActivityDialog.call(this);
      }}
    >
      <ha-icon-button
        slot="headerNavigationIcon"
        .label=${this.hass?.localize?.("ui.common.close")}
        @click=${() => closeCurrentActivityDialog.call(this)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <span slot="headerTitle">${this._t("Current activity")}</span>
      ${this._currentActivityShowScopeToggle
        ? html`
            <ha-selector
              slot="headerActionItems"
              class="current-activity-scope-selector"
              .hass=${this.hass}
              .selector=${{
                button_toggle: {
                  options: [
                    {
                      label: this._t("Current"),
                      value: "current",
                    },
                    {
                      label: this._t("All"),
                      value: "all",
                    },
                  ],
                },
              }}
              .value=${this._currentActivityScope || "current"}
              @value-changed=${(event) => {
                event.stopPropagation();
                setCurrentActivityScope.call(this, event.detail.value);
              }}
            ></ha-selector>
          `
        : nothing}
      <div
        class="current-activity-dialog-content"
        style=${`--current-activity-height:${this._currentActivityHeight || "140px"}`}
      >
        ${this._currentActivityLoading
          ? html`
              <div class="current-activity-dialog-message">
                <ha-circular-progress active></ha-circular-progress>
              </div>
            `
          : this._currentActivityError
            ? html`
                <div class="current-activity-dialog-message">
                  ${this._currentActivityError}
                </div>
              `
            : this._currentActivityCard || nothing}
      </div>
    </ha-adaptive-dialog>
  `;
}
