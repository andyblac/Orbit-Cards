import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";


// =========================
// CURVE BUTTONS
// =========================

export function renderCurveButtons() {

    // NEW GLOBAL OPTION
    const lockPositions =
      this._config?.curve_buttons_lock_position ?? false;

    // KEEP ALL 6 SLOTS
    const curveButtons = [
      this._config.curve_button1,
      this._config.curve_button2,
      this._config.curve_button3,
      this._config.curve_button4,
      this._config.curve_button5,
      this._config.curve_button6,
    ];

    const activeCurveButtons = curveButtons.filter(Boolean);

    return html`
      <div class="curve-buttons">

        ${repeat(
          curveButtons,
          (_, index) => index,
          (entityId, index) => {

          const holdAction =
            this._config?.[`curve_button${index + 1}_hold_action`];

          // DYNAMIC POSITIONING
          const visualIndex = lockPositions
            ? index
            : activeCurveButtons.indexOf(entityId);

          // NORMAL MODE (OLD BEHAVIOUR)
          if (!lockPositions && !entityId) {
            return null;
          }

          // LOCK MODE
          // preserve empty slots
          if (lockPositions && !entityId) {
            return html`
              <div class="curve-button pos-${index}"></div>
            `;
          }

          const stateObj = this.hass?.states[entityId];

          if (!stateObj) return null;

          const stateTemplate =
            this._config?.[`curve_button${index + 1}_state_template`];

          const evaluatedState =
            this._evaluateStateTemplate(
              stateTemplate,
              entityId
            );

          const isOn =
            evaluatedState === null || evaluatedState === undefined
              ? this._getEntityActiveState(stateObj)
              : evaluatedState === true ||
                evaluatedState === "on";

          const customIcon =
            this._config?.[`curve_button${index + 1}_icon`];

          const customIconOn =
            this._config?.[`curve_button${index + 1}_icon_on`];

          const customIconOff =
            this._config?.[`curve_button${index + 1}_icon_off`];

          const domain = entityId.split(".")[0];

          let icon;

          const defaultIcon =
            this._getDefaultDomainIcon(domain, stateObj);

          const entityIcon =
            stateObj?.attributes?.icon ||
            this.hass?.entities?.[entityId]?.icon;

          if (isOn) {
            icon =
              customIconOn ||
              customIcon ||
              entityIcon ||
              defaultIcon ||
              "mdi:help-circle";
          } else {
            icon =
              customIconOff ||
              customIcon ||
              entityIcon ||
              defaultIcon ||
              "mdi:help-circle";
          }

          const roomColor = this._config.accent_color || "theme";

          const tapAction =
            this._config?.[`curve_button${index + 1}_tap_action`] ?? {
              action: "more-info",
            };

          let iconColor;

          if (roomColor === "theme") {
            iconColor = isOn
              ? "rgba(var(--color-theme),0.7)"
              : "rgba(var(--color-theme),0.2)";
          } else if (
            roomColor.startsWith("rgb") ||
            roomColor.startsWith("#")
          ) {
            iconColor = isOn
              ? roomColor
              : `color-mix(in srgb, ${roomColor} 40%, transparent)`;
          } else {
            iconColor = isOn
              ? `rgba(var(--color-${roomColor}),1)`
              : `rgba(var(--color-${roomColor}),0.4)`;
          }

          const isImage = this._isImageIcon(icon);

          const iconPath = isImage
            ? this._resolveIconPath(icon)
            : "";

          return html`
            <button
              class="curve-button pos-${visualIndex}"
                @click=${this._handleCurveButtonClick}
                @pointerdown=${(ev) =>
                  this._startLongPress(
                    ev,
                    entityId,
                    holdAction
                  )}

                @pointerup=${this._finishLongPress}
                @pointerleave=${this._cancelLongPress}
                @pointercancel=${this._cancelLongPress}

                .dataEntity=${entityId}
                .dataAction=${tapAction}
            >
              ${isImage
                ? html`
                    <div
                      class="curve-image-icon"
                      style="color:${iconColor};"
                    >
                      ${unsafeHTML(this._getInlineSvg(iconPath))}
                    </div>
                  `
                : html`
                    <ha-icon
                      .icon=${icon}
                      style="color:${iconColor};"
                    ></ha-icon>
                  `}
            </button>
          `;
        }
      )}

      </div>
    `;
  }
