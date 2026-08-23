import { LitElement, css, html, nothing } from "lit";
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
  getEntityColor,
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
  getNativeEntityBadgeColor,
  shouldHideStatusBadgeEntity,
  getStatusBadgeDomainConfig,
  getStatusBadgeStateSource,
  normalizeStatusBadgeColors,
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
  }

  static getConfigElement() {
    return document.createElement("orbit-status-badge-editor");
  }

  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    validateStatusBadgeConfig(config || {});
    this._config = normalizeStatusBadgeColors(config || {});
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

    return Object.values(this.hass.states || {}).filter((stateObj) =>
      stateObj.entity_id.startsWith(`${domain}.`) &&
      getEntityAreaId(this.hass, stateObj.entity_id) === areaId &&
      (!domainConfig.requiresDeviceClass ||
        getActiveEntityDeviceClass(this.hass, stateObj, domain) ===
          deviceClass) &&
      !shouldHideStatusBadgeEntity(
        this.hass,
        stateObj.entity_id,
        this._config
      )
    );
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
      .map((stateObj) => ({
        stateObj,
        name: getActiveEntityName(this.hass, stateObj),
        control: getActiveEntityControl(this.hass, stateObj),
      }))
      .sort((a, b) => compareActiveEntityNames(nameCollator, a, b));
    const controllable = controls.filter((entry) => entry.control);
    const groupControl = getActiveEntityGroupControl(controllable);
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
                ${getActiveEntityServiceName(this.hass, groupControl)}
                (${controllable.length})
              </ha-button>
            `
          : ""}

        <div class="active-entities-dialog-content">
          ${controls.length
            ? controls.map(({ stateObj, name, control }) => html`
                <div
                  class="active-entity-row"
                >
                  ${control
                    ? html`
                        <button
                          type="button"
                          class="active-entity-control-button"
                          aria-label=${getActiveEntityServiceName(
                            this.hass,
                            control
                          )}
                          title=${getActiveEntityServiceName(
                            this.hass,
                            control
                          )}
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

  static styles = css`
    .card-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      width: 16px;
      height: 16px;
      border-radius: var(--ha-border-radius-md);
      background-color: var(--tile-badge-background-color);
      transition: background-color 280ms ease-in-out;
      box-sizing: border-box;
      user-select: none;
    }

    .card-badge[role="button"] {
      cursor: pointer;
    }

    .card-badge:focus-visible {
      outline: 2px solid var(--tile-badge-background-color);
      outline-offset: 2px;
    }

    .card-badge > * {
      color: var(--tile-badge-icon-color);
    }

    .card-badge .image-icon {
      width: 12px;
      height: 12px;
      color: var(--tile-badge-icon-color);
    }

    .image-icon {
      width: var(--ha-badge-icon-size, 18px);
      height: var(--ha-badge-icon-size, 18px);
      display: block;
      line-height: 0;
      color: var(--icon-color, var(--badge-color));
    }

    :host([heading-badge]) .image-icon {
      width: 18px;
      height: 18px;
    }

    :host([heading-badge]) .entity-picture {
      width: 18px;
      height: 18px;
      border-radius: var(--ha-border-radius-circle);
      object-fit: cover;
    }

    :host([heading-badge]) ha-state-icon {
      --mdc-icon-size: 18px;
    }

    .image-icon svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .template-state {
      white-space: pre-line;
    }

    ha-adaptive-dialog {
      --ha-dialog-min-height: auto;
      --ha-bottom-sheet-height: auto;
    }

    .active-entities-dialog-content {
      min-width: 0;
      padding: 0 var(--ha-space-4, 16px);
    }

    .active-entity-row {
      display: flex;
      align-items: center;
      gap: var(--ha-space-3, 12px);
      min-height: 56px;
      padding: var(--ha-space-2, 8px) 0;
      border-top: 1px solid var(--divider-color);
    }

    .active-entity-row > ha-state-icon {
      flex: 0 0 auto;
      margin: 12px;
    }

    .active-entity-row ha-state-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      line-height: 0;
      --mdc-icon-size: 36px;
    }

    .active-entity-control-button {
      display: grid;
      flex: 0 0 auto;
      width: 48px;
      height: 48px;
      padding: 0;
      place-items: center;
      border: 0;
      border-radius: 50%;
      outline: 0;
      background: transparent;
      color: inherit;
      cursor: pointer;
    }

    .active-entity-control-button ha-state-icon {
      pointer-events: none;
    }

    .active-entity-control-button:focus-visible,
    .active-entity-control-button:hover {
      background: var(--secondary-background-color);
    }

    .active-entity-info {
      display: flex;
      flex: 1 1 auto;
      min-width: 0;
      flex-direction: column;
      gap: 2px;
      padding: var(--ha-space-2, 8px) 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: start;
      cursor: pointer;
    }

    .active-entity-info:focus-visible {
      border-radius: var(--ha-border-radius-md);
      background: var(--secondary-background-color);
    }

    .active-entity-name {
      overflow: hidden;
      color: var(--primary-text-color);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .active-entity-state-line {
      display: flex;
      align-items: baseline;
      gap: 5px;
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s, 12px);
    }

    .active-entity-state-line state-display {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s, 12px);
    }

    .active-entities-empty {
      padding: var(--ha-space-5, 20px) 0;
      color: var(--secondary-text-color);
      text-align: center;
    }
  `;
}

function getStatusBadgeDefaultTapAction(config = {}) {
  const stateSource = getStatusBadgeStateSource(config);

  if (stateSource === "entity") return { action: "more-info" };
  if (stateSource === "area_count") return { action: "active-entities" };

  return { action: "none" };
}

function getActiveEntityControl(hass, stateObj) {
  const domain = stateObj?.entity_id?.split(".")[0] || "";
  const controls = {
    light: {
      service: "turn_off",
      icon: "mdi:power",
    },
    switch: {
      service: "turn_off",
      icon: "mdi:power",
    },
    fan: {
      service: "turn_off",
      icon: "mdi:power",
    },
    cover: {
      service: "close_cover",
      icon: "mdi:window-shutter",
    },
    lock: {
      service: "lock",
      icon: "mdi:lock",
    },
    media_player: {
      service: "turn_off",
      icon: "mdi:power",
    },
    climate: {
      service: "turn_off",
      icon: "mdi:power",
    },
  };
  const control = controls[domain];

  if (!control) return null;
  if (domain === "cover" && !(stateObj.attributes?.supported_features & 2)) {
    return null;
  }
  if (domain === "lock" && !(stateObj.attributes?.supported_features & 1)) {
    return null;
  }
  if (
    hass?.services?.[domain] &&
    !hass.services[domain][control.service]
  ) {
    return null;
  }

  return { domain, ...control };
}

function getActiveEntityGroupControl(controllable) {
  if (controllable.length < 2) return null;

  const firstControl = controllable[0].control;
  return controllable.every(({ control }) =>
    control.domain === firstControl.domain &&
    control.service === firstControl.service
  )
    ? firstControl
    : null;
}

function getActiveEntityName(hass, stateObj) {
  const name = hass?.formatEntityName?.(stateObj) ||
    stateObj?.attributes?.friendly_name ||
    stateObj?.entity_id ||
    "";
  const areaId = getEntityAreaId(hass, stateObj?.entity_id);
  const areaName = hass?.areas?.[areaId]?.name?.trim();

  if (!areaName || name.length <= areaName.length) return name;

  const areaPrefix = new RegExp(
    `^${escapeRegExp(areaName)}(?:\\s*[-–—:|]\\s*|\\s+)`,
    "i"
  );

  return name.replace(areaPrefix, "").trim() || name;
}

function getActiveEntityDeviceClass(hass, stateObj, domain) {
  const registryEntry = hass?.entities?.[stateObj?.entity_id];

  return registryEntry?.device_class ||
    stateObj?.attributes?.device_class ||
    registryEntry?.original_device_class ||
    (domain === "switch" ? "switch" : "");
}

function getActiveEntityNameCollator(hass) {
  const locale = hass?.locale?.language || hass?.language;

  return new Intl.Collator(locale, {
    numeric: true,
    sensitivity: "base",
  });
}

function compareActiveEntityNames(collator, a, b) {
  return collator.compare(a.name, b.name) ||
    a.stateObj.entity_id.localeCompare(b.stateObj.entity_id);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getActiveEntitiesDialogWidth(controls, groupControl) {
  const longestNameLength = controls.reduce(
    (length, { name }) => Math.max(length, name.length),
    0
  );

  const contentWidth = 132 + (longestNameLength * 8);
  const headerWidth = groupControl ? 360 : 280;

  return Math.min(520, Math.max(headerWidth, contentWidth));
}

function formatActiveEntityDuration(hass, stateObj, now = Date.now()) {
  const changedAt = Date.parse(stateObj?.last_changed || "");

  if (!Number.isFinite(changedAt)) return "";

  const elapsed = Math.max(0, now - changedAt);
  let unit;
  let value;

  if (elapsed >= 86_400_000) {
    unit = "days";
    value = Math.round(elapsed / 86_400_000);
  } else if (elapsed >= 3_600_000) {
    unit = "hours";
    value = Math.round(elapsed / 3_600_000);
  } else {
    unit = "minutes";
    value = Math.max(1, Math.round(elapsed / 60_000));
  }

  const locale = String(
    hass?.locale?.language || hass?.language || "en"
  ).replace("_", "-");

  try {
    const formatted = new Intl.DurationFormat(locale, {
      style: "long",
    }).format({ [unit]: value });

    return locale.toLowerCase().startsWith("en")
      ? formatted.replace(
          /\b(days?|hours?|minutes?)\b/,
          (word) => word[0].toUpperCase() + word.slice(1)
        )
      : formatted;
  } catch (_err) {
    const singular = unit.slice(0, -1);
    const label = value === 1 ? singular : unit;

    return `${value} ${label[0].toUpperCase()}${label.slice(1)}`;
  }
}

function getActiveEntityServiceName(hass, control) {
  return hass?.services?.[control.domain]?.[control.service]?.name;
}

function getActiveEntityIconColor(stateObj) {
  return getEntityColor(stateObj) ||
    getNativeEntityBadgeColor(stateObj, true);
}

function getActiveEntityIconStyle(stateObj) {
  return [
    `color:${getActiveEntityIconColor(stateObj)}`,
    "--mdc-icon-size:36px",
  ].join(";");
}

function formatDeviceClass(deviceClass = "") {
  return deviceClass
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
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
