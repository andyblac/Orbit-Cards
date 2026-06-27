import { html } from "lit";
import {
  hasThemeColorName,
  isHaStandardColorName,
} from "../../helpers/colors.js";

function t(editor, key, replacements) {
  if (Array.isArray(key)) {
    return formatComposedLabel(
      editor,
      key.map((part) => t(editor, part, replacements))
    );
  }

  return editor._t
    ? editor._t(key, replacements)
    : key;
}

function formatComposedLabel(editor, parts) {
  const language =
    editor?.hass?.locale?.language ||
    editor?.hass?.language ||
    "en";

  if (!language.toLowerCase().startsWith("en")) {
    return parts.join(" ");
  }

  return parts
    .map((part, index) =>
      index === 0 ? part : lowercaseFirstLetter(part))
    .join(" ");
}

function lowercaseFirstLetter(value = "") {
  return value.replace(/^(\p{L})/u, (letter) =>
    letter.toLocaleLowerCase()
  );
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

function stopPickerEventPropagation(event) {
  event.stopPropagation();
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
              ${t(this, "Color")}
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
                  label,
                  value,
                  onUpdate,
                  previewValue
                )}
              `
            : html`
                ${renderNativeColorPicker.call(
                  this,
                  label,
                  value,
                  onUpdate,
                  previewValue
                )}
              `}
        </div>
      </div>
    </div>
  `;
}

function renderNativeColorPicker(label, value, onUpdate, previewValue = value) {
  const hasConfiguredValue = Boolean(value);
  const displayValue = hasConfiguredValue
    ? this._getColorPickerValue(value)
    : "";
  const inputValue =
    displayValue ||
    this._getColorPickerValue(previewValue);

  return html`
    <div
      class="native-color-picker-field ${displayValue ? "has-value" : ""}"
      @click=${(e) => e.stopPropagation()}
    >
      <input
        class="native-color-picker-input"
        type="color"
        .value=${inputValue}
        @input=${(e) => onUpdate(e.target.value)}
        @change=${(e) => onUpdate(e.target.value)}
      />

      ${displayValue
        ? html`
            <span
              class="native-color-picker-swatch"
              style=${`background-color:${displayValue};`}
            ></span>
            <span class="native-color-picker-text">
              ${label
                ? html`
                    <span class="native-color-picker-label">
                      ${t(this, label)}
                    </span>
                  `
                : ""}
              <span class="native-color-picker-value">
                ${displayValue.toUpperCase()}
              </span>
            </span>
          `
        : html`
            <span class="native-color-picker-empty-swatch"></span>
            <span class="native-color-picker-text">
              ${label
                ? html`
                    <span class="native-color-picker-label">
                      ${t(this, label)}
                    </span>
                  `
                : ""}
              <span class="native-color-picker-value empty"></span>
            </span>
          `}

      ${displayValue
        ? html`
            <button
              type="button"
              class="native-color-picker-clear"
              aria-label=${t(this, "Clear")}
              @click=${(e) => {
                e.preventDefault();
                e.stopPropagation();
                onUpdate("");
              }}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          `
        : ""}

      <ha-icon
        class="native-color-picker-arrow"
        icon="mdi:menu-down"
      ></ha-icon>
    </div>
  `;
}

function renderThemeColorPicker(label, value, onUpdate, previewValue = value) {
  const displayValue = value || previewValue;
  const selectedValue =
    getDefaultColorTab(displayValue) === "theme"
      ? normalizeThemeColorValue(displayValue) || "theme"
      : "";
  const items = getCachedThemeColorItems.call(this);

  return html`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .label=${label ? t(this, label) : ""}
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
      ${this._renderSectionHeader("Status sensors", "status")}
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
      <div class="action-picker">
        <ha-generic-picker
          .label=${t(this, label)}
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
  installEntityFilterScrollGuard();

  return html`
    <div class="inline-field action-subfield">
      <ha-navigation-picker
        @click=${stopPickerEventPropagation}
        @pointerdown=${stopPickerEventPropagation}
        @wheel=${stopPickerEventPropagation}
        @touchmove=${stopPickerEventPropagation}
        @picker-opened=${(e) => {
          e.currentTarget.__orbitSuppressSectionScroll = true;
        }}
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
      <ha-input
        .label=${configFieldLabel(this, "title")}
        .value=${value.popup_title || ""}
        .placeholder=${"Security"}
        @input=${(e) => {
          e.stopPropagation();

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              popup_title: e.target.value,
            }),
          });
        }}
      ></ha-input>
    </div>

    <div class="inline-field action-subfield">
      <ha-input
        .label=${configFieldLabel(this, "content")}
        .value=${typeof value.popup_content === "string"
          ? value.popup_content
          : value.popup_content
            ? JSON.stringify(value.popup_content)
            : ""}
        @input=${(e) => {
          e.stopPropagation();

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              popup_content: e.target.value,
            }),
          });
        }}
      ></ha-input>
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

