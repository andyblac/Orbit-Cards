// ==============================
// orbit-room-card.js
// SAFE CURVE BUTTON VERSION
// ==============================

import { LitElement, html, css } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { repeat } from "lit/directives/repeat.js";

import { VERSION } from './var/version.js';
import "./oribit-room-card-editor.js";

class OrbitRoomCard extends LitElement {
  static svgCache = {};

  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _roomName: { type: String },
      _statusText: { type: String },
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
      room_color: "blue",
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

    this._roomColor = this._computeFullColor(config.room_color);
    this._statusColor = this._computeFullColor(config.status_color || config.room_color);
    this._iconColor = this._computeIconColor(config.room_color);
    this._circleColor = this._computeCircleColor(config.room_color);
  }
  
  // =========================
  // LIGHT COLOR (OPT-IN)
  // =========================

  _getMainIconColor(stateObj, isOn) {
    const roomColor = this._config.room_color || "theme";

    if (!isOn) {
      return this._computeIconColor(roomColor);
    }

    if (roomColor === "light") {
      return (
        this._getEntityColor(stateObj) ||
        this._computeFullColor("theme")
      );
    }

    return this._computeFullColor(roomColor);
  }

  _getEntityColor(stateObj) {
    if (!stateObj) return null;

    const domain = stateObj.entity_id?.split(".")[0];
    const attrs = stateObj.attributes || {};

    if (domain === "light") {
      if (Array.isArray(attrs.rgb_color)) {
        const [r, g, b] = attrs.rgb_color;
        return `rgb(${r}, ${g}, ${b})`;
      }

      if (Array.isArray(attrs.hs_color)) {
        const [h, s] = attrs.hs_color;
        return `hsl(${h}, ${s}%, 50%)`;
      }
    }

    return null;
  }

  // =========================
  // TAP-ACTION
  // =========================

  _handleAction(actionConfig, entityId = null) {
    if (!actionConfig || !this.hass) return;

    const action = actionConfig.action || "toggle";

    switch (action) {
      case "toggle": {
        if (!entityId) return;

        const domain = entityId.split(".")[0];

        this.hass.callService(domain, "toggle", {
          entity_id: entityId,
        });

        break;
      }

      case "more-info": {
        this.dispatchEvent(
          new CustomEvent("hass-more-info", {
            detail: {
              entityId,
            },
            bubbles: true,
            composed: true,
          })
        );

        break;
      }

      case "navigate": {
        if (!actionConfig.navigation_path) return;

        history.pushState(
          null,
          "",
          actionConfig.navigation_path
        );

        window.dispatchEvent(
          new CustomEvent("location-changed", {
            detail: { replace: false },
          })
        );

        break;
      }

      case "call-service": {
        const [domain, service] =
          (actionConfig.service || "").split(".");

        if (!domain || !service) return;

        this.hass.callService(
          domain,
          service,
          actionConfig.service_data || {}
        );

        break;
      }

      case "none":
      default:
        break;
    }
  }

  _computeFullColor(colorInput) {
    if (!colorInput) return "rgb(var(--color-theme))";

    const color = colorInput.toString().trim();

    if (color.startsWith("rgb") || color.startsWith("#")) {
      return color;
    }

    return `rgb(var(--color-${color}))`;
  }

  _computeIconColor(colorInput) {
    if (!colorInput) return "rgba(var(--color-theme), 0.7)";

    const color = colorInput.toString().trim();

    if (color.startsWith("rgb") || color.startsWith("#")) {
      return `color-mix(in srgb, transparent, ${color} 70%)`;
    }

    return `rgba(var(--color-${color}), 0.7)`;
  }

  _computeCircleColor(colorInput) {
    if (!colorInput) return "rgba(var(--color-theme), 0.2)";

    const color = colorInput.toString().trim();

    if (color.startsWith("rgb") || color.startsWith("#")) {
      return `color-mix(in srgb, transparent, ${color} 20%)`;
    }

    if (color === "theme") {
      return `rgba(var(--color-theme), 0.05)`;
    }

    return `rgba(var(--color-${color}), 0.2)`;
  }

  _computeButtonBackground(colorInput) {
    if (!colorInput) return "rgba(var(--color-theme), 0.25)";

    const color = colorInput.toString().trim();

    if (color.startsWith("rgb") || color.startsWith("#")) {
      return `color-mix(in srgb, ${color} 25%, transparent)`;
    }

    return `rgba(var(--color-${color}), 0.25)`;
  }

  _getRoomName() {
    const areaId = this._config.area;

    if (this._config.room_name) return this._config.room_name;

    if (areaId && this.hass?.areas?.[areaId]) {
      return this.hass.areas[areaId].name || "Room";
    }

    return "Room";
  }

  updated(changedProps) {
    if (!changedProps.has("_config") && !changedProps.has("hass")) return;

    this._roomName = this._getRoomName();

    const mainEntity = this._config.main_entity || this._config.entity;

    // =========================
    // MAIN ICON
    // =========================

    const areaId = this._config.area;

    const mainStateObj =
      mainEntity && this.hass
        ? this.hass.states[mainEntity]
        : null;

    const isOn =
      mainStateObj
        ? this._getEntityActiveState(mainStateObj)
        : false;

    this._iconColor = this._getMainIconColor(
      mainStateObj,
      isOn
    );

    // CUSTOM ICONS
    const customIcon =
      this._config.main_icon;

    const customIconOn =
      this._config.main_icon_on;

    const customIconOff =
      this._config.main_icon_off;

    // DEFAULT AUTO ICON
    let autoIcon = "mdi:sofa";

    // FIRST PRIORITY = ENTITY ICON
    if (mainStateObj) {

      autoIcon =
        mainStateObj.attributes?.icon ||
        this._getDefaultDomainIcon(
          mainStateObj.entity_id.split(".")[0],
          mainStateObj
        ) ||
        "mdi:sofa";

    // SECOND PRIORITY = AREA ICON
    } else if (
      areaId &&
      this.hass?.areas?.[areaId]
    ) {

      autoIcon =
        this.hass.areas[areaId].icon ||
        "mdi:sofa";
    }

    // FINAL ICON PRIORITY
    if (isOn) {

      this._icon =
        customIconOn ||
        customIcon ||
        autoIcon;

    } else {

      this._icon =
        customIconOff ||
        customIcon ||
        autoIcon;
    }

    const statusEntities = [
      this._config.status1,
      this._config.status2,
      this._config.status3,
    ].filter(Boolean);

    this._statusText = statusEntities
      .map((id) => this.hass?.states[id])
      .map((s) => (s ? this.formatState(s) : "—"))
      .join(" | ");
  }

  formatState(stateObj) {
    const unit = stateObj.attributes.unit_of_measurement || "";
    const value = stateObj.state;

    if (unit) return `${value}${unit}`;

    return value === "on" || value === "off"
      ? value.toUpperCase()
      : value;
  }

  _getButtonEntities() {
    return [
      this._config.button1,
      this._config.button2,
      this._config.button3,
      this._config.button4,
    ].filter(Boolean);
  }

  _toggleEntity(entityId, ev, actionConfig = null) {
    ev.stopPropagation();

    this._handleAction(
      actionConfig || {
        action: "toggle",
      },
      entityId
    );
  }

  _handleButtonClick(ev) {
    ev.stopPropagation();

    const entityId = ev.currentTarget.dataEntity;
    const action = ev.currentTarget.dataAction;

    this._handleAction(action, entityId);
  }

  _handleCurveButtonClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    }

    const entityId = ev.currentTarget.dataEntity;
    const action = ev.currentTarget.dataAction;

    this._handleAction(action, entityId);
  }

  _renderButton(entityId, index) {
    const stateObj = this.hass?.states[entityId];

    if (!stateObj) return null;

    const stateTemplate =
      this._config?.[`button${index + 1}_state_template`];

    const evaluatedState =
      this._evaluateStateTemplate(
        stateTemplate,
        entityId
      );

    const isOn =
      evaluatedState === null || evaluatedState === undefined
        ? this._getEntityActiveState(stateObj)
        : evaluatedState === true ||
          evaluatedState === "on";
    
    const customIcon =
      this._config?.[`button${index + 1}_icon`];

    const customIconOn =
      this._config?.[`button${index + 1}_icon_on`];

    const customIconOff =
      this._config?.[`button${index + 1}_icon_off`];

    const domain = entityId.split(".")[0];

    let icon;

    const defaultIcon =
      this._getDefaultDomainIcon(domain, stateObj);

    const entityIcon =
      stateObj?.attributes?.icon ||
      this.hass?.entities?.[entityId]?.icon;

    if (isOn) {
      icon =
        customIconOn ||
        customIcon ||
        entityIcon ||
        defaultIcon ||
        "mdi:help-circle";
    } else {
      icon =
        customIconOff ||
        customIcon ||
        entityIcon ||
        defaultIcon ||
        "mdi:help-circle";
    }

    const onColor =
      this._config[`button${index + 1}_on_color`] || "theme";

    const offColor =
      this._config[`button${index + 1}_off_color`] || "theme";

    const tapAction =
      this._config[`button${index + 1}_tap_action`] || {
        action: "toggle",
      };
    let bgColor;
    let iconColor;

    if (isOn) {
      let resolvedOnColor = onColor;

      if (onColor === "light") {
        const entityAutoColor = this._getEntityColor(stateObj);

        resolvedOnColor =
          entityAutoColor ||
          this._config.room_color ||
          "theme";
      }

      bgColor = this._computeButtonBackground(resolvedOnColor);
      iconColor = this._computeFullColor(resolvedOnColor);
    } else {
      if (offColor.startsWith("rgba(")) {
        iconColor = offColor;
      } else if (offColor.startsWith("rgb(") || offColor.startsWith("#")) {
        iconColor = `color-mix(in srgb, transparent, ${offColor} 80%)`;
      } else {
        iconColor = `rgba(var(--color-${offColor}),0.2)`;
      }

      if (offColor.startsWith("rgb(") || offColor.startsWith("#")) {
        bgColor = `color-mix(in srgb, transparent, ${offColor} 90%)`;
      } else if (!offColor || offColor === "theme") {
        bgColor = `rgba(var(--color-theme),0.05)`;
      } else {
        bgColor = `rgba(var(--color-${offColor}),0.1)`;
      }
    }

    const isImage = this._isImageIcon(icon);

    const iconPath = isImage
      ? this._resolveIconPath(icon)
      : "";
    
    return html`
      <button
        class="entity-button"
        style="background:${bgColor};"
        @click=${this._handleButtonClick}
        .dataEntity=${entityId}
        .dataAction=${tapAction}
      >
        ${isImage
          ? html`
              <div
                class="button-image-icon"
                style="color:${iconColor};"
              >
                ${iconPath
                  ? unsafeHTML(this._getInlineSvg(iconPath))
                  : ""}
              </div>
            `
          : html`
              <ha-icon
                .icon=${icon}
                style="color:${iconColor};"
              ></ha-icon>
            `}
      </button>
    `;
  }

  // =========================
  // BINARY SENSOR ICONS
  // =========================

  _getBinarySensorIcon(stateObj) {
    if (!stateObj) return null;

    const deviceClass = stateObj.attributes.device_class;
    const isOn = stateObj.state === "on";

    switch (deviceClass) {

      // =========================
      // DOORS / WINDOWS
      // =========================

      case "door":
        return isOn
          ? "mdi:door-open"
          : "mdi:door-closed";

      case "window":
        return isOn
          ? "mdi:window-open"
          : "mdi:window-closed";

      case "garage_door":
        return isOn
          ? "mdi:garage-open"
          : "mdi:garage";

      case "opening":
        return isOn
          ? "mdi:square-outline"
          : "mdi:square";

      // =========================
      // MOTION / PRESENCE
      // =========================

      case "motion":
      case "occupancy":
        return isOn
          ? "mdi:motion-sensor"
          : "mdi:motion-sensor-off";
            
      case "presence":
        return isOn
          ? "mdi:account"
          : "mdi:account-off";

      // =========================
      // SAFETY
      // =========================

      case "smoke":
        return isOn
          ? "mdi:smoke-detector-alert"
          : "mdi:smoke-detector";

      case "moisture":
        return isOn
          ? "mdi:water-alert"
          : "mdi:water-off";

      case "gas":
        return isOn
          ? "mdi:gas-cylinder"
          : "mdi:gas-cylinder-off";

      case "problem":
        return isOn
          ? "mdi:alert-circle"
          : "mdi:check-circle";

      // =========================
      // POWER
      // =========================

      case "power":
        return isOn
          ? "mdi:flash"
          : "mdi:flash-off";

      case "plug":
        return isOn
          ? "mdi:power-plug"
          : "mdi:power-plug-off";

      case "battery":
        return isOn
          ? "mdi:battery-alert"
          : "mdi:battery";

      // =========================
      // CONNECTIVITY
      // =========================

      case "connectivity":
        return isOn
          ? "mdi:wifi"
          : "mdi:wifi-off";

      // =========================
      // LOCKS
      // =========================

      case "lock":
        return isOn
          ? "mdi:lock-open"
          : "mdi:lock";

      // =========================
      // LIGHT
      // =========================

      case "light":
        return isOn
          ? "mdi:lightbulb-on"
          : "mdi:lightbulb-off";

      // =========================
      // DEFAULT
      // =========================

      default:
        return isOn
          ? "mdi:check-circle"
          : "mdi:circle-outline";
    }
  }

  // =========================
  // DEFAULT DOMAIN ICONS
  // =========================

  _getDefaultDomainIcon(domain, stateObj = null) {
    const isOn = stateObj
      ? this._getEntityActiveState(stateObj)
      : false;

    switch (domain) {
      case "light":
        return isOn
          ? "mdi:lightbulb-on"
          : "mdi:lightbulb-off";

      case "switch":
        return stateObj?.attributes?.device_class === "outlet"
          ? isOn
            ? "mdi:power-plug"
            : "mdi:power-plug-off"
          : isOn
            ? "mdi:toggle-switch-variant"
            : "mdi:toggle-switch-variant-off";

      case "fan":
        return isOn
          ? "mdi:fan"
          : "mdi:fan-off";

      case "cover":
        return isOn
          ? "mdi:blinds-open"
          : "mdi:blinds";

      case "binary_sensor":
        return this._getBinarySensorIcon(stateObj);

      case "climate":
        return "mdi:thermostat";

      case "media_player":
        return "mdi:play-box-multiple";

      case "sensor":
        return "mdi:gauge";

      case "person":
        return "mdi:account";

      case "camera":
        return "mdi:cctv";

      case "vacuum":
        return "mdi:robot-vacuum";

      default:
        return "mdi:help-circle";
    }
  }

  _getEntityActiveState(stateObj) {
    if (!stateObj) return false;

    const domain = stateObj.entity_id.split(".")[0];
    const state = stateObj.state;

    switch (domain) {
      case "cover":
        return ["open", "opening"].includes(state);

      case "lock":
        return state === "unlocked";

      case "person":
        return state === "home";

      case "device_tracker":
        return state !== "not_home";

      case "climate":
        return state !== "off";

      case "media_player":
        return ![
          "off",
          "idle",
          "standby",
          "unavailable",
        ].includes(state);

      case "vacuum":
        return ![
          "docked",
          "idle",
          "off",
        ].includes(state);

      case "alarm_control_panel":
        return state !== "disarmed";

      case "sun":
        return state === "above_horizon";

      default:
        return state === "on";
    }
  }
  

  // =========================
  // TEMPLATE HELPERS
  // =========================

  _evaluateStateTemplate(template, entityId) {
    if (!template || !this.hass) return null;

    try {
      const fn = new Function(
        "states",
        "entity",
        `
        return (${template});
        `
      );

      return fn(
        this.hass.states,
        this.hass.states[entityId]
      );
    } catch (err) {
      console.error(
        "State template error:",
        err
      );

      return null;
    }
  }

  // =========================
  // CUSTOM ICON HELPERS
  // =========================

  _getCurveButtonConfig(index) {
    return this._config?.[`curve_button${index + 1}_icon`] || null;
  }

  _isImageIcon(icon) {
    if (!icon) return false;

    const cleanIcon = icon.split("?")[0].toLowerCase();

    return (
      cleanIcon.endsWith(".svg") ||
      cleanIcon.endsWith(".png") ||
      cleanIcon.endsWith(".webp") ||
      cleanIcon.endsWith(".gif")
    );
  }

  _resolveIconPath(iconPath) {
    if (!iconPath) return "";

    // Already absolute
    if (
      iconPath.startsWith("http") ||
      iconPath.startsWith("/")
    ) {
      return iconPath;
    }

    // Custom card icons folder
    return `/local/icons/${iconPath}`;
  }

  _getInlineSvg(path) {
    if (!path) return "";

    const cached = OrbitRoomCard.svgCache[path];

    // Already loaded SVG
    if (
      typeof cached === "string" &&
      cached !== "loading"
    ) {
      return cached;
    }

    // Already loading
    if (cached === "loading") {
      return "";
    }

    // START LOADING
    OrbitRoomCard.svgCache[path] = "loading";

    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return response.text();
      })
      .then((svg) => {

        // CLEAN SVG
        svg = svg
          .replace(
            /fill="(?!none)[^"]*"/gi,
            'fill="currentColor"'
          )
          .replace(
            /stroke="(?!none)[^"]*"/gi,
            'stroke="currentColor"'
          )
          .replace(/width="[^"]*"/gi, 'width="100%"')
          .replace(/height="[^"]*"/gi, 'height="100%"');

        OrbitRoomCard.svgCache[path] = svg;

        requestAnimationFrame(() => {
          this.requestUpdate();
        });
      })
      .catch((err) => {

        console.error("SVG load failed:", path, err);

        // SAVE EMPTY RESULT
        OrbitRoomCard.svgCache[path] = "";

        requestAnimationFrame(() => {
          this.requestUpdate();
        });
      });

    return "";
  }

  // =========================
  // CURVE BUTTONS
  // =========================

  _renderCurveButtons() {

    // NEW GLOBAL OPTION
    const lockPositions =
      this._config?.curve_buttons_lock_position ?? false;

    // KEEP ALL 6 SLOTS
    const curveButtons = [
      this._config.curve_button1,
      this._config.curve_button2,
      this._config.curve_button3,
      this._config.curve_button4,
      this._config.curve_button5,
      this._config.curve_button6,
    ];

    return html`
      <div class="curve-buttons">

        ${repeat(
          curveButtons,
          (_, index) => index,
          (entityId, index) => {

          // DYNAMIC POSITIONING
          const visualIndex = lockPositions
            ? index
            : curveButtons
                .filter(Boolean)
                .indexOf(entityId);

          // NORMAL MODE (OLD BEHAVIOUR)
          if (!lockPositions && !entityId) {
            return null;
          }

          // LOCK MODE
          // preserve empty slots
          if (lockPositions && !entityId) {
            return html`
              <div class="curve-button pos-${index}"></div>
            `;
          }

          const stateObj = this.hass?.states[entityId];

          if (!stateObj) return null;

          const stateTemplate =
            this._config?.[`curve_button${index + 1}_state_template`];

          const evaluatedState =
            this._evaluateStateTemplate(
              stateTemplate,
              entityId
            );

          const isOn =
            evaluatedState === null || evaluatedState === undefined
              ? this._getEntityActiveState(stateObj)
              : evaluatedState === true ||
                evaluatedState === "on";

          const customIcon =
            this._config?.[`curve_button${index + 1}_icon`];

          const customIconOn =
            this._config?.[`curve_button${index + 1}_icon_on`];

          const customIconOff =
            this._config?.[`curve_button${index + 1}_icon_off`];

          const domain = entityId.split(".")[0];

          const binaryIcon =
            domain === "binary_sensor"
              ? this._getBinarySensorIcon(stateObj)
              : null;

          let icon;

          const defaultIcon =
            this._getDefaultDomainIcon(domain, stateObj);

          const entityIcon =
            stateObj?.attributes?.icon ||
            this.hass?.entities?.[entityId]?.icon;

          if (isOn) {
            icon =
              customIconOn ||
              customIcon ||
              entityIcon ||
              defaultIcon ||
              "mdi:help-circle";
          } else {
            icon =
              customIconOff ||
              customIcon ||
              entityIcon ||
              defaultIcon ||
              "mdi:help-circle";
          }

          const roomColor = this._config.room_color || "theme";

          const tapAction =
            this._config?.[`curve_button${index + 1}_tap_action`] ?? {
              action: "more-info",
            };

          let iconColor;

          if (roomColor === "theme") {
            iconColor = isOn
              ? "rgba(var(--color-theme),0.7)"
              : "rgba(var(--color-theme),0.2)";
          } else if (
            roomColor.startsWith("rgb") ||
            roomColor.startsWith("#")
          ) {
            iconColor = isOn
              ? roomColor
              : `color-mix(in srgb, ${roomColor} 40%, transparent)`;
          } else {
            iconColor = isOn
              ? `rgba(var(--color-${roomColor}),1)`
              : `rgba(var(--color-${roomColor}),0.4)`;
          }

          const isImage = this._isImageIcon(icon);

          const iconPath = isImage
            ? this._resolveIconPath(icon)
            : "";

          return html`
            <button
              class="curve-button pos-${visualIndex}"
                @click=${this._handleCurveButtonClick}
                .dataEntity=${entityId}
                .dataAction=${tapAction}
            >
              ${isImage
                ? html`
                    <div
                      class="curve-image-icon"
                      style="color:${iconColor};"
                    >
                      ${unsafeHTML(this._getInlineSvg(iconPath))}
                    </div>
                  `
                : html`
                    <ha-icon
                      .icon=${icon}
                      style="color:${iconColor};"
                    ></ha-icon>
                  `}
            </button>
          `;
        }
      )}

      </div>
    `;
  }

  _handleTap(ev) {

    // Ignore clicks coming from circle area
    const path = ev.composedPath();

    const clickedInsideCircle = path.some(
      (el) =>
        el?.classList &&
        el.classList.contains("circle")
    );

    if (clickedInsideCircle) {
      return;
    }

    ev.stopPropagation();

    const navigate = this._config.navigate || {
      navigation_path: "/lovelace/home",
    };

    if (!navigate.navigation_path) return;

    history.pushState(
      null,
      "",
      navigate.navigation_path
    );

    window.dispatchEvent(
      new CustomEvent("location-changed", {
        detail: { replace: false },
      })
    );
  }

  _handleMainEntityTap(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    }

    const mainEntity =
      this._config.main_entity || this._config.entity;

    // ENTITY ACTION
    if (mainEntity) {
      const tapAction = this._config.tap_action || {
        action: "more-info",
      };

      this._handleAction(
        tapAction,
        mainEntity
      );

      return;
    }

    // FALLBACK NAVIGATION
    const navigate = this._config.navigate || {
      navigation_path: "/lovelace/home",
    };

    if (!navigate.navigation_path) return;

    history.pushState(
      null,
      "",
      navigate.navigation_path
    );

    window.dispatchEvent(
      new CustomEvent("location-changed", {
        detail: { replace: false },
      })
    );
  }

  render() {
    const buttons = this._getButtonEntities();

    return html`
      <ha-card tabindex="0" @click=${this._handleTap}>
        <div class="container">
          <div class="content">

            <div class="header ${buttons.length >= 3 ? "compressed" : ""}">
              <div class="room-name" style="color:${this._roomColor}">
                ${this._roomName}
              </div>

              <div class="status" style="color:${this._statusColor}">
                ${this._statusText || ""}
              </div>
            </div>

            ${buttons.length
              ? html`
                  <div class="button-column" style="--button-count:${buttons.length}">
                    ${buttons.map((id, i) => this._renderButton(id, i))}
                  </div>
                `
              : ""}

          </div>

          <div
            class="circle"
            style="background:${this._circleColor}"
            @click=${(ev) => this._handleMainEntityTap(ev)}
          >

            ${this._renderCurveButtons()}

            ${this._isImageIcon(this._icon)
              ? html`
                  <div
                    class="main-image-icon"
                    style="color:${this._iconColor};"
                  >
                    ${unsafeHTML(
                      this._getInlineSvg(
                        this._resolveIconPath(this._icon)
                      )
                    )}
                  </div>
                `
              : html`
                  <ha-icon
                    class="main-icon"
                    .icon=${this._icon}
                    style="color:${this._iconColor}"
                  ></ha-icon>
                `}

          </div>

        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        background: var(--card-background-color, #1a1a1a);
        border-radius: 24px;
        overflow: hidden;
        aspect-ratio: 1 / 1;
        position: relative;
        cursor: pointer;
        transition: transform 0.2s ease;
        container-type: size;
      }

      ha-card:active { transform: scale(0.98); }

      .container {
        --button-area-width: clamp(46px, 23.5cqw, 210px);
        padding: clamp(14px, 2cqw, 24px);
        height: 100%;
        box-sizing: border-box;
        position: relative;
      }

      .content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .header {
        width: 100%;
      }

      .header.compressed {
        width: calc(100% - (var(--button-area-width) - 5px));
      }

      /* EXTRA STATUS SPACE FOR 4 BUTTONS */
      .button-column[style*="--button-count:4"] ~ .header.compressed {
        width: calc(100% - (var(--button-area-width) - 18px));
      }

      .room-name {
        font-size: clamp(18px, 9cqw, 34px);
        font-weight: bold;
        line-height: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .status {
        font-size: clamp(14px, 6.7cqw, 26px);
        font-weight: bold;
        opacity: 0.4;
        line-height: 1.1;
        margin-top: clamp(6px, 1.8cqw, 28px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .button-column {
        position: absolute;
        right: -2cqw;
        top: 0;
        bottom: -2cqw;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: var(--button-area-width);
      }

      .button-column[style*="--button-count:1"] { justify-content:center; }

      .button-column[style*="--button-count:2"] {
        justify-content: space-between;
        padding-top: 35%;
      }

      .button-column[style*="--button-count:3"],
      .button-column[style*="--button-count:4"] {
        justify-content: space-between;
      }

      .entity-button {
        width: min(
          clamp(44px, 26cqw, 250px),
          calc(
            (100cqh - (var(--button-count, 4) - 1) * clamp(10px, 2cqw, 22px)) /
            var(--button-count, 4)
          )
        );

        aspect-ratio: 1 / 1;
        border: none;
        border-radius: 50%;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
        transition: transform 0.2s ease, background 0.2s ease;
      }

      .entity-button:hover { transform: scale(1.05); }
      .entity-button:active { transform: scale(0.95); }

      .entity-button ha-icon { --mdc-icon-size: 54%; }

      .button-image-icon {
        width: 54%;
        height: 54%;

        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: none;
        user-select: none;
      }

      .button-image-icon svg,
      .curve-image-icon svg {
        width: 100%;
        height: 100%;
      }

      .circle {
        position: absolute;

        bottom: -12%;
        left: -12%;

        width: 75%;
        aspect-ratio: 1 / 1;

        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        overflow: visible;
        pointer-events: auto;
        z-index: 3;
      }

      .main-icon {
        --mdc-icon-size: 45%;

        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
      }

      .main-image-icon {
        width: 45%;
        height: 45%;

        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: none;
        user-select: none;
      }

      .main-image-icon svg {
        width: 100%;
        height: 100%;
      }
      
      /* =========================
      CURVE BUTTONS
      ========================= */

      .curve-button ha-icon {
        width: clamp(24px, 13cqw, 78px);
        height: clamp(24px, 13cqw, 78px);

        --mdc-icon-size: 100%;
      }

      .curve-buttons {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 4;
      }

      .curve-button {
        position: absolute;

        width: 22%;

        border: none;
        outline: none;

        padding: 0;
        margin: 0;

        background: transparent !important;
        box-shadow: none !important;

        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: auto;
        cursor: pointer;

        z-index: 5;

        transition: transform 0.2s ease;
      }

      .curve-image-icon {
        width: clamp(24px, 13cqw, 78px);
        height: clamp(24px, 13cqw, 78px);

        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: none;
        user-select: none;
      }
      
      .curve-button:hover {
        transform: scale(1.12);
      }

      .curve-button:active {
        transform: scale(0.92);
      }

      .curve-button.pos-0 {
        top: 7%;
        left: 17%;
      }

      .curve-button.pos-1 {
        top: 2%;
        left: 37%;
      }

      .curve-button.pos-2 {
        top: 6%;
        right: 20%;
      }

      .curve-button.pos-3 {
        top: 22%;
        right: 4%;
      }

      .curve-button.pos-4 {
        bottom:38%;
        right:0%;
      }

      .curve-button.pos-5 {
        bottom: 16%;
        right: 7%;
      }
    `;
  }
}

customElements.define("orbit-room-card", OrbitRoomCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "orbit-room-card",
  name: "Orbit Room Card",
  description: "Responsive room card",
  preview: true,
  version: VERSION,
});
console.info(
  `%c ORBIT-ROOM-CARD %c Version ${VERSION}`,
  "color: orange; font-weight: bold; background: black;",
  "color: white; font-weight: bold; background: dimgray;"
);