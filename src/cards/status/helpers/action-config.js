import { isActionEnabled } from "../../../common/helpers/actions.js";

export function getCardHoldAction() {
  return isActionEnabled(this._config.hold_action)
    ? this._config.hold_action
    : null;
}

export function getCardDoubleTapAction() {
  return isActionEnabled(this._config.double_tap_action)
    ? this._config.double_tap_action
    : null;
}

export function getMainEntityHoldAction() {
  return isActionEnabled(this._config.main_entity_hold_action)
    ? this._config.main_entity_hold_action
    : null;
}

export function getMainEntityTapAction() {
  const actionConfig = this._config.main_entity_tap_action;

  if (actionConfig?.action === "none") return null;
  if (actionConfig?.action) return actionConfig;

  return this._isIconOnlyMode() || this._isPersonMode()
    ? null
    : {
        action: "more-info",
      };
}

export function getMainEntityDoubleTapAction() {
  return isActionEnabled(this._config.main_entity_double_tap_action)
    ? this._config.main_entity_double_tap_action
    : null;
}

export function getCardTapAction() {
  const defaultAction = {
    action: this._isIconOnlyMode() || this._isPersonMode()
      ? "more-info"
      : "navigate",
    navigation_path:
      this._navigationPath ||
      "/lovelace/home",
  };

  const actionConfig = this._config.tap_action;

  if (!actionConfig?.action) return defaultAction;

  return actionConfig;
}

export function getStatusItemCardTapAction(index = 0) {
  const item = this._statusItems?.[index];

  if (item?.tap_action?.action) {
    return item.tap_action;
  }

  if (this._config.tap_action?.action) {
    return this._config.tap_action;
  }

  return {
    action: "more-info",
  };
}

export function getStatusItemCardHoldAction(index = 0) {
  const item = this._statusItems?.[index];

  if (isActionEnabled(item?.hold_action)) {
    return item.hold_action;
  }

  if (isActionEnabled(this._config.hold_action)) {
    return this._config.hold_action;
  }

  return null;
}

export function getStatusItemCardDoubleTapAction(index = 0) {
  const item = this._statusItems?.[index];

  if (isActionEnabled(item?.double_tap_action)) {
    return item.double_tap_action;
  }

  if (isActionEnabled(this._config.double_tap_action)) {
    return this._config.double_tap_action;
  }

  return null;
}

export function getStatusItemMainEntityTapAction(index = 0) {
  const item = this._statusItems?.[index];

  if (
    item?.main_entity_tap_action?.action &&
    item.main_entity_tap_action.action !== "none"
  ) {
    return item.main_entity_tap_action;
  }

  if (
    this._config.main_entity_tap_action?.action &&
    this._config.main_entity_tap_action.action !== "none"
  ) {
    return this._config.main_entity_tap_action;
  }

  return this._getStatusItemCardTapAction(index);
}

export function getStatusItemMainEntityDoubleTapAction(index = 0) {
  const item = this._statusItems?.[index];

  if (isActionEnabled(item?.main_entity_double_tap_action)) {
    return item.main_entity_double_tap_action;
  }

  if (isActionEnabled(this._config.main_entity_double_tap_action)) {
    return this._config.main_entity_double_tap_action;
  }

  return null;
}

export function getStatusItemMainEntityHoldAction(index = 0) {
  const item = this._statusItems?.[index];

  if (item?.main_entity_hold_action?.action) {
    return item.main_entity_hold_action.action === "none"
      ? null
      : item.main_entity_hold_action;
  }

  if (this._config.main_entity_hold_action?.action) {
    return this._config.main_entity_hold_action.action === "none"
      ? null
      : this._config.main_entity_hold_action;
  }

  return null;
}
