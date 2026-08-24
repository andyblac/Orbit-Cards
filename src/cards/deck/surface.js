import {
  getDeckItemPadding,
  isDeckItemPaddingForced,
  shouldApplyDeckItemPadding,
} from "../../common/helpers/deck-padding.js";
import {
  getDeckItemConfig,
  getDeckItemKind,
} from "./items.js";

export function getDeckPaddingApplyKey(entries = []) {
  return entries.map((entry) => {
    if (!entry?.element) {
      return `${entry?.index ?? ""}:none`;
    }

    const padding = getDeckItemPadding(entry.item);
    const forcePadding = isDeckItemPaddingForced(entry.item);
    const activePadding = shouldApplyDeckItemPadding(entry.item);

    return [
      entry.index,
      entry.kind || getDeckItemKind(entry.item),
      getDeckItemConfig(entry.item)?.type || "",
      forcePadding ? "force" : "child",
      activePadding ? padding.top : "",
      activePadding ? padding.right : "",
      activePadding ? padding.bottom : "",
      activePadding ? padding.left : "",
    ].join(":");
  }).join("|");
}

export function getDeckItemWrapper(root, index) {
  return root?.querySelector?.(`.deck-item-interaction[data-deck-index="${index}"]`);
}

export function shouldFlattenDeckCardSurface(config = {}, item = {}, index = 0) {
  const configured = item?.attributes?.transparent_background;

  if (config?.layout === "wrap") {
    return typeof configured === "boolean"
      ? configured
      : !config?.separate_cards;
  }

  if (config?.layout === "overlay") {
    return index > 0 && configured === true;
  }

  return config?.layout === "tabs" && configured !== false;
}

const DECK_CARD_SURFACE_STYLES = {
  "--ha-card-background": "transparent",
  "--card-background-color": "transparent",
  "--ha-card-box-shadow": "none",
  "--ha-card-border-color": "transparent",
  "--ha-card-backdrop-filter": "none",
  background: "transparent",
  "backdrop-filter": "none",
  "-webkit-backdrop-filter": "none",
  "border-color": "transparent",
  "box-shadow": "none",
};

export function applyDeckCardSurface(element, flatten) {
  if (flatten) {
    if (!element._orbitDeckSurfaceStyles) {
      element._orbitDeckSurfaceStyles = Object.fromEntries(
        Object.keys(DECK_CARD_SURFACE_STYLES).map((property) => [
          property,
          {
            value: element.style.getPropertyValue(property),
            priority: element.style.getPropertyPriority(property),
          },
        ])
      );
    }

    applyDeckCardSurfaceStyles(element);
    connectDeckCardSurfaceObserver(element);
    return;
  }

  const previousStyles = element._orbitDeckSurfaceStyles;

  if (!previousStyles) return;

  disconnectDeckCardSurfaceObserver(element);

  Object.entries(previousStyles).forEach(([property, previous]) => {
    if (previous.value) {
      element.style.setProperty(property, previous.value, previous.priority);
    } else {
      element.style.removeProperty(property);
    }
  });
  delete element._orbitDeckSurfaceStyles;
}

function applyDeckCardSurfaceStyles(element) {
  Object.entries(DECK_CARD_SURFACE_STYLES).forEach(([property, value]) => {
    if (
      element.style.getPropertyValue(property) !== value ||
      element.style.getPropertyPriority(property) !== "important"
    ) {
      element.style.setProperty(property, value, "important");
    }
  });
}

function connectDeckCardSurfaceObserver(element) {
  if (element._orbitDeckSurfaceObserver) return;

  element._orbitDeckSurfaceObserver = new MutationObserver(() => {
    if (!element._orbitDeckSurfaceStyles) return;

    applyDeckCardSurfaceStyles(element);
  });

  element._orbitDeckSurfaceObserver.observe(element, {
    attributes: true,
    attributeFilter: ["style"],
  });
}

function disconnectDeckCardSurfaceObserver(element) {
  element._orbitDeckSurfaceObserver?.disconnect();
  element._orbitDeckSurfaceObserver = null;
}

export function getCardElements(element) {
  const cards = new Set();

  collectCardElements(element, cards, new WeakSet());
  return [...cards];
}

function collectCardElements(element, cards, seen) {
  if (!element || seen.has(element)) return;

  seen.add(element);

  if (element.localName === "ha-card") {
    cards.add(element);
  }

  const roots = [element.shadowRoot, element].filter(Boolean);

  roots.forEach((root) => {
    const children = root.querySelectorAll?.("*") || [];

    for (const child of children) {
      if (child.localName === "ha-card") {
        cards.add(child);
      }
      if (child.shadowRoot) {
        collectCardElements(child, cards, seen);
      }
    }
  });
}

export function applyPaddingTarget(element, padding, applied) {
  applyPaddingStyles(
    element,
    applied
      ? padding
      : { top: "", right: "", bottom: "", left: "" }
  );
  element._orbitDeckPaddingApplied = applied;
}

function applyPaddingStyles(element, padding) {
  setPaddingStyle(element, "padding-top", padding.top);
  setPaddingStyle(element, "padding-right", padding.right);
  setPaddingStyle(element, "padding-bottom", padding.bottom);
  setPaddingStyle(element, "padding-left", padding.left);
}

function setPaddingStyle(element, property, value) {
  if (value) {
    if (
      element.style.getPropertyValue(property) !== value ||
      element.style.getPropertyPriority(property) !== "important"
    ) {
      element.style.setProperty(property, value, "important");
    }
  } else {
    element.style.removeProperty(property);
  }
}

export function connectDeckPaddingObserver(element, padding) {
  element._orbitDeckPadding = padding;

  if (element._orbitDeckPaddingObserver) return;

  element._orbitDeckPaddingObserver = new MutationObserver(() => {
    if (!element._orbitDeckPadding) return;

    applyPaddingStyles(element, element._orbitDeckPadding);
  });

  element._orbitDeckPaddingObserver.observe(element, {
    attributes: true,
    attributeFilter: ["style"],
  });
}

export function disconnectDeckPaddingObserver(element) {
  element._orbitDeckPadding = null;
  element._orbitDeckPaddingObserver?.disconnect();
  element._orbitDeckPaddingObserver = null;
}
