import { html } from "lit";

import {
  isImageIcon,
  resolveIconPath,
  renderIconInput,
} from "./icon.js";

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
};
