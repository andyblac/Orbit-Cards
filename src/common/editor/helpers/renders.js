import { html } from "lit";
import {
  hasThemeColorName,
  isHaStandardColorName,
} from "../../helpers/colors.js";

function t(editor, key, replacements) {
  return editor._t
    ? editor._t(key, replacements)
    : key;
}

function actionLabel(editor, action) {
  return (
    localizeHomeAssistantAction(editor?.hass, action) ||
    ACTION_LABELS[action] ||
    action
  );
}

function configFieldLabel(editor, key) {
  return (
    localizeHomeAssistantField(editor?.hass, key) ||
    key
  );
}

function localizeHomeAssistantAction(hass, action) {
  if (!hass?.localize || !action) return null;

  const actionVariants = [
    action,
    action.replaceAll("-", "_"),
  ];

  const candidates = actionVariants.flatMap((variant) => [
    `ui.panel.lovelace.editor.action-editor.actions.${variant}`,
    `ui.panel.lovelace.editor.card.generic.action.actions.${variant}`,
    `ui.panel.lovelace.editor.card.generic.action.${variant}`,
    `ui.panel.lovelace.editor.card.config.action.actions.${variant}`,
    `ui.panel.lovelace.editor.card.config.action.${variant}`,
    `ui.components.action-input.editor.action.${variant}`,
  ]);

  for (const key of candidates) {
    const value = hass.localize(key);

    if (value && value !== key && value !== action) return value;
  }

  return null;
}

const ACTION_LABELS = {
  "call-service": "Perform action",
  "more-info": "More info",
  navigate: "Navigate",
  none: "Nothing",
  popup: "Popup",
  "perform-action": "Perform action",
  toggle: "Toggle",
  url: "URL",
};

function localizeHomeAssistantField(hass, key) {
  if (!hass?.localize || !key) return null;

  const candidates = HOME_ASSISTANT_FIELD_LABELS[key] || [];

  for (const candidate of candidates) {
    const value = hass.localize(candidate);

    if (value && value !== candidate) return value;
  }

  return null;
}

const HOME_ASSISTANT_FIELD_LABELS = {
  content: [
    "ui.panel.lovelace.editor.card.markdown.content",
  ],
  entity_id: [
    "ui.dialogs.entity_registry.editor.entity_id",
    "ui.panel.lovelace.unused_entities.entity_id",
  ],
  path: [
    "ui.panel.lovelace.editor.action-editor.navigation_path",
    "ui.panel.lovelace.editor.edit_view.path",
  ],
  service: [
    "ui.panel.developer-tools.tabs.actions.actions.call_service",
    "ui.panel.config.devices.type.service_heading",
  ],
  title: [
    "ui.panel.lovelace.editor.edit_lovelace.title",
    "ui.panel.lovelace.dashboards.picker.headers.title",
  ],
  url: [
    "ui.panel.lovelace.editor.action-editor.url_path",
  ],
};

/* ==========================================
 * COLLAPSE HELPERS
 * ========================================== */

export function renderSectionHeader(title, key) {
  return html`
    <div
      class="section-header"
      @click=${(e) => {
        e.preventDefault();
        e.stopPropagation();

        this._toggleSection(key);
      }}
    >
      <span>${t(this, title)}</span>

      <span class="collapse-icon">
        ${this._collapsed[key] ? "+" : "−"}
      </span>
    </div>
  `;
}

export function renderSubSectionHeader(title, key) {
  return html`
    <div
      class="sub-section-header"
      @click=${(e) => {
        e.preventDefault();
        e.stopPropagation();

        this._toggleSection(key);
      }}
    >
      <span>${t(this, title)}</span>

      <span class="collapse-icon">
        ${this._collapsed[key] ? "+" : "−"}
      </span>
    </div>
  `;
}

export function renderColor(label, key) {
  const value = this._config?.[key] || "";

  return renderColorControl.call(
    this,
    label,
    key,
    value,
    (nextValue) => this._handleConfigUpdate(key, nextValue)
  );
}

