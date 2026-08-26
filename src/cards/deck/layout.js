import { html } from "lit";
import { computeFullColor } from "../../common/helpers/colors.js";

export function getOverlayItemStyle(item = {}, index = 0) {
  const attributes = item?.attributes || {};
  const left = normalizeOverlayNumber(attributes.left, 0);
  const top = normalizeOverlayNumber(attributes.top, 0);
  const declarations = [
    `--orbit-deck-overlay-left:${left}px`,
    `--orbit-deck-overlay-top:${top}px`,
    `--orbit-deck-overlay-z-index:${index + 1}`,
  ];

  return `${declarations.join(";")};`;
}

function normalizeOverlayNumber(value, fallback) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function normalizeOverlayDimension(value) {
  const number = normalizeOverlayNumber(value, null);
  return number === null ? null : Math.max(0, number);
}

export function getOverlayFit(item = {}) {
  return item?.attributes?.fit === "crop" ? "crop" : "resize";
}

export function getOverlayGeometry(
  naturalWidth,
  naturalHeight,
  configuredWidth,
  configuredHeight,
  isCrop
) {
  if (isCrop) {
    return {
      width: configuredWidth ?? naturalWidth,
      height: configuredHeight ?? naturalHeight,
      scaleX: 1,
      scaleY: 1,
    };
  }

  if (configuredWidth === null && configuredHeight === null) {
    return {
      width: naturalWidth,
      height: naturalHeight,
      scaleX: 1,
      scaleY: 1,
    };
  }

  if (configuredWidth !== null && configuredHeight === null) {
    const scale = configuredWidth / naturalWidth;
    return {
      width: configuredWidth,
      height: naturalHeight * scale,
      scaleX: scale,
      scaleY: scale,
    };
  }

  if (configuredWidth === null && configuredHeight !== null) {
    const scale = configuredHeight / naturalHeight;
    return {
      width: naturalWidth * scale,
      height: configuredHeight,
      scaleX: scale,
      scaleY: scale,
    };
  }

  return {
    width: configuredWidth,
    height: configuredHeight,
    scaleX: configuredWidth / naturalWidth,
    scaleY: configuredHeight / naturalHeight,
  };
}


export function getTabWidthMode(config = {}) {
  return ["equal", "dynamic", "custom"].includes(config?.tab_width_mode)
    ? config.tab_width_mode
    : "equal";
}

export function getTabStyleVariables(config = {}) {
  return [
    config.tab_font_size
      ? `--orbit-deck-tab-font-size:${config.tab_font_size};`
      : "",
    colorVariable.call(this, "--orbit-deck-tab-color", config.tab_color),
    colorVariable.call(this, "--orbit-deck-tab-active-color", config.tab_active_color),
    colorVariable.call(this, "--orbit-deck-tab-background-color", config.tab_background_color),
  ].filter(Boolean).join("");
}

function colorVariable(name, color) {
  return color
    ? `${name}:${computeFullColor.call(this, color)};`
    : "";
}

export function chunkItems(items, size = 1) {
  const chunkSize = Math.max(1, size);
  const rows = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    rows.push(items.slice(index, index + chunkSize));
  }

  return rows;
}

export function renderRowSpacers(itemCount, columnCount) {
  return Array.from({ length: Math.max(0, columnCount - itemCount) }, () => html`
    <div class="deck-spacer"></div>
  `);
}
