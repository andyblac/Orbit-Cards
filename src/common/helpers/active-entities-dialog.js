import { getEntityActiveState } from "./entities.js";

export const activeEntitiesDialogProperties = {
  _activeEntitiesOpen: { state: true },
  _activeEntitiesDurationNow: { state: true },
};

export function initializeActiveEntitiesDialog() {
  this._activeEntitiesOpen = false;
  this._activeEntitiesDurationNow = Date.now();
  this._activeEntitiesDurationTimer = null;
}

export function getActiveEntities(entities = []) {
  return entities.filter((stateObj) => getEntityActiveState(stateObj));
}

export function openActiveEntitiesDialog() {
  this._activeEntitiesOpen = true;
  this._activeEntitiesDurationNow = Date.now();
  startActiveEntitiesDurationTimer.call(this);
}

export function startActiveEntitiesDurationTimer() {
  if (this._activeEntitiesDurationTimer !== null) return;

  this._activeEntitiesDurationTimer = window.setInterval(() => {
    if (!this._activeEntitiesOpen) {
      stopActiveEntitiesDurationTimer.call(this);
      return;
    }

    this._activeEntitiesDurationNow = Date.now();
  }, 60_000);
}

export function stopActiveEntitiesDurationTimer() {
  if (this._activeEntitiesDurationTimer === null) return;

  window.clearInterval(this._activeEntitiesDurationTimer);
  this._activeEntitiesDurationTimer = null;
}

export function closeActiveEntitiesDialog() {
  this._activeEntitiesOpen = false;
  stopActiveEntitiesDurationTimer.call(this);
}

export function callActiveEntityService(control, entityIds = []) {
  if (!control || !entityIds.length) return Promise.resolve();

  return this.hass?.callService(control.domain, control.service, {
    entity_id: entityIds,
  }) || Promise.resolve();
}

export function showActiveEntityMoreInfo(entityId) {
  if (!entityId) return;

  queueMicrotask(() => this.dispatchEvent(new CustomEvent(
    "hass-more-info",
    {
      detail: { entityId },
      bubbles: true,
      composed: true,
    }
  )));
}
