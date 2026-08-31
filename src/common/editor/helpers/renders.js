import { html } from "lit";
import { translateEditorLabel as t } from "./labels.js";
import { installEntityFilterScrollGuard } from "./entity-filter-scroll-guard.js";

export {
  renderColor,
  renderColorControl,
  renderColorPair,
} from "./color-picker.js";
export {
  renderActionSelector,
  renderInteractionsSection,
} from "./actions.js";
export function renderEntitySelector({
  value = "",
  includeDomains,
  excludeDomains,
  multiple = false,
  onValueChanged,
  filterOptions,
  activeFilter = "all",
  className = "entity-picker",
} = {}) {
  const pickerFilters = filterOptions?.length
    ? filterOptions.map((filter) => ({
        ...filter,
        label: getFilterLabel.call(this, filter),
      }))
    : null;
  const pickerDomains = pickerFilters
    ? getFilterDomains(pickerFilters)
    : includeDomains;

  if (multiple) {
    return html`
      <ha-selector
        class=${className}
        .hass=${this.hass}
        .selector=${{
          entity: {
            ...(pickerDomains?.length
              ? { filter: { domain: pickerDomains } }
              : {}),
            ...(excludeDomains?.length
              ? { exclude_domains: excludeDomains }
              : {}),
            multiple: true,
          },
        }}
        .value=${value || ""}
        @value-changed=${(e) =>
          onValueChanged?.(e.detail.value || "")}
      ></ha-selector>
    `;
  }

  if (pickerFilters?.length) {
    return renderFilteredEntitySelector.call(this, {
      value,
      includeDomains,
      excludeDomains,
      filters: pickerFilters,
      activeFilter,
      className,
      onValueChanged,
    });
  }

  return html`
    <ha-entity-picker
      class=${className}
      .hass=${this.hass}
      .includeDomains=${pickerDomains}
      .excludeDomains=${excludeDomains}
      .value=${value || ""}
      @value-changed=${(e) =>
        onValueChanged?.(e.detail.value || "")}
    ></ha-entity-picker>
  `;
}

function getFilterLabel(filter) {
  if (filter.haDomains?.length) {
    const labels = filter.haDomains
      .map((domain) => localizeHomeAssistantDomain(this?.hass, domain))
      .filter(Boolean);

    if (labels.length) return labels.join(" / ");
  }

  return t(this, filter.label);
}

function localizeHomeAssistantDomain(hass, domain) {
  if (!hass?.localize || !domain) return null;

  const candidates = [
    `component.${domain}.entity_component._.name_plural`,
    `component.${domain}.entity_component._.name`,
  ];

  for (const candidate of candidates) {
    const value = hass.localize(candidate);

    if (value && value !== candidate) return value;
  }

  return null;
}

function getFilterDomains(filters = []) {
  if (
    filters.some(
      (filter) =>
        filter.value === "all" &&
        (!filter.domains || filter.domains.length === 0)
    )
  ) {
    return undefined;
  }

  const domains = new Set();

  filters.forEach((filter) =>
    filter.domains?.forEach((domain) => domains.add(domain))
  );

  return [...domains];
}

