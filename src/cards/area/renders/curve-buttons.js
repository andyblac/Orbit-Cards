import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { getEntityIssue } from "../../../common/helpers/entities.js";


// =========================
// CURVE BUTTONS
// =========================

export function renderCurveButtons() {
    const curveButtons = this._curveButtonModels || [];
    const actionButton = this._actionButtonModel;

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
                @dblclick=${this._handleCurveButtonDoubleClick}
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
                      class="curve-image-icon"
                      style="color:${button.iconColor};"
                    >
                      ${unsafeHTML(this._getInlineSvg(
                        button.iconPath,
                        button.svgForceColor,
                        button.animateIcon
                      ))}
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
              ${renderEntityIssueBadge.call(this, button.entityId, button.stateObj)}
            </button>
          `;
        }
      )}

      ${actionButton
        ? renderActionButton.call(this, actionButton)
        : ""}

      </div>
    `;
  }

function renderActionButton(button) {
  return html`
    <button
      class="curve-button action-button"
        @click=${this._handleCurveButtonClick}
        @dblclick=${this._handleCurveButtonDoubleClick}
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
              class="curve-image-icon"
              style="color:${button.iconColor};"
            >
              ${unsafeHTML(this._getInlineSvg(
                button.iconPath,
                button.svgForceColor,
                button.animateIcon
              ))}
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
      ${renderEntityIssueBadge.call(this, button.entityId, button.stateObj)}
    </button>
  `;
}

function renderEntityIssueBadge(entityId, stateObj) {
  const issue = getEntityIssue(entityId, stateObj);

  if (!issue) return "";

  const label = this._t(
    issue === "missing" ? "Entity not found" : "Unavailable"
  );

  return html`
    <ha-tile-badge
      class="entity-unavailable-badge ${issue === "missing" ? "entity-missing-badge" : ""}"
      title=${label}
      aria-label=${label}
    >
      <ha-icon .icon=${"mdi:exclamation-thick"}></ha-icon>
    </ha-tile-badge>
  `;
}
