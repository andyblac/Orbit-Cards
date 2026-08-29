import { LitElement, html, nothing } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import {
  clearDoubleTapTimer,
  handleAction,
  handleDoubleTapAction,
  handleTapAction,
  isActionEnabled,
  navigate,
} from "../common/helpers/actions.js";
import { registerOrbitBadge } from "../common/helpers/badge-registration.js";
import {
  computeFullColor,
} from "../common/helpers/colors.js";
import {
  getInlineSvg,
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
  CURRENT_ACTIVITY_ACTION,
  CURRENT_STATE_ACTION,
  getStatusBadgeActivityTitleDetail,
  getStatusBadgeAreaEntityIds,
  getStatusBadgeDefaultTapAction,
  getStatusBadgeEntities,
  getStatusBadgeStateSource,
  normalizeStatusBadgeConfig,
  validateStatusBadgeConfig,
} from "../common/helpers/status-badge.js";
import { sharedSvgCache } from "../common/helpers/svg-cache.js";
import {
  disconnectTemplateSubscriptions,
  getColorTemplateEntries,
  getIconTemplateEntries,
  syncTemplateSubscriptions,
} from "../common/helpers/templates.js";
import { CARD_VERSIONS } from "../version.js";
import { localize } from "../common/localize.js";
import { renderActiveEntitiesDialog } from "../common/renders/active-entities-dialog.js";
import { renderCurrentActivityDialog } from "../common/renders/current-activity-dialog.js";
import {
  activeEntitiesDialogProperties,
  closeActiveEntitiesDialog,
  initializeActiveEntitiesDialog,
  openActiveEntitiesDialog,
  stopActiveEntitiesDurationTimer,
} from "../common/helpers/active-entities-dialog.js";
import {
  closeCurrentActivityDialog,
  currentActivityDialogProperties,
  initializeCurrentActivityDialog,
  openCurrentActivityDialog,
  syncCurrentActivityEntities,
} from "../common/helpers/current-activity-dialog.js";
import { getStatusBadgeModel } from "./helpers/model.js";
import { statusBadgeStyles } from "./styles/status-badge-styles.js";
import { activeEntitiesDialogStyles } from "../common/styles/active-entities-dialog-styles.js";
import { currentActivityDialogStyles } from "../common/styles/current-activity-dialog-styles.js";

import "../editors/status-badge-editor.js";

