export function getDeckChildConfig(item = {}) {
  return item?.badge || item?.card || {};
}

export function getDeckChildTypeName(item = {}, hass, fallback = "Card") {
  const child = getDeckChildConfig(item);
  const type = child?.type || "";

  if (!type) {
    return fallback;
  }

  const normalizedType = type.replace(/^custom:/, "");
  const registrations = item?.badge
    ? window.customBadges || []
    : window.customCards || [];
  const registration = registrations.find(
    (entry) => entry.type === type || entry.type === normalizedType
  );

  if (registration?.name) {
    return registration.name;
  }

  const translationKeys = item?.badge
    ? [
        `ui.panel.lovelace.editor.badges.${normalizedType}.name`,
        `ui.panel.lovelace.editor.badge.${normalizedType}.name`,
      ]
    : [
        `ui.panel.lovelace.editor.card.${normalizedType}.name`,
      ];

  for (const key of translationKeys) {
    const translated = hass?.localize?.(key);

    if (translated && translated !== key) {
      return translated;
    }
  }

  return normalizedType
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
