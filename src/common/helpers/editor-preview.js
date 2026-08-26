export function isCardEditorPreview(element) {
  let current = element;

  while (current) {
    const localName = current.localName || "";

    if (
      localName === "hui-dialog-edit-card" ||
      localName === "hui-dialog-edit-badge"
    ) {
      return true;
    }

    const root = current.getRootNode?.();
    current =
      current.parentElement ||
      current.assignedSlot ||
      root?.host ||
      null;
  }

  return false;
}
