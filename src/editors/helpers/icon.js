import { html } from "lit";

/* ==========================================
 * ICON HELPERS
 * ========================================== */

export function isImageIcon(icon) {
  if (!icon) return false;

  return (
    icon.endsWith(".svg") ||
    icon.endsWith(".png") ||
    icon.endsWith(".gif") ||
    icon.endsWith(".webp")
  );
}

export function resolveIconPath(iconPath) {
  if (!iconPath) return "";

  if (
    iconPath.startsWith("/") ||
    iconPath.startsWith("http")
  ) {
    return iconPath;
  }

  return `/local/icons/${iconPath}`;
}

export function renderIconInput(label, key, placeholder) {
  const value = this._config?.[key] || "";

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
                  <img
                    src="${this._resolveIconPath(value)}"
                    class="preview-image"
                  />
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
