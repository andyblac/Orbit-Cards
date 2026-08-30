let installed = false;

export function installEntityFilterScrollGuard() {
  if (installed) return;

  const originalScrollIntoView = Element.prototype.scrollIntoView;

  Element.prototype.scrollIntoView = function (...args) {
    if (isOrbitEntityFilterPickerElement(this)) {
      resetOrbitEntityFilterPickerScroll(this);
      return;
    }

    return originalScrollIntoView.apply(this, args);
  };

  installed = true;
}

function resetOrbitEntityFilterPickerScroll(node) {
  let current = node;

  while (current) {
    if (current.tagName?.toLowerCase?.() === "lit-virtualizer") {
      current.scrollTop = 0;
      return;
    }

    const root = current.getRootNode?.();

    if (root?.host && root.host !== current) {
      current = root.host;
      continue;
    }

    current = current.parentNode || current.host;
  }
}

function isOrbitEntityFilterPickerElement(node) {
  let current = node;

  while (current) {
    if (current.__orbitSuppressSectionScroll) {
      return true;
    }

    const root = current.getRootNode?.();

    if (root?.host && root.host !== current) {
      current = root.host;
      continue;
    }

    current = current.parentNode || current.host;
  }

  return false;
}
