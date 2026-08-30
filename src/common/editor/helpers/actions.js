import { html } from "lit";
import { translateEditorLabel as t } from "./labels.js";
import { installEntityFilterScrollGuard } from "./entity-filter-scroll-guard.js";

function actionLabel(editor, action) {
  const fallbackLabel = ACTION_LABELS[action];

  return (
    localizeHomeAssistantAction(editor?.hass, action) ||
    (fallbackLabel ? t(editor, fallbackLabel) : undefined) ||
    action
  );
}

function configFieldLabel(editor, key) {
  return (
    localizeHomeAssistantField(editor?.hass, key) ||
    key
  );
}

function stopPickerEventPropagation(event) {
  event.stopPropagation();
}

const navigationPickerScrollPositions = new WeakMap();

function rememberNavigationPickerDocumentScroll(event) {
  if (!isNavigationPickerEvent(event)) return;

  const scrollingElement = document.scrollingElement;

  if (!scrollingElement) return;

  navigationPickerScrollPositions.set(event.currentTarget, {
    scrollingElement,
    scrollLeft: scrollingElement.scrollLeft,
    scrollTop: scrollingElement.scrollTop,
  });
}

function restoreNavigationPickerDocumentScroll(event) {
  if (!isNavigationPickerEvent(event)) return;

  const position = navigationPickerScrollPositions.get(event.currentTarget);

  if (!position) return;

  const restore = () => {
    position.scrollingElement.scrollLeft = position.scrollLeft;
    position.scrollingElement.scrollTop = position.scrollTop;
  };

  // Home Assistant focuses and refreshes navigation sections asynchronously.
  restore();
  setTimeout(restore, 0);
  requestAnimationFrame(restore);
  setTimeout(restore, 100);
}

function isNavigationPickerEvent(event) {
  return event.composedPath().some(
    (node) => node?.tagName === "HA-NAVIGATION-PICKER"
  );
}

const navigationPickerPointerDownListener = {
  // The active picker is nested inside Home Assistant's action editor.
  capture: true,
  handleEvent: rememberNavigationPickerDocumentScroll,
};

const navigationPickerClickListener = {
  capture: true,
  handleEvent: restoreNavigationPickerDocumentScroll,
};

function localizeHomeAssistantAction(hass, action) {
  if (!hass?.localize || !action) return null;

  const actionVariants = [
    action,
    action.replaceAll("-", "_"),
  ];

  const candidates = actionVariants.flatMap((variant) => [
    `ui.panel.lovelace.editor.action-editor.actions.${variant}`,
    `ui.panel.lovelace.editor.card.generic.action.actions.${variant}`,
    `ui.panel.lovelace.editor.card.generic.action.${variant}`,
    `ui.panel.lovelace.editor.card.config.action.actions.${variant}`,
    `ui.panel.lovelace.editor.card.config.action.${variant}`,
    `ui.components.action-input.editor.action.${variant}`,
  ]);

  for (const key of candidates) {
    const value = hass.localize(key);

    if (value && value !== key && value !== action) return value;
  }

  return null;
}

const ACTION_LABELS = {
  "Current state": "Current state",
  "current-activity": "Current activity",
  "call-service": "Perform action",
  "more-info": "More info",
  navigate: "Navigate",
  none: "Nothing",
  popup: "Popup",
  "perform-action": "Perform action",
  toggle: "Toggle",
  url: "URL",
};

function localizeHomeAssistantField(hass, key) {
  if (!hass?.localize || !key) return null;

  const candidates = HOME_ASSISTANT_FIELD_LABELS[key] || [];

  for (const candidate of candidates) {
    const value = hass.localize(candidate);

    if (value && value !== candidate) return value;
  }

  return null;
}

const HOME_ASSISTANT_FIELD_LABELS = {
  content: [
    "ui.panel.lovelace.editor.card.markdown.content",
  ],
  entity_id: [
    "ui.dialogs.entity_registry.editor.entity_id",
    "ui.panel.lovelace.unused_entities.entity_id",
  ],
  path: [
    "ui.panel.lovelace.editor.action-editor.navigation_path",
    "ui.panel.lovelace.editor.edit_view.path",
  ],
  service: [
    "ui.panel.developer-tools.tabs.actions.actions.call_service",
    "ui.panel.config.devices.type.service_heading",
  ],
  title: [
    "ui.panel.lovelace.editor.edit_lovelace.title",
    "ui.panel.lovelace.dashboards.picker.headers.title",
  ],
  url: [
    "ui.panel.lovelace.editor.action-editor.url_path",
  ],
};