export function renderColorControl(
  label,
  pickerKey,
  value,
  onUpdate,
  previewValue = value
) {
  scheduleThemeColorWarmup.call(this);

  const defaultTab = getDefaultColorTab(value);
  const activeTab =
    this._colorPickerKey === pickerKey
      ? this._colorPickerTab || defaultTab
      : defaultTab;

  return html`
    <div class="field">
      <label>${t(this, label)}</label>

      <div class="color-row">
        <div
          class="color-popover"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="color-tabs">
            <button
              type="button"
              class=${activeTab === "picker" ? "active" : ""}
              @click=${() => {
                this._colorPickerKey = pickerKey;
                this._colorPickerTab = "picker";
                this._themeColorPickerOpen = false;
              }}
            >
              ${t(this, "Picker")}
              <input
                class="tab-color-picker"
                type="color"
                .value=${this._getColorPickerValue(previewValue)}
                @input=${(e) => onUpdate(e.target.value)}
                @change=${(e) => onUpdate(e.target.value)}
              />
            </button>
            <button
              type="button"
              class=${activeTab === "theme" ? "active" : ""}
              @click=${() => {
                this._colorPickerKey = pickerKey;
                this._colorPickerTab = "theme";
                this._themeColorPickerOpen = false;
                this._themeColorSearch = "";
              }}
            >
              ${t(this, "Theme")}
            </button>
          </div>

          ${activeTab === "theme"
            ? html`
                ${renderThemeColorPicker.call(
                  this,
                  value,
                  onUpdate
                )}
              `
            : html`
                <input
                  class="native-color-picker"
                  type="color"
                  .value=${this._getColorPickerValue(previewValue)}
                  @input=${(e) => onUpdate(e.target.value)}
                  @change=${(e) => onUpdate(e.target.value)}
                />
              `}
        </div>
      </div>
    </div>
  `;
}

function renderThemeColorPicker(value, onUpdate) {
  const selectedValue =
    getDefaultColorTab(value) === "theme"
      ? normalizeThemeColorValue(value) || "theme"
      : "";
  const items = getCachedThemeColorItems.call(this);

  return html`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .value=${selectedValue}
        .getItems=${() => items}
        .rowRenderer=${(item) =>
          renderThemeColorPickerRow.call(this, item)}
        .valueRenderer=${(itemValue) =>
          renderThemeColorPickerValue.call(
            this,
            items.find((item) => item.id === itemValue)
          )}
        .notFoundLabel=${t(this, "No matching colors")}
        .emptyLabel=${""}
        .noSort=${true}
        @value-changed=${(e) => {
          e.stopPropagation();
          onUpdate(e.detail.value || "");
        }}
      ></ha-generic-picker>
    </div>
  `;
}

function renderThemeColorPickerRow(item) {
  return html`
    <ha-combo-box-item type="button" compact>
      ${renderThemeColorPickerStart.call(this, item)}
      <span slot="headline">${item.primary}</span>
      ${renderThemeColorPickerBadge(item)}
    </ha-combo-box-item>
  `;
}

function renderThemeColorPickerValue(item) {
  if (!item) return "";

  return html`
    ${renderThemeColorPickerStart.call(this, item)}
    <span slot="headline">${item.primary}</span>
    ${renderThemeColorPickerBadge(item)}
  `;
}

function renderThemeColorPickerStart(item) {
  if (item.id === "theme") {
    return html`
      <ha-icon
        slot="start"
        class="theme-color-default-icon"
        icon="mdi:palette"
      ></ha-icon>
    `;
  }

  return html`
    <span
      slot="start"
      class="theme-color-swatch"
      style=${`
        ${this._getColorStyle(item.id)}
        display: block;
        width: 20px;
        height: 20px;
        border-radius: var(--ha-border-radius-pill, 999px);
        border: 1px solid var(--outline-color, var(--divider-color));
        box-sizing: border-box;
      `}
    ></span>
  `;
}

function renderThemeColorPickerBadge(item) {
  return item.isStandardFallback
    ? html`
        <span
          slot="end"
          class="theme-source-badge"
          aria-label="Standard"
          style="
            display: inline-flex;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            align-items: center;
            justify-content: center;
            background: var(--primary-color);
            color: var(--text-primary-color);
            font-size: 8px;
            font-weight: 800;
            line-height: 1;
          "
        >S</span>
      `
    : "";
}

function createThemeColorItems() {
  const items = [];
  const usedIds = new Set();

  for (const option of THEME_COLOR_OPTIONS) {
    const item = createThemeColorItem.call(this, option);

    if (!item || usedIds.has(item.id)) continue;

    usedIds.add(item.id);
    items.push(item);
  }

  return items;
}

function getCachedThemeColorItems() {
  const cacheKey = getThemeColorCacheKey.call(this);

  if (
    this._themeColorItemsCache &&
    this._themeColorItemsCacheKey === cacheKey
  ) {
    return this._themeColorItemsCache;
  }

  const items = createThemeColorItems.call(this);

  this._themeColorItemsCache = items;
  this._themeColorItemsCacheKey = cacheKey;

  return items;
}

