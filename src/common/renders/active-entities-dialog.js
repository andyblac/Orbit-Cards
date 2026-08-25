import { html, nothing } from "lit";
import {
  callActiveEntityService,
  closeActiveEntitiesDialog,
  showActiveEntityMoreInfo,
} from "../helpers/active-entities-dialog.js";
import {
  compareActiveEntityNames,
  formatActiveEntityDuration,
  getActiveEntitiesDialogWidth,
  getActiveEntityControl,
  getActiveEntityFormattedState,
  getActiveEntityGroupControl,
  getActiveEntityIconStyle,
  getActiveEntityName,
  getActiveEntityNameCollator,
  getActiveEntityServiceName,
} from "../helpers/active-entities.js";

export function renderActiveEntitiesDialog(activeEntities = []) {
  if (!this._activeEntitiesOpen) return nothing;

  const collator = getActiveEntityNameCollator(this.hass);
  const controls = activeEntities.map((stateObj) => {
    const control = getActiveEntityControl(this.hass, stateObj);
    return {
      stateObj,
      control,
      name: getActiveEntityName(this.hass, stateObj),
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
  const activeState = getActiveEntityFormattedState(
    this.hass,
    controls[0]?.stateObj
  );
  const title = activeState
    ? this._t("Currently {state}", { state: activeState })
    : this._t("Current state");

  return html`
    <ha-adaptive-dialog
      .open=${true}
      width="small"
      style=${style}
      @closed=${() => closeActiveEntitiesDialog.call(this)}
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
          ? controls.map(({ stateObj, name, control, serviceName }) => html`
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
                  @click=${() => showActiveEntityMoreInfo.call(
                    this,
                    stateObj.entity_id
                  )}
                >
                  <span class="active-entity-name">${name}</span>
                  <span class="active-entity-state-line">
                    <state-display
                      .hass=${this.hass}
                      .stateObj=${stateObj}
                    ></state-display>
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
  `;
}