function renderFilteredEntitySelector({
  value,
  includeDomains,
  excludeDomains,
  filters,
  activeFilter,
  className,
  onValueChanged,
}) {
  installEntityFilterScrollGuard();

  const sections = filters.map((filter) => ({
    id: filter.value,
    label: filter.label,
  }));
  const getItems = (search, section) =>
    getFilteredEntityItems.call(this, {
      search,
      section,
      filters,
      includeDomains,
      excludeDomains,
    });

  return html`
    <ha-generic-picker
      class=${className}
      .hass=${this.hass}
      .value=${value || ""}
      .placeholder=${"Entity"}
      .getItems=${getItems}
      .valueRenderer=${(itemId) =>
        renderEntityPickerValue.call(this, itemId)}
      .rowRenderer=${renderEntityPickerRow}
      .sections=${sections}
      .selectedSection=${activeFilter || filters[0]?.value || "all"}
      @picker-opened=${(e) => {
        e.currentTarget.__orbitSuppressSectionScroll = true;
      }}
      @value-changed=${(e) =>
        onValueChanged?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}

function getFilteredEntityItems({
  search,
  section,
  filters,
  includeDomains,
  excludeDomains,
}) {
  const selectedFilter = filters.find(
    (filter) => filter.value === (section || "all")
  );
  const sectionDomains = selectedFilter?.domains;
  const allowedDomains =
    sectionDomains?.length ? sectionDomains : includeDomains;
  const excludedDomains = new Set(excludeDomains || []);
  const searchTerm = (search || "").trim().toLowerCase();

  return Object.values(this.hass?.states || {})
    .filter((stateObj) => {
      const domain = getEntityDomain(stateObj.entity_id);

      if (allowedDomains?.length && !allowedDomains.includes(domain)) {
        return false;
      }

      return !excludedDomains.has(domain);
    })
    .map((stateObj) => createEntityPickerItem.call(this, stateObj))
    .filter((item) => entityPickerItemMatchesSearch(item, searchTerm))
    .sort(sortEntityPickerItems);
}

function createEntityPickerItem(stateObj) {
  const name = getEntityFriendlyName(stateObj);
  const domain = getEntityDomain(stateObj.entity_id);
  const secondary = getEntityPickerSecondary(this.hass, stateObj);

  return {
    id: stateObj.entity_id,
    primary: name,
    secondary,
    sorting_label: `${name}_${stateObj.entity_id}`,
    stateObj,
    domain,
    domainLabel: formatEntityDomainLabel(domain),
    searchText: [
      name,
      stateObj.entity_id,
      domain,
      formatEntityDomainLabel(domain),
      secondary,
      stateObj.attributes?.device_class,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  };
}

function renderEntityPickerValue(itemId) {
  const stateObj = this.hass?.states?.[itemId];
  const primary = stateObj ? getEntityFriendlyName(stateObj) : itemId;
  const secondary = stateObj
    ? getEntityPickerSecondary(this.hass, stateObj)
    : undefined;

  return html`
    ${stateObj
      ? html`<state-badge slot="start" .stateObj=${stateObj}></state-badge>`
      : ""}
    <span slot="headline">${primary}</span>
    ${secondary
      ? html`<span slot="supporting-text">${secondary}</span>`
      : ""}
  `;
}

function renderEntityPickerRow(item, index) {
  return html`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${index !== 0}
    >
      <state-badge slot="start" .stateObj=${item.stateObj}></state-badge>
      <span slot="headline">${item.primary}</span>
      ${item.secondary
        ? html`<span slot="supporting-text">${item.secondary}</span>`
        : ""}
      <div slot="trailing-supporting-text" class="domain">
        ${item.domainLabel}
      </div>
    </ha-combo-box-item>
  `;
}

function entityPickerItemMatchesSearch(item, searchTerm) {
  if (!searchTerm) return true;

  return searchTerm
    .split(/\s+/)
    .every((term) => item.searchText.includes(term));
}

function sortEntityPickerItems(itemA, itemB) {
  return itemA.sorting_label.localeCompare(
    itemB.sorting_label,
    undefined,
    { sensitivity: "base" }
  );
}

function getEntityFriendlyName(stateObj) {
  return (
    stateObj.attributes?.friendly_name ||
    stateObj.entity_id
  );
}

function getEntityPickerSecondary(hass, stateObj) {
  const entity = hass?.entities?.[stateObj.entity_id];
  const device = entity?.device_id
    ? hass?.devices?.[entity.device_id]
    : undefined;
  const areaId =
    entity?.area_id ||
    device?.area_id ||
    stateObj.attributes?.area_id;

  return areaId ? hass?.areas?.[areaId]?.name : undefined;
}

function getEntityDomain(entityId = "") {
  return entityId.split(".")[0] || "";
}

function formatEntityDomainLabel(domain = "") {
  return domain
    .split("_")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export function renderAreaSelector({
  value = "",
  onValueChanged,
  className = "entity-picker",
} = {}) {
  return html`
    <ha-generic-picker
      class=${className}
      .hass=${this.hass}
      .value=${value || ""}
      .placeholder=${"Area"}
      .getItems=${() => getAreaPickerItems.call(this)}
      .valueRenderer=${(areaId) =>
        renderAreaPickerValue.call(this, areaId)}
      .rowRenderer=${renderAreaPickerRow}
      @value-changed=${(e) =>
        onValueChanged?.(e.detail.value || "")}
    ></ha-generic-picker>
  `;
}

function getAreaPickerItems() {
  return Object.values(this.hass?.areas || {})
    .map((area) => createAreaPickerItem.call(this, area))
    .sort(sortAreaPickerItems);
}

function createAreaPickerItem(area) {
  const primary = area.name || area.area_id;
  const secondary = getAreaPickerSecondary(this.hass, area);

  return {
    id: area.area_id,
    primary,
    secondary,
    sorting_label: primary,
    icon: area.icon || "mdi:texture-box",
  };
}

function renderAreaPickerValue(areaId) {
  const area = this.hass?.areas?.[areaId];
  const item = area
    ? createAreaPickerItem.call(this, area)
    : {
        id: areaId,
        primary: areaId,
        icon: "mdi:texture-box",
      };

  return html`
    <ha-icon slot="start" .icon=${item.icon}></ha-icon>
    <span slot="headline">${item.primary}</span>
    ${item.secondary
      ? html`<span slot="supporting-text">${item.secondary}</span>`
      : ""}
  `;
}

function renderAreaPickerRow(item, index) {
  return html`
    <ha-combo-box-item
      type="button"
      compact
      .borderTop=${index !== 0}
    >
      <ha-icon slot="start" .icon=${item.icon}></ha-icon>
      <span slot="headline">${item.primary}</span>
      ${item.secondary
        ? html`<span slot="supporting-text">${item.secondary}</span>`
        : ""}
    </ha-combo-box-item>
  `;
}

function getAreaPickerSecondary(hass, area) {
  const floorId = area.floor_id;

  return floorId ? hass?.floors?.[floorId]?.name : undefined;
}

function sortAreaPickerItems(itemA, itemB) {
  return itemA.sorting_label.localeCompare(
    itemB.sorting_label,
    undefined,
    { sensitivity: "base" }
  );
}

export function renderEntity(label, key, replacements) {
  return html`
    <div class="field">
      ${label ? html`<label>${t(this, label, replacements)}</label>` : ""}

      ${renderEntitySelector.call(this, {
        value: this._config?.[key] || "",
        onValueChanged: (value) =>
          this._handleEntityUpdate
            ? this._handleEntityUpdate(key, value)
            : this._handleConfigUpdate(key, value),
      })}
    </div>
  `;
}

export function renderArea(label, key) {
  return html`
    <div class="field">
      ${renderAreaSelector.call(this, {
        value: this._config?.[key] || "",
        onValueChanged: (value) =>
          this._handleConfigUpdate
            ? this._handleConfigUpdate(key, value)
            : this._updateConfig({ [key]: value }),
      })}
    </div>
  `;
}
