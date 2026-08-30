import {
  handleDoubleTapAction,
  handleTapAction,
  isAddCardPickerPreview,
} from "../../../common/helpers/actions.js";
import {
  CURRENT_ACTIVITY_ACTION,
  CURRENT_STATE_ACTION,
} from "../../../common/helpers/status-badge.js";
import {
  getCardDoubleTapAction,
  getCardHoldAction,
  getCardTapAction,
  getMainEntityDoubleTapAction,
  getMainEntityHoldAction,
  getMainEntityTapAction,
  getStatusItemCardDoubleTapAction,
  getStatusItemCardHoldAction,
  getStatusItemCardTapAction,
  getStatusItemMainEntityDoubleTapAction,
  getStatusItemMainEntityHoldAction,
  getStatusItemMainEntityTapAction,
} from "./action-config.js";

export const withStatusCardInteractions = (Base) => class extends Base {
  _handleTap(ev) {
    if (isAddCardPickerPreview(this)) return;
    if (this._shouldSuppressMainIconTap(ev)) {
      this._stopEvent(ev);
      return;
    }
    if (this._isMainIconEvent(ev)) {
      this._handleMainEntityTap(ev);
      return;
    }
    handleTapAction.call(
      this,
      ev,
      this._getStatusItemEntityId(0),
      this._getCardTapAction(),
      this._getCardDoubleTapAction()
    );
  }

  _handleDoubleTap(ev) {
    if (this._isMainIconEvent(ev)) {
      this._handleMainEntityDoubleTap(ev);
      return;
    }
    handleDoubleTapAction.call(
      this,
      ev,
      this._config.entity,
      this._getCardDoubleTapAction()
    );
  }

  _isMainIconEvent(ev) {
    const path = ev.composedPath();
    const clickedInsideIcon = path.some(
      (el) => el?.classList && (
        el.classList.contains("circle") ||
        el.classList.contains("status-circle") ||
        el.classList.contains("main-icon") ||
        el.classList.contains("main-image-icon")
      )
    );
    if (clickedInsideIcon) return true;

    const rect = this.shadowRoot
      ?.querySelector(".status-circle")
      ?.getBoundingClientRect();
    if (!rect) return false;
    return ev.clientX >= rect.left && ev.clientX <= rect.right &&
      ev.clientY >= rect.top && ev.clientY <= rect.bottom;
  }

  _handleMainEntityTap(ev) {
    if (isAddCardPickerPreview(this)) return;
    if (this._shouldSuppressMainIconTap(ev)) {
      this._stopEvent(ev);
      return;
    }
    if (this._longPressTriggered) {
      this._longPressTriggered = false;
      this._stopEvent(ev);
      return;
    }

    const mainEntity = this._getStatusItemEntityId(0);
    const tapAction = this._getMainEntityTapAction() || this._getCardTapAction();
    if (!mainEntity && !canExecuteStatusActionWithoutEntity(tapAction)) return;
    handleTapAction.call(
      this,
      ev,
      mainEntity,
      tapAction,
      this._getMainEntityDoubleTapAction()
    );
  }

  _handleMainEntityDoubleTap(ev) {
    handleDoubleTapAction.call(
      this,
      ev,
      this._config.entity,
      this._getMainEntityDoubleTapAction()
    );
  }

  _handleCardTapAction() {
    const cardAction = this._getCardTapAction();
    const mainEntity = this._getStatusItemEntityId(0);
    if (cardAction.action && cardAction.action !== "navigate") {
      this._handleAction(cardAction, mainEntity);
      return;
    }
    this._navigate(
      cardAction.navigation_path || this._navigationPath || "/lovelace/home"
    );
  }

  _handleCardPointerDown(ev) {
    if (isAddCardPickerPreview(this) || this._isMainIconEvent(ev)) return;
    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
    const holdAction = this._getCardHoldAction();
    if (!holdAction) return;
    this._statusItemHoldTimer = setTimeout(() => {
      this._statusItemLongPressTriggered = true;
      this._handleAction(holdAction, this._config.entity);
    }, this._LONG_PRESS_DELAY);
  }

  _handleCardPointerUp(ev) {
    if (this._isMainIconEvent(ev)) return;
    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
  }

  _handleCardPointerCancel(ev) {
    if (this._isMainIconEvent(ev)) return;
    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
  }

  _handleCardContextMenu(ev) {
    if (this._isMainIconEvent(ev)) return;
    this._stopEvent(ev);
    const holdAction = this._getCardHoldAction();
    if (!holdAction) return;
    this._clearStatusItemHoldTimer();
    this._statusItemLongPressTriggered = true;
    this._handleAction(holdAction, this._config.entity);
  }

  _handleStatusItemClick(ev, index = 0) {
    if (this._statusItemLongPressTriggered) {
      this._statusItemLongPressTriggered = false;
      this._stopEvent(ev);
      return;
    }
    const entityId = this._getStatusItemEntityId(index);
    const isMainIcon = this._isStatusItemMainIconEvent(ev);
    const actionConfig = isMainIcon
      ? this._getStatusItemMainEntityTapAction(index)
      : this._getStatusItemCardTapAction(index);
    const doubleTapAction = isMainIcon
      ? this._getStatusItemMainEntityDoubleTapAction(index)
      : this._getStatusItemCardDoubleTapAction(index);
    if (!entityId && !canExecuteStatusActionWithoutEntity(actionConfig)) return;
    handleTapAction.call(
      this,
      ev,
      entityId,
      actionConfig?.action
        ? getIndexedStatusAction(actionConfig, index)
        : { action: "more-info" },
      getIndexedStatusAction(doubleTapAction, index)
    );
  }

  _handleStatusItemDoubleClick(ev, index = 0) {
    handleDoubleTapAction.call(
      this,
      ev,
      this._getStatusItemEntityId(index),
      getIndexedStatusAction(
        this._isStatusItemMainIconEvent(ev)
          ? this._getStatusItemMainEntityDoubleTapAction(index)
          : this._getStatusItemCardDoubleTapAction(index),
        index
      )
    );
  }

  _handleStatusItemPointerDown(ev, index = 0) {
    if (isAddCardPickerPreview(this)) return;
    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
    const holdAction = this._isStatusItemMainIconEvent(ev)
      ? this._getStatusItemMainEntityHoldAction(index)
      : this._getStatusItemCardHoldAction(index);
    if (!holdAction) return;
    this._statusItemHoldTimer = setTimeout(() => {
      this._statusItemLongPressTriggered = true;
      this._handleAction(
        getIndexedStatusAction(holdAction, index),
        this._getStatusItemEntityId(index)
      );
    }, this._LONG_PRESS_DELAY);
  }

  _handleStatusItemPointerUp(ev) {
    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
  }

  _handleStatusItemPointerCancel(ev) {
    this._stopEvent(ev);
    this._clearStatusItemHoldTimer();
  }

  _handleStatusItemContextMenu(ev, index = 0) {
    this._stopEvent(ev);
    const holdAction = this._isStatusItemMainIconEvent(ev)
      ? this._getStatusItemMainEntityHoldAction(index)
      : this._getStatusItemCardHoldAction(index);
    if (!holdAction) return;
    this._clearStatusItemHoldTimer();
    this._statusItemLongPressTriggered = true;
    this._handleAction(
      getIndexedStatusAction(holdAction, index),
      this._getStatusItemEntityId(index)
    );
  }

  _handlePersonBadgeStop(ev) {
    if (ev.currentTarget?.dataEntity) ev.stopPropagation();
  }

  _handlePersonBadgePointerUp(ev) {
    const entityId = ev.currentTarget?.dataEntity;
    if (!entityId) return;
    ev.stopPropagation();
    this._personBadgeActionFired = true;
    this._openPersonBadgeMoreInfo(entityId);
  }

  _handlePersonBadgeClick(ev) {
    const entityId = ev.currentTarget?.dataEntity;
    if (!entityId) return;
    ev.stopPropagation();
    if (this._personBadgeActionFired) {
      this._personBadgeActionFired = false;
      return;
    }
    this._openPersonBadgeMoreInfo(entityId);
  }

  _openPersonBadgeMoreInfo(entityId) {
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      detail: { entityId },
      bubbles: true,
      composed: true,
    }));
  }

  _handleMainIconPointerDown(ev) {
    if (isAddCardPickerPreview(this)) return;
    if (this._isDuplicateTouchEvent(ev)) {
      this._stopEvent(ev);
      return;
    }
    this._trackPointerEvent(ev);
    this._stopEvent(ev);
    ev.currentTarget?.setPointerCapture?.(ev.pointerId);
    this._mainIconPointerDown = true;
    this._mainIconHoldFired = false;
    this._mainIconSuppressUntil = 0;
    this._clearMainIconHoldTimer();
    const holdAction = this._getMainEntityHoldAction();
    if (!holdAction) return;
    this._mainIconHoldTimer = setTimeout(() => {
      this._mainIconHoldFired = true;
      this._mainIconSuppressUntil = Date.now() + 1000;
      this._handleAction(holdAction, this._config.entity);
    }, this._LONG_PRESS_DELAY);
  }

  _handleMainIconPointerUp(ev) {
    if (this._isDuplicateTouchEvent(ev)) {
      this._stopEvent(ev);
      return;
    }
    this._trackPointerEvent(ev);
    this._stopEvent(ev);
    const holdFired = this._mainIconHoldFired;
    this._clearMainIconHoldTimer();
    this._mainIconPointerDown = false;
    if (holdFired) {
      this._mainIconSuppressClick = true;
      this._mainIconSuppressUntil = Date.now() + 1000;
      return;
    }
    this._handleMainEntityTap(ev);
    this._mainIconSuppressClick = true;
  }

  _handleMainIconPointerCancel(ev) {
    if (this._isDuplicateTouchEvent(ev)) {
      this._stopEvent(ev);
      return;
    }
    this._trackPointerEvent(ev);
    this._stopEvent(ev);
    if (!this._getMainEntityHoldAction()) {
      this._clearMainIconHoldTimer();
      this._mainIconPointerDown = false;
    }
  }

  _handleMainIconClick(ev) {
    this._stopEvent(ev);
    if (this._mainIconSuppressClick) this._mainIconSuppressClick = false;
  }

  _handleMainIconContextMenu(ev) {
    this._stopEvent(ev);
    const holdAction = this._getMainEntityHoldAction();
    if (holdAction && this._mainIconPointerDown && !this._mainIconHoldFired) {
      this._clearMainIconHoldTimer();
      this._mainIconHoldFired = true;
      this._mainIconSuppressClick = true;
      this._mainIconSuppressUntil = Date.now() + 1000;
      this._handleAction(holdAction, this._config.entity);
    }
  }

  _clearMainIconHoldTimer() {
    if (this._mainIconHoldTimer) {
      clearTimeout(this._mainIconHoldTimer);
      this._mainIconHoldTimer = null;
    }
  }

  _clearStatusItemHoldTimer() {
    if (this._statusItemHoldTimer) {
      clearTimeout(this._statusItemHoldTimer);
      this._statusItemHoldTimer = null;
    }
  }

  _getCardHoldAction() {
    return getCardHoldAction.call(this);
  }

  _getCardDoubleTapAction() {
    return getCardDoubleTapAction.call(this);
  }

  _getMainEntityHoldAction() {
    return getMainEntityHoldAction.call(this);
  }

  _getMainEntityTapAction() {
    return getMainEntityTapAction.call(this);
  }

  _getMainEntityDoubleTapAction() {
    return getMainEntityDoubleTapAction.call(this);
  }

  _getCardTapAction() {
    return getCardTapAction.call(this);
  }

  _getStatusItemCardTapAction(index = 0) {
    return getStatusItemCardTapAction.call(this, index);
  }

  _getStatusItemCardHoldAction(index = 0) {
    return getStatusItemCardHoldAction.call(this, index);
  }

  _getStatusItemCardDoubleTapAction(index = 0) {
    return getStatusItemCardDoubleTapAction.call(this, index);
  }

  _getStatusItemMainEntityTapAction(index = 0) {
    return getStatusItemMainEntityTapAction.call(this, index);
  }

  _getStatusItemMainEntityDoubleTapAction(index = 0) {
    return getStatusItemMainEntityDoubleTapAction.call(this, index);
  }

  _getStatusItemMainEntityHoldAction(index = 0) {
    return getStatusItemMainEntityHoldAction.call(this, index);
  }
};

export function canExecuteStatusActionWithoutEntity(actionConfig) {
  const action = actionConfig?.action;
  if (action === CURRENT_STATE_ACTION) return true;
  if (action === CURRENT_ACTIVITY_ACTION) return true;
  if (action === "more-info") {
    return Boolean(actionConfig.entity || actionConfig.entity_id);
  }
  return [
    "navigate",
    "url",
    "perform-action",
    "call-service",
    "fire-dom-event",
    "popup",
    "none",
  ].includes(action);
}

export function getIndexedStatusAction(actionConfig, index) {
  if (
    ![CURRENT_STATE_ACTION, CURRENT_ACTIVITY_ACTION].includes(
      actionConfig?.action
    )
  ) {
    return actionConfig;
  }
  return { ...actionConfig, status_index: index };
}
