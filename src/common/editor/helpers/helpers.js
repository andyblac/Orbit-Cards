import { html } from "lit";

import {
  isImageIcon,
  resolveIconPath,
  renderIconInput,
  loadLocalIconFiles,
} from "./icon.js";
import {
  getInlineSvg,
} from "../../helpers/icons.js";
import {
  getCssColor,
} from "../../helpers/colors.js";

import {
  renderInput,
  renderTemplateInput,
} from "./inputs.js";
export {
  clearEntityConfig,
  clearKeys,
  clearPrefixedEntityConfig,
  mergeConfig,
} from "./config.js";

import {
  renderSectionHeader,
  renderSubSectionHeader,
  renderStatusSection,
  renderActionSelector,
  renderEntity,
  renderArea,
  renderColor,
  renderColorControl,
} from "./renders.js";

/* ==========================================
 * COLLAPSE HELPER
 * ========================================== */

export function toggleSection(section) {
  this._collapsed = {
    ...this._collapsed,
    [section]: !this._collapsed?.[section],
  };

  this.requestUpdate("_collapsed");
}

/* ==========================================
 * COLOUR HELPER
 * ========================================== */

export function getColorStyle(value) {
  if (!value) {
    return "background-color: rgb(var(--color-theme));";
  }

  const v = value
    .toString()
    .trim()
    .toLowerCase();

  if (
    v.startsWith("#") ||
    v.startsWith("rgb(") ||
    v.startsWith("hsl(")
  ) {
    return `background-color:${v};`;
  }

  const cleaned = v.replace(
    /[^a-z0-9-_]/g,
    ""
  );

  if (!cleaned) {
    return "background-color: rgb(var(--color-theme));";
  }

  return `background-color: ${getCssColor(cleaned)};`;
}

export function getColorPickerValue(value) {
  const color = value?.toString().trim();

  if (!color) return "#ffffff";

  const directHex = normalizeHex(color);

  if (directHex) return directHex;

  const directRgb = getRgbHex(color);

  if (directRgb) return directRgb;

  return resolveThemeColorValue(color) || "#ffffff";
}

function resolveThemeColorValue(value, seen = new Set()) {
  const color = value
    ?.toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "");

  if (!color || seen.has(color)) return "";

  seen.add(color);

  const direct = getCssVariableValue(color);
  const fallback =
    color.startsWith("color-")
      ? ""
      : getCssVariableValue(`color-${color}`);

  return getResolvedCssColorValue(direct, seen) ||
    getResolvedCssColorValue(fallback, seen) ||
    "";
}

function getResolvedCssColorValue(value, seen) {
  const color = value?.trim();

  if (!color) return "";

  const hex = normalizeHex(color);

  if (hex) return hex;

  const rgb = getRgbHex(color);

  if (rgb) return rgb;

  const cssVar = color.match(/^var\(\s*--([^),\s]+)\s*\)$/i);

  if (cssVar) {
    return resolveThemeColorValue(cssVar[1], seen);
  }

  return "";
}

function getCssVariableValue(name) {
  const variable = `--${name}`;
  const roots = [
    document.documentElement,
    document.body,
  ].filter(Boolean);

  for (const root of roots) {
    const value = getComputedStyle(root)
      .getPropertyValue(variable)
      .trim();

    if (value) return value;
  }

  return "";
}

function normalizeHex(color) {
  if (/^#[0-9a-f]{6}$/i.test(color)) {
    return color;
  }

  if (/^#[0-9a-f]{3}$/i.test(color)) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }

  return "";
}

function getRgbHex(color) {
  const cssRgbMatch = color.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i
  );

  if (cssRgbMatch) {
    return rgbToHex(
      Number(cssRgbMatch[1]),
      Number(cssRgbMatch[2]),
      Number(cssRgbMatch[3])
    );
  }

  const themeRgbMatch = color.match(
    /^\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/i
  );

  if (themeRgbMatch) {
    return rgbToHex(
      Number(themeRgbMatch[1]),
      Number(themeRgbMatch[2]),
      Number(themeRgbMatch[3])
    );
  }

  return "";
}

function rgbToHex(r, g, b) {
  return `#${clampColor(r)}${clampColor(g)}${clampColor(b)}`;
}

function clampColor(value) {
  return Math.max(0, Math.min(255, value || 0))
    .toString(16)
    .padStart(2, "0");
}

export {
  renderSectionHeader,
  renderSubSectionHeader,
  renderStatusSection,
  renderActionSelector,
  renderEntity,
  renderArea,
  renderColor,
  renderColorControl,
  renderInput,
  renderTemplateInput,
  isImageIcon,
  resolveIconPath,
  renderIconInput,
  loadLocalIconFiles,
  getInlineSvg,
};