export function renderEntitySelector({
  value = "",
  includeDomains,
  excludeDomains,
  multiple = false,
  onValueChanged,
  filterOptions,
  activeFilter = "all",
  className = "entity-picker",
} = {}) {
  const pickerFilters = filterOptions?.length
    ? filterOptions.map((filter) => ({
        ...filter,
        label: getFilterLabel.call(this, filter),
      }))
    : null;
  const pickerDomains = pickerFilters
    ? getFilterDomains(pickerFilters)
    : includeDomains;

  if (multiple) {
    return html`
      <ha-selector
        class=${className}
        .hass=${this.hass}
        .selector=${{
          entity: {
            ...(pickerDomains?.length
              ? { filter: { domain: pickerDomains } }
              : {}),
            ...(excludeDomains?.length
              ? { exclude_domains: excludeDomains }
              : {}),
            multiple: true,
          },
        }}
        .value=${value || ""}
        @value-changed=${(e) =>
          onValueChanged?.(e.detail.value || "")}
      ></ha-selector>
    `;
  }

  if (pickerFilters?.length) {
    return renderFilteredEntitySelector.call(this, {
      value,
      includeDomains,
      excludeDomains,
      filters: pickerFilters,
      activeFilter,
      className,
      onValueChanged,
    });
  }

  return html`
    <ha-entity-picker
      class=${className}
      .hass=${this.hass}
      .includeDomains=${pickerDomains}
      .excludeDomains=${excludeDomains}
      .value=${value || ""}
      @value-changed=${(e) =>
        onValueChanged?.(e.detail.value || "")}
    ></ha-entity-picker>
  `;
}

function getFilterLabel(filter) {
  if (filter.haDomains?.length) {
    const labels = filter.haDomains
      .map((domain) => localizeHomeAssistantDomain(this?.hass, domain))
      .filter(Boolean);

    if (labels.length) return labels.join(" / ");
  }

  return t(this, filter.label);
}

function localizeHomeAssistantDomain(hass, domain) {
  if (!hass?.localize || !domain) return null;

  const candidates = [
    `component.${domain}.entity_component._.name_plural`,
    `component.${domain}.entity_component._.name`,
  ];

  for (const candidate of candidates) {
    const value = hass.localize(candidate);

    if (value && value !== candidate) return value;
  }

  return null;
}

function getFilterDomains(filters = []) {
  if (
    filters.some(
      (filter) =>
        filter.value === "all" &&
        (!filter.domains || filter.domains.length === 0)
    )
  ) {
    return undefined;
  }

  const domains = new Set();

  filters.forEach((filter) =>
    filter.domains?.forEach((domain) => domains.add(domain))
  );

  return [...domains];
}

let entityFilterScrollGuardInstalled = false;