function scheduleThemeColorWarmup() {
  const cacheKey = getThemeColorCacheKey.call(this);

  if (
    this._themeColorItemsCacheKey === cacheKey ||
    this._themeColorWarmupScheduled === cacheKey
  ) {
    return;
  }

  this._themeColorWarmupScheduled = cacheKey;

  const warmup = () => {
    if (this._themeColorWarmupScheduled !== cacheKey) return;

    getCachedThemeColorItems.call(this);
    this._themeColorWarmupScheduled = "";
  };

  if (window.requestIdleCallback) {
    window.requestIdleCallback(warmup, { timeout: 500 });
    return;
  }

  window.setTimeout(warmup, 0);
}

function getThemeColorCacheKey() {
  const language =
    this.hass?.locale?.language ||
    this.hass?.language ||
    "";
  const theme =
    this.hass?.selectedTheme?.theme ||
    this.hass?.themes?.theme ||
    "";
  const darkMode =
    this.hass?.themes?.darkMode ??
    this.hass?.selectedTheme?.dark ??
    "";

  return `${language}|${theme}|${darkMode}`;
}

function createThemeColorItem(option) {
  const originalConfig =
    typeof option === "string"
      ? { id: option }
      : option;
  const config = normalizeThemeColorConfig(originalConfig);
  const standard = isStandardThemeColor(config.id);
  const standardFallback = standard && isStandardFallbackColor(config.id);
  const label = config.label
    ? t(this, config.label)
    : getThemeColorLabel.call(this, config.id);

  return {
    id: config.id,
    primary: label,
    secondary: standard ? t(this, "Color") : t(this, "Theme"),
    sorting_label: label,
    isStandardFallback: standardFallback,
    search_labels: {
      color: config.id,
      label,
      source: standardFallback ? "standard" : "theme",
    },
  };
}

function normalizeThemeColorConfig(config) {
  return {
    ...config,
    id: normalizeThemeColorValue(config.id),
    label: config.label || null,
  };
}

function normalizeThemeColorValue(value) {
  if (!value) return "";

  const cleaned = value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "");
  const base = cleaned.startsWith("color-")
    ? cleaned.slice(6)
    : cleaned;

  return THEME_COLOR_ALIASES[base] || base;
}

function isStandardThemeColor(color) {
  return (
    color === "theme" ||
    color === "primary-color" ||
    color === "accent-color" ||
    isHaStandardColorName(color)
  );
}

function isStandardFallbackColor(color) {
  return isHaStandardColorName(color) && !hasThemeColorName(color);
}

