import { html, nothing } from "lit";
import {
  callActiveEntityService,
  closeActiveEntitiesDialog,
  loadActiveEntityRegistryEntries,
  showActiveDevice,
  showActiveEntityMoreInfo,
} from "../helpers/active-entities-dialog.js";
import {
  compareActiveEntityNames,
  formatActiveEntityDuration,
  getActiveEntitiesDialogWidth,
  getActiveEntityAreaName,
  getActiveEntityControl,
  getActiveEntityFormattedState,
  getActiveEntityGroupControl,
  getActiveEntityIconStyle,
  getActiveEntityName,
  getActiveEntityNameCollator,
  getActiveEntityPowerState,
  getActiveEntityPowerStates,
  getActiveEntityServiceName,
  getUnavailableActiveEntityItems,
} from "../helpers/active-entities.js";
import {
  getStatusBadgeThresholdDisplayState,
  hasStatusBadgeThresholdRule,
  STATUS_BADGE_UNAVAILABLE_DOMAIN,
} from "../helpers/status-badge.js";

export function renderActiveEntitiesDialog(activeEntities = [], config = {}) {
  if (!this._activeEntitiesOpen) return nothing;

  const collator = getActiveEntityNameCollator(this.hass);
  const isUnavailableAggregate =
    config.domain === STATUS_BADGE_UNAVAILABLE_DOMAIN;
  const activeEntityItems = isUnavailableAggregate
    ? getUnavailableActiveEntityItems(this.hass, activeEntities)
    : activeEntities.map((stateObj) => ({ stateObj }));
  loadActiveEntityRegistryEntries.call(
    this,
    activeEntityItems.map((item) => item.stateObj)
  );
  const powerStates = isUnavailableAggregate
    ? []
    : getActiveEntityPowerStates(this.hass);
  const controls = activeEntityItems.map((item) => {
    const { stateObj } = item;
    const control = isUnavailableAggregate
      ? null
      : getActiveEntityControl(this.hass, stateObj);
    return {
      ...item,
      stateObj,
      control,
      name: item.name || getActiveEntityName(this.hass, stateObj),
      areaName: item.areaName || getActiveEntityAreaName(this.hass, stateObj),
      powerStateObj: isUnavailableAggregate
        ? null
        : getActiveEntityPowerState(
            this.hass,
            stateObj,
            this._activeEntityRegistryEntries.get(stateObj.entity_id),
            powerStates
          ),
      serviceName: control
        ? getActiveEntityServiceName(this.hass, control)
        : "",
    };
  }).sort((left, right) =>
    compareActiveEntityNames(collator, left, right)
  );
  const controllable = controls.filter((entry) => entry.control);
  const subtypeCounts = [...controls.reduce((groups, entry) => {
    const domain = entry.stateObj.entity_id.split(".")[0];
    const deviceClass = entry.stateObj.attributes?.device_class || domain;
    const key = `${domain}:${deviceClass}`;
    const group = groups.get(key) || {
      key,
      label: deviceClass.replaceAll("_", " "),
      stateObj: entry.stateObj,
      icon: entry.icon,
      count: 0,
    };
    if (!group.icon && entry.icon) group.icon = entry.icon;
    group.count += entry.entityCount || 1;
    groups.set(key, group);
    return groups;
  }, new Map()).values()];
  const groupControl = getActiveEntityGroupControl(controllable);
  const groupServiceName = groupControl
    ? getActiveEntityServiceName(this.hass, groupControl)
    : "";
  const thresholdState = getStatusBadgeThresholdDisplayState(
    this.hass,
    config
  );
  const usesThreshold = hasStatusBadgeThresholdRule(config);
  const activeState = usesThreshold
    ? thresholdState
    : getActiveEntityFormattedState(this.hass, controls[0]?.stateObj);
  const title = thresholdState
    ? this._t("Currently {state}", { state: thresholdState })
    : activeState
      ? this._t("Currently {state}", { state: activeState })
      : this._t("Current state");
  const width = getActiveEntitiesDialogWidth(
    controls,
    title,
    subtypeCounts.length
  );
  const style = [
    `--ha-dialog-width-sm:${width}px`,
    `--mdc-dialog-min-width:${width}px`,
    `--mdc-dialog-max-width:${width}px`,
  ].join(";");

  return html`
    <ha-adaptive-dialog
      .open=${true}
      width="small"
      style=${style}
      @closed=${(event) => {
        event.stopPropagation();
        closeActiveEntitiesDialog.call(this);
      }}
    >
      <ha-icon-button
        slot="headerNavigationIcon"
        .label=${this.hass?.localize?.("ui.common.close")}
        @click=${() => closeActiveEntitiesDialog.call(this)}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </ha-icon-button>
      <span slot="headerTitle">${title}</span>
      ${controls.length
        ? groupControl
          ? html`
            <ha-button
              class="active-entities-subtype-pill"
              slot="headerActionItems"
              appearance="filled"
              aria-label=${groupServiceName}
              @click=${async () => {
                if (groupControl.service === "turn_off") {
                  this._activeEntitiesConfirmOpen = true;
                  return;
                }

                await callActiveEntityService.call(
                  this,
                  groupControl,
                  controllable.map((entry) => entry.stateObj.entity_id)
                );
                closeActiveEntitiesDialog.call(this);
              }}
            >
              ${subtypeCounts.length === 1
                ? html`
                    <span class="active-entities-subtype-count">
                      <ha-icon .icon=${groupControl.icon}></ha-icon>
                      <span>(${subtypeCounts[0].count})</span>
                    </span>
                  `
                : subtypeCounts.map((group) => html`
                    <span
                      class="active-entities-subtype-count"
                      title=${group.label}
                    >
                      ${group.icon
                        ? html`<ha-icon .icon=${group.icon}></ha-icon>`
                        : html`
                            <ha-state-icon
                              .hass=${this.hass}
                              .stateObj=${group.stateObj}
                            ></ha-state-icon>
                          `}
                      <span>(${group.count})</span>
                    </span>
                  `)}
            </ha-button>
          `
          : html`
              <ha-button
                class="active-entities-subtype-pill active-entities-subtype-pill-static"
                slot="headerActionItems"
                appearance="filled"
                aria-disabled="true"
                tabindex="-1"
              >
                ${subtypeCounts.length === 1
                  ? html`<span>(${subtypeCounts[0].count})</span>`
                  : subtypeCounts.map((group) => html`
                      <span
                        class="active-entities-subtype-count"
                        title=${group.label}
                      >
                        ${group.icon
                          ? html`<ha-icon .icon=${group.icon}></ha-icon>`
                          : html`
                              <ha-state-icon
                                .hass=${this.hass}
                                .stateObj=${group.stateObj}
                              ></ha-state-icon>
                            `}
                        <span>(${group.count})</span>
                      </span>
                    `)}
              </ha-button>
            `
        : ""}
      <div class="active-entities-dialog-content">
        ${controls.length
          ? controls.map(({
              stateObj,
              name,
              areaName,
              control,
              serviceName,
              icon,
              deviceId,
              entityCount,
              powerStateObj,
            }) => html`
              <div class="active-entity-row">
                ${control
                  ? html`
                      <button
                        type="button"
                        class="active-entity-control-button"
                        aria-label=${serviceName}
                        title=${serviceName}
                        @click=${(event) => {
                          event.stopPropagation();
                          callActiveEntityService.call(
                            this,
                            control,
                            [stateObj.entity_id]
                          );
                        }}
                      >
                        <ha-state-icon
                          .hass=${this.hass}
                          .stateObj=${stateObj}
                          style=${getActiveEntityIconStyle(stateObj)}
                        ></ha-state-icon>
                      </button>
                    `
                  : icon
                    ? html`
                      <button
                        type="button"
                        class="active-entity-control-button active-entity-device-button"
                        aria-label=${name}
                        @click=${() => showActiveDevice.call(this, deviceId)}
                      >
                        <ha-icon
                          .icon=${icon}
                          style=${getActiveEntityIconStyle(stateObj)}
                        ></ha-icon>
                      </button>
                    `
                    : html`
                      <ha-state-icon
                        .hass=${this.hass}
                        .stateObj=${stateObj}
                        style=${getActiveEntityIconStyle(stateObj)}
                      ></ha-state-icon>
                    `}
                <button
                  type="button"
                  class="active-entity-info"
                  @click=${() => deviceId
                    ? showActiveDevice.call(this, deviceId)
                    : showActiveEntityMoreInfo.call(
                        this,
                        stateObj.entity_id
                      )}
                >
                  <span class="active-entity-name">${name}</span>
                  ${areaName
                    ? html`
                        <span class="active-entity-area">${areaName}</span>
                      `
                    : nothing}
                  <span class="active-entity-state-line">
                    <state-display
                      .hass=${this.hass}
                      .stateObj=${stateObj}
                    ></state-display>
                    ${entityCount ? html`<span>(${entityCount})</span>` : nothing}
                    ${powerStateObj
                      ? html`
                          <span aria-hidden="true">-</span>
                          <state-display
                            .hass=${this.hass}
                            .stateObj=${powerStateObj}
                          ></state-display>
                        `
                      : nothing}
                    <span aria-hidden="true">-</span>
                    <span>${formatActiveEntityDuration(
                      this.hass,
                      stateObj,
                      this._activeEntitiesDurationNow
                    )}</span>
                  </span>
                </button>
              </div>
            `)
          : html`
              <div class="active-entities-empty">
                ${this._t("No active entities")}
              </div>
            `}
      </div>
    </ha-adaptive-dialog>
    ${this._activeEntitiesConfirmOpen && groupControl?.service === "turn_off"
      ? html`
          <ha-dialog
            .open=${true}
            type="alert"
            width="small"
            .preventScrimClose=${true}
            @closed=${(event) => {
              event.stopPropagation();
              this._activeEntitiesConfirmOpen = false;
            }}
            aria-labelledby="active-entities-confirmation-title"
            aria-describedby="active-entities-confirmation-description"
          >
            <ha-dialog-header slot="header">
              <h1
                slot="title"
                id="active-entities-confirmation-title"
                class="active-entities-confirmation-title"
              >
                ${this.hass?.localize?.(
                  "ui.dialogs.generic.default_confirmation_title"
                )}
              </h1>
            </ha-dialog-header>
            <p
              id="active-entities-confirmation-description"
              class="active-entities-confirmation-text"
            >
              ${this._t("This will turn off {count} active entities.", {
                count: controllable.length,
              })}
            </p>
            <ha-dialog-footer slot="footer">
              <ha-button
                slot="secondaryAction"
                appearance="plain"
                @click=${() => {
                  this._activeEntitiesConfirmOpen = false;
                }}
              >
                ${this.hass?.localize?.("ui.common.cancel")}
              </ha-button>
              <ha-button
                slot="primaryAction"
                variant="danger"
                @click=${async () => {
                  await callActiveEntityService.call(
                    this,
                    groupControl,
                    controllable.map((entry) => entry.stateObj.entity_id)
                  );
                  this._activeEntitiesConfirmOpen = false;
                  closeActiveEntitiesDialog.call(this);
                }}
              >
                ${groupServiceName || this.hass?.localize?.(
                  "ui.card.common.turn_off"
                )}
              </ha-button>
            </ha-dialog-footer>
          </ha-dialog>
        `
      : nothing}
  `;
}
