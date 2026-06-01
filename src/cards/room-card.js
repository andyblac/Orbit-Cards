// ==============================
// orbit-room-card.js
// ==============================

import { LitElement } from "lit";

import {
  handleAction,
  handleButtonClick,
  handleCurveButtonClick,
  handleMainEntityTap,
  handleTap,
  navigate,
  toggleEntity,
} from "../common/helpers/actions.js";
import {
  computeButtonBackground,
  computeCircleColor,
  computeFullColor,
  computeIconColor,
} from "../common/helpers/colors.js";
import {
  getCardName,
} from "../common/helpers/card-name.js";
import {
  formatEntityState,
  getEntityActiveState,
} from "../common/helpers/entities.js";
import {
  getBinarySensorIcon,
  getDefaultDomainIcon,
  getEntityColor,
  getInlineSvg,
  getMainIconColor,
  isImageIcon,
  resolveIconPath,
} from "../common/helpers/icons.js";
import {
  cancelLongPress,
  finishLongPress,
  LONG_PRESS_DELAY,
  startLongPress,
} from "../common/helpers/long-press.js";
import {
  evaluateStateTemplate,
} from "../common/helpers/templates.js";

import {
  getButtonEntities,
  getCurveButtonConfig,
} from "./room/helpers/entity.js";
import {
  updateRoomCard,
} from "./room/helpers/lifecycle.js";

import { renderButtons } from "./room/renders/buttons.js";
import { renderCard } from "./room/renders/room-card.js";
import { renderCurveButtons } from "./room/renders/curve-buttons.js";

import { roomCardStyles } from "./room/styles/room-card-styles.js";

import "../editors/room-card-editor.js";

import { CARD_VERSIONS } from "../version.js";

class OrbitRoomCard extends LitElement {
  static svgCache = {};

  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _cardName: { type: String },
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
    return updateRoomCard.call(this, changedProps);
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

  _getCardName(fallback = "Card") {
    return getCardName(this._config, this.hass, fallback);
  }

  formatState(stateObj) {
    return formatEntityState(stateObj);
  }

  _getButtonEntities() {
    return getButtonEntities.call(this);
  }

  _getEntityActiveState(stateObj) {
    return getEntityActiveState(stateObj);
  }

  _getMainIconColor(stateObj, isOn) {
    return getMainIconColor.call(this, stateObj, isOn);
  }

  _getEntityColor(stateObj) {
    return getEntityColor(stateObj);
  }

  _getBinarySensorIcon(stateObj) {
    return getBinarySensorIcon(stateObj);
  }

  _getDefaultDomainIcon(domain, stateObj = null) {
    return getDefaultDomainIcon.call(this, domain, stateObj);
  }

  _getCurveButtonConfig(index) {
    return getCurveButtonConfig.call(this, index);
  }

  _isImageIcon(icon) {
    return isImageIcon(icon);
  }

  _resolveIconPath(iconPath) {
    return resolveIconPath(iconPath);
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
    return renderCard.call(this);
  }

  static styles = roomCardStyles;
}

customElements.define("orbit-room-card", OrbitRoomCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "orbit-room-card",
  name: "Orbit Room Card",
  description: "Responsive room card",
  preview: true,
  version: CARD_VERSIONS.room,
});

console.info(
  `%c ORBIT-ROOM-CARD %c Version ${CARD_VERSIONS.room}`,
  "color: orange; font-weight: bold; background: black;",
  "color: white; font-weight: bold; background: dimgray;"
);
