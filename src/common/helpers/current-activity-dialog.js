export const currentActivityDialogProperties = {
  _currentActivityOpen: { state: true },
  _currentActivityCard: { state: true },
  _currentActivityLoading: { state: true },
  _currentActivityError: { state: true },
};

export function initializeCurrentActivityDialog() {
  this._currentActivityOpen = false;
  this._currentActivityCard = null;
  this._currentActivityLoading = false;
  this._currentActivityError = "";
  this._currentActivityRequest = 0;
}

export async function openCurrentActivityDialog(entityIds = []) {
  const entities = [...new Set(entityIds.filter(Boolean))];
  const request = ++this._currentActivityRequest;

  this._currentActivityOpen = true;
  this._currentActivityCard = null;
  this._currentActivityLoading = true;
  this._currentActivityError = "";

  if (!entities.length) {
    this._currentActivityLoading = false;
    this._currentActivityError = this._t("No entities available for activity");
    return;
  }

  try {
    if (!window.loadCardHelpers) {
      throw new Error("Home Assistant card helpers are unavailable");
    }

    const helpers = await window.loadCardHelpers();
    const card = helpers.createCardElement({
      type: "logbook",
      entities,
      hours_to_show: 24,
    });

    if (request !== this._currentActivityRequest) return;

    card.hass = this.hass;
    card.layout = "panel";
    this._currentActivityCard = card;
  } catch (error) {
    if (request !== this._currentActivityRequest) return;

    this._currentActivityError =
      error?.message || this._t("Unable to load current activity");
  } finally {
    if (request === this._currentActivityRequest) {
      this._currentActivityLoading = false;
    }
  }
}

export function closeCurrentActivityDialog() {
  this._currentActivityOpen = false;
  this._currentActivityCard = null;
  this._currentActivityLoading = false;
  this._currentActivityError = "";
  this._currentActivityRequest += 1;
}
