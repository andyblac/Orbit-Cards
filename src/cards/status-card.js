// ==============================
// orbit-status-card.js
// ==============================

import { LitElement } from "lit";

import {
  handleAction,
  navigate,
} from "../common/helpers/actions.js";
import {
  computeFullColor,
  computeIconColor,
  computeCircleColor,
} from "../common/helpers/colors.js";
import {
  formatEntityState,
  getEntityActiveState,
} from "../common/helpers/entities.js";
import {
  getBinarySensorIcon,
  getDefaultDomainIcon,
  getInlineSvg,
  isImageIcon,
  resolveIconPath,
} from "../common/helpers/icons.js";
import {
  LONG_PRESS_DELAY,
} from "../common/helpers/long-press.js";

import {
  updateStatusCard,
} from "./status/helpers/lifecycle.js";
import { renderStatusCard } from "./status/renders/status-card.js";
import { statusCardStyles } from "./status/styles/status-card-styles.js";

import "../editors/status-card-editor.js";

import { CARD_VERSIONS } from "../version.js";

class OrbitStatusCard extends LitElement {
  static svgCache = {};

  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _cardName: { type: String },
      _statusText: { type: String },
      _icon: { type: String },
      _nameColor: { type: String },
      _statusColor: { type: String },
      _iconColor: { type: String },
      _circleColor: { type: String },
      _navigationPath: { type: String },
    };
  }

  static getConfigElement() {
    return document.createElement(
      "orbit-status-card-editor"
    );
  }

  static getStubConfig() {
    return {
      type: "custom:orbit-status-card",
      main_entity: "",
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

    const color = config.accent_color || "theme";

    this._nameColor = this._computeFullColor(config.name_color || color);
    this._statusColor = this._computeFullColor(config.status_color || color);
    this._iconColor = this._computeIconColor(color);
    this._circleColor = this._computeCircleColor(color);
  }

  updated(changedProps) {
    return updateStatusCard.call(this, changedProps);
  }

  _handleAction(actionConfig, entityId = null) {
    return handleAction.call(this, actionConfig, entityId);
  }

  _handleTap(ev) {
    if (this._shouldSuppressMainIconTap(ev)) {
      this._stopEvent(ev);
      return;
    }

    if (this._isMainIconEvent(ev)) {
      this._handleMainEntityTap(ev);
      return;
    }

    ev.stopPropagation();

    const cardAction = this._config.tap_action;
    const mainEntity = this._config.main_entity;

    if (cardAction?.action && cardAction.action !== "navigate") {
      this._handleAction(cardAction, mainEntity);
      return;
    }

    if (cardAction?.action === "navigate") {
      this._navigate(
        cardAction.navigation_path ||
        this._navigationPath ||
        "/lovelace/home"
      );
      return;
    }

    this._navigate(this._navigationPath || "/lovelace/home");
  }

  _isMainIconEvent(ev) {
    const path = ev.composedPath();

    const clickedInsideIcon = path.some(
      (el) =>
        el?.classList &&
        (
          el.classList.contains("circle") ||
          el.classList.contains("status-circle") ||
          el.classList.contains("main-icon") ||
          el.classList.contains("main-image-icon")
        )
    );

    if (clickedInsideIcon) return true;

    const circle = this.shadowRoot?.querySelector(".status-circle");
    const rect = circle?.getBoundingClientRect();

    if (!rect) return false;

    return (
      ev.clientX >= rect.left &&
      ev.clientX <= rect.right &&
      ev.clientY >= rect.top &&
      ev.clientY <= rect.bottom
    );
  }

  _handleMainEntityTap(ev) {
    if (this._shouldSuppressMainIconTap(ev)) {
      this._stopEvent(ev);
      return;
    }

    if (this._longPressTriggered) {
      this._longPressTriggered = false;
      this._stopEvent(ev);

      return;
    }

    this._stopEvent(ev);

    const mainEntity = this._config.main_entity;

    if (!mainEntity) return;

    this._handleAction(
      this._getMainEntityTapAction(),
      mainEntity
    );
  }

  _navigate(path) {
    return navigate.call(this, path);
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

  _getMainStateObj() {
    const entityId = this._config.main_entity;

    return entityId && this.hass
      ? this.hass.states[entityId]
      : null;
  }

  formatState(stateObj) {
    return formatEntityState(stateObj);
  }

  _getEntityActiveState(stateObj) {
    return getEntityActiveState(stateObj);
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

  _getInlineSvg(path) {
    return getInlineSvg.call(this, path);
  }

  get _LONG_PRESS_DELAY() {
    return LONG_PRESS_DELAY;
  }

  _handleMainIconPointerDown(ev) {
    if (this._isDuplicateTouchEvent(ev)) {
      this._stopEvent(ev);
      return;
    }

    this._trackPointerEvent(ev);
    this._stopEvent(ev);

    ev.currentTarget?.setPointerCapture?.(ev.pointerId);

    this._mainIconPointerDown = true;
    this._mainIconHoldFired = false;
    this._mainIconSuppressUntil = 0;

    this._clearMainIconHoldTimer();

    const holdAction = this._getMainEntityHoldAction();

    if (!holdAction) return;

    this._mainIconHoldTimer = setTimeout(() => {
      this._mainIconHoldFired = true;
      this._mainIconSuppressUntil = Date.now() + 1000;

      this._handleAction(
        holdAction,
        this._config.main_entity
      );
    }, this._LONG_PRESS_DELAY);
  }

  _handleMainIconPointerUp(ev) {
    if (this._isDuplicateTouchEvent(ev)) {
      this._stopEvent(ev);
      return;
    }

    this._trackPointerEvent(ev);
    this._stopEvent(ev);

    const holdFired = this._mainIconHoldFired;

    this._clearMainIconHoldTimer();
    this._mainIconPointerDown = false;

    if (holdFired) {
      this._mainIconSuppressClick = true;
      this._mainIconSuppressUntil = Date.now() + 1000;
      return;
    }

    this._handleMainEntityTap(ev);
    this._mainIconSuppressClick = true;
  }

  _handleMainIconPointerCancel(ev) {
    if (this._isDuplicateTouchEvent(ev)) {
      this._stopEvent(ev);
      return;
    }

    this._trackPointerEvent(ev);
    this._stopEvent(ev);

    const holdAction = this._getMainEntityHoldAction();

    if (!holdAction) {
      this._clearMainIconHoldTimer();
      this._mainIconPointerDown = false;
      return;
    }
  }

  _handleMainIconClick(ev) {
    this._stopEvent(ev);

    if (this._mainIconSuppressClick) {
      this._mainIconSuppressClick = false;
    }
  }

  _handleMainIconContextMenu(ev) {
    this._stopEvent(ev);

    const holdAction = this._getMainEntityHoldAction();

    if (
      holdAction &&
      this._mainIconPointerDown &&
      !this._mainIconHoldFired
    ) {
      this._clearMainIconHoldTimer();

      this._mainIconHoldFired = true;
      this._mainIconSuppressClick = true;
      this._mainIconSuppressUntil = Date.now() + 1000;

      this._handleAction(
        holdAction,
        this._config.main_entity
      );
    }
  }

  _clearMainIconHoldTimer() {
    if (this._mainIconHoldTimer) {
      clearTimeout(this._mainIconHoldTimer);
      this._mainIconHoldTimer = null;
    }
  }

  _getMainEntityHoldAction() {
    return isActionEnabled(this._config.main_entity_hold_action)
      ? this._config.main_entity_hold_action
      : null;
  }

  _getMainEntityTapAction() {
    return (
      this._config.main_entity_tap_action ||
      {
        action: "more-info",
      }
    );
  }

  _trackPointerEvent(ev) {
    if (ev.type?.startsWith("pointer")) {
      this._lastMainIconPointerEventAt = Date.now();
    }
  }

  _isDuplicateTouchEvent(ev) {
    return Boolean(
      ev.type?.startsWith("touch") &&
      this._lastMainIconPointerEventAt &&
      Date.now() - this._lastMainIconPointerEventAt < 750
    );
  }

  _shouldSuppressMainIconTap(ev) {
    if (!this._mainIconSuppressUntil) return false;
    if (Date.now() > this._mainIconSuppressUntil) return false;

    return !ev || this._isMainIconEvent(ev);
  }

  _stopEvent(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    }
  }

  render() {
    return renderStatusCard.call(this);
  }

  static styles = statusCardStyles;
}

function isActionEnabled(actionConfig) {
  return Boolean(
    actionConfig &&
    actionConfig.action &&
    actionConfig.action !== "none"
  );
}

customElements.define("orbit-status-card", OrbitStatusCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "orbit-status-card",
  name: "Orbit Status Card",
  description: "Responsive status card",
  preview: true,
  version: CARD_VERSIONS.status,
});

console.info(
  `%c ORBIT-STATUS-CARD %c Version ${CARD_VERSIONS.status}`,
  "color: orange; font-weight: bold; background: black;",
  "color: white; font-weight: bold; background: dimgray;"
);
