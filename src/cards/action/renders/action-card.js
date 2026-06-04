import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export function renderActionCard() {
  const actions = this._actions || [];
  const actionCount = Math.max(actions.length, 1);
  const columnCount = this._getActionColumnCount(actionCount);
  const rowCount = this._getActionRowCount(actionCount);

  return html`
    <ha-card
      class="${actionCount > 1 ? "grouped" : ""} ${actionCount > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
      tabindex="0"
      style="
        --action-count:${actionCount};
        --action-columns:${columnCount};
        --action-rows:${rowCount};
      "
    >
      <div class="container action-container">
        ${actions.map((action, index) =>
          renderActionButton.call(this, action, index)
        )}
      </div>
    </ha-card>
  `;
}

function renderActionButton(action, index) {
  const iconPath = this._isImageIcon(action.icon)
    ? this._resolveIconPath(action.icon)
    : "";
  const inlineSvg = iconPath
    ? this._getInlineSvg(iconPath)
    : "";

  return html`
    <div
      class="action-button ${action.isRunning ? "running" : ""}"
      role="button"
      tabindex="0"
      style="
        --action-card-background:${action.cardBackground};
        --action-icon-color:${action.iconColor};
      "
      @click=${(ev) => this._handleTap(ev, index)}
      @pointerdown=${(ev) => this._handlePointerDown(ev, index)}
      @pointerup=${this._handlePointerUp}
      @pointerleave=${this._handlePointerCancel}
      @pointercancel=${this._handlePointerCancel}
      @contextmenu=${(ev) => this._handleContextMenu(ev, index)}
    >
      <div class="circle action-circle">
        ${this._isImageIcon(action.icon)
          ? html`
              <div class="main-image-icon">
                ${inlineSvg
                  ? unsafeHTML(inlineSvg)
                  : html`<img src=${iconPath} alt="" />`}
              </div>
            `
          : html`
              <ha-icon
                class="main-icon"
                .icon=${action.icon}
              ></ha-icon>
            `}
      </div>
    </div>
  `;
}