function renderFilteredEntitySelector({
  value,
  includeDomains,
  excludeDomains,
  filters,
  activeFilter,
  className,
  onValueChanged,
}) {
  installEntityFilterScrollGuard();

  const sections = filters.map((filter) => ({
    id: filter.value,
    label: filter.label,
  }));
  const getItems = (search, section) =>
    getFilteredEntityItems.call(this, {
      search,
      section,
      filters,
      includeDomains,
      excludeDomains,
    });

  return html`
    <ha-generic-picker
      class=${className}
      .hass=${this.hass}
      .value=${value || ""}
      .placeholder=${"Entity"}
      .getItems=${getItems}
      .valueRenderer=${(itemId) =>
        renderEntityPickerValue.call(this, itemId)}
      .rowRenderer=${renderEntityPickerRow}
      .sections=${sections}
      .selectedSection=${activeFilter || filters[0]?.value || "all"}
      @picker-opened=${(e) => {
        e.currentTarget.__orbitSuppressSectionScroll = true;
      }}
      @value-changed=${(e) =>
        onValueChanged?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}

function getFilteredEntityItems({
  search,
  section,
  filters,
  includeDomains,
  excludeDomains,
}) {
  const selectedFilter = filters.find(
    (filter) => filter.value === (section || "all")
  );
  const sectionDomains = selectedFilter?.domains;
  const allowedDomains =
    sectionDomains?.length ? sectionDomains : includeDomains;
  const excludedDomains = new Set(excludeDomains || []);
  const searchTerm = (search || "").trim().toLowerCase();

  return Object.values(this.hass?.states || {})
    .filter((stateObj) => {
      const domain = getEntityDomain(stateObj.entity_id);

      if (allowedDomains?.length && !allowedDomains.includes(domain)) {
        return false;
      }

      return !excludedDomains.has(domain);
    })
    .map((stateObj) => createEntityPickerItem.call(this, stateObj))
    .filter((item) => entityPickerItemMatchesSearch(item, searchTerm))
    .sort(sortEntityPickerItems);
}

function createEntityPickerItem(stateObj) {
  const name = getEntityFriendlyName(stateObj);
  const domain = getEntityDomain(stateObj.entity_id);
  const secondary = getEntityPickerSecondary(this.hass, stateObj);

  return {
    id: stateObj.entity_id,
    primary: name,
    secondary,
    sorting_label: `${name}_${stateObj.entity_id}`,
    stateObj,
    domain,
    domainLabel: formatEntityDomainLabel(domain),
    searchText: [
      name,
      stateObj.entity_id,
      domain,
      formatEntityDomainLabel(domain),
      secondary,
      stateObj.attributes?.device_class,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

function renderEntityPickerValue(itemId) {
  const stateObj = this.hass?.states?.[itemId];
  const primary = stateObj ? getEntityFriendlyName(stateObj) : itemId;
  const secondary = stateObj
    ? getEntityPickerSecondary(this.hass, stateObj)
    : undefined;

  return html`
    ${stateObj
      ? html`<state-badge slot="start" .stateObj=${stateObj}></state-badge>`
      : ""}
    <span slot="headline">${primary}</span>
    ${secondary
      ? html`<span slot="supporting-text">${secondary}</span>`
      : ""}
  `;
}

function renderEntityPickerRow(item, index) {
  return html`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${index !== 0}
    >
      <state-badge slot="start" .stateObj=${item.stateObj}></state-badge>
      <span slot="headline">${item.primary}</span>
      ${item.secondary
        ? html`<span slot="supporting-text">${item.secondary}</span>`
        : ""}
      <div slot="trailing-supporting-text" class="domain">
        ${item.domainLabel}
      </div>
    </ha-combo-box-item>
  `;
}

function entityPickerItemMatchesSearch(item, searchTerm) {
  if (!searchTerm) return true;

  return searchTerm
    .split(/\s+/)
    .every((term) => item.searchText.includes(term));
}

function sortEntityPickerItems(itemA, itemB) {
  return itemA.sorting_label.localeCompare(
    itemB.sorting_label,
    undefined,
    { sensitivity: "base" }
  );
}

function getEntityFriendlyName(stateObj) {
  return (
    stateObj.attributes?.friendly_name ||
    stateObj.entity_id
  );
}

function getEntityPickerSecondary(hass, stateObj) {
  const entity = hass?.entities?.[stateObj.entity_id];
  const device = entity?.device_id
    ? hass?.devices?.[entity.device_id]
    : undefined;
  const areaId =
    entity?.area_id ||
    device?.area_id ||
    stateObj.attributes?.area_id;

  return areaId ? hass?.areas?.[areaId]?.name : undefined;
}

function getEntityDomain(entityId = "") {
  return entityId.split(".")[0] || "";
}

function formatEntityDomainLabel(domain = "") {
  return domain
    .split("_")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function installEntityFilterScrollGuard() {
  if (entityFilterScrollGuardInstalled) return;

  const originalScrollIntoView =
    Element.prototype.scrollIntoView;

  Element.prototype.scrollIntoView = function (...args) {
    if (isOrbitEntityFilterPickerElement(this)) {
      resetOrbitEntityFilterPickerScroll(this);
      return;
    }

    return originalScrollIntoView.apply(this, args);
  };

  entityFilterScrollGuardInstalled = true;
}

function resetOrbitEntityFilterPickerScroll(node) {
  let current = node;

  while (current) {
    if (current.tagName?.toLowerCase?.() === "lit-virtualizer") {
      current.scrollTop = 0;
      return;
    }

    const root = current.getRootNode?.();

    if (root?.host && root.host !== current) {
      current = root.host;
      continue;
    }

    current = current.parentNode || current.host;
  }
}

function isOrbitEntityFilterPickerElement(node) {
  let current = node;

  while (current) {
    if (current.__orbitSuppressSectionScroll) {
      return true;
    }

    const root = current.getRootNode?.();

    if (root?.host && root.host !== current) {
      current = root.host;
      continue;
    }

    current = current.parentNode || current.host;
  }

  return false;
}

export function renderAreaSelector({
  value = "",
  onValueChanged,
  className = "entity-picker",
} = {}) {
  return html`
    <ha-generic-picker
      class=${className}
      .hass=${this.hass}
      .value=${value || ""}
      .placeholder=${"Area"}
      .getItems=${() => getAreaPickerItems.call(this)}
      .valueRenderer=${(areaId) =>
        renderAreaPickerValue.call(this, areaId)}
      .rowRenderer=${renderAreaPickerRow}
      @value-changed=${(e) =>
        onValueChanged?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}

function getAreaPickerItems() {
  return Object.values(this.hass?.areas || {})
    .map((area) => createAreaPickerItem.call(this, area))
    .sort(sortAreaPickerItems);
}

function createAreaPickerItem(area) {
  const primary = area.name || area.area_id;
  const secondary = getAreaPickerSecondary(this.hass, area);

  return {
    id: area.area_id,
    primary,
    secondary,
    sorting_label: primary,
    icon: area.icon || "mdi:texture-box",
  };
}

function renderAreaPickerValue(areaId) {
  const area = this.hass?.areas?.[areaId];
  const item = area
    ? createAreaPickerItem.call(this, area)
    : {
        id: areaId,
        primary: areaId,
        icon: "mdi:texture-box",
      };

  return html`
    <ha-icon slot="start" .icon=${item.icon}></ha-icon>
    <span slot="headline">${item.primary}</span>
    ${item.secondary
      ? html`<span slot="supporting-text">${item.secondary}</span>`
      : ""}
  `;
}

function renderAreaPickerRow(item, index) {
  return html`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${index !== 0}
    >
      <ha-icon slot="start" .icon=${item.icon}></ha-icon>
      <span slot="headline">${item.primary}</span>
      ${item.secondary
        ? html`<span slot="supporting-text">${item.secondary}</span>`
        : ""}
    </ha-combo-box-item>
  `;
}

function getAreaPickerSecondary(hass, area) {
  const floorId = area.floor_id;

  return floorId ? hass?.floors?.[floorId]?.name : undefined;
}

function sortAreaPickerItems(itemA, itemB) {
  return itemA.sorting_label.localeCompare(
    itemB.sorting_label,
    undefined,
    { sensitivity: "base" }
  );
}

export function renderNavigationSelector({
  value = "",
  label = "",
  onValueChanged,
  className = "entity-picker",
} = {}) {
  installEntityFilterScrollGuard();

  return html`
    <ha-navigation-picker
      class=${className}
      @click=${stopPickerEventPropagation}
      @pointerdown=${stopPickerEventPropagation}
      @wheel=${stopPickerEventPropagation}
      @touchmove=${stopPickerEventPropagation}
      @picker-opened=${(e) => {
        e.currentTarget.__orbitSuppressSectionScroll = true;
      }}
      .hass=${this.hass}
      .label=${label ? t(this, label) : ""}
      .value=${value || ""}
      @value-changed=${(e) =>
        onValueChanged?.(e.detail.value || "")}
    ></ha-navigation-picker>
  `;
}

export function renderEntity(label, key, replacements) {
  return html`
    <div class="field">
      <label>${t(this, label, replacements)}</label>

      ${renderEntitySelector.call(this, {
        value: this._config?.[key] || "",
        onValueChanged: (value) =>
          this._handleEntityUpdate
            ? this._handleEntityUpdate(key, value)
            : this._handleConfigUpdate(key, value),
      })}
    </div>
  `;
}

export function renderArea(label, key) {
  return html`
    <div class="field">
      ${renderAreaSelector.call(this, {
        value: this._config?.[key] || "",
        onValueChanged: (value) =>
          this._handleConfigUpdate
            ? this._handleConfigUpdate(key, value)
            : this._updateConfig({ [key]: value }),
      })}
    </div>
  `;
}
