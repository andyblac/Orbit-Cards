import { html } from "lit";

import {
  isImageIcon,
  resolveIconPath,
  renderIconInput,
  renderIconSourceControl,
  loadLocalIconFiles,
} from "./icon.js";
import {
  getInlineSvg,
} from "../../helpers/icons.js";
import {
  getCssColor,
  getThemeColorVariableName,
  hasThemeColorName,
  isHaStandardColorName,
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
 * POPOVER HELPER
 * ========================================== */

export function connectEditorPopoverClose(editor) {
  if (editor._editorPopoverCloseHandler) return;

  editor._editorPopoverCloseHandler = (event) => {
    if (!editor._iconPickerKey && !editor._colorPickerKey) {
      return;
    }

    const path = event.composedPath?.() || [];

    if (isPickerInteraction(path)) {
      return;
    }

    editor._iconPickerKey = "";
    editor._colorPickerKey = "";
    editor._iconFilePickerOpen = false;
    editor._iconFileSearch = "";
    editor._themeColorPickerOpen = false;
    editor._themeColorSearch = "";
    editor.requestUpdate?.();
  };

  document.addEventListener(
    "pointerdown",
    editor._editorPopoverCloseHandler,
    true
  );

  editor.addEventListener(
    "pointerdown",
    editor._editorPopoverCloseHandler,
    true
  );
}

export function disconnectEditorPopoverClose(editor) {
  if (!editor._editorPopoverCloseHandler) return;

  document.removeEventListener(
    "pointerdown",
    editor._editorPopoverCloseHandler,
    true
  );

  editor.removeEventListener(
    "pointerdown",
    editor._editorPopoverCloseHandler,
    true
  );

  editor._editorPopoverCloseHandler = null;
}

function isPickerInteraction(path) {
  return path.some((node) => {
    const classList = node?.classList;
    const tagName = node?.tagName?.toLowerCase?.();

    return (
      classList?.contains("icon-popover") ||
      classList?.contains("color-popover") ||
      classList?.contains("icon-preview") ||
      classList?.contains("color-preview") ||
      classList?.contains("color-control-button") ||
      classList?.contains("mdc-menu-surface") ||
      tagName === "ha-generic-picker" ||
      tagName === "ha-icon-picker" ||
      tagName === "ha-combo-box" ||
      tagName === "ha-combo-box-item" ||
      tagName === "mwc-list" ||
      tagName === "mwc-list-item"
    );
  });
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

  const themeVariable = getThemeColorVariableName(color);
  const theme = hasThemeColorName(color)
    ? getCssVariableValue(themeVariable)
    : "";
  const standard = isHaStandardColorName(color)
    ? getCssVariableValue(`${color}-color`)
    : "";
  const direct = getCssVariableValue(color);
  const fallback =
    color.startsWith("color-")
      ? ""
      : getCssVariableValue(`color-${color}`);

  return getResolvedCssColorValue(theme, seen) ||
    getResolvedCssColorValue(standard, seen) ||
    getResolvedCssColorValue(direct, seen) ||
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
  renderIconSourceControl,
  loadLocalIconFiles,
  getInlineSvg,
};
