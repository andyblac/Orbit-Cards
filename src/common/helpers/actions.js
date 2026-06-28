export function handleAction(actionConfig, entityId = null) {
  if (!actionConfig || !this.hass) return;

  const action = actionConfig.action || "toggle";

  switch (action) {
    case "toggle": {
      if (!entityId) return;

      const domain = entityId.split(".")[0];

      this.hass.callService(domain, "toggle", {
        entity_id: entityId,
      });

      break;
    }

    case "more-info": {
      this.dispatchEvent(
        new CustomEvent("hass-more-info", {
          detail: {
            entityId,
          },
          bubbles: true,
          composed: true,
        })
      );

      break;
    }

    case "navigate": {
      this._navigate(actionConfig.navigation_path);
      break;
    }

    case "url": {
      if (!actionConfig.url_path) return;

      window.open(
        actionConfig.url_path,
        "_blank",
        "noopener,noreferrer"
      );

      break;
    }

    case "perform-action":
    case "call-service": {
      const [domain, service] =
        (
          actionConfig.perform_action ||
          actionConfig.service ||
          ""
        ).split(".");

      if (!domain || !service) return;

      this.hass.callService(
        domain,
        service,
        actionConfig.data ||
          actionConfig.service_data ||
          {},
        actionConfig.target
      );

      break;
    }

    case "fire-dom-event": {
      this.dispatchEvent(
        new CustomEvent("ll-custom", {
          detail: {
            browser_mod: actionConfig.browser_mod,
          },
          bubbles: true,
          composed: true,
        })
      );

      break;
    }

    case "popup": {
      const popupTitle =
        actionConfig.popup_title ||
        actionConfig.title ||
        " ";

      const popupContent =
        actionConfig.popup_content ||
        actionConfig.content;

      if (!popupContent) return;

      const popupData = getPopupData(
        actionConfig,
        popupTitle,
        popupContent
      );

      this.dispatchEvent(
        new CustomEvent("ll-custom", {
          detail: {
            browser_mod: {
              service: "browser_mod.popup",
              data: popupData,
            },
          },
          bubbles: true,
          composed: true,
        })
      );

      break;
    }

    case "none":
    default:
      break;
  }
}

export function isActionEnabled(actionConfig) {
  return Boolean(
    actionConfig?.action &&
    actionConfig.action !== "none"
  );
}

export function isAddCardPickerPreview(element) {
  let current = element;

  while (current) {
    const localName = current.localName || "";

    if (
      localName === "hui-card-picker" ||
      localName === "hui-dialog-add-card" ||
      localName === "hui-card-picker-card"
    ) {
      return true;
    }

    const root = current.getRootNode?.();

    current =
      current.parentElement ||
      (root instanceof ShadowRoot ? root.host : null);
  }

  return false;
}

export function handleTapAction(
  ev,
  entityId,
  tapAction,
  doubleTapAction
) {
  if (isAddCardPickerPreview(this)) return;

  stopActionEvent(ev);

  this._clearDoubleTapTimer?.();

  if (isActionEnabled(doubleTapAction)) {
    this._doubleTapTimer = setTimeout(() => {
      this._doubleTapTimer = null;
      this._handleAction(tapAction, entityId);
    }, 250);
    return;
  }

  this._handleAction(tapAction, entityId);
}

export function handleDoubleTapAction(
  ev,
  entityId,
  doubleTapAction
) {
  if (isAddCardPickerPreview(this)) return;

  stopActionEvent(ev);

  this._clearDoubleTapTimer?.();

  if (!isActionEnabled(doubleTapAction)) return;

  this._handleAction(doubleTapAction, entityId);
}

export function clearDoubleTapTimer() {
  if (!this._doubleTapTimer) return;

  clearTimeout(this._doubleTapTimer);
  this._doubleTapTimer = null;
}

function stopActionEvent(ev) {
  ev?.preventDefault?.();
  ev?.stopPropagation?.();

  if (ev?.stopImmediatePropagation) {
    ev.stopImmediatePropagation();
  }
}

function getPopupData(actionConfig, popupTitle, popupContent) {
  const {
    action,
    popup_title,
    popup_content,
    popup_options,
    title,
    content,
    ...browserModOptions
  } = actionConfig;

  return {
    ...browserModOptions,
    ...(popup_options || {}),
    title: popupTitle,
    content: popupContent,
  };
}

