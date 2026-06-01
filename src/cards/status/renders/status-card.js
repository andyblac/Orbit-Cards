import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export function renderStatusCard() {
  return html`
    <ha-card tabindex="0" @click=${this._handleTap}>
      <div class="container status-container">
        <div
          class="circle status-circle"
          style="background:${this._circleColor}"
          @pointerdown=${this._handleMainIconPointerDown}
          @pointerup=${this._handleMainIconPointerUp}
          @pointerleave=${this._handleMainIconPointerCancel}
          @pointercancel=${this._handleMainIconPointerCancel}
          @click=${this._handleMainIconClick}
          @contextmenu=${this._handleMainIconContextMenu}
        >
          ${this._isImageIcon(this._icon)
            ? html`
                <div
                  class="main-image-icon"
                  style="color:${this._iconColor};"
                >
                  ${unsafeHTML(
                    this._getInlineSvg(
                      this._resolveIconPath(this._icon)
                    )
                  )}
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

        <div class="content">
          <div class="header">
            <div class="card-name" style="color:${this._nameColor}">
              ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${this._statusText || ""}
            </div>
          </div>
        </div>
      </div>
    </ha-card>
  `;
}