class OrbitStatusBadge extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _isHeadingBadge: { state: true },
    _templateRevision: { state: true },
    ...activeEntitiesDialogProperties,
    ...currentActivityDialogProperties,
  };

  constructor() {
    super();
    initializeActiveEntitiesDialog.call(this);
    initializeCurrentActivityDialog.call(this);
  }

  static getConfigElement() {
    return document.createElement("orbit-status-badge-editor");
  }

  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    validateStatusBadgeConfig(config || {});
    this._config = normalizeStatusBadgeConfig(config || {});
  }

  _t(key, replacements) {
    return localize(this.hass, key, replacements);
  }

  connectedCallback() {
    super.connectedCallback();
    this._isHeadingBadge = Boolean(this.closest("hui-heading-badge"));
    this.toggleAttribute("heading-badge", this._isHeadingBadge);
    queueMicrotask(() => this._syncTemplateSubscriptions());
  }

  disconnectedCallback() {
    disconnectTemplateSubscriptions.call(this);
    stopActiveEntitiesDurationTimer.call(this);
    this._clearDoubleTapTimer();
    this._cancelLongPress();
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has("hass") || changedProperties.has("_config")) {
      this._syncTemplateSubscriptions();
      this._syncCurrentActivityEntities();
    }
  }

  _syncCurrentActivityEntities() {
    if (!this._currentActivityOpen) return;

    const model = this._getModel();
    syncCurrentActivityEntities.call(
      this,
      model.activeEntities.map((stateObj) => stateObj.entity_id),
      model.entities.map((stateObj) => stateObj.entity_id)
    );
  }

  shouldUpdate(changedProperties) {
    if (!changedProperties.has("hass")) return true;
    if (changedProperties.has("_config")) return true;
    if ([...changedProperties.keys()].some((key) => key !== "hass")) {
      return true;
    }

    const oldHass = changedProperties.get("hass");
    const newHass = this.hass;

    if (!oldHass || !newHass) return true;

    if (
      oldHass.entities !== newHass.entities ||
      oldHass.devices !== newHass.devices ||
      oldHass.areas !== newHass.areas
    ) {
      return true;
    }

    const stateSource = getStatusBadgeStateSource(this._config);

    if (stateSource === "template") return true;

    const entityIds = stateSource === "area_count"
      ? getStatusBadgeAreaEntityIds(this.hass, this._config)
      : [this._config?.entity].filter(Boolean);

    return entityIds.some((entityId) =>
      oldHass.states?.[entityId] !== newHass.states?.[entityId]
    );
  }

  _syncTemplateSubscriptions() {
    const stateSource = getStatusBadgeStateSource(this._config);
    const template = this._config?.state_template?.trim() || "";
    const activeTemplate = this._config?.active_template?.trim() || "";
    const inactiveTemplate = this._config?.inactive_template?.trim() || "";
    const nameTemplate = this._config?.name_template?.trim() || "";
    const badgeMode = this._config?.display_style === "badge";
    const templates = stateSource === "template"
      ? badgeMode
        ? [activeTemplate, inactiveTemplate]
        : [template, activeTemplate, inactiveTemplate, nameTemplate]
      : [];
    const entries = templates
      .filter(Boolean)
      .map((entryTemplate) => ({
        template: entryTemplate,
        entityId: "",
      }));

    syncTemplateSubscriptions.call(this, [
      ...entries,
      ...getColorTemplateEntries(this._config),
      ...getIconTemplateEntries(this._config),
    ]);
  }

  _getEntities() {
    return getStatusBadgeEntities(this.hass, this._config);
  }

  _getModel() {
    return getStatusBadgeModel.call(this);
  }

  _handleAction(actionConfig, entityId = null) {
    if (actionConfig?.action === CURRENT_STATE_ACTION) {
      closeCurrentActivityDialog.call(this);
      openActiveEntitiesDialog.call(this);
      return;
    }

    if (actionConfig?.action === CURRENT_ACTIVITY_ACTION) {
      closeActiveEntitiesDialog.call(this);
      const model = this._getModel();
      const activeEntityIds = model.activeEntities.map(
        (stateObj) => stateObj.entity_id
      );
      const isAreaCount = getStatusBadgeStateSource(this._config) ===
        "area_count";
      const allEntityIds = isAreaCount
        ? model.entities.map((stateObj) => stateObj.entity_id)
        : activeEntityIds;
      const activityTitleDetail = getStatusBadgeActivityTitleDetail(
        this.hass,
        this._config
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

  _navigate(path) {
    return navigate(path);
  }

  _clearDoubleTapTimer() {
    return clearDoubleTapTimer.call(this);
  }

  _cancelLongPress() {
    return cancelLongPress.call(this);
  }

  get _LONG_PRESS_DELAY() {
    return LONG_PRESS_DELAY;
  }

  _handlePointerDown(ev, entityId) {
    if (!isActionEnabled(this._config?.hold_action)) return;

    return startLongPress.call(
      this,
      ev,
      entityId,
      this._config?.hold_action
    );
  }

  _handlePointerEnd(ev) {
    return finishLongPress.call(this, ev);
  }

  _handleTap(ev, entityId) {
    if (this._longPressTriggered) {
      this._longPressTriggered = false;
      return;
    }

    const defaultTapAction = getStatusBadgeDefaultTapAction(this._config);

    return handleTapAction.call(
      this,
      ev,
      entityId,
      this._config?.tap_action || defaultTapAction,
      this._config?.double_tap_action
    );
  }

  _handleDoubleTap(ev, entityId) {
    return handleDoubleTapAction.call(
      this,
      ev,
      entityId,
      this._config?.double_tap_action
    );
  }

  _renderIcon(model) {
    const badgeMode = this._config?.display_style === "badge";
    const cardImageStyle = badgeMode
      ? "width:12px;height:12px;margin:0;"
      : "";
    const cardEntityPictureStyle = badgeMode
      ? "width:16px;height:16px;margin:0;border-radius:var(--ha-border-radius-md);"
      : "";
    const entityPicture = model.stateSource === "entity" &&
      this._config?.show_entity_picture
      ? model.representativeStateObj.attributes?.entity_picture_local ||
        model.representativeStateObj.attributes?.entity_picture
      : "";

    if (entityPicture) {
      const imageUrl = this.hass?.hassUrl
        ? this.hass.hassUrl(entityPicture)
        : entityPicture;
      return html`
        <img
          class="entity-picture"
          slot="icon"
          src=${imageUrl}
          alt=""
          style=${cardEntityPictureStyle}
        />
      `;
    }

    if (!isImageIcon(model.icon)) {
      return html`
        <ha-state-icon
          slot="icon"
          .icon=${model.iconSource === "custom" || model.useStaticIcon
            ? model.icon
            : undefined}
          .stateObj=${model.iconSource === "custom"
            ? model.representativeStateObj
            : model.iconStateObj}
        ></ha-state-icon>
      `;
    }

    if (isImageIcon(model.icon)) {
      const path = resolveIconPath(model.icon);
      const forceColor = model.iconKey
        ? getSvgColorOverride(this._config, model.iconKey)
        : true;

      if (path.toLowerCase().split("?")[0].endsWith(".svg")) {
        const svg = getInlineSvg.call(this, path, { forceColor });

        return svg
          ? html`<span slot="icon" class="image-icon">${unsafeHTML(svg)}</span>`
          : html`<img
              slot="icon"
              src=${path}
              alt=""
              style=${cardImageStyle}
            />`;
      }

      return html`<img
        slot="icon"
        src=${path}
        alt=""
        style=${cardImageStyle}
      />`;
    }

    return "";
  }

  _renderActiveEntitiesDialog(model) {
    return renderActiveEntitiesDialog.call(
      this,
      model.activeEntities,
      this._config
    );
  }

  render() {
    const model = this._getModel();
    const actionEntity = model.activeEntities[0]?.entity_id ||
      model.entities[0]?.entity_id ||
      null;
    const tapAction = this._config?.tap_action ||
      getStatusBadgeDefaultTapAction(this._config);
    const hasAction = isActionEnabled(tapAction) ||
      isActionEnabled(this._config?.hold_action) ||
      isActionEnabled(this._config?.double_tap_action);
    const badgeMode = this._config?.display_style === "badge";
    const cardVisibility = this._config?.card_visibility || "always";
    const showCardBadge = cardVisibility === "always" ||
      (cardVisibility === "state" && model.isOn) ||
      (cardVisibility === "template" &&
        (model.isOn || model.inactiveTemplateActive));
    const showState = !badgeMode && this._config?.show_state !== false;
    const showName = !badgeMode && this._config?.show_name === true;
    const showIcon = badgeMode || this._config?.show_icon !== false;
    const cardBackgroundColor = this._config?.card_color
      ? computeFullColor.call(this, this._config.card_color)
      : "var(--primary-color)";
    const badgeStyle = `--badge-color:${model.iconColor};`;
    const cardBadgeStyle = [
      `--tile-badge-background-color:${cardBackgroundColor}`,
      `--tile-badge-icon-color:${model.hasIconColorOverride
        ? model.iconColor
        : "var(--white-color, #fff)"}`,
      "--mdc-icon-size:12px",
    ].join(";");

    const content = html`
      ${showIcon ? this._renderIcon(model) : ""}
      ${showState
        ? model.stateSource === "template"
          ? html`<span class="template-state">${model.displayValue}</span>`
          : html`
              <state-display
                .hass=${this.hass}
                .stateObj=${model.displayStateObj}
                .content=${this._config?.state_content ||
                  model.defaultStateContent}
                .timeFormat=${this._config?.time_format}
                .name=${model.label}
                dash-unavailable
              ></state-display>
            `
        : ""}
    `;

    const events = {
      click: (ev) => this._handleTap(ev, actionEntity),
      dblclick: (ev) => this._handleDoubleTap(ev, actionEntity),
      pointerdown: (ev) => this._handlePointerDown(ev, actionEntity),
      pointerup: (ev) => this._handlePointerEnd(ev),
    };
    const activeEntitiesDialog = this._renderActiveEntitiesDialog(model);
    const currentActivityDialog = renderCurrentActivityDialog.call(this);

    if (badgeMode && !showCardBadge) return nothing;

    if (badgeMode) {
      return html`
        <div
          class="card-badge"
          style=${cardBadgeStyle}
          role=${hasAction ? "button" : "img"}
          tabindex=${hasAction ? "0" : "-1"}
          title=${`${model.label}: ${model.displayValue}`}
          aria-label=${`${model.label}: ${model.displayValue}`}
          @click=${events.click}
          @dblclick=${events.dblclick}
          @pointerdown=${events.pointerdown}
          @pointerup=${events.pointerup}
          @pointercancel=${() => this._cancelLongPress()}
          @pointerleave=${() => this._cancelLongPress()}
        >
          ${content}
        </div>
        ${activeEntitiesDialog}
        ${currentActivityDialog}
      `;
    }

    const badge = this._isHeadingBadge
      ? html`
          <ha-heading-badge
            .type=${hasAction ? "button" : "text"}
            style=${[
              `--icon-color:${model.iconColor}`,
              "--ha-heading-badge-font-size:var(--ha-heading-card-title-font-size,var(--ha-font-size-l))",
              "--ha-heading-badge-font-weight:var(--ha-heading-card-title-font-weight,var(--ha-font-weight-normal))",
              "--ha-heading-badge-line-height:var(--ha-heading-card-title-line-height,var(--ha-line-height-normal))",
            ].join(";")}
            .title=${`${model.label}: ${model.displayValue}`}
            aria-label=${`${model.label}: ${model.displayValue}`}
            @click=${events.click}
            @dblclick=${events.dblclick}
            @pointerdown=${events.pointerdown}
            @pointerup=${events.pointerup}
            @pointercancel=${() => this._cancelLongPress()}
            @pointerleave=${() => this._cancelLongPress()}
          >
            ${content}
          </ha-heading-badge>
        `
      : html`
          <ha-badge
            .type=${hasAction ? "button" : "badge"}
            .label=${showName ? model.label : undefined}
            .iconOnly=${badgeMode || (!showState && !showName)}
            style=${badgeStyle}
            .title=${`${model.label}: ${model.displayValue}`}
            aria-label=${`${model.label}: ${model.displayValue}`}
            @click=${events.click}
            @dblclick=${events.dblclick}
            @pointerdown=${events.pointerdown}
            @pointerup=${events.pointerup}
            @pointercancel=${() => this._cancelLongPress()}
            @pointerleave=${() => this._cancelLongPress()}
          >
            ${content}
          </ha-badge>
        `;

    return html`${badge}${activeEntitiesDialog}${currentActivityDialog}`;
  }

  static styles = [
    statusBadgeStyles,
    activeEntitiesDialogStyles,
    currentActivityDialogStyles,
  ];
}



registerOrbitBadge({
  tag: "orbit-status-badge",
  badgeClass: OrbitStatusBadge,
  name: "Orbit Status Badge",
  description: "Displays an entity, area count, or template state",
  version: CARD_VERSIONS.statusBadge,
});
