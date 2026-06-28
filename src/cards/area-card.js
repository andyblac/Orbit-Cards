// ==============================
// orbit-area-card.js
// ==============================

import { LitElement } from "lit";

import {
  handleAction,
  handleButtonClick,
  handleButtonDoubleClick,
  handleCardDoubleTap,
  handleCurveButtonClick,
  handleCurveButtonDoubleClick,
  handleMainEntityDoubleTap,
  handleMainEntityTap,
  handleTap,
  isAddCardPickerPreview,
  clearDoubleTapTimer,
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
  registerOrbitCard,
} from "../common/helpers/card-registration.js";
import {
  migrateAreaCardConfig,
} from "../common/helpers/config-migration.js";
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
  updateAreaCard,
} from "./area/helpers/lifecycle.js";

import { renderButtons } from "./area/renders/buttons.js";
import { renderAreaCard } from "./area/renders/area-card.js";
import { renderCurveButtons } from "./area/renders/curve-buttons.js";

import { areaCardStyles } from "./area/styles/area-card-styles.js";

import "../editors/area-card-editor.js";

import { CARD_VERSIONS } from "../version.js";

class OrbitAreaCard extends LitElement {
  static svgCache = sharedSvgCache;

  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _cardName: { type: String },
      _statusText: { type: String },
      _statusItems: { type: Array },
      _icon: { type: String },
      _areaColor: { type: String },
      _statusColor: { type: String },
      _iconColor: { type: String },
      _circleColor: { type: String },
    };
  }

  static getConfigElement() {
    return document.createElement(
      "orbit-area-card-editor"
    );
  }

  static getStubConfig(hass) {
    const area = getFirstAreaId(hass);
    const config = {
      type: "custom:orbit-area-card",
      accent_color: "blue",
      tap_action: {
        action: "navigate",
        navigation_path: "/lovelace/home",
      },
    };

    if (area) {
      config.area = area;
    }

    return config;
  }

  getLayoutOptions() {
    return {
      grid_columns: 3,
      grid_min_columns: 2,
      grid_rows: "auto",
    };
  }

  setConfig(config) {
    this._config = migrateAreaCardConfig(config).config;

    this._areaColor = this._computeFullColor(this._config.accent_color);
    this._statusColor = this._computeFullColor(this._config.status_color || this._config.accent_color);
    this._iconColor = this._computeIconColor(this._config.accent_color);
    this._circleColor = this._computeCircleColor(this._config.accent_color);
  }

  willUpdate(changedProps) {
    return updateAreaCard.call(this, changedProps);
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

  _handleButtonDoubleClick(ev) {
    return handleButtonDoubleClick.call(this, ev);
  }

  _handleCurveButtonClick(ev) {
    return handleCurveButtonClick.call(this, ev);
  }

  _handleCurveButtonDoubleClick(ev) {
    return handleCurveButtonDoubleClick.call(this, ev);
  }

  _handleTap(ev) {
    return handleTap.call(this, ev);
  }

  _handleCardPointerDown(ev) {
    if (isAddCardPickerPreview(this)) return;

    if (isAreaButtonEvent(ev)) return;

    const holdAction = this._config?.hold_action;

    if (!holdAction?.action || holdAction.action === "none") return;

    return this._startLongPress(
      ev,
      this._config.main_entity || this._config.entity,
      holdAction
    );
  }

  _handleCardDoubleTap(ev) {
    return handleCardDoubleTap.call(this, ev);
  }

  _handleMainEntityTap(ev) {
    return handleMainEntityTap.call(this, ev);
  }

  _handleMainEntityDoubleTap(ev) {
    return handleMainEntityDoubleTap.call(this, ev);
  }

  _handleMainEntityPointerDown(ev) {
    if (isAddCardPickerPreview(this)) return;

    return this._startLongPress(
      ev,
      this._config.main_entity || this._config.entity,
      this._config.main_entity_hold_action
    );
  }

  _handleButtonPointerDown(ev) {
    if (isAddCardPickerPreview(this)) return;

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

  _clearDoubleTapTimer() {
    return clearDoubleTapTimer.call(this);
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
    return renderAreaCard.call(this);
  }

  static styles = areaCardStyles;
}

function isAreaButtonEvent(ev) {
  return ev.composedPath().some((el) => {
    if (!el?.classList) return false;

    return (
      el.classList.contains("entity-button") ||
      el.classList.contains("curve-button") ||
      el.classList.contains("action-button")
    );
  });
}

class OrbitRoomCard extends OrbitAreaCard {}

registerOrbitCard({
  tag: "orbit-area-card",
  cardClass: OrbitAreaCard,
  name: "Orbit Area Card",
  description: "Responsive area card",
  version: CARD_VERSIONS.area,
  getEntitySuggestion: getAreaEntitySuggestion,
  aliases: [
    {
      tag: "orbit-room-card",
      cardClass: OrbitRoomCard,
    },
  ],
});

const AREA_SUGGESTION_DOMAINS = new Set([
  "light",
  "fan",
  "climate",
  "media_player",
  "switch",
  "cover",
  "lock",
]);

function getFirstAreaId(hass) {
  return Object.keys(hass?.areas || {})
    .sort((areaIdA, areaIdB) => {
      const areaA = hass.areas[areaIdA]?.name || areaIdA;
      const areaB = hass.areas[areaIdB]?.name || areaIdB;

      return areaA.localeCompare(
        areaB,
        undefined,
        { sensitivity: "base" }
      );
    })[0] || "";
}

function getAreaEntitySuggestion(hass, entityId) {
  const domain = getEntityDomain(entityId);

  if (!AREA_SUGGESTION_DOMAINS.has(domain)) {
    return null;
  }

  const area = getEntityAreaId(hass, entityId);
  const config = {
    type: "custom:orbit-area-card",
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