export function renderActionSelector(
  label,
  key,
  defaultAction,
  { extraActions = [] } = {}
) {
  const raw = this._config?.[key];
  const defaultValue =
    typeof defaultAction === "object"
      ? defaultAction
      : { action: defaultAction || "none" };

  const value =
    raw && typeof raw === "object"
      ? normalizeActionValue(raw, defaultValue)
      : defaultValue;
  const action = value.action || defaultValue.action || "none";
  const extraActionIds = new Set(extraActions.map((item) => item.id));
  const actionItems = [
    ...extraActions,
    ...getActionPickerItems(this).filter(
      (item) => !extraActionIds.has(item.id)
    ),
  ];

  return html`
    <div class="field action-field">
      <div class="action-picker">
        <ha-generic-picker
          .label=${t(this, label)}
          .value=${action}
          .getItems=${() => actionItems}
          .rowRenderer=${(item) => renderActionPickerRow(item)}
          .valueRenderer=${(itemValue) =>
            renderActionPickerValue(
              actionItems.find((item) => item.id === itemValue)
            )}
          .notFoundLabel=${t(this, "No matching actions")}
          .noSort=${true}
          @value-changed=${(e) => {
            e.stopPropagation();

            const nextAction =
              getActionPickerValue(e) || "none";

            this._updateConfig({
              [key]: getActionDefaults(
                this,
                nextAction,
                value
              ),
            });
            this.requestUpdate?.();
          }}
        ></ha-generic-picker>
      </div>

      ${action === "navigate"
        ? renderNavigationActionFields.call(this, key, value)
        : ""}

      ${action === "call-service"
        ? renderCallServiceActionFields.call(this, key, value)
        : ""}

      ${action === "url"
        ? renderUrlActionFields.call(this, key, value)
        : ""}

      ${action === "popup"
        ? renderPopupActionFields.call(this, key, value)
        : ""}
    </div>
  `;
}

export function renderInteractionsSection({
  interactions = [],
  title = "Interactions",
  expanded = false,
  context = {},
  config = this._config,
  onChange,
} = {}) {
  const visibleInteractions = interactions.filter(Boolean);

  if (!visibleInteractions.length) return "";

  const defaultInteractions = visibleInteractions.filter((interaction) =>
    shouldDisplayDefaultInteraction(config, interaction)
  );
  const optionalInteractions = visibleInteractions.filter(
    (interaction) => !defaultInteractions.includes(interaction)
  );
  const schema = [
    {
      name: "interactions",
      type: "expandable",
      flatten: true,
      expanded,
      icon: "mdi:gesture-tap-button",
      schema: [
        ...defaultInteractions.map((interaction) =>
          getInteractionSchema(interaction, context, config, this)
        ),
        {
          name: "",
          type: "optional_actions",
          flatten: true,
          schema: optionalInteractions.map((interaction) =>
            getInteractionSchema(interaction, context, config, this)
          ),
        },
      ],
    },
  ];
  const formData = getInteractionsFormData(
    config,
    visibleInteractions
  );

  return html`
    <ha-form
      class="interactions-form"
      @click=${navigationPickerClickListener}
      @pointerdown=${navigationPickerPointerDownListener}
      .hass=${this.hass}
      .data=${formData}
      .schema=${schema}
      .computeLabel=${(item) =>
        getInteractionLabel(this, item, visibleInteractions, title)}
      @value-changed=${(event) => {
        event.stopPropagation();
        const changes = getInteractionConfigChanges(
          event.detail.value || {},
          visibleInteractions,
          config
        );

        if (onChange) {
          onChange(changes);
        } else {
          this._updateConfig(changes);
        }
        this.requestUpdate?.();
      }}
    ></ha-form>
  `;
}

function shouldDisplayDefaultInteraction(config = {}, interaction) {
  return (
    interaction.defaultVisible &&
    !isNoneAction(config?.[interaction.key])
  );
}

