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
  getEntityActiveState,
} from "../common/helpers/entities.js";
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
import { getEntityAreaId } from "../common/helpers/suggestions.js";
import {
  formatDeviceClass,
  getNativeEntityBadgeColor,
  shouldHideStatusBadgeEntity,
  getStatusBadgeDomainConfig,
  getStatusBadgeEntityDeviceClass,
  getStatusBadgeStateSource,
  normalizeStatusBadgeConfig,
  validateStatusBadgeConfig,
} from "../common/helpers/status-badge.js";
import { sharedSvgCache } from "../common/helpers/svg-cache.js";
import {
  disconnectTemplateSubscriptions,
  evaluateStateTemplate,
  getTemplateResultActiveState,
  syncTemplateSubscriptions,
} from "../common/helpers/templates.js";
import { CARD_VERSIONS } from "../version.js";
import { localize } from "../common/localize.js";
import {
  compareActiveEntityNames,
  formatActiveEntityDuration,
  getActiveEntitiesDialogWidth,
  getActiveEntityControl,
  getActiveEntityGroupControl,
  getActiveEntityIconStyle,
  getActiveEntityName,
  getActiveEntityNameCollator,
  getActiveEntityServiceName,
} from "./helpers/active-entities.js";
import { statusBadgeStyles } from "./styles/status-badge-styles.js";

import "../editors/status-badge-editor.js";

