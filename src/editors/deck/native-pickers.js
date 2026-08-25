export async function ensureNativeBadgePicker() {
  if (this._badgePickerLoadRequested) {
    return;
  }

  this._badgePickerLoadRequested = true;

  try {
    if (window.loadCardHelpers) {
      await window.loadCardHelpers();
    }

    if (!customElements.get("hui-badge-picker")) {
      await this._loadNativeBadgeModule({
        eventName: "ll-create-badge",
        dialogTag: "hui-dialog-create-badge",
      });
    }

    await Promise.race([
      customElements.whenDefined("hui-badge-picker"),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
  } catch (_err) {
    // Keep the editor usable if HA changes its internal badge loader.
  } finally {
    this._badgePickerLoadRequested = false;
    this.requestUpdate();
  }
}

export async function ensureNativeBadgeEditor() {
  if (this._badgeEditorLoadRequested) {
    return;
  }

  this._badgeEditorLoadRequested = true;

  try {
    if (window.loadCardHelpers) {
      await window.loadCardHelpers();
    }

    if (!customElements.get("hui-badge-element-editor")) {
      const huiView = this._findElementInShadowRoots(
        document,
        (element) =>
          element.localName === "hui-view" && element._layoutElement
      );
      const viewIndex = Number.isInteger(huiView?.index)
        ? huiView.index
        : 0;

      await this._loadNativeBadgeModule({
        eventName: "ll-edit-badge",
        dialogTag: "hui-dialog-edit-badge",
        detail: { path: [viewIndex, 0] },
        huiView,
      });
    }

    await Promise.race([
      customElements.whenDefined("hui-badge-element-editor"),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
  } catch (_err) {
    // Keep the editor usable if HA changes its internal badge loader.
  } finally {
    this._badgeEditorLoadRequested = false;
    this.requestUpdate();
  }
}

export async function loadNativeBadgeModule({
  eventName,
  dialogTag,
  detail,
  huiView: providedHuiView,
}) {
  const huiView = providedHuiView || this._findElementInShadowRoots(
    document,
    (element) =>
      element.localName === "hui-view" && element._layoutElement
  );

  if (!huiView) {
    return;
  }

  let badgeDialogImport;
  const captureBadgeLoader = (event) => {
    if (event.detail?.dialogTag !== dialogTag) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    badgeDialogImport = event.detail.dialogImport;
  };

  huiView.addEventListener("show-dialog", captureBadgeLoader);
  try {
    huiView._layoutElement.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: false,
        composed: true,
      })
    );
  } finally {
    huiView.removeEventListener("show-dialog", captureBadgeLoader);
  }

  if (typeof badgeDialogImport === "function") {
    await badgeDialogImport();
  }
}

export function findElementInShadowRoots(root, predicate) {
  const elements = root.querySelectorAll?.("*") || [];

  for (const element of elements) {
    if (predicate(element)) {
      return element;
    }

    if (element.shadowRoot) {
      const match = this._findElementInShadowRoots(
        element.shadowRoot,
        predicate
      );
      if (match) {
        return match;
      }
    }
  }

  return undefined;
}

export async function ensureNativeCardPicker() {
  if (this._cardPickerLoadRequested) {
    return;
  }

  this._cardPickerLoadRequested = true;

  try {
    if (window.loadCardHelpers) {
      await window.loadCardHelpers();
    }

    await Promise.race([
      customElements.whenDefined("hui-card-picker"),
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);
  } catch (_err) {
    // HA does not expose a public card picker loader for custom editors.
  } finally {
    this._cardPickerLoadRequested = false;
    this.requestUpdate();
  }
}
