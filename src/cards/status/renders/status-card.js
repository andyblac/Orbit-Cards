import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export function renderStatusCard() {
  const mode = this._config?.mode || "standard";
  const statusItems = this._statusItems || [];
  const isGroupedIconOnly =
    mode === "icon_only" && statusItems.length > 1;
  const itemCount = Math.max(statusItems.length, 1);
  const columnCount = this._getStatusColumnCount(itemCount);
  const rowCount = this._getStatusRowCount(itemCount);
  const badgeText = getIconOnlyStatusText(this._statusText);
  const iconPath = this._isImageIcon(this._icon)
    ? this._resolveIconPath(this._icon)
    : "";
  const inlineSvg = iconPath
    ? this._getInlineSvg(iconPath)
    : "";

  return html`
    <ha-card
      class="mode-${mode} ${isGroupedIconOnly ? "grouped" : ""}"
      tabindex="0"
      style="
        --status-item-count:${itemCount};
        --status-columns:${columnCount};
        --status-rows:${rowCount};
      "
      @click=${this._handleTap}
    >
      <div
        class="container status-container mode-${mode} ${isGroupedIconOnly ? "grouped" : ""}"
        style="
          --status-circle-color:${this._circleColor};
          --status-icon-color:${this._iconColor};
          --status-name-color:${this._nameColor};
          --status-text-color:${this._statusColor};
        "
      >
        ${isGroupedIconOnly
          ? renderIconOnlyStatusGrid.call(this, statusItems)
          : html`
        <div
          class="circle status-circle"
          @pointerdown=${this._handleMainIconPointerDown}
          @pointerup=${this._handleMainIconPointerUp}
          @pointerleave=${this._handleMainIconPointerCancel}
          @pointercancel=${this._handleMainIconPointerCancel}
          @touchstart=${this._handleMainIconPointerDown}
          @touchend=${this._handleMainIconPointerUp}
          @touchcancel=${this._handleMainIconPointerCancel}
          @click=${this._handleMainIconClick}
          @contextmenu=${this._handleMainIconContextMenu}
        >
          ${mode === "person"
            ? renderPersonIcon.call(this)
            : this._isImageIcon(this._icon)
            ? html`
                <div
                  class="main-image-icon"
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
                ></ha-icon>
            `}
        </div>

        ${mode === "icon_only"
          ? html`
              <div
                class="status-badge"
                ?hidden=${!badgeText}
              >
                ${badgeText}
              </div>
            `
          : html`
              <div class="content">
                <div class="header">
                  <div class="card-name">
                    ${this._cardName}
                  </div>

                  <div class="status">
                    ${this._statusText || ""}
                  </div>
                </div>
              </div>
            `}
          `}
      </div>
    </ha-card>
  `;
}

function renderIconOnlyStatusGrid(items) {
  return html`
    <div class="status-icon-grid">
      ${items.map((item, index) =>
        renderIconOnlyStatusItem.call(this, item, index)
      )}
    </div>
  `;
}

function renderIconOnlyStatusItem(item, index) {
  const badgeText = getIconOnlyStatusText(item.statusText);
  const iconPath = this._isImageIcon(item.icon)
    ? this._resolveIconPath(item.icon)
    : "";
  const inlineSvg = iconPath
    ? this._getInlineSvg(iconPath)
    : "";

  return html`
    <div
      class="status-icon-item"
      style="
        --status-circle-color:${item.circleColor};
        --status-icon-color:${item.iconColor};
      "
      @click=${(ev) => this._handleStatusItemClick(ev, index)}
      @pointerdown=${(ev) => this._handleStatusItemPointerDown(ev, index)}
      @pointerup=${this._handleStatusItemPointerUp}
      @pointerleave=${this._handleStatusItemPointerCancel}
      @pointercancel=${this._handleStatusItemPointerCancel}
      @contextmenu=${(ev) => this._handleStatusItemContextMenu(ev, index)}
    >
      <div class="circle status-circle">
        ${this._isImageIcon(item.icon)
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
                .icon=${item.icon}
              ></ha-icon>
            `}
      </div>

      <div
        class="status-badge"
        ?hidden=${!badgeText}
      >
        ${badgeText}
      </div>
    </div>
  `;
}

function renderPersonIcon() {
  return html`
    <div class="person-main-icon">
      ${this._personPicture
        ? html`
            <img
              class="person-picture"
              src=${this._personPicture}
              alt=""
            />
          `
        : html`
          <ha-icon
            class="person-fallback-icon"
            .icon=${this._icon || "mdi:account"}
          ></ha-icon>
          `}

      ${renderPersonBadge.call(
        this,
        "zone",
        this._personZoneIcon || "mdi:home-minus",
        this._computeFullColor("blue")
      )}

      ${this._personBattery1
        ? renderPersonBadge.call(
            this,
            "battery-1",
            this._personBattery1.icon,
            this._personBattery1.color,
            this._personBattery1.entityId
          )
        : ""}

      ${this._personBattery2
        ? renderPersonBadge.call(
            this,
            "battery-2",
            this._personBattery2.icon,
            this._personBattery2.color,
            this._personBattery2.entityId
          )
        : ""}
    </div>
  `;
}

function renderPersonBadge(position, icon, color, entityId = null) {
  return html`
    <span
      class="person-badge person-badge-${position} ${entityId ? "clickable" : ""}"
      style="background:${color}"
      .dataEntity=${entityId}
      @pointerdown=${this._handlePersonBadgeStop}
      @pointerup=${this._handlePersonBadgePointerUp}
      @pointerleave=${this._handlePersonBadgeStop}
      @pointercancel=${this._handlePersonBadgeStop}
      @touchstart=${this._handlePersonBadgeStop}
      @touchend=${this._handlePersonBadgeStop}
      @touchcancel=${this._handlePersonBadgeStop}
      @click=${this._handlePersonBadgeClick}
    >
      <span class="person-badge-icon">
        <ha-icon .icon=${icon}></ha-icon>
      </span>
    </span>
  `;
}

function getIconOnlyStatusText(statusText) {
  const match = String(statusText || "").match(/-?\d+(?:\.\d+)?/);
  const value = match
    ? Number(match[0])
    : null;

  if (value === 0) return "";

  return match?.[0] || "";
}