class OrbitStatusBadge extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _isHeadingBadge: { state: true },
    _templateRevision: { state: true },
    _activeEntitiesOpen: { state: true },
    _activeEntitiesDurationNow: { state: true },
  };

  constructor() {
    super();
    this._activeEntitiesDurationNow = Date.now();
    this._activeEntitiesDurationTimer = null;
    this._areaEntityCache = null;
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
    this._areaEntityCache = null;
  }

  _t(key) {
    return localize(this.hass, key);
  }

  connectedCallback() {
    super.connectedCallback();
    this._isHeadingBadge = Boolean(this.closest("hui-heading-badge"));
    this.toggleAttribute("heading-badge", this._isHeadingBadge);
    queueMicrotask(() => this._syncTemplateSubscriptions());
  }

  disconnectedCallback() {
    disconnectTemplateSubscriptions.call(this);
    this._stopActiveEntitiesDurationTimer();
    this._clearDoubleTapTimer();
    this._cancelLongPress();
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has("hass") || changedProperties.has("_config")) {
      this._syncTemplateSubscriptions();
    }
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
      this._areaEntityCache = null;
      return true;
    }

    const stateSource = getStatusBadgeStateSource(this._config);

    if (stateSource === "template") return true;

    const entityIds = stateSource === "area_count"
      ? this._getAreaEntityIds()
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

    syncTemplateSubscriptions.call(
      this,
      entries
    );
  }

  _getEntities() {
    const stateSource = getStatusBadgeStateSource(this._config);
    if (
      stateSource === "entity" ||
      (this._config?.display_style === "badge" && this._config?.entity)
    ) {
      const stateObj = this.hass?.states?.[this._config?.entity];
      return stateObj ? [stateObj] : [];
    }

    const domain = this._config?.domain || "";
    const areaId = this._config?.area;
    const deviceClass = this._config?.device_class || "";
    const domainConfig = getStatusBadgeDomainConfig(domain);

    if (!this.hass || !areaId || !domain) return [];
    if (domainConfig.requiresDeviceClass && !deviceClass) return [];

    return this._getAreaEntityIds().map((entityId) =>
      this.hass.states?.[entityId]
    ).filter((stateObj) =>
      stateObj &&
      (!domainConfig.requiresDeviceClass ||
        getStatusBadgeEntityDeviceClass(stateObj, domain) ===
          deviceClass) &&
      !shouldHideStatusBadgeEntity(
        this.hass,
        stateObj.entity_id,
        this._config
      )
    );
  }

  _getAreaEntityIds() {
    const hass = this.hass;
    const areaId = this._config?.area || "";
    const domain = this._config?.domain || "";
    const entities = hass?.entities || {};
    const devices = hass?.devices || {};
    const cache = this._areaEntityCache;

    if (!hass || !areaId || !domain) return [];

    if (
      cache?.areaId === areaId &&
      cache?.domain === domain &&
      cache?.entities === entities &&
      cache?.devices === devices
    ) {
      return cache.entityIds;
    }

    const domainPrefix = `${domain}.`;
    const entityIds = Object.keys(entities).filter((entityId) =>
      entityId.startsWith(domainPrefix) &&
      getEntityAreaId(hass, entityId) === areaId
    );

    this._areaEntityCache = {
      areaId,
      domain,
      entities,
      devices,
      entityIds,
    };

    return entityIds;
  }

  _getModel() {
    const stateSource = getStatusBadgeStateSource(this._config);
    const entities = this._getEntities();
    const activeEntities = entities.filter((stateObj) =>
      getEntityActiveState(stateObj)
    );
    const templateResult = stateSource === "template"
      ? evaluateStateTemplate.call(
          this,
          this._config?.state_template,
          ""
        ) ?? "unavailable"
      : "";
    const activeTemplate = this._config?.active_template?.trim() || "";
    const activeTemplateResult = stateSource === "template" && activeTemplate
      ? evaluateStateTemplate.call(this, activeTemplate, "")
      : null;
    const inactiveTemplate = this._config?.inactive_template?.trim() || "";
    const inactiveTemplateResult = stateSource === "template" &&
        inactiveTemplate
      ? evaluateStateTemplate.call(this, inactiveTemplate, "")
      : null;
    const inactiveTemplateActive = Boolean(inactiveTemplate) &&
      getTemplateResultActiveState(inactiveTemplateResult);
    const computedIsOn = stateSource === "template"
      ? getTemplateResultActiveState(
          activeTemplateResult ?? templateResult
        )
      : activeEntities.length > 0;
    const isOn = this._config?.display_style === "badge" &&
        !this._config?.card_visibility
      ? true
      : computedIsOn;
    const selectedEntity = entities[0];
    const domain = selectedEntity?.entity_id.split(".")[0] ||
      this._config?.domain || "";
    const domainConfig = getStatusBadgeDomainConfig(domain);
    const iconSource = this._config?.icon_source ||
      (this._config?.icon ? "custom" : "domain");
    const basicIcon = this._config?.icon || "";
    const stateIcon = isOn
      ? this._config?.icon_on || basicIcon
      : this._config?.icon_off || basicIcon;
    const icon = iconSource === "custom"
      ? stateIcon || domainConfig.icon
      : domainConfig.icon;
    const configuredColor = isOn
      ? this._config?.accent_on_color ?? this._config?.color
      : this._config?.accent_off_color;
    const hasIconColorOverride = Boolean(configuredColor && ![
      "theme",
      "state",
      "state-active",
      "state-inactive",
    ].includes(configuredColor));
    const colorInput = !configuredColor || [
      "theme",
      "state",
      "state-active",
      "state-inactive",
    ].includes(configuredColor)
      ? "theme"
      : configuredColor;
    const nameTemplate = stateSource === "template"
      ? this._config?.name_template?.trim() || ""
      : "";
    const nameTemplateResult = nameTemplate
      ? evaluateStateTemplate.call(this, nameTemplate, "")
      : null;
    const templatedName = String(nameTemplateResult ?? "").trim();
    const representativeStateObj = stateSource === "template" &&
        !selectedEntity
      ? {
          entity_id: "sensor.orbit_status_badge_template",
          state: templateResult || "unavailable",
          attributes: {
            friendly_name: templatedName || "Template",
          },
        }
      : activeEntities[0] || entities[0] || {
          entity_id: `${domain || "sensor"}.orbit_status_badge`,
          state: isOn ? "on" : "off",
          attributes: this._config?.device_class
            ? { device_class: this._config.device_class }
            : {},
        };
    const iconStateObj = ["entity", "template"].includes(stateSource)
      ? representativeStateObj
      : {
          entity_id: `${domain}.orbit_status_badge`,
          state: representativeStateObj.state,
          attributes: this._config?.device_class
            ? { device_class: this._config.device_class }
            : {},
        };
    const areaName = this.hass?.areas?.[this._config?.area]?.name || "";
    const configuredName = this._config?.name;
    const deviceClassLabel = this._config?.device_class
      ? formatDeviceClass(this._config.device_class)
      : "";
    const entityLabel = selectedEntity && this.hass?.formatEntityName
      ? this.hass.formatEntityName(selectedEntity)
      : "";
    const defaultLabel = entityLabel || (stateSource === "template"
      ? "Template"
      : areaName || deviceClassLabel || domainConfig.label);
    const label = configuredName && this.hass?.formatEntityName
      ? this.hass.formatEntityName(
          representativeStateObj,
          replaceTemplateNameItem(configuredName, templatedName)
        ) ||
        defaultLabel
      : defaultLabel;
    const iconKey = iconSource === "custom"
      ? (isOn && this._config?.icon_on
          ? "icon_on"
          : !isOn && this._config?.icon_off
            ? "icon_off"
            : this._config?.icon
              ? "icon"
              : "")
      : "";

    return {
      entities,
      activeEntities,
      isOn,
      inactiveTemplateActive,
      count: activeEntities.length,
      displayValue: stateSource === "template"
        ? templateResult
        : stateSource === "entity"
          ? representativeStateObj.state
          : activeEntities.length,
      label,
      icon,
      iconKey,
      iconSource,
      stateSource,
      representativeStateObj,
      iconStateObj,
      displayStateObj: ["entity", "template"].includes(stateSource)
        ? representativeStateObj
        : {
            entity_id: "sensor.orbit_status_badge_count",
            state: isOn ? "on" : "off",
            attributes: {
              count: activeEntities.length,
              friendly_name: label,
            },
            last_changed: representativeStateObj.last_changed,
            last_updated: representativeStateObj.last_updated,
            context: representativeStateObj.context,
          },
      defaultStateContent: stateSource === "area_count" ? "count" : "state",
      hasIconColorOverride,
      iconColor: colorInput === "theme"
        ? getNativeEntityBadgeColor(representativeStateObj, isOn)
        : computeFullColor(colorInput),
    };
  }

  _handleAction(actionConfig, entityId = null) {
    if (actionConfig?.action === "active-entities") {
      this._activeEntitiesOpen = true;
      this._activeEntitiesDurationNow = Date.now();
      this._startActiveEntitiesDurationTimer();
      return;
    }

    return handleAction.call(this, actionConfig, entityId);
  }

  _startActiveEntitiesDurationTimer() {
    if (this._activeEntitiesDurationTimer !== null) return;

    this._activeEntitiesDurationTimer = window.setInterval(() => {
      if (!this._activeEntitiesOpen) {
        this._stopActiveEntitiesDurationTimer();
        return;
      }

      this._activeEntitiesDurationNow = Date.now();
    }, 60_000);
  }

  _stopActiveEntitiesDurationTimer() {
    if (this._activeEntitiesDurationTimer === null) return;

    window.clearInterval(this._activeEntitiesDurationTimer);
    this._activeEntitiesDurationTimer = null;
  }

  _closeActiveEntitiesDialog() {
    this._activeEntitiesOpen = false;
    this._stopActiveEntitiesDurationTimer();
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
          .icon=${model.iconSource === "custom" ? model.icon : undefined}
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
    if (!this._activeEntitiesOpen) return nothing;

    const nameCollator = getActiveEntityNameCollator(this.hass);
    const controls = model.activeEntities
      .map((stateObj) => {
        const control = getActiveEntityControl(this.hass, stateObj);

        return {
          stateObj,
          control,
          name: getActiveEntityName(this.hass, stateObj),
          serviceName: control
            ? getActiveEntityServiceName(this.hass, control)
            : "",
        };
      })
      .sort((a, b) => compareActiveEntityNames(nameCollator, a, b));
    const controllable = controls.filter((entry) => entry.control);
    const groupControl = getActiveEntityGroupControl(controllable);
    const groupServiceName = groupControl
      ? getActiveEntityServiceName(this.hass, groupControl)
      : "";
    const dialogWidth = getActiveEntitiesDialogWidth(controls, groupControl);
    const dialogWidthStyle = [
      `--ha-dialog-width-sm: ${dialogWidth}px`,
      `--mdc-dialog-min-width: ${dialogWidth}px`,
      `--mdc-dialog-max-width: ${dialogWidth}px`,
    ].join(";");

    return html`
      <ha-adaptive-dialog
        .open=${true}
        width="small"
        style=${dialogWidthStyle}
        @closed=${() => this._closeActiveEntitiesDialog()}
      >
        <ha-icon-button
          slot="headerNavigationIcon"
          .label=${this.hass?.localize?.("ui.common.close")}
          @click=${() => this._closeActiveEntitiesDialog()}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
        <span slot="headerTitle">${this._t("Active entities")}</span>
        ${groupControl
          ? html`
              <ha-button
                slot="headerActionItems"
                appearance="filled"
                @click=${() => this._callActiveEntityService(
                  groupControl,
                  controllable.map((entry) => entry.stateObj.entity_id)
                )}
              >
                <ha-icon slot="start" .icon=${groupControl.icon}></ha-icon>
                ${groupServiceName}
                (${controllable.length})
              </ha-button>
            `
          : ""}

        <div class="active-entities-dialog-content">
          ${controls.length
            ? controls.map(({ stateObj, name, control, serviceName }) => html`
                <div
                  class="active-entity-row"
                >
                  ${control
                    ? html`
                        <button
                          type="button"
                          class="active-entity-control-button"
                          aria-label=${serviceName}
                          title=${serviceName}
                          @click=${(event) => {
                            event.stopPropagation();
                            this._callActiveEntityService(
                              control,
                              [stateObj.entity_id]
                            );
                          }}
                        >
                          <ha-state-icon
                            .hass=${this.hass}
                            .stateObj=${stateObj}
                            style=${getActiveEntityIconStyle(stateObj)}
                          ></ha-state-icon>
                        </button>
                      `
                    : html`
                        <ha-state-icon
                          .hass=${this.hass}
                          .stateObj=${stateObj}
                          style=${getActiveEntityIconStyle(stateObj)}
                        ></ha-state-icon>
                      `}
                  <button
                    type="button"
                    class="active-entity-info"
                    @click=${() => this._showEntityMoreInfo(stateObj.entity_id)}
                  >
                    <span class="active-entity-name">
                      ${name}
                    </span>
                    <span class="active-entity-state-line">
                      <state-display
                        .hass=${this.hass}
                        .stateObj=${stateObj}
                      ></state-display>
                      <span aria-hidden="true">-</span>
                      <span>${formatActiveEntityDuration(
                        this.hass,
                        stateObj,
                        this._activeEntitiesDurationNow
                      )}</span>
                    </span>
                  </button>
                </div>
              `)
            : html`
                <div class="active-entities-empty">
                  ${this._t("No active entities")}
                </div>
              `}
        </div>
      </ha-adaptive-dialog>
    `;
  }

  _callActiveEntityService(control, entityIds) {
    if (!control || !entityIds.length) return;

    this.hass?.callService(control.domain, control.service, {
      entity_id: entityIds,
    });
  }

  _showEntityMoreInfo(entityId) {
    queueMicrotask(() => {
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          detail: { entityId },
          bubbles: true,
          composed: true,
        })
      );
    });
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
      ? computeFullColor(this._config.card_color)
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

    return html`${badge}${activeEntitiesDialog}`;
  }

  static styles = statusBadgeStyles;
}

function getStatusBadgeDefaultTapAction(config = {}) {
  const stateSource = getStatusBadgeStateSource(config);

  if (stateSource === "entity") return { action: "more-info" };
  if (stateSource === "area_count") return { action: "active-entities" };

  return { action: "none" };
}

function replaceTemplateNameItem(value, templatedName) {
  const replaceItem = (item) => item?.type === "template"
    ? { type: "text", text: templatedName }
    : item;

  return Array.isArray(value)
    ? value.map(replaceItem)
    : replaceItem(value);
}

registerOrbitBadge({
  tag: "orbit-status-badge",
  badgeClass: OrbitStatusBadge,
  name: "Orbit Status Badge",
  description: "Displays an entity, area count, or template state",
  version: CARD_VERSIONS.statusBadge,
});
