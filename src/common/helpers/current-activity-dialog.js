const DEFAULT_CURRENT_ACTIVITY_HEIGHT = 140;

export const currentActivityDialogProperties = {
  _currentActivityOpen: { state: true },
  _currentActivityCard: { state: true },
  _currentActivityLoading: { state: true },
  _currentActivityError: { state: true },
  _currentActivityHeight: { state: true },
};

export function initializeCurrentActivityDialog() {
  this._currentActivityOpen = false;
  this._currentActivityCard = null;
  this._currentActivityLoading = false;
  this._currentActivityError = "";
  this._currentActivityHeight = `${DEFAULT_CURRENT_ACTIVITY_HEIGHT}px`;
  this._currentActivityRequest = 0;
  this._currentActivityHeightTimer = null;
}

export async function openCurrentActivityDialog(entityIds = []) {
  const entities = [...new Set(entityIds.filter(Boolean))];
  const request = ++this._currentActivityRequest;

  this._currentActivityOpen = true;
  this._currentActivityCard = null;
  this._currentActivityLoading = true;
  this._currentActivityError = "";
  this._currentActivityHeight = `${DEFAULT_CURRENT_ACTIVITY_HEIGHT}px`;

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
    syncCurrentActivityHeight.call(this, card, request);
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
  this._currentActivityHeight = `${DEFAULT_CURRENT_ACTIVITY_HEIGHT}px`;
  this._currentActivityRequest += 1;
  window.clearTimeout(this._currentActivityHeightTimer);
  this._currentActivityHeightTimer = null;
}

function syncCurrentActivityHeight(card, request, attempt = 0) {
  window.clearTimeout(this._currentActivityHeightTimer);
  this._currentActivityHeightTimer = window.setTimeout(async () => {
    if (
      request !== this._currentActivityRequest ||
      card !== this._currentActivityCard
    ) return;

    await card.updateComplete;
    const logbook = card.shadowRoot?.querySelector("ha-logbook");
    await logbook?.updateComplete;
    const renderer = logbook?.shadowRoot?.querySelector(
      "ha-logbook-renderer"
    );
    await renderer?.updateComplete;
    const container = renderer?.shadowRoot?.querySelector(".container");
    const virtualizer = renderer?.shadowRoot?.querySelector(
      "lit-virtualizer"
    );
    const height = Math.max(
      container?.scrollHeight || 0,
      virtualizer?.scrollHeight || 0
    );
    const currentHeight = Number.parseFloat(
      this._currentActivityHeight
    ) || DEFAULT_CURRENT_ACTIVITY_HEIGHT;

    this._currentActivityHeight = `${Math.max(
      DEFAULT_CURRENT_ACTIVITY_HEIGHT,
      currentHeight,
      height
    )}px`;

    if (attempt < 50) {
      syncCurrentActivityHeight.call(this, card, request, attempt + 1);
    } else {
      this._currentActivityHeightTimer = null;
    }
  }, 100);
}