function getThemeColorLabel(color) {
  if (color === "theme") return t(this, "State color (default)");
  if (color === "light") return t(this, "State Light color");
  if (color === "primary-color") return t(this, "Primary");
  if (color === "accent-color") return t(this, "Accent");

  return color
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const THEME_COLOR_ALIASES = {
  bluegrey: "blue-grey",
  darkgrey: "dark-grey",
  deeporange: "deep-orange",
  deeppurple: "deep-purple",
  lightblue: "light-blue",
  lightgreen: "light-green",
  lightgrey: "light-grey",
};

const THEME_COLOR_OPTIONS = [
  { id: "theme", label: "State color (default)" },
  { id: "light", label: "State Light color" },
  "primary-color",
  "accent-color",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "light-grey",
  "grey",
  "dark-grey",
  "blue-grey",
  "black",
  "white",
  "disabled",
  "state-icon-color",
  "state-light-active-color",
  "gold",
  "violet",
  "google-red",
  "google-green",
  "google-yellow",
  "google-blue",
  "google-violet",
  "google-grey",
  "color-red",
  "color-green",
  "color-yellow",
  "color-amber",
  "color-blue",
  "color-purple",
  "color-violet",
  "color-grey",
  "color-darkgrey",
  "color-pink",
  "color-orange",
  "color-gold",
  "color-brown",
];

function getDefaultColorTab(value) {
  const color = value?.toString().trim();

  if (!color) return "theme";

  return (
    color.startsWith("#") ||
    color.startsWith("rgb") ||
    color.startsWith("hsl")
  )
    ? "picker"
    : "theme";
}


export function renderStatusSection() {
  return html`
    <div class="section">
      ${this._renderSectionHeader("Status Sensors", "status")}
      ${!this._collapsed.status
        ? html`
            ${this._renderEntity("Status 1", "status1")}
            ${this._renderEntity("Status 2", "status2")}
            ${this._renderEntity("Status 3", "status3")}
          `
        : ""}
    </div>
  `;
}


export function renderActionSelector(label, key, defaultAction) {
  const raw = this._config?.[key];
  const defaultValue =
    typeof defaultAction === "object"
      ? defaultAction
      : { action: defaultAction || "none" };

  const value =
    raw && typeof raw === "object"
      ? normalizeActionValue(raw, defaultValue)
      : defaultValue;
  const action = value.action || defaultValue.action || "none";
  const actionItems = getActionPickerItems(this);

  return html`
    <div class="field action-field">
      <label>${t(this, label)}</label>

      <div class="action-picker">
        <ha-generic-picker
          .value=${action}
          .getItems=${() => actionItems}
          .rowRenderer=${(item) => renderActionPickerRow(item)}
          .valueRenderer=${(itemValue) =>
            renderActionPickerValue(
              actionItems.find((item) => item.id === itemValue)
            )}
          .notFoundLabel=${t(this, "No matching actions")}
          .noSort=${true}
          @value-changed=${(e) => {
            e.stopPropagation();

            const nextAction =
              getActionPickerValue(e) || "none";

            this._updateConfig({
              [key]: getActionDefaults(
                this,
                nextAction,
                value
              ),
            });
            this.requestUpdate?.();
          }}
        ></ha-generic-picker>
      </div>

      ${action === "navigate"
        ? renderNavigationActionFields.call(this, key, value)
        : ""}

      ${action === "call-service"
        ? renderCallServiceActionFields.call(this, key, value)
        : ""}

      ${action === "url"
        ? renderUrlActionFields.call(this, key, value)
        : ""}

      ${action === "popup"
        ? renderPopupActionFields.call(this, key, value)
        : ""}
    </div>
  `;
}

function getActionPickerValue(event) {
  const value =
    event.detail?.value ??
    event.detail?.item?.id ??
    event.target?.value ??
    "";

  if (typeof value === "object") {
    return value.id || value.value || "";
  }

  return value;
}

function getActionPickerItems(editor) {
  return [
    {
      id: "toggle",
      primary: actionLabel(editor, "toggle"),
      icon: "mdi:toggle-switch",
    },
    {
      id: "more-info",
      primary: actionLabel(editor, "more-info"),
      icon: "mdi:information-outline",
    },
    {
      id: "navigate",
      primary: actionLabel(editor, "navigate"),
      icon: "mdi:arrow-right",
    },
    {
      id: "call-service",
      primary: actionLabel(editor, "perform-action"),
      icon: "mdi:flash",
    },
    {
      id: "url",
      primary: actionLabel(editor, "url"),
      icon: "mdi:open-in-new",
    },
    {
      id: "popup",
      primary: actionLabel(editor, "popup"),
      icon: "mdi:window-open",
    },
    {
      id: "none",
      primary: actionLabel(editor, "none"),
      icon: "mdi:close-circle-outline",
    },
  ];
}

function renderActionPickerRow(item) {
  return html`
    <ha-combo-box-item type="button" compact>
      ${renderActionPickerStart(item)}
      <span slot="headline">${item.primary}</span>
    </ha-combo-box-item>
  `;
}

function renderActionPickerValue(item) {
  if (!item) return "";

  return html`
    ${renderActionPickerStart(item)}
    <span slot="headline">${item.primary}</span>
  `;
}

function renderActionPickerStart(item) {
  return html`
    <ha-icon
      slot="start"
      .icon=${item.icon}
    ></ha-icon>
  `;
}

function renderNavigationActionFields(key, value) {
  return html`
    <div class="inline-field action-subfield">
      <ha-navigation-picker
        .hass=${this.hass}
        .value=${value.navigation_path || ""}
        @value-changed=${(e) => {
          e.stopPropagation();

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              navigation_path: e.detail.value || "",
            }),
          });
        }}
      ></ha-navigation-picker>
    </div>
  `;
}

function renderCallServiceActionFields(key, value) {
  const serviceAction = {
    action: value.perform_action || value.service || "",
    ...(value.data || value.service_data
      ? { data: value.data || value.service_data }
      : {}),
    ...(value.target ? { target: value.target } : {}),
  };

  return html`
    <div class="inline-field action-subfield">
      <ha-service-control
        .hass=${this.hass}
        .value=${serviceAction}
        narrow
        @value-changed=${(e) => {
          e.stopPropagation();

          const nextAction = e.detail.value || {};

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              service: nextAction.action || "",
              service_data: nextAction.data,
              target: nextAction.target,
            }),
          });
        }}
      ></ha-service-control>
    </div>
  `;
}

function renderUrlActionFields(key, value) {
  return html`
    <div class="inline-field action-subfield">
      <ha-input
        .label=${configFieldLabel(this, "url")}
        .value=${value.url_path || ""}
        @input=${(e) => {
          e.stopPropagation();

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              url_path: e.target.value,
            }),
          });
        }}
      ></ha-input>
    </div>
  `;
}

function renderPopupActionFields(key, value) {
  return html`
    <div class="inline-field action-subfield">
      <span class="inline-label">${configFieldLabel(this, "title")}</span>

      <input
        .value=${value.popup_title || ""}
        placeholder="Security"
        @input=${(e) =>
          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              popup_title: e.target.value,
            }),
          })}
      />
    </div>

    <div class="inline-field action-subfield">
      <span class="inline-label">${configFieldLabel(this, "content")}</span>

      <input
        .value=${typeof value.popup_content === "string"
          ? value.popup_content
          : value.popup_content
            ? JSON.stringify(value.popup_content)
            : ""}
        placeholder=""
        @input=${(e) =>
          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              popup_content: e.target.value,
            }),
          })}
      />
    </div>
  `;
}

function getActionDefaults(editor, action, currentValue) {
  const value = cleanActionConfig({
    ...currentValue,
    action,
  });

  if (action !== "popup") return value;

  return cleanActionConfig({
    ...value,
    popup_title: value.popup_title || t(editor, "Security"),
    popup_content: value.popup_content || {
        type: "vertical-stack",
        cards: [
          {
            type: "tile",
            entity: "alarm_control_panel.house_alarm",
            vertical: true,
          },
        ],
      },
    style: value.style ||
      "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;",
  });
}

function normalizeActionValue(value, defaultValue) {
  const action =
    value.action === "perform-action"
      ? "call-service"
      : value.action;

  return cleanActionConfig({
    ...defaultValue,
    ...value,
    action: action || defaultValue.action || "none",
  });
}

function cleanActionConfig(value) {
  const action =
    value?.action === "perform-action"
      ? "call-service"
      : value?.action || "none";
  const config = { action };

  if (action === "navigate") {
    config.navigation_path = value.navigation_path || "";
    return config;
  }

  if (action === "call-service") {
    config.service =
      value.service ||
      value.perform_action ||
      "";

    if (value.service_data || value.data) {
      config.service_data = {
        ...(value.service_data || value.data),
      };
    }

    if (value.target) {
      config.target = { ...value.target };
    }

    return config;
  }

  if (action === "url") {
    config.url_path = value.url_path || "";
    return config;
  }

  if (action === "popup") {
    config.popup_title = value.popup_title || "";
    config.popup_content = value.popup_content || "";

    if (value.style) {
      config.style = value.style;
    }

    if (value.card_mod) {
      config.card_mod = value.card_mod;
    }

    return config;
  }

  return config;
}

export function renderEntity(label, key) {
  return html`
    <div class="field">
      <label>${t(this, label)}</label>

      <div class="entity-row">
        <ha-selector
          class="entity-picker"
          .hass=${this.hass}
          .selector=${{ entity: {} }}
          .value=${this._config?.[key] || ""}
          @value-changed=${(e) =>
            this._handleEntityUpdate
              ? this._handleEntityUpdate(key, e.detail.value || "")
              : this._handleConfigUpdate(key, e.detail.value || "")}
        ></ha-selector>

        ${this._config?.[key]
          ? html`
              <button
                type="button"
                class="clear-button"
                @click=${() =>
                  this._handleEntityUpdate
                    ? this._handleEntityUpdate(key, "")
                    : this._updateConfig({
                        [key]: "",
                      })}
              >
                ✕
              </button>
            `
          : ""}
      </div>
    </div>
  `;
}

export function renderArea(label, key) {
  return html`
    <div class="field">
      <label>${t(this, label)}</label>

      <ha-selector
        .hass=${this.hass}
        .selector=${{ area: {} }}
        .value=${this._config?.[key] || ""}
        @value-changed=${(e) =>
          this._updateConfig({
            [key]: e.detail.value,
          })}
      ></ha-selector>
    </div>
  `;
}
