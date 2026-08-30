import { getEntityActiveState } from "./entities.js";
import { navigate } from "./actions.js";

export const activeEntitiesDialogProperties = {
  _activeEntitiesOpen: { state: true },
  _activeEntitiesConfirmOpen: { state: true },
  _activeEntitiesDurationNow: { state: true },
};

export function initializeActiveEntitiesDialog() {
  this._activeEntitiesOpen = false;
  this._activeEntitiesConfirmOpen = false;
  this._activeEntitiesDurationNow = Date.now();
  this._activeEntitiesDurationTimer = null;
  this._activeEntityRegistryEntries = new Map();
  this._activeEntityRegistryEntryPromises = new Map();
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

export function shouldUpdateActiveEntitiesDialog(changedProperties) {
  return this._activeEntitiesOpen && changedProperties.has("hass");
}

export function loadActiveEntityRegistryEntries(stateObjs = []) {
  stateObjs.forEach((stateObj) => {
    const entityId = stateObj?.entity_id;
    const displayEntry = this.hass?.entities?.[entityId];

    if (
      !entityId ||
      displayEntry?.platform !== "switch_as_x" ||
      this._activeEntityRegistryEntries.has(entityId) ||
      this._activeEntityRegistryEntryPromises.has(entityId)
    ) {
      return;
    }

    // The display registry omits Switch-as-X's wrapped entity ID, so load the
    // extended entry once and cache it for subsequent dialog renders.
    const request = this.hass?.callWS?.({
      type: "config/entity_registry/get",
      entity_id: entityId,
    });

    if (!request) return;

    this._activeEntityRegistryEntryPromises.set(entityId, request);
    request.then((entry) => {
      this._activeEntityRegistryEntries.set(entityId, entry || null);
    }).catch(() => {
      this._activeEntityRegistryEntries.set(entityId, null);
    }).finally(() => {
      this._activeEntityRegistryEntryPromises.delete(entityId);
      if (this._activeEntitiesOpen) this.requestUpdate();
    });
  });
}

export function closeActiveEntitiesDialog() {
  this._activeEntitiesOpen = false;
  this._activeEntitiesConfirmOpen = false;
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

export function showActiveDevice(deviceId) {
  if (!deviceId) return;

  closeActiveEntitiesDialog.call(this);
  navigate(`/config/devices/device/${deviceId}`);
}
