// ==============================
// orbit-status-card.js
// ==============================

import { LitElement } from "lit";

import {
  handleAction,
} from "../common/helpers/actions.js";
import { withCommonCardInteractions } from "../common/helpers/card-interactions.js";
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
  getInlineSvg,
  getSvgColorOverride,
  isImageIcon,
  resolveIconPath,
} from "../common/helpers/icons.js";
import {
  migrateStatusCardConfig,
} from "../common/helpers/config-migration.js";
import {
  disconnectTemplateSubscriptions,
  evaluateStateTemplate,
  getColorTemplateEntries,
  getIconTemplateEntries,
  syncTemplateSubscriptions,
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
  CURRENT_ACTIVITY_ACTION,
  CURRENT_STATE_ACTION,
  getStatusBadgeActiveEntities,
  getStatusBadgeActivityTitleDetail,
  getStatusBadgeAreaEntityIds,
  getStatusBadgeEntities,
  getStatusBadgeStateSource,
} from "../common/helpers/status-badge.js";
import { renderActiveEntitiesDialog } from "../common/renders/active-entities-dialog.js";
import { renderCurrentActivityDialog } from "../common/renders/current-activity-dialog.js";
import {
  activeEntitiesDialogProperties,
  closeActiveEntitiesDialog,
  initializeActiveEntitiesDialog,
  openActiveEntitiesDialog,
  shouldUpdateActiveEntitiesDialog,
  stopActiveEntitiesDurationTimer,
} from "../common/helpers/active-entities-dialog.js";
import {
  closeCurrentActivityDialog,
  currentActivityDialogProperties,
  initializeCurrentActivityDialog,
  openCurrentActivityDialog,
  syncCurrentActivityEntities,
} from "../common/helpers/current-activity-dialog.js";
import {
  sharedSvgCache,
} from "../common/helpers/svg-cache.js";
import { localize } from "../common/localize.js";

import {
  getIconOnlyStatusItems,
  updateStatusCard,
} from "./status/helpers/lifecycle.js";
import { withStatusCardInteractions } from "./status/helpers/interactions.js";
import { renderStatusCard } from "./status/renders/status-card.js";
import { statusCardStyles } from "./status/styles/status-card-styles.js";
import { activeEntitiesDialogStyles } from "../common/styles/active-entities-dialog-styles.js";
import { currentActivityDialogStyles } from "../common/styles/current-activity-dialog-styles.js";

import "../editors/status-card-editor.js";

import { CARD_VERSIONS } from "../version.js";

