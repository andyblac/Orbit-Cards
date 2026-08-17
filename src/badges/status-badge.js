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

import "../editors/status-badge-editor.js";

class OrbitStatusBadge extends LitElement {
  static svgCache = sharedSvgCache;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _isHeadingBadge: { state: true },
    _templateRevision: { state: true },
  };

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

  connectedCallback() {
    super.connectedCallback();
    this._isHeadingBadge = Boolean(this.closest("hui-heading-badge"));
    this.toggleAttribute("heading-badge", this._isHeadingBadge);
    queueMicrotask(() => this._syncTemplateSubscriptions());
  }

  disconnectedCallback() {
    disconnectTemplateSubscriptions.call(this);
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
    const nameTemplate = this._config?.name_template?.trim() || "";
    const cardMode = this._config?.display_style === "card";
    const templates = stateSource === "template"
      ? cardMode
        ? [activeTemplate]
        : [template, activeTemplate, nameTemplate]
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
    if (stateSource === "entity") {
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
        stateObj.attributes?.device_class === deviceClass)
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
    const computedIsOn = stateSource === "template"
      ? getTemplateResultActiveState(
          activeTemplateResult ?? templateResult
        )
      : activeEntities.length > 0;
    const isOn = this._config?.display_style === "card" &&
        !this._config?.card_visibility
      ? true
      : computedIsOn;
    const selectedEntity = stateSource === "entity" ? entities[0] : undefined;
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
    const representativeStateObj = stateSource === "template"
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
    const defaultLabel = stateSource === "template"
      ? "Template"
      : entityLabel || areaName || deviceClassLabel || domainConfig.label;
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

    const defaultTapAction = getStatusBadgeStateSource(this._config) ===
      "entity"
      ? { action: "more-info" }
      : { action: "none" };

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
    const cardMode = ["card", "icon"].includes(
      this._config?.display_style
    );
    const cardImageStyle = cardMode
      ? "width:12px;height:12px;margin:0;"
      : "";
    const cardEntityPictureStyle = cardMode
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

  render() {
    const model = this._getModel();
    const actionEntity = model.activeEntities[0]?.entity_id ||
      model.entities[0]?.entity_id ||
      null;
    const tapAction = this._config?.tap_action ||
      (model.stateSource === "entity"
        ? { action: "more-info" }
        : { action: "none" });
    const hasAction = isActionEnabled(tapAction) ||
      isActionEnabled(this._config?.hold_action) ||
      isActionEnabled(this._config?.double_tap_action);
    const cardMode = ["card", "icon"].includes(
      this._config?.display_style
    );
    const cardVisibility = this._config?.card_visibility || "always";
    const showCardBadge = cardVisibility === "always" ||
      (["state", "template"].includes(cardVisibility) && model.isOn);
    const showState = !cardMode && this._config?.show_state !== false;
    const showName = !cardMode && this._config?.show_name === true;
    const showIcon = cardMode || this._config?.show_icon !== false;
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

    if (cardMode && !showCardBadge) return nothing;

    if (cardMode) {
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
      `;
    }

    return this._isHeadingBadge
      ? html`
          <ha-heading-badge
            .type=${hasAction ? "button" : "text"}
            style=${`--icon-color:${model.iconColor};`}
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
            .iconOnly=${cardMode || (!showState && !showName)}
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
      width: 16px;
      height: 16px;
    }

    :host([heading-badge]) .entity-picture {
      width: 16px;
      height: 16px;
      border-radius: var(--ha-border-radius-circle);
      object-fit: cover;
    }

    .image-icon svg {
      display: block;
      width: 100%;
      height: 100%;
    }

    .template-state {
      white-space: pre-line;
    }
  `;
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