function getInteractionSchema(interaction, context, config, editor) {
  const defaultAction = getActionName(interaction.defaultAction);
  const configuredAction = config?.[interaction.key];
  const customActions = interaction.customActions || [];
  const configuredActionName = getActionName(configuredAction);
  const usesCustomActionPicker =
    (customActions.length > 0 && !configuredAction) ||
    (interaction.customDefaultLabel && !configuredAction) ||
    customActions.includes(configuredActionName);

  if (usesCustomActionPicker) {
    const actions = getActionEditorActions(defaultAction, customActions);
    const defaultOption = !configuredAction
      ? [{
          value: "__default__",
          label: `${t(editor, "Default")} (${
            interaction.customDefaultLabel
              ? t(editor, interaction.customDefaultLabel)
              : actionLabel(editor, defaultAction)
          })`,
        }]
      : [];

    return {
      name: interaction.formKey || interaction.key,
      selector: {
        select: {
          mode: "dropdown",
          options: [
            ...defaultOption,
            ...actions.map((action) => ({
              value: action,
              label: actionLabel(editor, action),
            })),
          ],
        },
      },
    };
  }

  return {
    name: interaction.formKey || interaction.key,
    selector: {
      ui_action: {
        actions: getActionEditorActions(defaultAction, customActions),
        default_action: defaultAction,
      },
    },
    ...(context ? { context } : {}),
  };
}

function getInteractionsFormData(config = {}, interactions) {
  return interactions.reduce((data, interaction) => {
    const formKey = interaction.formKey || interaction.key;
    if (interaction.customDefaultLabel && !config?.[interaction.key]) {
      data[formKey] = "__default__";
      return data;
    }
    if (
      interaction.customActions?.includes(
        getActionName(config?.[interaction.key])
      )
    ) {
      data[formKey] = getActionName(config[interaction.key]);
      return data;
    }
    const value =
      config?.[interaction.key] ||
      (
        interaction.displayDefaultValue
          ? getDefaultActionConfig(interaction.defaultAction)
          : undefined
      );

    if (
      value &&
      typeof value === "object" &&
      value.action !== "popup" &&
      (
        !isNoneAction(value) ||
        getActionName(interaction.defaultAction) !== "none"
      )
    ) {
      data[formKey] = normalizeNativeActionValue(value);
    }

    return data;
  }, {});
}

function getInteractionConfigChanges(
  formData,
  interactions,
  config = {}
) {
  return interactions.reduce((changes, interaction) => {
    const formKey = interaction.formKey || interaction.key;
    if (
      (
        formData[formKey] === "__default__" ||
        interaction.customActions?.includes(formData[formKey])
      ) &&
      typeof formData[formKey] === "string"
    ) {
      changes[interaction.key] = formData[formKey] === "__default__"
        ? undefined
        : { action: formData[formKey] };
      return changes;
    }
    const configuredValue = config?.[interaction.key];
    const formValue = preserveMoreInfoEntity(
      formData[formKey],
      configuredValue
    );
    const nextValue = normalizeEditedActionValue(
      formValue,
      interaction.defaultAction
    );

    changes[interaction.key] =
      config?.[interaction.key]?.action === "popup" &&
      !(formKey in formData)
        ? config[interaction.key]
        : nextValue;
    return changes;
  }, {});
}

function preserveMoreInfoEntity(value, configuredValue) {
  if (
    !value ||
    typeof value !== "object" ||
    value.action !== "more-info" ||
    value.entity ||
    value.entity_id ||
    configuredValue?.action !== "more-info"
  ) {
    return value;
  }

  const configuredEntity =
    configuredValue.entity || configuredValue.entity_id;

  return configuredEntity
    ? { ...value, entity: configuredEntity }
    : value;
}

function getInteractionLabel(editor, item, interactions, sectionTitle) {
  if (item.name === "interactions") {
    return t(editor, sectionTitle);
  }

  const interaction = interactions.find(
    (entry) => (entry.formKey || entry.key) === item.name
  );

  return t(editor, interaction?.label || item.name);
}

function getActionName(action) {
  const actionName =
    typeof action === "string"
      ? action
      : action?.action || "none";

  return actionName === "call-service"
    ? "perform-action"
    : actionName;
}

