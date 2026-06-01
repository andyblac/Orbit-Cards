export function computeFullColor(colorInput) {
  if (!colorInput) return "rgb(var(--color-theme))";

  const color = colorInput.toString().trim();

  if (color.startsWith("rgb") || color.startsWith("#")) {
    return color;
  }

  return `rgb(var(--color-${color}))`;
}

export function computeIconColor(colorInput) {
  if (!colorInput) return "rgba(var(--color-theme), 0.4)";

  const color = colorInput.toString().trim();

  if (color === "theme") {
    return "rgba(var(--color-theme), 0.4)";
  }

  if (color.startsWith("rgb") || color.startsWith("#")) {
    return `color-mix(in srgb, transparent, ${color} 70%)`;
  }

  return `rgba(var(--color-${color}), 0.7)`;
}

export function computeCircleColor(colorInput) {
  if (!colorInput) return "rgba(var(--color-theme), 0.2)";

  const color = colorInput.toString().trim();

  if (color.startsWith("rgb") || color.startsWith("#")) {
    return `color-mix(in srgb, transparent, ${color} 20%)`;
  }

  if (color === "theme") {
    return "rgba(var(--color-theme), 0.05)";
  }

  return `rgba(var(--color-${color}), 0.2)`;
}

export function computeButtonBackground(colorInput) {
  if (!colorInput) return "rgba(var(--color-theme), 0.25)";

  const color = colorInput.toString().trim();

  if (color.startsWith("rgb") || color.startsWith("#")) {
    return `color-mix(in srgb, ${color} 25%, transparent)`;
  }

  return `rgba(var(--color-${color}), 0.25)`;
}
