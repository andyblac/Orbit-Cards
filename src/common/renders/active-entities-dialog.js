import { html, nothing } from "lit";
import {
  callActiveEntityService,
  closeActiveEntitiesDialog,
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
      serviceName: control
        ? getActiveEntityServiceName(this.hass, control)
        : "",
    };
  }).sort((left, right) =>
    compareActiveEntityNames(collator, left, right)
  );
  const controllable = controls.filter((entry) => entry.control);
  const groupControl = getActiveEntityGroupControl(controllable);
  const groupServiceName = groupControl
    ? getActiveEntityServiceName(this.hass, groupControl)
    : "";
  const width = getActiveEntitiesDialogWidth(controls, groupControl);
  const style = [
    `--ha-dialog-width-sm:${width}px`,
    `--mdc-dialog-min-width:${width}px`,
    `--mdc-dialog-max-width:${width}px`,
  ].join(";");
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
      ${groupControl
        ? html`
            <ha-button
              slot="headerActionItems"
              appearance="filled"
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
              <ha-icon slot="start" .icon=${groupControl.icon}></ha-icon>
              ${groupServiceName} (${controllable.length})
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
                        class="active-entity-control-button"
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
