const DEFAULT_CURRENT_ACTIVITY_HEIGHT = 140;
const MAX_CURRENT_ACTIVITY_HEIGHT = "calc(100dvh - 216px)";

export const currentActivityDialogProperties = {
  _currentActivityOpen: { state: true },
  _currentActivityCard: { state: true },
  _currentActivityLoading: { state: true },
  _currentActivityError: { state: true },
  _currentActivityHeight: { state: true },
  _currentActivityScope: { state: true },
  _currentActivityCurrentEntityIds: { state: true },
  _currentActivityAllEntityIds: { state: true },
  _currentActivityShowScopeToggle: { state: true },
  _currentActivityStartDate: { state: true },
  _currentActivityEndDate: { state: true },
  _currentActivityHasDateRangePicker: { state: true },
  _currentActivityHeightLocked: { state: true },
  _currentActivityTitleDetail: { state: true },
};

export function initializeCurrentActivityDialog() {
  this._currentActivityOpen = false;
  this._currentActivityCard = null;
  this._currentActivityLoading = false;
  this._currentActivityError = "";
  this._currentActivityHeight = `${DEFAULT_CURRENT_ACTIVITY_HEIGHT}px`;
  this._currentActivityScope = "current";
  this._currentActivityCurrentEntityIds = [];
  this._currentActivityAllEntityIds = [];
  this._currentActivityShowScopeToggle = false;
  const { startDate, endDate } = defaultCurrentActivityRange();
  this._currentActivityStartDate = startDate;
  this._currentActivityEndDate = endDate;
  this._currentActivityHasDateRangePicker = Boolean(
    customElements.get("ha-date-range-picker")
  );
  this._currentActivityHeightLocked = false;
  this._currentActivityTitleDetail = "";
  this._currentActivityRequest = 0;
  this._currentActivityHeightTimer = null;
}

export function openCurrentActivityDialog(
  currentEntityIds = [],
  allEntityIds = currentEntityIds,
  showScopeToggle = false,
  titleDetail = ""
) {
  const currentEntities = uniqueEntityIds(currentEntityIds);
  const allEntities = uniqueEntityIds(allEntityIds);

  this._currentActivityScope = "current";
  this._currentActivityCurrentEntityIds = currentEntities;
  this._currentActivityAllEntityIds = allEntities;
  this._currentActivityShowScopeToggle = Boolean(showScopeToggle);
  this._currentActivityTitleDetail = String(titleDetail || "").trim();
  const { startDate, endDate } = defaultCurrentActivityRange();
  this._currentActivityStartDate = startDate;
  this._currentActivityEndDate = endDate;
  this._currentActivityHeightLocked = false;
  this._currentActivityOpen = true;

  loadCurrentActivityScope.call(this, "current");
}

export function setCurrentActivityScope(scope) {
  const nextScope = scope === "all" ? "all" : "current";
  if (nextScope === this._currentActivityScope) return;

  this._currentActivityScope = nextScope;
  loadCurrentActivityScope.call(this, nextScope);
}

export function setCurrentActivityDateRange(value = {}) {
  const startDate = validDate(value.startDate);
  const endDate = validDate(value.endDate);
  if (!startDate || !endDate || endDate <= startDate) return;

  this._currentActivityStartDate = startDate;
  this._currentActivityEndDate = endDate;
  this._currentActivityHeightLocked = true;
  this._currentActivityHeight = MAX_CURRENT_ACTIVITY_HEIGHT;

  const card = this._currentActivityCard;
  if (card?.localName === "ha-logbook") {
    this._currentActivityRequest += 1;
    window.clearTimeout(this._currentActivityHeightTimer);
    this._currentActivityHeightTimer = null;
    this._currentActivityLoading = false;
    this._currentActivityError = "";
    card.hass = this.hass;
    card.time = { range: [startDate, endDate] };
    card.requestUpdate?.();
    return;
  }

  loadCurrentActivityScope.call(this, this._currentActivityScope);
}

async function loadCurrentActivityScope(scope) {
  const entities = scope === "all"
    ? this._currentActivityAllEntityIds
    : this._currentActivityCurrentEntityIds;
  const request = ++this._currentActivityRequest;

  this._currentActivityCard = null;
  this._currentActivityLoading = true;
  this._currentActivityError = "";
  this._currentActivityHeight = this._currentActivityHeightLocked
    ? MAX_CURRENT_ACTIVITY_HEIGHT
    : `${DEFAULT_CURRENT_ACTIVITY_HEIGHT}px`;
  window.clearTimeout(this._currentActivityHeightTimer);
  this._currentActivityHeightTimer = null;

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
    this._currentActivityHasDateRangePicker =
      await ensureDateRangePicker(helpers);
    helpers.createCardElement({
      type: "logbook",
      target: { entity_id: entities },
      hours_to_show: 24,
    });
    await customElements.whenDefined("ha-logbook");

    const card = document.createElement("ha-logbook");

    if (request !== this._currentActivityRequest) return;

    card.hass = this.hass;
    card.time = {
      range: [
        this._currentActivityStartDate,
        this._currentActivityEndDate,
      ],
    };
    card.entityIds = entities;
    card.virtualize = true;
    card.narrow = true;
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
  this._currentActivityScope = "current";
  this._currentActivityCurrentEntityIds = [];
  this._currentActivityAllEntityIds = [];
  this._currentActivityShowScopeToggle = false;
  const { startDate, endDate } = defaultCurrentActivityRange();
  this._currentActivityStartDate = startDate;
  this._currentActivityEndDate = endDate;
  this._currentActivityHeightLocked = false;
  this._currentActivityTitleDetail = "";
  this._currentActivityRequest += 1;
  window.clearTimeout(this._currentActivityHeightTimer);
  this._currentActivityHeightTimer = null;
}

function uniqueEntityIds(entityIds = []) {
  return [...new Set(entityIds.filter(Boolean))];
}

function defaultCurrentActivityRange() {
  const endDate = new Date();
  return {
    startDate: new Date(endDate.getTime() - 24 * 60 * 60 * 1000),
    endDate,
  };
}

function validDate(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return null;
  return new Date(value);
}

async function ensureDateRangePicker(helpers) {
  if (customElements.get("ha-date-range-picker")) return true;

  try {
    helpers.createCardElement({ type: "energy-date-selection" });
    return await Promise.race([
      customElements.whenDefined("ha-date-range-picker").then(() => true),
      new Promise((resolve) => window.setTimeout(() => resolve(false), 3000)),
    ]);
  } catch (_error) {
    return false;
  }
}

function syncCurrentActivityHeight(card, request, attempt = 0) {
  if (this._currentActivityHeightLocked) return;

  window.clearTimeout(this._currentActivityHeightTimer);
  this._currentActivityHeightTimer = window.setTimeout(async () => {
    if (
      request !== this._currentActivityRequest ||
      card !== this._currentActivityCard ||
      this._currentActivityHeightLocked
    ) return;

    await card.updateComplete;
    const logbook = card.localName === "ha-logbook"
      ? card
      : card.shadowRoot?.querySelector("ha-logbook");
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
