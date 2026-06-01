export const LONG_PRESS_DELAY = 500;

export function startLongPress(ev, entityId, longPressAction) {
  if (!longPressAction) return;

  ev.stopPropagation();

  this._cancelLongPress();

  this._longPressTriggered = false;

  this._longPressTimer = setTimeout(() => {
    this._longPressTriggered = true;

    this._handleAction(
      longPressAction,
      entityId
    );
  }, this._LONG_PRESS_DELAY);
}

export function cancelLongPress() {
  if (this._longPressTimer) {
    clearTimeout(this._longPressTimer);
    this._longPressTimer = null;
  }
}

export function finishLongPress(ev) {
  this._cancelLongPress();

  if (this._longPressTriggered) {
    ev.preventDefault();
    ev.stopPropagation();

    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    }

    return true;
  }

  return false;
}
