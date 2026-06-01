// ==============================
// orbit-room-card.js
// ==============================

import { LitElement } from "lit";
import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import {
  handleAction,
  handleButtonClick,
  handleCurveButtonClick,
  handleMainEntityTap,
  handleTap,
  navigate,
  toggleEntity,
} from "./helpers/actions.js";
import {
  computeButtonBackground,
  computeCircleColor,
  computeFullColor,
  computeIconColor,
} from "./helpers/colors.js";
import {
  getButtonEntities,
  getEntityActiveState,
  getRoomName,
  formatEntityState,
} from "./helpers/entity.js";
import {
  getBinarySensorIcon,
  getCurveButtonConfig,
  getDefaultDomainIcon,
  getEntityColor,
  getInlineSvg,
  getMainIconColor,
  isImageIcon,
  resolveIconPath,
} from "./helpers/icons.js";
import {
  updateCard,
} from "./helpers/lifecycle.js";
import {
  cancelLongPress,
  finishLongPress,
  LONG_PRESS_DELAY,
  startLongPress,
} from "./helpers/long-press.js";
import {
  evaluateStateTemplate,
} from "./helpers/templates.js";

import { renderButtons } from "./renders/buttons.js";
import { renderCurveButtons } from "./renders/curve_buttons.js";

import { room_cardStyles } from "./styles/card-styles.js";

import "../editors/room-card-editor.js";

import { RoomCard_VERSION } from "./var/version.js";

class OrbitRoomCard extends LitElement {
  static svgCache = {};

  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _roomName: { type: String },
      _statusText: { type: String },
      _icon: { type: String },
      _roomColor: { type: String },
      _statusColor: { type: String },
      _iconColor: { type: String },
      _circleColor: { type: String },
    };
  }

  static getConfigElement() {
    return document.createElement(
      "orbit-room-card-editor"
    );
  }

  static getStubConfig() {
    return {
      type: "custom:orbit-room-card",
      room_color: "blue",
      navigation_path: "/lovelace/home",
    };
  }

  getLayoutOptions() {
    return {
      grid_columns: 3,
      grid_min_columns: 2,
    };
  }

  setConfig(config) {
    this._config = config;

    this._roomColor = this._computeFullColor(config.room_color);
    this._statusColor = this._computeFullColor(config.status_color || config.room_color);
    this._iconColor = this._computeIconColor(config.room_color);
    this._circleColor = this._computeCircleColor(config.room_color);
  }

  updated(changedProps) {
    return updateCard.call(this, changedProps);
  }

  _handleAction(actionConfig, entityId = null) {
    return handleAction.call(this, actionConfig, entityId);
  }

  _navigate(path) {
    return navigate.call(this, path);
  }

  _toggleEntity(entityId, ev, actionConfig = null) {
    return toggleEntity.call(this, entityId, ev, actionConfig);
  }

  _handleButtonClick(ev) {
    return handleButtonClick.call(this, ev);
  }

  _handleCurveButtonClick(ev) {
    return handleCurveButtonClick.call(this, ev);
  }

  _handleTap(ev) {
    return handleTap.call(this, ev);
  }

  _handleMainEntityTap(ev) {
    return handleMainEntityTap.call(this, ev);
  }

  _computeFullColor(colorInput) {
    return computeFullColor.call(this, colorInput);
  }

  _computeIconColor(colorInput) {
    return computeIconColor.call(this, colorInput);
  }

  _computeCircleColor(colorInput) {
    return computeCircleColor.call(this, colorInput);
  }

  _computeButtonBackground(colorInput) {
    return computeButtonBackground.call(this, colorInput);
  }

  _getRoomName() {
    return getRoomName.call(this);
  }

  formatState(stateObj) {
    return formatEntityState.call(this, stateObj);
  }

  _getButtonEntities() {
    return getButtonEntities.call(this);
  }

  _getEntityActiveState(stateObj) {
    return getEntityActiveState.call(this, stateObj);
  }

  _getMainIconColor(stateObj, isOn) {
    return getMainIconColor.call(this, stateObj, isOn);
  }

  _getEntityColor(stateObj) {
    return getEntityColor.call(this, stateObj);
  }

  _getBinarySensorIcon(stateObj) {
    return getBinarySensorIcon.call(this, stateObj);
  }

  _getDefaultDomainIcon(domain, stateObj = null) {
    return getDefaultDomainIcon.call(this, domain, stateObj);
  }

  _getCurveButtonConfig(index) {
    return getCurveButtonConfig.call(this, index);
  }

  _isImageIcon(icon) {
    return isImageIcon.call(this, icon);
  }

  _resolveIconPath(iconPath) {
    return resolveIconPath.call(this, iconPath);
  }

  _getInlineSvg(path) {
    return getInlineSvg.call(this, path);
  }

  get _LONG_PRESS_DELAY() {
    return LONG_PRESS_DELAY;
  }

  _startLongPress(ev, entityId, longPressAction) {
    return startLongPress.call(this, ev, entityId, longPressAction);
  }

  _cancelLongPress() {
    return cancelLongPress.call(this);
  }

  _finishLongPress(ev) {
    return finishLongPress.call(this, ev);
  }

  _evaluateStateTemplate(template, entityId) {
    return evaluateStateTemplate.call(this, template, entityId);
  }

  _renderButtons(entityId, index) {
    return renderButtons.call(this, entityId, index);
  }

  _renderCurveButtons() {
    return renderCurveButtons.call(this);
  }

  render() {
    const buttons = this._getButtonEntities();

    return html`
      <ha-card tabindex="0" @click=${this._handleTap}>
        <div class="container">
          <div class="content">

            <div class="header ${buttons.length >= 3 ? "compressed" : ""}">
              <div class="room-name" style="color:${this._roomColor}">
                ${this._roomName}
              </div>

              <div class="status" style="color:${this._statusColor}">
                ${this._statusText || ""}
              </div>
            </div>

            ${buttons.length
              ? html`
                  <div class="button-column" style="--button-count:${buttons.length}">
                    ${buttons.map((id, i) => this._renderButtons(id, i))}
                  </div>
                `
              : ""}

          </div>

          <div
            class="circle"
            style="background:${this._circleColor}"

            @click=${(ev) => this._handleMainEntityTap(ev)}

            @pointerdown=${(ev) =>
              this._startLongPress(
                ev,
                this._config.main_entity || this._config.entity,
                this._config.hold_action
              )}

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
                    ${unsafeHTML(
                      this._getInlineSvg(
                        this._resolveIconPath(this._icon)
                      )
                    )}
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

  static styles = room_cardStyles;
}

customElements.define("orbit-room-card", OrbitRoomCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "orbit-room-card",
  name: "Orbit Room Card",
  description: "Responsive room card",
  preview: true,
  RoomCard_VERSION: RoomCard_VERSION,
});

console.info(
  `%c ORBIT-ROOM-CARD %c RoomCard_VERSION ${RoomCard_VERSION}`,
  "color: orange; font-weight: bold; background: black;",
  "color: white; font-weight: bold; background: dimgray;"
);
