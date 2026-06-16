// ==============================
// orbit-action-card.js
// ==============================

import { LitElement } from "lit";

import {
  handleAction,
} from "../common/helpers/actions.js";
import {
  computeCircleColor,
  computeFullColor,
  computeIconColor,
} from "../common/helpers/colors.js";
import {
  getDefaultDomainIcon,
  getInlineSvg,
  getSvgColorOverride,
  isImageIcon,
  resolveIconPath,
} from "../common/helpers/icons.js";
import {
  hasTemplateConfig,
  shouldUpdateForEntities,
} from "../common/helpers/updates.js";
import {
  getEntityDomain,
} from "../common/helpers/suggestions.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";

import {
  getActionItems,
  updateActionCard,
} from "./action/helpers/lifecycle.js";
import { renderActionCard } from "./action/renders/action-card.js";
import { actionCardStyles } from "./action/styles/action-card-styles.js";

import "../editors/action-card-editor.js";

import { CARD_VERSIONS } from "../version.js";

class OrbitActionCard extends LitElement {
  static svgCache = sharedSvgCache;

  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _icon: { type: String },
      _iconColor: { type: String },
      _cardBackground: { type: String },
      _isRunning: { type: Boolean },
      _actions: { type: Array },
    };
  }

  static getConfigElement() {
    return document.createElement(
      "orbit-action-card-editor"
    );
  }

  static getStubConfig() {
    return {
      type: "custom:orbit-action-card",
      main_entity: "",
      accent_color: "theme",
    };
  }

  getLayoutOptions() {
    const count = getActionItems(this._config).length;
    const columns = getActionColumnCount(this._config, count);

    return {
      grid_columns: Math.max(1, columns * 1),
      grid_min_columns: 0.5,
      grid_rows: "auto",
    };
  }

  setConfig(config) {
    this._config = config;

    const color = config.accent_color || "theme";

    this._iconColor = this._computeIconColor(color);
    this._cardBackground = this._computeCircleColor(color);
    this._isRunning = false;
    this._actions = [];
  }

  willUpdate(changedProps) {
    return updateActionCard.call(this, changedProps);
  }

  shouldUpdate(changedProps) {
    return shouldUpdateForEntities.call(
      this,
      changedProps,
      getActionItems(this._config).map((item) =>
        item.entity || item.main_entity
      ),
      {
        hasTemplates: hasTemplateConfig(this._config),
      }
    );
  }

  _handleTap(ev, index = 0) {
    if (this._longPressTriggered) {
      this._longPressTriggered = false;
      this._stopEvent(ev);
      return;
    }

    this._stopEvent(ev);

    this._handleAction(
      this._getTapAction(index),
      this._getActionEntityId(index)
    );
  }

  _handlePointerDown(ev, index = 0) {
    this._stopEvent(ev);
    this._clearHoldTimer();

    this._holdTimer = setTimeout(() => {
      this._longPressTriggered = true;

      this._handleAction(
        this._getHoldAction(index),
        this._getActionEntityId(index)
      );
    }, 500);
  }

  _handlePointerUp(ev) {
    this._stopEvent(ev);
    this._clearHoldTimer();
  }

  _handlePointerCancel(ev) {
    this._stopEvent(ev);
    this._clearHoldTimer();
  }

  _handleContextMenu(ev, index = 0) {
    this._stopEvent(ev);

    this._clearHoldTimer();
    this._longPressTriggered = true;

    this._handleAction(
      this._getHoldAction(index),
      this._getActionEntityId(index)
    );
  }

  _getTapAction(index = 0) {
    const action = this._actions?.[index];

    if (action?.tap_action?.action) {
      return action.tap_action;
    }

    if (this._config.tap_action?.action) {
      return this._config.tap_action;
    }

    return getDefaultTapAction(this._getActionEntityId(index));
  }

  _getHoldAction(index = 0) {
    const action = this._actions?.[index];

    return action?.hold_action?.action
      ? action.hold_action
      : this._config.hold_action?.action
        ? this._config.hold_action
      : {
          action: "more-info",
        };
  }

  _getActionEntityId(index = 0) {
    const action = this._actions?.[index];

    return action?.entityId || action?.entity || this._config.main_entity;
  }

  _getActionColumnCount(count = this._actions?.length || 1) {
    return getActionColumnCount(this._config, count);
  }

  _getActionRowCount(count = this._actions?.length || 1) {
    const columns = this._getActionColumnCount(count);

    return Math.max(1, Math.ceil(count / columns));
  }

  _handleAction(actionConfig, entityId = null) {
    return handleAction.call(this, actionConfig, entityId);
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

  _clearHoldTimer() {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  _stopEvent(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    }
  }

  render() {
    return renderActionCard.call(this);
  }

  static styles = actionCardStyles;
}

function getActionColumnCount(config = {}, count = 1) {
  if (!config.wrap) {
    return Math.max(1, count);
  }

  const requestedColumns = Number(config.actions_per_row);
  const columns = Number.isFinite(requestedColumns)
    ? Math.floor(requestedColumns)
    : 3;

  return Math.max(1, Math.min(count, columns || 1));
}

function getDefaultTapAction(entityId) {
  const domain = entityId?.split(".")[0];

  if (domain === "scene") {
    return {
      action: "call-service",
      service: "scene.turn_on",
      service_data: {
        entity_id: entityId,
      },
    };
  }

  if (domain === "script") {
    return {
      action: "call-service",
      service: "script.turn_on",
      service_data: {
        entity_id: entityId,
      },
    };
  }

  if (domain === "automation") {
    return {
      action: "call-service",
      service: "automation.trigger",
      service_data: {
        entity_id: entityId,
      },
    };
  }

  if (domain === "button" || domain === "input_button") {
    return {
      action: "call-service",
      service: "button.press",
      service_data: {
        entity_id: entityId,
      },
    };
  }

  return {
    action: "toggle",
  };
}

customElements.define("orbit-action-card", OrbitActionCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "orbit-action-card",
  name: "Orbit Action Card",
  description: "Compact scene, script, and automation launcher",
  preview: true,
  version: CARD_VERSIONS.action,
  getEntitySuggestion: getActionEntitySuggestion,
});

console.info(
  `%c Orbit Action Card %c v${CARD_VERSIONS.action} `,
  "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;",
  "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;"
);

const ACTION_SUGGESTION_DOMAINS = new Set([
  "automation",
  "button",
  "input_button",
  "scene",
  "script",
]);

function getActionEntitySuggestion(_hass, entityId) {
  if (!ACTION_SUGGESTION_DOMAINS.has(getEntityDomain(entityId))) {
    return null;
  }

  return {
    config: {
      type: "custom:orbit-action-card",
      main_entity: entityId,
    },
  };
}