export function navigate(path) {
  if (!path) return;

  history.pushState(null, "", path);

  window.dispatchEvent(
    new CustomEvent("location-changed", {
      detail: { replace: false },
    })
  );
}

export function toggleEntity(entityId, ev, actionConfig = null) {
  ev.stopPropagation();

  this._handleAction(
    actionConfig || {
      action: "toggle",
    },
    entityId
  );
}

export function handleButtonClick(ev) {
  const entityId = ev.currentTarget.dataEntity;
  const tapAction = ev.currentTarget.dataAction;
  const doubleTapAction = ev.currentTarget.dataDoubleAction;

  handleTapAction.call(
    this,
    ev,
    entityId,
    tapAction,
    doubleTapAction
  );
}

export function handleButtonDoubleClick(ev) {
  handleDoubleTapAction.call(
    this,
    ev,
    ev.currentTarget.dataEntity,
    ev.currentTarget.dataDoubleAction
  );
}

export function handleCurveButtonClick(ev) {
  if (this._longPressTriggered) {
    this._longPressTriggered = false;
    return;
  }

  const entityId = ev.currentTarget.dataEntity;
  const tapAction = ev.currentTarget.dataAction;
  const doubleTapAction = ev.currentTarget.dataDoubleAction;

  handleTapAction.call(
    this,
    ev,
    entityId,
    tapAction,
    doubleTapAction
  );
}

export function handleCurveButtonDoubleClick(ev) {
  handleDoubleTapAction.call(
    this,
    ev,
    ev.currentTarget.dataEntity,
    ev.currentTarget.dataDoubleAction
  );
}

export function handleTap(ev) {
  if (isAddCardPickerPreview(this)) return;

  if (this._longPressTriggered) {
    this._longPressTriggered = false;
    return;
  }

  const path = ev.composedPath();

  const clickedInsideCircle = path.some(
    (el) =>
      el?.classList &&
      el.classList.contains("circle")
  );

  if (clickedInsideCircle) {
    return handleMainEntityTap.call(this, ev);
  }

  handleTapAction.call(
    this,
    ev,
    this._config.main_entity || this._config.entity,
    getAreaCardTapAction(this._config),
    this._config.double_tap_action
  );
}

export function handleCardDoubleTap(ev) {
  if (isAddCardPickerPreview(this)) return;

  const path = ev.composedPath();
  const clickedInsideCircle = path.some(
    (el) =>
      el?.classList &&
      el.classList.contains("circle")
  );

  if (clickedInsideCircle) {
    return handleMainEntityDoubleTap.call(this, ev);
  }

  handleDoubleTapAction.call(
    this,
    ev,
    this._config.main_entity || this._config.entity,
    this._config.double_tap_action
  );
}

export function handleMainEntityTap(ev) {
  if (this._longPressTriggered) {
    this._longPressTriggered = false;
    return;
  }

  const mainEntity =
    this._config.main_entity || this._config.entity;

  if (!mainEntity) {
    handleTapAction.call(
      this,
      ev,
      null,
      getAreaCardTapAction(this._config),
      this._config.double_tap_action
    );
    return;
  }

  handleTapAction.call(
    this,
    ev,
    mainEntity,
    getAreaMainEntityTapAction(this._config),
    this._config.main_entity_double_tap_action
  );
}

export function handleMainEntityDoubleTap(ev) {
  const mainEntity =
    this._config.main_entity || this._config.entity;

  if (!mainEntity) {
    handleDoubleTapAction.call(
      this,
      ev,
      null,
      this._config.double_tap_action
    );
    return;
  }

  handleDoubleTapAction.call(
    this,
    ev,
    mainEntity,
    this._config.main_entity_double_tap_action
  );
}

function getAreaCardTapAction(config = {}) {
  if (config.tap_action?.action) {
    return config.tap_action;
  }

  return {
    action: "navigate",
    navigation_path:
      config.navigate?.navigation_path ||
      config.navigation_path ||
      "/lovelace/home",
  };
}

function getAreaMainEntityTapAction(config = {}) {
  if (config.main_entity_tap_action?.action === "none") {
    return getAreaCardTapAction(config);
  }

  return config.main_entity_tap_action || {
    action: "more-info",
  };
}
