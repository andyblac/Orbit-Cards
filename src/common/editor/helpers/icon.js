import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

/* ==========================================
 * ICON HELPERS
 * ========================================== */

export function isImageIcon(icon) {
  if (!icon) return false;

  const cleanIcon = icon.split("?")[0].toLowerCase();

  return (
    cleanIcon.endsWith(".svg") ||
    cleanIcon.endsWith(".png") ||
    cleanIcon.endsWith(".gif") ||
    cleanIcon.endsWith(".webp")
  );
}

export function resolveIconPath(iconPath) {
  if (!iconPath) return "";

  if (
    iconPath.startsWith("/")
  ) {
    return iconPath;
  }

  if (iconPath.startsWith("http")) {
    return iconPath;
  }

  return `/local/icons/${iconPath}`;
}

export function renderIconInput(label, key, placeholder) {
  const value = this._config?.[key] || "";
  const iconPath =
    value && this._isImageIcon(value)
      ? this._resolveIconPath(value)
      : "";
  const inlineSvg =
    iconPath && this._getInlineSvg
      ? this._getInlineSvg(iconPath)
      : "";

  return html`
    <div class="field">
      <label>${label}</label>

      <div class="icon-input-row">

        <input
          .value=${value}
          placeholder=${placeholder}
          @input=${(e) =>
            this._handleConfigUpdate(
              key,
              e.target.value
            )}
        />

        <div class="icon-preview">

          ${value
            ? this._isImageIcon(value)
              ? html`
                  <span class="preview-image-stack">
                    ${inlineSvg
                      ? html`
                          <span class="preview-svg">
                            ${unsafeHTML(inlineSvg)}
                          </span>
                        `
                      : html`
                          <img
                            src=${iconPath}
                            class="preview-image"
                            alt=""
                          />
                        `}
                  </span>
                `
              : html`
                  <ha-icon
                    .icon=${value}
                  ></ha-icon>
                `
            : html`
                <ha-icon
                  icon="mdi:image-outline"
                ></ha-icon>
              `}
        </div>

      </div>
    </div>
  `;
}