function isNoneAction(value) {
  return value?.action === "none";
}

function getActionEditorActions(defaultAction, customActions = []) {
  const actions = [
    ...customActions,
    "more-info",
    "toggle",
    "navigate",
    "url",
    "perform-action",
    "assist",
  ];

  if (
    defaultAction &&
    defaultAction !== "none" &&
    !actions.includes(defaultAction)
  ) {
    actions.unshift(defaultAction);
  }

  const uniqueActions = [...new Set(actions)];

  return defaultAction === "none"
    ? uniqueActions
    : [...uniqueActions, "none"];
}

function getDefaultActionConfig(defaultAction) {
  return typeof defaultAction === "string"
    ? { action: defaultAction }
    : defaultAction || { action: "none" };
}

function normalizeNativeActionValue(value) {
  if (!value || typeof value !== "object") return value;

  const action =
    value.action === "call-service"
      ? "perform-action"
      : value.action;

  if (action !== "perform-action") {
    return {
      ...value,
      action,
    };
  }

  const nextValue = {
    ...value,
    action,
    perform_action:
      value.perform_action ||
      value.service ||
      "",
  };

  if (value.service_data && !value.data) {
    nextValue.data = value.service_data;
  }

  delete nextValue.service;
  delete nextValue.service_data;

  return nextValue;
}

function normalizeEditedActionValue(value, defaultAction) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  if (
    value.action === "none" &&
    getActionName(defaultAction) === "none"
  ) {
    return undefined;
  }

  if (value.action === "perform-action") {
    const nextValue = {
      ...value,
      action: "call-service",
      service:
        value.perform_action ||
        value.service ||
        "",
    };

    if (value.data && !value.service_data) {
      nextValue.service_data = value.data;
    }

    delete nextValue.perform_action;
    delete nextValue.data;

    return cleanActionConfig(nextValue);
  }

  return cleanActionConfig(value);
}

function getActionPickerValue(event) {
  const value =
    event.detail?.value ??
    event.detail?.item?.id ??
    event.target?.value ??
    "";

  if (typeof value === "object") {
    return value.id || value.value || "";
  }

  return value;
}

function getActionPickerItems(editor) {
  return [
    {
      id: "toggle",
      primary: actionLabel(editor, "toggle"),
      icon: "mdi:toggle-switch",
    },
    {
      id: "more-info",
      primary: actionLabel(editor, "more-info"),
      icon: "mdi:information-outline",
    },
    {
      id: "navigate",
      primary: actionLabel(editor, "navigate"),
      icon: "mdi:arrow-right",
    },
    {
      id: "call-service",
      primary: actionLabel(editor, "perform-action"),
      icon: "mdi:flash",
    },
    {
      id: "url",
      primary: actionLabel(editor, "url"),
      icon: "mdi:open-in-new",
    },
    {
      id: "popup",
      primary: actionLabel(editor, "popup"),
      icon: "mdi:window-open",
    },
    {
      id: "none",
      primary: actionLabel(editor, "none"),
      icon: "mdi:close-circle-outline",
    },
  ];
}

function renderActionPickerRow(item) {
  return html`
    <ha-combo-box-item type="button" compact>
      ${renderActionPickerStart(item)}
      <span slot="headline">${item.primary}</span>
    </ha-combo-box-item>
  `;
}

function renderActionPickerValue(item) {
  if (!item) return "";

  return html`
    ${renderActionPickerStart(item)}
    <span slot="headline">${item.primary}</span>
  `;
}

function renderActionPickerStart(item) {
  return html`
    <ha-icon
      slot="start"
      .icon=${item.icon}
    ></ha-icon>
  `;
}

function renderNavigationActionFields(key, value) {
  installEntityFilterScrollGuard();

  return html`
    <div class="inline-field action-subfield">
      <ha-navigation-picker
        @click=${navigationPickerClickListener}
        @pointerdown=${navigationPickerPointerDownListener}
        @wheel=${stopPickerEventPropagation}
        @touchmove=${stopPickerEventPropagation}
        @picker-opened=${(e) => {
          e.currentTarget.__orbitSuppressSectionScroll = true;
        }}
        .hass=${this.hass}
        .value=${value.navigation_path || ""}
        @value-changed=${(e) => {
          e.stopPropagation();

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              navigation_path: e.detail.value || "",
            }),
          });
        }}
      ></ha-navigation-picker>
    </div>
  `;
}

