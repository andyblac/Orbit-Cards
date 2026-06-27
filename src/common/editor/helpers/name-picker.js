import { html } from "lit";

export function renderNamePicker({
  label = "Name",
  valueKey,
  entityKey = "main_entity",
  areaKey = "area",
  defaultType = "",
  modeKey = valueKey,
} = {}) {
  queueNativeNamePickerRender.call(this);

  if (!customElements.get("ha-entity-name-picker")) {
    return renderNamePickerFallback.call(this, {
      label,
      valueKey,
      entityKey,
      areaKey,
      defaultType,
      modeKey,
    });
  }

  return html`
    <div class="field room-name-field">
      <ha-entity-name-picker
        .hass=${this.hass}
        .label=${this._t(label)}
        .entityId=${getNamePickerEntityId.call(this, {
          entityKey,
          areaKey,
        })}
        .value=${getNamePickerValue(this._config, {
          valueKey,
          entityKey,
          areaKey,
          defaultType,
        })}
        @value-changed=${(e) => {
          e.stopPropagation();
          this._handleConfigUpdate(
            valueKey,
            normalizeNameValue(e.detail.value, this._config, {
              entityKey,
              areaKey,
              defaultType,
            })
          );
        }}
      ></ha-entity-name-picker>
    </div>
  `;
}

function queueNativeNamePickerRender() {
  if (
    customElements.get("ha-entity-name-picker") ||
    this._namePickerRenderQueued
  ) {
    return;
  }

  this._namePickerRenderQueued = true;
  customElements
    .whenDefined("ha-entity-name-picker")
    .then(() => {
      this._namePickerRenderQueued = false;
      this.requestUpdate?.();
    });
}

function renderNamePickerFallback(options) {
  const mode = getNamePickerMode(
    this._config,
    getNamePickerModeOverride(this, options.modeKey),
    options.valueKey
  );

  return html`
    <div class="field room-name-field room-name-fallback">
      <div class="field-header">
        <label>${this._t(options.label)}</label>

        <ha-selector
          class="editor-header-button-toggle room-name-mode-selector"
          .hass=${this.hass}
          .selector=${{
            button_toggle: {
              options: [
                {
                  label: localizeEntityNamePickerMode(this, "composed"),
                  value: "composed",
                },
                {
                  label: localizeEntityNamePickerMode(this, "custom"),
                  value: "custom",
                },
              ],
            },
          }}
          .value=${mode}
          @value-changed=${(e) => {
            e.stopPropagation();
            const nextMode = e.detail.value || "composed";
            setNamePickerModeOverride(this, options.modeKey, nextMode);

            if (nextMode === "composed") {
              this._handleConfigUpdate(options.valueKey, undefined);
              return;
            }

            if (typeof this._config?.[options.valueKey] !== "string") {
              this._handleConfigUpdate(options.valueKey, undefined);
              return;
            }

            this.requestUpdate?.();
          }}
        ></ha-selector>
      </div>

      ${mode === "custom"
        ? renderNameCustomInput.call(this, options)
        : renderNameComposedPicker.call(this, options)}
    </div>
  `;
}

function renderNameCustomInput(options) {
  return html`
    <ha-selector
      class="room-name-custom-input"
      .hass=${this.hass}
      .selector=${{
        text: {},
      }}
      .value=${typeof this._config?.[options.valueKey] === "string"
        ? this._config[options.valueKey]
        : ""}
      @value-changed=${(e) => {
        e.stopPropagation();
        this._handleConfigUpdate(
          options.valueKey,
          e.detail.value || undefined
        );
      }}
    ></ha-selector>
  `;
}

