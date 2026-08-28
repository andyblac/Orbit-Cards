import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getEntityIssue } from "../../../common/helpers/entities.js";

/* ==========================================
 *  BUTTONS
 * ========================================== */

export function renderButtons(button) {
    if (!button) return null;
    const issue = getEntityIssue(button.entityId, button.stateObj);
    const issueLabel = issue
      ? this._t(issue === "missing" ? "Entity not found" : "Unavailable")
      : "";
    
    return html`
      <button
        class="entity-button"
        style="background:${button.backgroundColor};"
        @click=${this._handleButtonClick}
        @dblclick=${this._handleButtonDoubleClick}

        @pointerdown=${this._handleButtonPointerDown}

        @pointerup=${this._finishLongPress}
        @pointerleave=${this._cancelLongPress}
        @pointercancel=${this._cancelLongPress}

        .dataEntity=${button.entityId}
        .dataAction=${button.tapAction}
        .dataHoldAction=${button.holdAction}
        .dataDoubleAction=${button.doubleTapAction}
      >
        ${button.isImage
          ? html`
              <div
                class="button-image-icon"
                style="color:${button.iconColor};"
              >
                ${button.iconPath
                  ? unsafeHTML(this._getInlineSvg(
                      button.iconPath,
                      button.svgForceColor,
                      button.animateIcon
                    ))
                  : ""}
              </div>
            `
          : button.useStateIcon && button.stateObj
            ? html`
                <ha-state-icon
                  .stateObj=${button.stateObj}
                  style="color:${button.iconColor};"
                ></ha-state-icon>
              `
          : html`
              <ha-icon
                .icon=${button.icon}
                style="color:${button.iconColor};"
              ></ha-icon>
            `}
        ${issue
          ? html`
              <ha-tile-badge
                class="entity-unavailable-badge ${issue === "missing" ? "entity-missing-badge" : ""}"
                title=${issueLabel}
                aria-label=${issueLabel}
              >
                <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
              </ha-tile-badge>
            `
          : ""}
      </button>
    `;
  }
