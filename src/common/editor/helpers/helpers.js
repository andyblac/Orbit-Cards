import { html } from "lit";

import {
  isImageIcon,
  resolveIconPath,
  renderIconInput,
} from "./icon.js";
import {
  getInlineSvg,
} from "../../helpers/icons.js";

import {
  renderInput,
  renderTemplateInput,
} from "./inputs.js";

import {
  renderSectionHeader,
  renderSubSectionHeader,
  renderStatusSection,
  renderActionSelector,
  renderEntity,
  renderArea,
  renderColor,
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

  return `background-color: rgb(var(--color-${cleaned}));`;
}

export function getColorPickerValue(value) {
  const color = value?.toString().trim();

  if (!color) return "#ffffff";

  if (/^#[0-9a-f]{6}$/i.test(color)) {
    return color;
  }

  if (/^#[0-9a-f]{3}$/i.test(color)) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
  }

  const rgbMatch = color.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i
  );

  if (rgbMatch) {
    return rgbToHex(
      Number(rgbMatch[1]),
      Number(rgbMatch[2]),
      Number(rgbMatch[3])
    );
  }

  return "#ffffff";
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
  renderInput,
  renderTemplateInput,
  isImageIcon,
  resolveIconPath,
  renderIconInput,
  getInlineSvg,
};
