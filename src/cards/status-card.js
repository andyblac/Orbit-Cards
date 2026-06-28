// ==============================
// orbit-status-card.js
// ==============================

import { LitElement } from "lit";

import {
  clearDoubleTapTimer,
  handleAction,
  handleDoubleTapAction,
  handleTapAction,
  isActionEnabled,
  isAddCardPickerPreview,
  navigate,
} from "../common/helpers/actions.js";
import {
  computeFullColor,
  computeIconColor,
  computeCircleColor,
} from "../common/helpers/colors.js";
import {
  getGroupedCardColumnCount,
  getGroupedCardRowCount,
} from "../common/helpers/card-layout.js";
import {
  registerOrbitCard,
} from "../common/helpers/card-registration.js";
import {
  formatEntityState,
  getEntityActiveState,
} from "../common/helpers/entities.js";
import {
  getBinarySensorIcon,
  getDefaultDomainIcon,
  getInlineSvg,
  getSvgColorOverride,
  isImageIcon,
  resolveIconPath,
} from "../common/helpers/icons.js";
import {
  LONG_PRESS_DELAY,
} from "../common/helpers/long-press.js";
import {
  evaluateStateTemplate,
} from "../common/helpers/templates.js";
import {
  hasTemplateConfig,
  shouldUpdateForEntities,
} from "../common/helpers/updates.js";
import {
  getEntityDomain,
  isNumericEntity,
} from "../common/helpers/suggestions.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";
import { localize } from "../common/localize.js";

import {
  getIconOnlyStatusItems,
  updateStatusCard,
} from "./status/helpers/lifecycle.js";
import { renderStatusCard } from "./status/renders/status-card.js";
import { statusCardStyles } from "./status/styles/status-card-styles.js";

import "../editors/status-card-editor.js";

import { CARD_VERSIONS } from "../version.js";

