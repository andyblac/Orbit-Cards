import {
  clearDoubleTapTimer,
  handleAction,
  navigate,
  stopActionEvent,
} from "./actions.js";
import {
  LONG_PRESS_DELAY,
  cancelLongPress,
  finishLongPress,
  startLongPress,
} from "./long-press.js";

export const withCommonCardInteractions = (Base) => class extends Base {
  get _LONG_PRESS_DELAY() {
    return LONG_PRESS_DELAY;
  }

  _handleAction(actionConfig, entityId = null) {
    return handleAction.call(this, actionConfig, entityId);
  }

  _navigate(path) {
    return navigate.call(this, path);
  }

  _clearDoubleTapTimer() {
    return clearDoubleTapTimer.call(this);
  }

  _startLongPress(ev, entityId, longPressAction) {
    return startLongPress.call(this, ev, entityId, longPressAction);
  }

  _cancelLongPress() {
    return cancelLongPress.call(this);
  }

  _finishLongPress(ev) {
    return finishLongPress.call(this, ev);
  }

  _stopEvent(ev) {
    return stopActionEvent(ev);
  }
};
