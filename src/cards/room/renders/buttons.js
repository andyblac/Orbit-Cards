import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

/* ==========================================
 *  BUTTONS
 * ========================================== */

export function renderButtons(entityId, index) {

    const holdAction =
      this._config[`button${index + 1}_hold_action`];

    const stateObj = this.hass?.states[entityId];

    if (!stateObj) return null;

    const stateTemplate =
      this._config?.[`button${index + 1}_state_template`];

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
      this._config?.[`button${index + 1}_icon`];

    const customIconOn =
      this._config?.[`button${index + 1}_icon_on`];

    const customIconOff =
      this._config?.[`button${index + 1}_icon_off`];

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

    const onColor =
      this._config[`button${index + 1}_on_color`] || "theme";

    const offColor =
      this._config[`button${index + 1}_off_color`] || "theme";

    const tapAction =
      this._config[`button${index + 1}_tap_action`] || {
        action: "toggle",
      };
    let bgColor;
    let iconColor;

    if (isOn) {
      let resolvedOnColor = onColor;

      if (onColor === "light") {
        const entityAutoColor = this._getEntityColor(stateObj);

        resolvedOnColor =
          entityAutoColor ||
          this._config.room_color ||
          "theme";
      }

      bgColor = this._computeButtonBackground(resolvedOnColor);
      iconColor = this._computeFullColor(resolvedOnColor);
    } else {
      if (offColor.startsWith("rgba(")) {
        iconColor = offColor;
      } else if (offColor.startsWith("rgb(") || offColor.startsWith("#")) {
        iconColor = `color-mix(in srgb, transparent, ${offColor} 80%)`;
      } else {
        iconColor = `rgba(var(--color-${offColor}),0.2)`;
      }

      if (offColor.startsWith("rgb(") || offColor.startsWith("#")) {
        bgColor = `color-mix(in srgb, transparent, ${offColor} 90%)`;
      } else if (!offColor || offColor === "theme") {
        bgColor = `rgba(var(--color-theme),0.05)`;
      } else {
        bgColor = `rgba(var(--color-${offColor}),0.1)`;
      }
    }

    const isImage = this._isImageIcon(icon);

    const iconPath = isImage
      ? this._resolveIconPath(icon)
      : "";
    
    return html`
      <button
        class="entity-button"
        style="background:${bgColor};"
        @click=${this._handleButtonClick}

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
                class="button-image-icon"
                style="color:${iconColor};"
              >
                ${iconPath
                  ? unsafeHTML(this._getInlineSvg(iconPath))
                  : ""}
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
