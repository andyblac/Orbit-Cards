const ORBIT_WIKI_BASE_URL =
  "https://github.com/andyblac/Orbit-Cards/wiki";

const DOCUMENTATION_CONTEXTS = {
  "orbit-area-card": {
    default: "Area-Card",
    card: "Area-Card#main-layout",
    status: "Area-Card#status-row",
    buttons: "Area-Card#side-buttons",
    curve: "Area-Card#curved-buttons",
    action: "Area-Card#action-button",
  },
  "orbit-room-card": {
    default: "Area-Card",
    card: "Area-Card#main-layout",
    status: "Area-Card#status-row",
    buttons: "Area-Card#side-buttons",
    curve: "Area-Card#curved-buttons",
    action: "Area-Card#action-button",
  },
  "orbit-status-card": {
    default: "Status-Card",
  },
  "orbit-action-card": {
    default: "Action-Card",
  },
  "orbit-deck-card": {
    default: "Deck-Card",
    "setup-wrap": "Deck-Card#wrap-layout",
    "setup-tabs": "Deck-Card#tabs-layout",
    "setup-overlay": "Deck-Card#overlay-layout",
    card: "Deck-Card#deck-items",
  },
};

function normalizeCardType(cardType = "") {
  return cardType.replace(/^custom:/, "");
}

export function getOrbitDocumentationURL(cardType, context = "default") {
  const documentation = DOCUMENTATION_CONTEXTS[normalizeCardType(cardType)];
  const path = documentation?.[context] || documentation?.default;

  return path
    ? `${ORBIT_WIKI_BASE_URL}/${path}`
    : `${ORBIT_WIKI_BASE_URL}`;
}

export function updateEditorDocumentationContext(
  editor,
  cardType,
  context = "default"
) {
  const documentationURL = getOrbitDocumentationURL(cardType, context);

  queueMicrotask(() => {
    const dialog = findComposedAncestor(editor, "hui-dialog-edit-card");

    if (!dialog || dialog._documentationURL === documentationURL) {
      return;
    }

    // Keep Home Assistant's native help button, changing only its destination.
    dialog._documentationURL = documentationURL;
    dialog.requestUpdate?.();
  });
}

function findComposedAncestor(element, tagName) {
  let current = element;

  while (current) {
    if (current.localName === tagName) {
      return current;
    }

    const root = current.getRootNode?.();
    current = current.parentElement || root?.host || null;
  }

  return null;
}