function renderNameComposedPicker(options) {
  const selectedItems = getNameComposedSelectedItems(this._config, options);
  const pickerItems = getNameComposedItems.call(this, selectedItems, options);

  return html`
    <ha-generic-picker
      class="room-name-composed-picker"
      .hass=${this.hass}
      .value=${""}
      .placeholder=${this._t(options.label)}
      .getItems=${() => pickerItems}
      allow-custom-value
      .customValueLabel=${localizeEntityNamePickerCustomName(this)}
      .rowRenderer=${(item) => html`
        <ha-combo-box-item type="button" compact>
          <span slot="headline">${item.primary}</span>
          ${item.secondary
            ? html`<span slot="supporting-text">${item.secondary}</span>`
            : ""}
        </ha-combo-box-item>
      `}
      .noSort=${true}
      .searchLabel=${localizeEntityNamePickerSearch(this)}
      @value-changed=${(e) => {
        e.stopPropagation();
        const nextItem = parseNameComposedValue(e.detail.value);

        if (!nextItem) return;

        setNamePickerModeOverride(this, options.modeKey, "composed");
        this._handleConfigUpdate(
          options.valueKey,
          normalizeNameValue(
            [...selectedItems, nextItem],
            this._config,
            options
          )
        );
      }}
    >
      <div slot="field" class="room-name-composed-field">
        ${selectedItems.map((item, index) =>
          renderNameChip.call(this, item, index, selectedItems, options)
        )}

        <button
          type="button"
          class="room-name-add-chip"
          @click=${(e) => openNamePicker(e)}
        >
          <ha-icon icon="mdi:plus"></ha-icon>
          <span>${localizeEntityNamePickerAdd(this)}</span>
        </button>
      </div>
    </ha-generic-picker>
  `;
}

function renderNameChip(item, index, selectedItems, options) {
  return html`
    <button
      type="button"
      class="room-name-chip"
      @click=${(e) => openNamePicker(e)}
    >
      <ha-icon icon="mdi:drag-horizontal-variant"></ha-icon>
      <span>${formatNameChipLabel.call(this, item)}</span>
      <ha-icon
        class="room-name-chip-remove"
        icon="mdi:close"
        @click=${(e) => {
          e.preventDefault();
          e.stopPropagation();

          const nextItems = selectedItems.filter((_, itemIndex) =>
            itemIndex !== index
          );

          this._handleConfigUpdate(
            options.valueKey,
            normalizeNameValue(nextItems, this._config, options)
          );
        }}
      ></ha-icon>
    </button>
  `;
}

function openNamePicker(event) {
  event.preventDefault();
  event.stopPropagation();

  event.currentTarget
    ?.closest("ha-generic-picker")
    ?.open?.();
}

function getNamePickerMode(config = {}, overrideMode, valueKey) {
  if (typeof config[valueKey] === "string") return "custom";
  if (config[valueKey]) return "composed";

  return overrideMode || "composed";
}

function getNamePickerModeOverride(editor, modeKey) {
  return editor._namePickerModes?.[modeKey];
}

function setNamePickerModeOverride(editor, modeKey, mode) {
  editor._namePickerModes = {
    ...editor._namePickerModes,
    [modeKey]: mode,
  };
}

function getNameComposedSelectedItems(config = {}, options) {
  const value = getNamePickerValue(config, options);

  if (!value || typeof value === "string") return [];

  return Array.isArray(value)
    ? value
    : [value];
}

function formatNameChipLabel(item) {
  if (!item) return "";
  if (item.type === "text") return `"${item.text || ""}"`;
  if (item.type === "area") return this._t("Area");
  if (item.type === "entity") return this._t("Entity");

  return localizeEntityNamePickerType(this, item.type);
}

function getNameComposedItems(selectedItems = [], options) {
  const items = [];
  const selectedTypes = new Set(
    selectedItems
      .filter((item) => item?.type && item.type !== "text")
      .map((item) => item.type)
  );
  const area = options.areaKey && this._config?.[options.areaKey]
    ? this.hass?.areas?.[this._config[options.areaKey]]
    : null;
  const entityId = getNamePickerEntityId.call(this, options);
  const stateObj = entityId
    ? this.hass?.states?.[entityId]
    : null;

  if (area && !selectedTypes.has("area")) {
    items.push({
      id: "area",
      primary: this._t("Area"),
      secondary: area.name || "",
    });
  } else if (stateObj && !selectedTypes.has("area")) {
    const areaName = getFormattedEntityName(this.hass, stateObj, "area");

    if (areaName) {
      items.push({
        id: "area",
        primary: this._t("Area"),
        secondary: areaName,
      });
    }
  }

  if (stateObj) {
    if (!selectedTypes.has("entity")) {
      items.push({
        id: "entity",
        primary: this._t("Entity"),
        secondary: getFormattedEntityName(this.hass, stateObj, "entity"),
      });
    }

    const deviceName = getFormattedEntityName(this.hass, stateObj, "device");

    if (deviceName && !selectedTypes.has("device")) {
      items.push({
        id: "device",
        primary: localizeEntityNamePickerType(this, "device"),
        secondary: deviceName,
      });
    }

    const floorName =
      getConfiguredFloorName(this.hass, this._config?.[options.areaKey]) ||
      getFormattedEntityName(this.hass, stateObj, "floor");

    if (floorName && !selectedTypes.has("floor")) {
      items.push({
        id: "floor",
        primary: localizeEntityNamePickerType(this, "floor"),
        secondary: floorName,
      });
    }
  }

  return items;
}