class OrbitStatusCard extends LitElement {
  static svgCache = sharedSvgCache;

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
      _personPicture: { type: String },
      _personZoneIcon: { type: String },
      _personBattery1: { type: Object },
      _personBattery2: { type: Object },
      _statusItems: { type: Array },
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
      mode: "standard",
      main_entity: "",
    };
  }

  getLayoutOptions() {
    if (this._config?.mode === "icon_only") {
      const count = getIconOnlyStatusItems(this._config).length;
      const columns = getStatusColumnCount(this._config, count);

      return {
        grid_columns: Math.max(1, columns),
        grid_min_columns: 0.5,
        grid_rows: "auto",
      };
    }

    return {
      grid_columns: 3,
      grid_min_columns: 2,
    };
  }

  setConfig(config) {
    this._config = config;

    const color = config.accent_off_color || "theme";

    this._nameColor = this._computeFullColor(color);
    this._statusColor = this._computeFullColor(color);
    this._iconColor = this._computeIconColor(color);
    this._circleColor = this._computeCircleColor(color);
    this._statusItems = [];
  }

  willUpdate(changedProps) {
    return updateStatusCard.call(this, changedProps);
  }

  shouldUpdate(changedProps) {
    return shouldUpdateForEntities.call(
      this,
      changedProps,
      this._getRelevantEntities(),
      {
        hasTemplates: hasTemplateConfig(this._config),
        includeZones: this._config?.mode === "person",
      }
    );
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

    handleTapAction.call(
      this,
      ev,
      this._config.main_entity,
      this._getCardTapAction(),
      this._getCardDoubleTapAction()
    );
  }

  _handleDoubleTap(ev) {
    if (this._isMainIconEvent(ev)) {
      this._handleMainEntityDoubleTap(ev);
      return;
    }

    handleDoubleTapAction.call(
      this,
      ev,
      this._config.main_entity,
      this._getCardDoubleTapAction()
    );
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

    const mainEntity = this._config.main_entity;

    if (!mainEntity) return;

    handleTapAction.call(
      this,
      ev,
      mainEntity,
      this._getMainEntityTapAction() || this._getCardTapAction(),
      this._getMainEntityDoubleTapAction()
    );
  }

  _handleMainEntityDoubleTap(ev) {
    handleDoubleTapAction.call(
      this,
      ev,
      this._config.main_entity,
      this._getMainEntityDoubleTapAction()
    );
  }

  _handleCardTapAction() {
    const cardAction = this._getCardTapAction();
    const mainEntity = this._config.main_entity;

    if (cardAction.action && cardAction.action !== "navigate") {
      this._handleAction(cardAction, mainEntity);
      return;
    }

    this._navigate(
      cardAction.navigation_path ||
      this._navigationPath ||
      "/lovelace/home"
    );
  }

  _handleCardPointerDown(ev) {
    if (isAddCardPickerPreview(this)) return;

    if (this._isMainIconEvent(ev)) return;

    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();

    const holdAction = this._getCardHoldAction();

    if (!holdAction) return;

    this._statusItemHoldTimer = setTimeout(() => {
      this._statusItemLongPressTriggered = true;

      this._handleAction(
        holdAction,
        this._config.main_entity
      );
    }, this._LONG_PRESS_DELAY);
  }

  _handleCardPointerUp(ev) {
    if (this._isMainIconEvent(ev)) return;

    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
  }

  _handleCardPointerCancel(ev) {
    if (this._isMainIconEvent(ev)) return;

    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
  }

  _handleCardContextMenu(ev) {
    if (this._isMainIconEvent(ev)) return;

    this._stopEvent(ev);

    const holdAction = this._getCardHoldAction();

    if (!holdAction) return;

    this._clearStatusItemHoldTimer();
    this._statusItemLongPressTriggered = true;

    this._handleAction(
      holdAction,
      this._config.main_entity
    );
  }

  _handleStatusItemClick(ev, index = 0) {
    if (this._statusItemLongPressTriggered) {
      this._statusItemLongPressTriggered = false;
      this._stopEvent(ev);
      return;
    }

    const entityId = this._getStatusItemEntityId(index);

    if (!entityId) return;

    const actionConfig = this._isStatusItemMainIconEvent(ev)
      ? this._getStatusItemMainEntityTapAction(index)
      : this._getStatusItemCardTapAction(index);
    const doubleTapAction = this._isStatusItemMainIconEvent(ev)
      ? this._getStatusItemMainEntityDoubleTapAction(index)
      : this._getStatusItemCardDoubleTapAction(index);

    handleTapAction.call(
      this,
      ev,
      entityId,
      actionConfig?.action
        ? actionConfig
        : { action: "more-info" },
      doubleTapAction
    );
  }

  _handleStatusItemDoubleClick(ev, index = 0) {
    handleDoubleTapAction.call(
      this,
      ev,
      this._getStatusItemEntityId(index),
      this._isStatusItemMainIconEvent(ev)
        ? this._getStatusItemMainEntityDoubleTapAction(index)
        : this._getStatusItemCardDoubleTapAction(index)
    );
  }

  _handleStatusItemPointerDown(ev, index = 0) {
    if (isAddCardPickerPreview(this)) return;

    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();

    const holdAction = this._isStatusItemMainIconEvent(ev)
      ? this._getStatusItemMainEntityHoldAction(index)
      : this._getStatusItemCardHoldAction(index);

    if (!holdAction) return;

    this._statusItemHoldTimer = setTimeout(() => {
      this._statusItemLongPressTriggered = true;

      this._handleAction(
        holdAction,
        this._getStatusItemEntityId(index)
      );
    }, this._LONG_PRESS_DELAY);
  }

  _handleStatusItemPointerUp(ev) {
    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
  }

  _handleStatusItemPointerCancel(ev) {
    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
  }

  _handleStatusItemContextMenu(ev, index = 0) {
    this._stopEvent(ev);

    const holdAction = this._isStatusItemMainIconEvent(ev)
      ? this._getStatusItemMainEntityHoldAction(index)
      : this._getStatusItemCardHoldAction(index);

    if (!holdAction) return;

    this._clearStatusItemHoldTimer();
    this._statusItemLongPressTriggered = true;

    this._handleAction(
      holdAction,
      this._getStatusItemEntityId(index)
    );
  }

  _navigate(path) {
    return navigate.call(this, path);
  }

  _handlePersonBadgeStop(ev) {
    if (ev.currentTarget?.dataEntity) {
      ev.stopPropagation();
    }
  }

  _handlePersonBadgePointerUp(ev) {
    const entityId = ev.currentTarget?.dataEntity;

    if (!entityId) return;

    ev.stopPropagation();
    this._personBadgeActionFired = true;
    this._openPersonBadgeMoreInfo(entityId);
  }

  _handlePersonBadgeClick(ev) {
    const entityId = ev.currentTarget?.dataEntity;

    if (!entityId) return;

    ev.stopPropagation();

    if (this._personBadgeActionFired) {
      this._personBadgeActionFired = false;
      return;
    }

    this._openPersonBadgeMoreInfo(entityId);
  }

  _openPersonBadgeMoreInfo(entityId) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: {
          entityId,
        },
        bubbles: true,
        composed: true,
      })
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

  _getInlineSvg(path, forceColor = true) {
    return getInlineSvg.call(this, path, {
      forceColor,
    });
  }

  _getSvgColorOverride(config, iconKey) {
    return getSvgColorOverride(config, iconKey);
  }

  _evaluateStateTemplate(template, entityId) {
    return evaluateStateTemplate.call(this, template, entityId);
  }

  _getRelevantEntities() {
    if (this._config?.mode === "icon_only") {
      return getIconOnlyStatusItems(this._config).map((item) =>
        item.entity || item.main_entity
      );
    }

    return [
      this._config?.main_entity,
      this._config?.tracker_entity,
      this._config?.eta_entity,
      this._config?.battery_entity_1,
      this._config?.battery_entity_2,
    ];
  }

  get _LONG_PRESS_DELAY() {
    return LONG_PRESS_DELAY;
  }

  _handleMainIconPointerDown(ev) {
    if (isAddCardPickerPreview(this)) return;

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

  _clearStatusItemHoldTimer() {
    if (this._statusItemHoldTimer) {
      clearTimeout(this._statusItemHoldTimer);
      this._statusItemHoldTimer = null;
    }
  }

  _clearDoubleTapTimer() {
    return clearDoubleTapTimer.call(this);
  }

  _getCardHoldAction() {
    return isActionEnabled(this._config.hold_action)
      ? this._config.hold_action
      : null;
  }

  _getCardDoubleTapAction() {
    return isActionEnabled(this._config.double_tap_action)
      ? this._config.double_tap_action
      : null;
  }

  _getMainEntityHoldAction() {
    return isActionEnabled(this._config.main_entity_hold_action)
      ? this._config.main_entity_hold_action
      : null;
  }

  _getMainEntityTapAction() {
    const actionConfig = this._config.main_entity_tap_action;

    if (actionConfig?.action === "none") return null;
    if (actionConfig?.action) return actionConfig;

    return this._isIconOnlyMode() || this._isPersonMode()
      ? null
      : {
          action: "more-info",
        };
  }

  _getMainEntityDoubleTapAction() {
    return isActionEnabled(this._config.main_entity_double_tap_action)
      ? this._config.main_entity_double_tap_action
      : null;
  }

  _getCardTapAction() {
    const defaultAction = {
      action: this._isIconOnlyMode() || this._isPersonMode()
        ? "more-info"
        : "navigate",
      navigation_path:
        this._navigationPath ||
        "/lovelace/home",
    };

    const actionConfig = this._config.tap_action;

    if (!actionConfig?.action) return defaultAction;

    return actionConfig;
  }

  _getStatusItemCardTapAction(index = 0) {
    const item = this._statusItems?.[index];

    if (item?.tap_action?.action) {
      return item.tap_action;
    }

    if (this._config.tap_action?.action) {
      return this._config.tap_action;
    }

    return {
      action: "more-info",
    };
  }

  _getStatusItemCardHoldAction(index = 0) {
    const item = this._statusItems?.[index];

    if (isActionEnabled(item?.hold_action)) {
      return item.hold_action;
    }

    if (isActionEnabled(this._config.hold_action)) {
      return this._config.hold_action;
    }

    return null;
  }

  _getStatusItemCardDoubleTapAction(index = 0) {
    const item = this._statusItems?.[index];

    if (isActionEnabled(item?.double_tap_action)) {
      return item.double_tap_action;
    }

    if (isActionEnabled(this._config.double_tap_action)) {
      return this._config.double_tap_action;
    }

    return null;
  }

  _getStatusItemMainEntityTapAction(index = 0) {
    const item = this._statusItems?.[index];

    if (
      item?.main_entity_tap_action?.action &&
      item.main_entity_tap_action.action !== "none"
    ) {
      return item.main_entity_tap_action;
    }

    if (
      this._config.main_entity_tap_action?.action &&
      this._config.main_entity_tap_action.action !== "none"
    ) {
      return this._config.main_entity_tap_action;
    }

    return this._getStatusItemCardTapAction(index);
  }

  _getStatusItemMainEntityDoubleTapAction(index = 0) {
    const item = this._statusItems?.[index];

    if (isActionEnabled(item?.main_entity_double_tap_action)) {
      return item.main_entity_double_tap_action;
    }

    if (isActionEnabled(this._config.main_entity_double_tap_action)) {
      return this._config.main_entity_double_tap_action;
    }

    return null;
  }

  _getStatusItemMainEntityHoldAction(index = 0) {
    const item = this._statusItems?.[index];

    if (item?.main_entity_hold_action?.action) {
      return item.main_entity_hold_action.action === "none"
        ? null
        : item.main_entity_hold_action;
    }

    if (this._config.main_entity_hold_action?.action) {
      return this._config.main_entity_hold_action.action === "none"
        ? null
        : this._config.main_entity_hold_action;
    }

    return null;
  }

  _isIconOnlyMode() {
    return this._config?.mode === "icon_only";
  }

  _isPersonMode() {
    return this._config?.mode === "person";
  }

  _getStatusItemEntityId(index = 0) {
    const item = this._statusItems?.[index];

    return item?.entityId || item?.entity || this._config.main_entity;
  }

  _getStatusColumnCount(count = this._statusItems?.length || 1) {
    return getStatusColumnCount(this._config, count);
  }

  _getStatusRowCount(count = this._statusItems?.length || 1) {
    return getStatusRowCount(this._config, count);
  }

  _isStatusItemMainIconEvent(ev) {
    const path = ev.composedPath();

    return path.some(
      (el) =>
        el?.classList &&
        (
          el.classList.contains("status-circle") ||
          el.classList.contains("main-icon") ||
          el.classList.contains("main-image-icon")
        )
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

function getStatusColumnCount(config = {}, count = 1) {
  return getGroupedCardColumnCount({
    config,
    count,
    perRowKey: "items_per_row",
  });
}

function getStatusRowCount(config = {}, count = 1) {
  return getGroupedCardRowCount({
    config,
    count,
    perRowKey: "items_per_row",
  });
}

registerOrbitCard({
  tag: "orbit-status-card",
  cardClass: OrbitStatusCard,
  name: "Orbit Status Card",
  description: "Responsive status card",
  version: CARD_VERSIONS.status,
  getEntitySuggestion: getStatusEntitySuggestion,
});

const STATUS_EXCLUDED_DOMAINS = new Set([
  "automation",
  "button",
  "input_button",
  "scene",
  "script",
]);

function getStatusEntitySuggestion(hass, entityId) {
  const domain = getEntityDomain(entityId);

  if (domain === "person") {
    return {
      config: {
        type: "custom:orbit-status-card",
        mode: "person",
        main_entity: entityId,
      },
    };
  }

  if (STATUS_EXCLUDED_DOMAINS.has(domain)) {
    return null;
  }

  const standard = {
    label: localize(hass, "Standard"),
    config: {
      type: "custom:orbit-status-card",
      mode: "standard",
      main_entity: entityId,
    },
  };

  if (!isNumericEntity(hass, entityId)) {
    return {
      config: standard.config,
    };
  }

  return [
    standard,
    {
      label: localize(hass, "Icon only"),
      config: {
        type: "custom:orbit-status-card",
        mode: "icon_only",
        main_entity: entityId,
      },
    },
  ];
}
