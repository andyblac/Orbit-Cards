export function computeFullColor(colorInput) {
  if (!colorInput) return "rgb(var(--color-theme))";

  const color = colorInput.toString().trim();

  if (isCssColor(color)) {
    return color;
  }

  return getCssColor(color);
}

export function computeIconColor(colorInput) {
  if (!colorInput) return "rgba(var(--color-theme), 0.4)";

  const color = colorInput.toString().trim();

  if (color === "theme") {
    return "rgba(var(--color-theme), 0.4)";
  }

  if (isCssColor(color)) {
    return `color-mix(in srgb, transparent, ${color} 70%)`;
  }

  return getColorMix(color, 70);
}

export function computeCircleColor(colorInput) {
  if (!colorInput) return "rgba(var(--color-theme), 0.2)";

  const color = colorInput.toString().trim();

  if (isCssColor(color)) {
    return `color-mix(in srgb, transparent, ${color} 20%)`;
  }

  if (color === "theme") {
    return "rgba(var(--color-theme), 0.05)";
  }

  return getColorMix(color, 20);
}

export function computeButtonBackground(colorInput) {
  if (!colorInput) return "rgba(var(--color-theme), 0.25)";

  const color = colorInput.toString().trim();

  if (isCssColor(color)) {
    return `color-mix(in srgb, ${color} 25%, transparent)`;
  }

  return getColorMix(color, 25);
}

export function getCssColor(colorInput) {
  const color = cleanColorName(colorInput);

  if (!color) return "rgb(var(--color-theme))";

  if (color === "light") {
    return "var(--state-light-active-color, var(--state-active-color, rgb(var(--color-theme))))";
  }

  const themeColorVariable = getThemeColorVariableName(color);

  if (isHaStandardColorName(color)) {
    return themeColorVariable
      ? `rgb(var(--${themeColorVariable}))`
      : `var(--${color}-color, var(--${color}, rgb(var(--color-theme))))`;
  }

  if (color.startsWith("color-")) {
    return `rgb(var(--${color}))`;
  }

  return `var(--${color}, rgb(var(--color-${color}, var(--color-theme))))`;
}

export function isHaStandardColorName(colorInput) {
  return HA_STANDARD_COLOR_NAMES.has(cleanColorName(colorInput));
}

export const HA_STANDARD_COLOR_NAMES = new Set([
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
]);

export function hasThemeColorName(colorInput) {
  return Boolean(getThemeColorVariableName(colorInput));
}

export function getThemeColorVariableName(colorInput) {
  const color = cleanColorName(colorInput);

  if (!color) return "";

  return getThemeColorVariableNames(color).find(hasCssVariable) || "";
}

function getThemeColorVariableNames(color) {
  const base = color.startsWith("color-")
    ? color.slice(6)
    : color;
  const aliases = COLOR_THEME_ALIASES[base] || [];

  return [
    `color-${base}`,
    ...aliases.map((alias) => `color-${alias}`),
  ];
}

const COLOR_THEME_ALIASES = {
  "blue-grey": ["bluegrey"],
  "dark-grey": ["darkgrey"],
  "deep-orange": ["deeporange"],
  "deep-purple": ["deeppurple"],
  "light-blue": ["lightblue"],
  "light-green": ["lightgreen"],
  "light-grey": ["lightgrey"],
};

function hasCssVariable(name) {
  if (typeof document === "undefined") return false;

  const roots = [
    document.documentElement,
    document.body,
  ].filter(Boolean);

  return roots.some((root) =>
    getComputedStyle(root)
      .getPropertyValue(`--${name}`)
      .trim()
  );
}

export function getColorMix(colorInput, percent) {
  return `color-mix(in srgb, transparent, ${getCssColor(colorInput)} ${percent}%)`;
}

export function isCssColor(colorInput) {
  const color = colorInput.toString().trim();

  return (
    color.startsWith("rgb") ||
    color.startsWith("hsl") ||
    color.startsWith("#")
  );
}

function cleanColorName(colorInput) {
  return colorInput
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "");
}
