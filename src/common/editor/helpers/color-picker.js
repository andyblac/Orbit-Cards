import { html } from "lit";
import {
  hasThemeColorName,
  isHaStandardColorName,
} from "../../helpers/colors.js";
import { hasNativeTemplateSyntax } from "../../helpers/templates.js";
import { translateEditorLabel as t } from "./labels.js";

export function renderColor(label, key, previewValue) {
  const value = this._config?.[key] || "";

  return renderColorControl.call(
    this,
    label,
    key,
    value,
    (nextValue) => this._handleConfigUpdate(key, nextValue),
    previewValue
  );
}

export function renderColorControl(
  label,
  pickerKey,
  value,
  onUpdate,
  previewValue,
  allowTemplate = true
) {
  scheduleThemeColorWarmup.call(this);

  const effectivePreviewValue = getEffectiveColorPreviewValue.call(
    this,
    value,
    previewValue
  );
  const defaultTab = getDefaultColorTab(value || effectivePreviewValue);
  const requestedTab =
    this._colorPickerKey === pickerKey
      ? this._colorPickerTab || defaultTab
      : defaultTab;
  const activeTab =
    !allowTemplate && requestedTab === "template" ? defaultTab : requestedTab;

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
              aria-label=${t(this, "Color")}
              title=${t(this, "Color")}
              @click=${() => {
                this._colorPickerKey = pickerKey;
                this._colorPickerTab = "picker";
                this._themeColorPickerOpen = false;

                const effectiveValue = value || effectivePreviewValue;

                if (effectiveValue && !isNativeColorValue(effectiveValue)) {
                  const nativeValue = this._getColorPickerValue(effectiveValue);

                  if (nativeValue) {
                    onUpdate(nativeValue);
                  }
                }
              }}
            >
              <ha-icon icon="mdi:eyedropper"></ha-icon>
            </button>
            <button
              type="button"
              class=${activeTab === "theme" ? "active" : ""}
              aria-label=${t(this, "Theme")}
              title=${t(this, "Theme")}
              @click=${() => {
                this._colorPickerKey = pickerKey;
                this._colorPickerTab = "theme";
                this._themeColorPickerOpen = false;
                this._themeColorSearch = "";
              }}
            >
              <ha-icon icon="mdi:palette-swatch"></ha-icon>
            </button>
            ${allowTemplate
              ? html`
                  <button
                    type="button"
                    class=${activeTab === "template" ? "active" : ""}
                    aria-label=${t(this, "Template")}
                    title=${t(this, "Template")}
                    @click=${() => {
                      this._colorPickerKey = pickerKey;
                      this._colorPickerTab = "template";
                      this._themeColorPickerOpen = false;
                    }}
                  >
                    <ha-icon icon="mdi:code-braces"></ha-icon>
                  </button>
                `
              : ""}
          </div>

          ${activeTab === "template"
            ? renderColorTemplateInput.call(this, label, value, onUpdate)
            : activeTab === "theme"
            ? html`
                ${renderThemeColorPicker.call(
                  this,
                  label,
                  value,
                  onUpdate,
                  effectivePreviewValue,
                  pickerKey
                )}
              `
            : html`
                ${renderNativeColorPicker.call(
                  this,
                  label,
                  value,
                  onUpdate,
                  effectivePreviewValue
                )}
              `}
        </div>
      </div>
    </div>
  `;
}

export function renderColorPair({
  label = "Color",
  onLabel = ["Active", "Color"],
  offLabel = ["Inactive", "Color"],
  onKey,
  offKey,
  sourceKey,
  templateKey,
  config = this._config || {},
  onUpdate = (key, value) => this._handleConfigUpdate(key, value),
  onPreviewValue,
  offPreviewValue,
  pickerPrefix = "",
} = {}) {
  const baseKey = onKey?.replace(/_on_color$/, "") || "accent";
  const effectiveSourceKey = sourceKey || `${baseKey}_color_source`;
  const effectiveTemplateKey = templateKey || `${baseKey}_color`;
  const templateMode = config[effectiveSourceKey] === "template";

  return html`
    <div class="color-pair-control">
      <div class="field-header color-pair-source-header">
        <label>${t(this, label)}</label>
        <ha-selector
          class="color-pair-source-selector"
          .hass=${this.hass}
          .selector=${{
            button_toggle: {
              options: [
                { label: t(this, "Custom"), value: "custom" },
                { label: t(this, "Template"), value: "template" },
              ],
            },
          }}
          .value=${templateMode ? "template" : "custom"}
          @value-changed=${(event) =>
            onUpdate(
              effectiveSourceKey,
              event.detail.value === "template" ? "template" : undefined
            )}
        ></ha-selector>
      </div>

      ${templateMode
        ? html`
            <div class="field color-source-template-field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${config[effectiveTemplateKey] || ""}
                @value-changed=${(event) =>
                  onUpdate(
                    effectiveTemplateKey,
                    event.detail.value || ""
                  )}
              ></ha-selector>
            </div>
          `
        : html`
            <div class="color-pair">
              ${renderColorControl.call(
                this,
                onLabel,
                `${pickerPrefix}${onKey}`,
                config[onKey] || "",
                (value) => onUpdate(onKey, value),
                onPreviewValue,
                false
              )}
              ${renderColorControl.call(
                this,
                offLabel,
                `${pickerPrefix}${offKey}`,
                config[offKey] || "",
                (value) => onUpdate(offKey, value),
                offPreviewValue,
                false
              )}
            </div>
          `}
    </div>
  `;
}

function renderColorTemplateInput(label, value, onUpdate) {
  return html`
    <div class="color-template-input">
      <ha-selector
        .hass=${this.hass}
        .label=${label ? t(this, label) : t(this, "Template")}
        .selector=${{ template: {} }}
        .value=${hasNativeTemplateSyntax(value) ? value : ""}
        @value-changed=${(event) => onUpdate(event.detail.value || "")}
      ></ha-selector>
    </div>
  `;
}

function getEffectiveColorPreviewValue(value, previewValue) {
  return (
    previewValue ||
    value ||
    "theme"
  );
}

function renderNativeColorPicker(label, value, onUpdate, previewValue = value) {
  const hasConfiguredValue = isNativeColorValue(value);
  const displayValue = hasConfiguredValue
    ? this._getColorPickerValue(value)
    : "";
  const inputValue =
    displayValue ||
    (
      isNativeColorValue(value)
        ? this._getColorPickerValue(value)
        : this._getColorPickerValue(value || previewValue)
    ) ||
    "#000000";

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

function renderThemeColorPicker(
  label,
  value,
  onUpdate,
  previewValue = value,
  pickerKey = ""
) {
  const displayValue = value || previewValue;
  const selectedValue =
    getDefaultColorTab(displayValue) === "theme"
      ? normalizeThemeColorValue(displayValue) || "theme"
      : "";
  const cachedItems = getCachedThemeColorItems.call(this);
  const items = getThemeColorItemsWithValue.call(
    this,
    cachedItems,
    selectedValue
  );
  const getItems = getThemeColorItemsGetter.call(
    this,
    pickerKey,
    items
  );

  return html`
    <div
      class="theme-color-picker"
      @click=${(e) => e.stopPropagation()}
    >
      <ha-generic-picker
        .getItems=${getItems}
        .label=${label ? t(this, label) : ""}
        .value=${selectedValue}
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

function getThemeColorItemsWithValue(items, selectedValue) {
  if (
    !selectedValue ||
    items.some((item) => item.id === selectedValue)
  ) {
    return items;
  }

  return [
    ...items,
    createThemeColorItem.call(this, {
      id: selectedValue,
      source: "theme",
    }),
  ];
}

function getThemeColorItemsGetter(pickerKey, items) {
  this._themeColorItemGetters ||= new Map();

  let entry = this._themeColorItemGetters.get(pickerKey);

  if (!entry) {
    entry = {
      items,
      getItems: () => entry.items,
    };
    this._themeColorItemGetters.set(pickerKey, entry);
  } else {
    entry.items = items;
  }

  return entry.getItems;
}

function renderThemeColorPickerRow(item) {
  return html`
    <ha-combo-box-item type="button" compact>
      ${renderThemeColorPickerStart.call(this, item)}
      <span slot="headline">${item.primary}</span>
      ${renderThemeColorPickerBadge.call(this, item)}
    </ha-combo-box-item>
  `;
}

function renderThemeColorPickerValue(item) {
  if (!item) return "";

  return html`
    ${renderThemeColorPickerStart.call(this, item)}
    <span slot="headline">${item.primary}</span>
    ${renderThemeColorPickerBadge.call(this, item)}
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
  if (item.isThemeColor) {
    return html`
      <span
        slot="end"
        class="theme-source-badge theme-source-badge-theme"
        aria-label=${t(this, "Theme")}
      >T</span>
    `;
  }

  return item.isStandardFallback
    ? html`
        <span
          slot="end"
          class="theme-source-badge theme-source-badge-standard"
          aria-label=${t(this, "Standard")}
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

  for (const option of getThemeCssColorOptions.call(this)) {
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
    this?.hass?.locale?.language ||
    this?.hass?.language ||
    "";
  const theme =
    this?.hass?.selectedTheme?.theme ||
    this?.hass?.themes?.theme ||
    "";
  const darkMode =
    this?.hass?.themes?.darkMode ??
    this?.hass?.selectedTheme?.dark ??
    "";
  const themeColors = getThemeColorVariableSignature.call(this);

  return `${language}|${theme}|${darkMode}|${themeColors}`;
}

function createThemeColorItem(option) {
  const originalConfig =
    typeof option === "string"
      ? { id: option }
      : option;
  const config = normalizeThemeColorConfig(originalConfig);
  const standard = isStandardThemeColor(config.id);
  const standardFallback = standard && isStandardFallbackColor(config.id);
  const themeColor =
    !standardFallback &&
    (
      config.source === "theme" ||
      hasConfiguredThemeColor.call(this, config.id)
    );
  const label = config.label
    ? t(this, config.label)
    : getThemeColorLabel.call(this, config.id);

  return {
    id: config.id,
    primary: label,
    secondary: standard ? t(this, "Color") : t(this, "Theme"),
    sorting_label: label,
    isStandardFallback: standardFallback,
    isThemeColor: themeColor,
    search_labels: {
      color: config.id,
      label,
      source: standardFallback
        ? "standard"
        : themeColor
          ? "theme"
          : "color",
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

function getThemeCssColorOptions() {
  return getThemeColorVariableNames.call(this)
    .map((name) => getThemeColorIdFromVariableName(name))
    .filter(isUsefulThemeColorId)
    .map((id) => ({
      id,
      source: "theme",
    }))
    .sort((a, b) =>
      getThemeColorLabel.call(this, a.id)
        .localeCompare(
          getThemeColorLabel.call(this, b.id),
          this?.hass?.locale?.language ||
            this?.hass?.language ||
            undefined,
          { sensitivity: "base" }
        )
    );
}

function getThemeColorVariableSignature() {
  return getThemeColorVariableEntries.call(this)
    .map(([name, value]) => `${name}:${value}`)
    .join(",");
}

function getThemeColorVariableNames() {
  return getThemeColorVariableEntries.call(this)
    .map(([name]) => name)
    .sort();
}

function getThemeColorVariableEntries() {
  const names = new Set();
  const entries = [];
  const themeRules = getSelectedThemeRules.call(this);

  for (const [name, value] of Object.entries(themeRules)) {
    const normalizedName = name.toLowerCase();

    if (!isThemeColorRule(normalizedName, value)) continue;
    if (names.has(normalizedName)) continue;

    names.add(normalizedName);
    entries.push([normalizedName, value]);
  }

  return entries.sort(([nameA], [nameB]) =>
    nameA.localeCompare(nameB)
  );
}

function getSelectedThemeRules() {
  const themeName =
    this?.hass?.selectedTheme?.theme ||
    this?.hass?.themes?.theme ||
    "";
  const theme = themeName
    ? this?.hass?.themes?.themes?.[themeName]
    : null;

  if (!theme) return {};

  const { modes, ...baseThemeRules } = theme;
  const darkMode =
    this?.hass?.themes?.darkMode ??
    this?.hass?.selectedTheme?.dark ??
    false;
  const modeRules = darkMode
    ? modes?.dark
    : modes?.light;

  return {
    ...baseThemeRules,
    ...(modeRules || {}),
  };
}

function getThemeColorIdFromVariableName(name) {
  return name.startsWith("color-")
    ? name.slice("color-".length)
    : name;
}

function isUsefulThemeColorId(id) {
  return Boolean(id) && !/^\d+$/.test(id);
}

function isThemeColorRule(name, value) {
  if (!name) return false;

  const isColorName =
    name.startsWith("color-") ||
    name.startsWith("google-") ||
    name.endsWith("-color") ||
    name.includes("-color-");

  if (!isColorName) return false;

  return isThemeColorValue(value);
}

function isThemeColorValue(value) {
  const color = value === undefined || value === null
    ? ""
    : value.toString().trim();

  if (!color) return false;

  return (
    /^#[0-9a-f]{3,8}$/i.test(color) ||
    /^(rgb|rgba|hsl|hsla)\(/i.test(color) ||
    /^var\(\s*--[a-z0-9-_]*color[a-z0-9-_]*/i.test(color) ||
    /^\d+\s*,\s*\d+\s*,\s*\d+/.test(color)
  );
}

function hasConfiguredThemeColor(color) {
  const names = new Set(getThemeColorVariableNames.call(this));
  const variableNames = getThemeCssVariableNames(color);

  return variableNames.some((name) => names.has(name));
}

function getThemeCssVariableNames(color) {
  const clean = normalizeThemeColorValue(color);

  if (!clean) return [];

  const direct = clean.startsWith("color-")
    ? clean
    : `color-${clean}`;

  return clean.endsWith("-color")
    ? [clean, direct]
    : [direct, clean];
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
  if (color === "primary-text-color") return t(this, "Primary text color");
  if (color === "card-background-color") return t(this, "Card background");
  if (color === "secondary-background-color") return t(this, "Secondary background color");
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
  "card-background-color",
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
  "state-inactive-color",
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
  if (hasNativeTemplateSyntax(color)) return "template";

  return isNativeColorValue(color)
    ? "picker"
    : "theme";
}

function isNativeColorValue(value) {
  const color = value?.toString().trim().toLowerCase();

  return Boolean(
    color &&
    (
      color.startsWith("#") ||
      color.startsWith("rgb") ||
      color.startsWith("hsl")
    )
  );
}
