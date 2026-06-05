import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export function renderRoomCard() {
  const buttons = this._buttonModels || [];
  const iconPath = this._isImageIcon(this._icon)
    ? this._resolveIconPath(this._icon)
    : "";
  const inlineSvg = iconPath
    ? this._getInlineSvg(iconPath, this._iconSvgForceColor)
    : "";

  return html`
    <ha-card tabindex="0" @click=${this._handleTap}>
      <div class="container">
        <div class="content">

            <div class="header ${buttons.length >= 3 ? "compressed" : ""}">
              <div class="card-name" style="color:${this._roomColor}">
                ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${this._statusText || ""}
            </div>
          </div>

          ${buttons.length
            ? html`
                <div class="button-column" style="--button-count:${buttons.length}">
                  ${buttons.map((button) => this._renderButtons(button))}
                </div>
              `
            : ""}

        </div>

        <div
          class="circle"
          style="background:${this._circleColor}"

          @click=${this._handleMainEntityTap}

          @pointerdown=${this._handleMainEntityPointerDown}

          @pointerup=${this._finishLongPress}
          @pointerleave=${this._cancelLongPress}
          @pointercancel=${this._cancelLongPress}
        >

          ${this._renderCurveButtons()}

          ${this._isImageIcon(this._icon)
            ? html`
                <div
                  class="main-image-icon"
                  style="color:${this._iconColor};"
                >
                  ${inlineSvg
                    ? unsafeHTML(inlineSvg)
                    : html`<img src=${iconPath} alt="" />`}
                </div>
              `
            : html`
                <ha-icon
                  class="main-icon"
                  .icon=${this._icon}
                  style="color:${this._iconColor}"
                ></ha-icon>
              `}

        </div>

      </div>
    </ha-card>
  `;
}