function renderCallServiceActionFields(key, value) {
  const serviceAction = {
    action: value.perform_action || value.service || "",
    ...(value.data || value.service_data
      ? { data: value.data || value.service_data }
      : {}),
    ...(value.target ? { target: value.target } : {}),
  };

  return html`
    <div class="inline-field action-subfield">
      <ha-service-control
        .hass=${this.hass}
        .value=${serviceAction}
        narrow
        @value-changed=${(e) => {
          e.stopPropagation();

          const nextAction = e.detail.value || {};

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              service: nextAction.action || "",
              service_data: nextAction.data,
              target: nextAction.target,
            }),
          });
        }}
      ></ha-service-control>
    </div>
  `;
}

function renderUrlActionFields(key, value) {
  return html`
    <div class="inline-field action-subfield">
      <ha-input
        .label=${configFieldLabel(this, "url")}
        .value=${value.url_path || ""}
        @input=${(e) => {
          e.stopPropagation();

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              url_path: e.target.value,
            }),
          });
        }}
      ></ha-input>
    </div>
  `;
}

function renderPopupActionFields(key, value) {
  return html`
    <div class="inline-field action-subfield">
      <ha-input
        .label=${configFieldLabel(this, "title")}
        .value=${value.popup_title || ""}
        .placeholder=${"Security"}
        @input=${(e) => {
          e.stopPropagation();

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              popup_title: e.target.value,
            }),
          });
        }}
      ></ha-input>
    </div>

    <div class="inline-field action-subfield">
      <ha-input
        .label=${configFieldLabel(this, "content")}
        .value=${typeof value.popup_content === "string"
          ? value.popup_content
          : value.popup_content
            ? JSON.stringify(value.popup_content)
            : ""}
        @input=${(e) => {
          e.stopPropagation();

          this._updateConfig({
            [key]: cleanActionConfig({
              ...value,
              popup_content: e.target.value,
            }),
          });
        }}
      ></ha-input>
    </div>
  `;
}

function getActionDefaults(editor, action, currentValue) {
  const value = cleanActionConfig({
    ...currentValue,
    action,
  });

  if (action !== "popup") return value;

  return cleanActionConfig({
    ...value,
    popup_title: value.popup_title || t(editor, "Security"),
    popup_content: value.popup_content || {
        type: "vertical-stack",
        cards: [
          {
            type: "tile",
            entity: "alarm_control_panel.house_alarm",
            vertical: true,
          },
        ],
      },
    style: value.style ||
      "--popup-min-width: 400px;\n--popup-max-width: 500px;\n--popup-border-radius: 20px;",
  });
}

function normalizeActionValue(value, defaultValue) {
  const action =
    value.action === "perform-action"
      ? "call-service"
      : value.action;

  return cleanActionConfig({
    ...defaultValue,
    ...value,
    action: action || defaultValue.action || "none",
  });
}

function cleanActionConfig(value) {
  const action =
    value?.action === "perform-action"
      ? "call-service"
      : value?.action || "none";
  const config = { action };

  if (action === "navigate") {
    config.navigation_path = value.navigation_path || "";
    return config;
  }

  if (action === "more-info") {
    const entity = value.entity || value.entity_id;

    if (entity) {
      config.entity = entity;
    }

    return config;
  }

  if (action === "call-service") {
    config.service =
      value.service ||
      value.perform_action ||
      "";

    if (value.service_data || value.data) {
      config.service_data = {
        ...(value.service_data || value.data),
      };
    }

    if (value.target) {
      config.target = { ...value.target };
    }

    return config;
  }

  if (action === "url") {
    config.url_path = value.url_path || "";
    return config;
  }

  if (action === "popup") {
    config.popup_title = value.popup_title || "";
    config.popup_content = value.popup_content || "";

    if (value.style) {
      config.style = value.style;
    }

    if (value.card_mod) {
      config.card_mod = value.card_mod;
    }

    return config;
  }

  return config;
}
