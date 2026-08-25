const DECK_CONFIG_ORDER = [
  "type",
  "layout",
  "items_per_row",
  "separate_cards",
  "tab_font_size",
  "tab_divider",
  "tab_width_mode",
  "tab_color",
  "tab_active_color",
  "tab_background_color",
  "decks",
  "grid_options",
  "view_layout",
];

const DECK_ITEM_KEYS = [
  "attributes",
  "badge",
  "card",
];

export function orderDeckConfig(config) {
  const ordered = {};
  const usedKeys = new Set();

  DECK_CONFIG_ORDER.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      ordered[key] = key === "decks" && Array.isArray(config[key])
        ? config[key].map(orderDeckItem)
        : config[key];
      usedKeys.add(key);
    }
  });

  Object.keys(config).forEach((key) => {
    if (!usedKeys.has(key)) {
      ordered[key] = config[key];
    }
  });

  return ordered;
}

export function normalizeDeckAttributeLabels(config) {
  if (!Array.isArray(config?.decks)) {
    return { config, changed: false };
  }

  let changed = false;
  const decks = config.decks.map((item) => {
    const attributes = item?.attributes || {};

    if (!Object.prototype.hasOwnProperty.call(attributes, "label")) {
      return item;
    }

    changed = true;
    const {
      label,
      ...restAttributes
    } = attributes;

    return {
      ...item,
      attributes: {
        ...restAttributes,
        name: attributes.name || label,
      },
    };
  });

  return changed
    ? {
        config: {
          ...config,
          decks,
        },
        changed,
      }
    : { config, changed };
}

export function normalizeDeckItem(item = {}) {
  if (item?.badge) {
    return {
      attributes: item.attributes || {},
      badge: item.badge || {},
    };
  }

  return {
    attributes: item?.attributes || {},
    card: item?.card || {},
  };
}

function orderDeckItem(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return item;
  }

  const ordered = {};
  const usedKeys = new Set();

  const cleanedItem = {
    ...item,
    attributes: cleanObject(item.attributes || {}),
  };

  if (item.badge?.type) {
    cleanedItem.badge = item.badge;
    delete cleanedItem.card;
  } else if (item.card?.type) {
    cleanedItem.card = item.card;
    delete cleanedItem.badge;
  } else {
    delete cleanedItem.badge;
    delete cleanedItem.card;
  }

  DECK_ITEM_KEYS.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(cleanedItem, key)) {
      ordered[key] = cleanedItem[key];
      usedKeys.add(key);
    }
  });

  Object.keys(cleanedItem).forEach((key) => {
    if (!usedKeys.has(key)) {
      ordered[key] = cleanedItem[key];
    }
  });

  return ordered;
}

function cleanObject(value = {}) {
  return Object.entries(value).reduce((result, [key, itemValue]) => {
    if (itemValue !== undefined && itemValue !== "") {
      result[key] = itemValue;
    }

    return result;
  }, {});
}
