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
  getSvgColorOverride,
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
  hasTemplateConfig,
  shouldUpdateForEntities,
} from "../common/helpers/updates.js";
import {
  getEntityAreaId,
  getEntityDomain,
} from "../common/helpers/suggestions.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";

import {
  updateRoomCard,
} from "./room/helpers/lifecycle.js";

import { renderButtons } from "./room/renders/buttons.js";
import { renderRoomCard } from "./room/renders/room-card.js";
import { renderCurveButtons } from "./room/renders/curve-buttons.js";

import { roomCardStyles } from "./room/styles/room-card-styles.js";

import "../editors/room-card-editor.js";

import { CARD_VERSIONS } from "../version.js";

class OrbitRoomCard extends LitElement {
  static svgCache = sharedSvgCache;

  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _cardName: { type: String },
      _statusText: { type: String },
      _statusItems: { type: Array },
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
      accent_color: "blue",
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

    this._roomColor = this._computeFullColor(config.accent_color);
    this._statusColor = this._computeFullColor(config.status_color || config.accent_color);
    this._iconColor = this._computeIconColor(config.accent_color);
    this._circleColor = this._computeCircleColor(config.accent_color);
  }

  willUpdate(changedProps) {
    return updateRoomCard.call(this, changedProps);
  }

  shouldUpdate(changedProps) {
    return shouldUpdateForEntities.call(
      this,
      changedProps,
      this._getRelevantEntities(),
      {
        hasTemplates: hasTemplateConfig(this._config),
      }
    );
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

  _handleMainEntityPointerDown(ev) {
    return this._startLongPress(
      ev,
      this._config.main_entity || this._config.entity,
      this._config.main_entity_hold_action
    );
  }

  _handleButtonPointerDown(ev) {
    const target = ev.currentTarget;

    return this._startLongPress(
      ev,
      target.dataEntity,
      target.dataHoldAction
    );
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

  _isImageIcon(icon) {
    return isImageIcon(icon);
  }

  _resolveIconPath(iconPath) {
    return resolveIconPath(iconPath);
  }

  _getInlineSvg(path, forceColor = true) {
    return getInlineSvg.call(this, path, {
      forceColor,
    });
  }

  _getSvgColorOverride(iconKey) {
    return getSvgColorOverride(this._config, iconKey);
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

  _getRelevantEntities() {
    return [
      this._config?.main_entity,
      this._config?.entity,
      this._config?.status1,
      this._config?.status2,
      this._config?.status3,
      this._config?.button1,
      this._config?.button2,
      this._config?.button3,
      this._config?.button4,
      this._config?.curve_button1,
      this._config?.curve_button2,
      this._config?.curve_button3,
      this._config?.curve_button4,
      this._config?.curve_button5,
      this._config?.curve_button6,
      this._config?.action_button,
    ];
  }

  _renderButtons(button) {
    return renderButtons.call(this, button);
  }

  _renderCurveButtons() {
    return renderCurveButtons.call(this);
  }

  render() {
    return renderRoomCard.call(this);
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
  getEntitySuggestion: getRoomEntitySuggestion,
});

console.info(
  `%c ORBIT-ROOM-CARD %c Version ${CARD_VERSIONS.room}`,
  "color: orange; font-weight: bold; background: black;",
  "color: white; font-weight: bold; background: dimgray;"
);

const ROOM_SUGGESTION_DOMAINS = new Set([
  "light",
  "fan",
  "climate",
  "media_player",
  "switch",
  "cover",
  "lock",
]);

function getRoomEntitySuggestion(hass, entityId) {
  const domain = getEntityDomain(entityId);

  if (!ROOM_SUGGESTION_DOMAINS.has(domain)) {
    return null;
  }

  const area = getEntityAreaId(hass, entityId);
  const config = {
    type: "custom:orbit-room-card",
    main_entity: entityId,
    accent_color: domain === "light" ? "light" : "theme",
  };

  if (area) {
    config.area = area;
  }

  return {
    config,
  };
}
