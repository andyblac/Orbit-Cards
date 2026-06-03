import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";


// =========================
// CURVE BUTTONS
// =========================

export function renderCurveButtons() {
    const curveButtons = this._curveButtonModels || [];

    return html`
      <div class="curve-buttons">

        ${repeat(
          curveButtons,
          (_, index) => index,
          (button) => {
          if (button.empty) {
            return html`
              <div class="curve-button pos-${button.position}"></div>
            `;
          }

          return html`
            <button
              class="curve-button pos-${button.position}"
                @click=${this._handleCurveButtonClick}
                @pointerdown=${(ev) =>
                  this._startLongPress(
                    ev,
                    button.entityId,
                    button.holdAction
                  )}

                @pointerup=${this._finishLongPress}
                @pointerleave=${this._cancelLongPress}
                @pointercancel=${this._cancelLongPress}

                .dataEntity=${button.entityId}
                .dataAction=${button.tapAction}
            >
              ${button.isImage
                ? html`
                    <div
                      class="curve-image-icon"
                      style="color:${button.iconColor};"
                    >
                      ${unsafeHTML(this._getInlineSvg(button.iconPath))}
                    </div>
                  `
                : html`
                    <ha-icon
                      .icon=${button.icon}
                      style="color:${button.iconColor};"
                    ></ha-icon>
                  `}
            </button>
          `;
        }
      )}

      </div>
    `;
  }
