import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export function renderAreaCard() {
  const buttons = this._buttonModels || [];
  const iconPath = this._isImageIcon(this._icon)
    ? this._resolveIconPath(this._icon)
    : "";
  const inlineSvg = iconPath
    ? this._getInlineSvg(iconPath, this._iconSvgForceColor)
    : "";

  return html`
    <ha-card
      tabindex="0"
      @click=${this._handleTap}
      @dblclick=${this._handleCardDoubleTap}
      @pointerdown=${this._handleCardPointerDown}
      @pointerup=${this._finishLongPress}
      @pointerleave=${this._cancelLongPress}
      @pointercancel=${this._cancelLongPress}
    >
      <div class="container">
        <div class="content">

            <div class="header ${buttons.length >= 3 ? "compressed" : ""}">
              <div class="card-name" style="color:${this._areaColor}">
                ${this._cardName}
            </div>

            <div class="status" style="color:${this._statusColor}">
              ${renderStatusItems.call(this)}
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

function renderStatusItems() {
  const items = this._statusItems || [];

  if (!items.length) {
    return this._statusText || "";
  }

  const separator = this._config?.status_separator || "|";

  return items.map((item, index) => html`
    ${index > 0
      ? html`
          <span class="status-separator">
            ${separator}
          </span>
        `
      : ""}
    <span class="status-item">
      ${renderStatusIcon.call(this, item)}
      <span>${item.text}</span>
    </span>
  `);
}

function renderStatusIcon(item) {
  if (!item.icon) return "";

  if (item.isImage) {
    return html`
      <span class="status-prefix-icon status-prefix-image">
        ${item.iconPath
          ? unsafeHTML(this._getInlineSvg(item.iconPath, true))
          : ""}
      </span>
    `;
  }

  if (item.isHaIcon) {
    return html`
      <ha-icon
        class="status-prefix-icon"
        .icon=${item.icon}
      ></ha-icon>
    `;
  }

  return html`
    <span class="status-prefix-text">
      ${item.icon}
    </span>
  `;
}
