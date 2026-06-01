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

    case "call-service": {
      const [domain, service] =
        (actionConfig.service || "").split(".");

      if (!domain || !service) return;

      this.hass.callService(
        domain,
        service,
        actionConfig.service_data || {}
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
  ev.stopPropagation();

  const entityId = ev.currentTarget.dataEntity;
  const action = ev.currentTarget.dataAction;

  this._handleAction(action, entityId);
}

export function handleCurveButtonClick(ev) {
  if (this._longPressTriggered) {
    this._longPressTriggered = false;
    return;
  }

  ev.preventDefault();
  ev.stopPropagation();

  if (ev.stopImmediatePropagation) {
    ev.stopImmediatePropagation();
  }

  const entityId = ev.currentTarget.dataEntity;
  const action = ev.currentTarget.dataAction;

  this._handleAction(action, entityId);
}

export function handleTap(ev) {
  const path = ev.composedPath();

  const clickedInsideCircle = path.some(
    (el) =>
      el?.classList &&
      el.classList.contains("circle")
  );

  if (clickedInsideCircle) {
    return;
  }

  ev.stopPropagation();

  const navigate = this._config.navigate || {
    navigation_path: "/lovelace/home",
  };

  this._navigate(navigate.navigation_path);
}

export function handleMainEntityTap(ev) {
  if (this._longPressTriggered) {
    this._longPressTriggered = false;
    return;
  }

  ev.preventDefault();
  ev.stopPropagation();

  if (ev.stopImmediatePropagation) {
    ev.stopImmediatePropagation();
  }

  const mainEntity =
    this._config.main_entity || this._config.entity;

  if (mainEntity) {
    const tapAction = this._config.tap_action || {
      action: "more-info",
    };

    if (tapAction.action !== "none") {
      this._handleAction(
        tapAction,
        mainEntity
      );
      return;
    }
  }

  const navigate = this._config.navigate || {
    navigation_path: "/lovelace/home",
  };

  this._navigate(navigate.navigation_path);
}