class OrbitStatusCard extends withStatusCardInteractions(
  withCommonCardInteractions(LitElement)
) {
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
      _templateRevision: { type: Number },
      ...activeEntitiesDialogProperties,
      ...currentActivityDialogProperties,
    };
  }

  constructor() {
    super();
    initializeActiveEntitiesDialog.call(this);
    initializeCurrentActivityDialog.call(this);
    this._activeEntitiesStatusIndex = 0;
    this._currentActivityStatusIndex = 0;
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
      entity: "",
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
    this._config = migrateStatusCardConfig(config).config;

    const color = this._config.color_off || "theme";

    this._nameColor = this._computeFullColor(color);
    this._statusColor = this._computeFullColor(color);
    this._iconColor = this._computeIconColor(color);
    this._circleColor = this._computeCircleColor(color);
    this._statusItems = [];
  }

  willUpdate(changedProps) {
    if (changedProps.has("_config") || changedProps.has("hass")) {
      syncTemplateSubscriptions.call(this, this._getTemplateEntries());
      this._syncCurrentActivityEntities();
    }

    return updateStatusCard.call(this, changedProps);
  }

  _syncCurrentActivityEntities() {
    if (!this._currentActivityOpen) return;

    const index = this._currentActivityStatusIndex ?? 0;
    const config = this._config?.mode === "icon_only"
      ? getIconOnlyStatusItems(this._config)[index] || {}
      : this._config || {};
    const entities = getStatusBadgeEntities(this.hass, config);
    const activeEntityIds = getStatusBadgeActiveEntities(
      entities,
      config,
      (stateObj) => this._getEntityActiveState(stateObj)
    ).map((stateObj) => stateObj.entity_id);

    syncCurrentActivityEntities.call(
      this,
      activeEntityIds,
      entities.map((stateObj) => stateObj.entity_id)
    );
  }

  disconnectedCallback() {
    disconnectTemplateSubscriptions.call(this);
    this._clearMainIconHoldTimer();
    this._clearStatusItemHoldTimer();
    this._clearDoubleTapTimer();
    stopActiveEntitiesDurationTimer.call(this);
    super.disconnectedCallback();
  }

  shouldUpdate(changedProps) {
    if (shouldUpdateActiveEntitiesDialog.call(this, changedProps)) {
      return true;
    }

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
    if (actionConfig?.action === CURRENT_STATE_ACTION) {
      closeCurrentActivityDialog.call(this);
      this._activeEntitiesStatusIndex = actionConfig.status_index ?? 0;
      openActiveEntitiesDialog.call(this);
      return;
    }

    if (actionConfig?.action === CURRENT_ACTIVITY_ACTION) {
      closeActiveEntitiesDialog.call(this);
      const index = actionConfig.status_index ?? 0;
      this._currentActivityStatusIndex = index;
      const config = this._config?.mode === "icon_only"
        ? getIconOnlyStatusItems(this._config)[index] || {}
        : this._config || {};
      const entities = getStatusBadgeEntities(this.hass, config);
      const activeEntityIds = getStatusBadgeActiveEntities(
        entities,
        config,
        (stateObj) => this._getEntityActiveState(stateObj)
      ).map((stateObj) => stateObj.entity_id);
      const isAreaCount = getStatusBadgeStateSource(config) === "area_count";
      const allEntityIds = isAreaCount
        ? entities.map((stateObj) => stateObj.entity_id)
        : activeEntityIds;
      const activityTitleDetail = getStatusBadgeActivityTitleDetail(
        this.hass,
        config
      );

      openCurrentActivityDialog.call(
        this,
        activeEntityIds,
        allEntityIds,
        isAreaCount,
        activityTitleDetail
      );
      return;
    }

    return handleAction.call(this, actionConfig, entityId);
  }

  _renderActiveEntitiesDialog() {
    const config = this._config?.mode === "icon_only"
      ? getIconOnlyStatusItems(this._config)[
          this._activeEntitiesStatusIndex
        ] || {}
      : this._config;
    return renderActiveEntitiesDialog.call(
      this,
      getStatusBadgeActiveEntities(
        getStatusBadgeEntities(this.hass, config),
        config,
        (stateObj) => this._getEntityActiveState(stateObj)
      ),
      config
    );
  }

  _renderCurrentActivityDialog() {
    return renderCurrentActivityDialog.call(this);
  }

  _t(key, replacements) {
    return localize(this.hass, key, replacements);
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
    const entityId = this._config.entity;

    return entityId && this.hass
      ? this.hass.states[entityId]
      : null;
  }

  formatState(stateObj) {
    return formatEntityState(stateObj, this.hass);
  }

  _getEntityActiveState(stateObj) {
    return getEntityActiveState(stateObj);
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

  _getTemplateEntries() {
    if (this._config?.mode === "icon_only") {
      const stateEntries = getIconOnlyStatusItems(this._config).flatMap((item) =>
        (getStatusBadgeStateSource(item) === "area_count"
          ? []
          : [
              item.state_template,
              item.active_template,
              item.inactive_template,
              item.label_template,
              item.name_template,
            ])
          .filter(Boolean)
          .map((template) => ({
            template,
            entityId: item.entity || "",
          }))
      );

      return [
        ...stateEntries,
        ...getColorTemplateEntries(this._config),
        ...getIconTemplateEntries(this._config),
      ];
    }

    const entityId = this._config?.mode === "person"
      ? this._config?.tracker_entity || ""
      : this._config?.entity || "";

    const stateEntries = (getStatusBadgeStateSource(this._config) === "area_count"
      ? []
      : [
          this._config?.state_template,
          this._config?.active_template,
          this._config?.inactive_template,
          this._config?.label_template,
          this._config?.name_template,
        ])
      .filter(Boolean)
      .map((template) => ({ template, entityId }));

    return [
      ...stateEntries,
      ...getColorTemplateEntries(this._config),
      ...getIconTemplateEntries(this._config),
    ];
  }

  _getRelevantEntities() {
    if (this._config?.mode === "icon_only") {
      return getIconOnlyStatusItems(this._config).flatMap((item) =>
        getStatusBadgeStateSource(item) === "area_count"
          ? getStatusBadgeAreaEntityIds(this.hass, item)
          : [item.entity]
      );
    }

    if (getStatusBadgeStateSource(this._config) === "area_count") {
      return getStatusBadgeAreaEntityIds(this.hass, this._config);
    }

    return [
      this._config?.entity,
      this._config?.tracker_entity,
      this._config?.eta_entity,
      this._config?.battery_entity_1,
      this._config?.battery_entity_2,
    ];
  }

  _isIconOnlyMode() {
    return this._config?.mode === "icon_only";
  }

  _isPersonMode() {
    return this._config?.mode === "person";
  }

  _getStatusItemEntityId(index = 0) {
    const item = this._statusItems?.[index];

    return item?.entityId || item?.entity || this._config.entity;
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

  render() {
    return renderStatusCard.call(this);
  }

  static styles = [
    ...statusCardStyles,
    activeEntitiesDialogStyles,
    currentActivityDialogStyles,
  ];
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
        entity: entityId,
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
      entity: entityId,
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
        entity: entityId,
      },
    },
  ];
}
