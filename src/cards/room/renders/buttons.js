import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

/* ==========================================
 *  BUTTONS
 * ========================================== */

export function renderButtons(button) {
    if (!button) return null;
    
    return html`
      <button
        class="entity-button"
        style="background:${button.backgroundColor};"
        @click=${this._handleButtonClick}

        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${button.entityId}
        .dataAction=${button.tapAction}
        .dataHoldAction=${button.holdAction}
      >
        ${button.isImage
          ? html`
              <div
                class="button-image-icon"
                style="color:${button.iconColor};"
              >
                ${button.iconPath
                  ? unsafeHTML(this._getInlineSvg(button.iconPath))
                  : ""}
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