function parseNameComposedValue(value) {
  if (!value) return undefined;

  return ["area", "device", "entity", "floor"].includes(value)
    ? { type: value }
    : {
        type: "text",
        text: value,
      };
}

function getNamePickerValue(config = {}, options) {
  if (hasConfiguredName(config, options.valueKey)) {
    return config[options.valueKey];
  }

  if (
    options.defaultType === "area" &&
    config[options.areaKey]
  ) {
    return { type: "area" };
  }

  if (
    options.defaultType === "entity" &&
    (config[options.entityKey] || config.entity)
  ) {
    return { type: "entity" };
  }

  return undefined;
}

function hasConfiguredName(config = {}, valueKey) {
  return (
    Object.prototype.hasOwnProperty.call(config, valueKey) &&
    config[valueKey] !== undefined &&
    config[valueKey] !== ""
  );
}

function normalizeNameValue(value, config = {}, options) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return undefined;
  }

  if (
    options.defaultType &&
    hasDefaultContext(config, options) &&
    isSingleTypeValue(value, options.defaultType)
  ) {
    return undefined;
  }

  return value;
}

function hasDefaultContext(config = {}, options) {
  if (options.defaultType === "area") {
    return Boolean(config[options.areaKey]);
  }

  if (options.defaultType === "entity") {
    return Boolean(config[options.entityKey] || config.entity);
  }

  return false;
}

function isSingleTypeValue(value, type) {
  const items = Array.isArray(value)
    ? value
    : [value];

  return (
    items.length === 1 &&
    items[0] &&
    typeof items[0] === "object" &&
    items[0].type === type
  );
}

function getNamePickerEntityId(options) {
  const entityId =
    this._config?.[options.entityKey] ||
    this._config?.entity ||
    "";

  if (entityId) return entityId;

  return findEntityInArea(this.hass, this._config?.[options.areaKey]);
}

function findEntityInArea(hass, areaId) {
  if (!hass || !areaId) return "";

  const entityEntries = hass.entities || {};
  const devices = hass.devices || {};

  for (const entityId of Object.keys(hass.states || {})) {
    const entity = entityEntries[entityId];

    if (entity?.area_id === areaId) return entityId;

    if (
      entity?.device_id &&
      devices[entity.device_id]?.area_id === areaId
    ) {
      return entityId;
    }
  }

  return "";
}

function getFormattedEntityName(hass, stateObj, type) {
  if (!stateObj || typeof hass?.formatEntityName !== "function") {
    return type === "entity"
      ? stateObj?.attributes?.friendly_name ||
        stateObj?.entity_id ||
        ""
      : "";
  }

  return hass.formatEntityName(stateObj, { type }) || "";
}

function getConfiguredFloorName(hass, areaId) {
  const floorId =
    areaId && hass?.areas?.[areaId]
      ? hass.areas[areaId].floor_id
      : "";

  return floorId && hass?.floors?.[floorId]
    ? hass.floors[floorId].name || ""
    : "";
}

function localizeEntityNamePickerMode(editor, mode) {
  const key =
    `ui.components.entity.entity-name-picker.mode_${mode}`;
  const value = editor.hass?.localize?.(key);

  if (value && value !== key) return value;

  return mode === "custom"
    ? editor._t("Custom")
    : "Composed";
}

function localizeEntityNamePickerAdd(editor) {
  const key = "ui.components.entity.entity-name-picker.add";
  const value = editor.hass?.localize?.(key);

  if (value && value !== key) return value;

  return editor._t("Add");
}

function localizeEntityNamePickerSearch(editor) {
  const key = "ui.components.entity.entity-name-picker.search";
  const value = editor.hass?.localize?.(key);

  if (value && value !== key) return value;

  return editor._t("Search");
}

function localizeEntityNamePickerCustomName(editor) {
  const key = "ui.components.entity.entity-name-picker.custom_name";
  const value = editor.hass?.localize?.(key);

  if (value && value !== key) return value;

  return editor._t("Name");
}

function localizeEntityNamePickerType(editor, type) {
  const key =
    `ui.components.entity.entity-name-picker.types.${type}`;
  const value = editor.hass?.localize?.(key);

  if (value && value !== key) return value;

  return type;
}
