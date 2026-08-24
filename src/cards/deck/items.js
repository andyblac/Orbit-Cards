import { isActionEnabled } from "../../common/helpers/actions.js";
import {
  shouldStripChildPaddingConfig,
} from "../../common/helpers/deck-padding.js";

export function getDeckItems(config = {}) {
  return Array.isArray(config?.decks)
    ? config.decks.map((item) => item?.badge
      ? {
          attributes: item?.attributes || {},
          badge: item.badge || {},
        }
      : {
          attributes: item?.attributes || {},
          card: item?.card || {},
        })
    : [];
}


export function hasDeckItemActions(item = {}) {
  return [
    getDeckItemAction(item, "tap_action"),
    getDeckItemAction(item, "hold_action"),
    getDeckItemAction(item, "double_tap_action"),
  ].some(isActionEnabled);
}

export function getDeckItemAction(item = {}, key) {
  const action = item?.attributes?.[key];

  return action?.action ? action : null;
}

export function getDeckItemEntity(item = {}) {
  const child = getDeckItemConfig(item);

  return (
    item?.attributes?.entity ||
    getActionEntity(item?.attributes?.tap_action) ||
    getActionEntity(item?.attributes?.hold_action) ||
    getActionEntity(item?.attributes?.double_tap_action) ||
    getActionEntity(child?.tap_action) ||
    getActionEntity(child?.hold_action) ||
    getActionEntity(child?.double_tap_action) ||
    child?.entity ||
    null
  );
}

export function getDeckItemRenderConfig(item = {}, flattenSurface = false) {
  const child = getDeckItemConfig(item);
  const renderChild = shouldStripChildPaddingConfig(item)
    ? removeChildPaddingConfig(child)
    : child;
  let renderConfig = renderChild;

  const overriddenActionKeys = [
    "tap_action",
    "hold_action",
    "double_tap_action",
  ].filter((key) => isActionEnabled(getDeckItemAction(item, key)));

  if (overriddenActionKeys.length) {
    renderConfig = { ...renderChild };
    overriddenActionKeys.forEach((key) => delete renderConfig[key]);
  }

  // Some custom cards paint their surface through their own configuration
  // instead of the standard ha-card variables. Pass the common native switch
  // to every embedded card in combined mode; cards that do not support it
  // simply ignore the additional configuration key.
  if (flattenSurface) {
    return {
      ...renderConfig,
      hide_background: true,
    };
  }

  return renderConfig;
}

export function getDeckItemKind(item = {}) {
  return item?.badge ? "badge" : "card";
}

export function getDeckItemConfig(item = {}) {
  return item?.badge || item?.card || {};
}

function removeChildPaddingConfig(value) {
  if (Array.isArray(value)) {
    return value.map((item) => removeChildPaddingConfig(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.entries(value).reduce((result, [key, itemValue]) => {
    if (key.toLowerCase().includes("padding")) {
      return result;
    }

    result[key] = removeChildPaddingConfig(itemValue);

    return result;
  }, {});
}

function getActionEntity(actionConfig) {
  return actionConfig?.entity || actionConfig?.entity_id || null;
}

export function getDefaultDeckIndex(decks = []) {
  return Math.max(
    0,
    decks.findIndex((item) => item.attributes?.default)
  );
}

export function getDefaultSelectionKey(decks = []) {
  return decks
    .map((item, index) => item.attributes?.default ? index : "")
    .join(":");
}

