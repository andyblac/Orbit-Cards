export function getDeckItemPadding(item = {}) {
  const attributes = item?.attributes || {};

  return {
    top: normalizePaddingValue(attributes.padding_top),
    right: normalizePaddingValue(attributes.padding_right),
    bottom: normalizePaddingValue(attributes.padding_bottom),
    left: normalizePaddingValue(attributes.padding_left),
  };
}

export function hasDeckItemPadding(item = {}) {
  return Object.values(getDeckItemPadding(item)).some(Boolean);
}

export function isDeckItemPaddingForced(item = {}) {
  return item?.attributes?.force_padding === true;
}

export function shouldApplyDeckItemPadding(item = {}) {
  return (
    hasDeckItemPadding(item) &&
    (isDeckItemPaddingForced(item) || !hasChildPaddingConfig(item?.card))
  );
}

export function shouldStripChildPaddingConfig(item = {}) {
  return isDeckItemPaddingForced(item) && hasDeckItemPadding(item);
}

function hasChildPaddingConfig(value) {
  if (Array.isArray(value)) {
    return value.some((item) => hasChildPaddingConfig(item));
  }

  if (!value || typeof value !== "object") {
    if (typeof value === "string") {
      return /\bpadding(?:-(?:top|right|bottom|left))?\b/i.test(value);
    }

    return false;
  }

  return Object.entries(value).some(
    ([key, itemValue]) =>
      key.toLowerCase().includes("padding") ||
      hasChildPaddingConfig(itemValue)
  );
}

function normalizePaddingValue(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const text = value.toString().trim();

  if (!text) return "";
  if (/^-?\d+(\.\d+)?$/.test(text)) return `${text}px`;

  return text;
}
