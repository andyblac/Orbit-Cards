import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export function renderCard() {
  const buttons = this._getButtonEntities();

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
                  ${buttons.map((id, i) => this._renderButtons(id, i))}
                </div>
              `
            : ""}

        </div>

        <div
          class="circle"
          style="background:${this._circleColor}"

          @click=${(ev) => this._handleMainEntityTap(ev)}

          @pointerdown=${(ev) =>
            this._startLongPress(
              ev,
              this._config.main_entity || this._config.entity,
              this._config.main_entity_hold_action
            )}

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

      </div>
    </ha-card>
  `;
}
