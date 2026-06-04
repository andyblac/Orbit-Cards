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

  if (color.startsWith("color-")) {
    return `rgb(var(--${color}))`;
  }

  return `var(--${color}, rgb(var(--color-${color}, var(--color-theme))))`;
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
