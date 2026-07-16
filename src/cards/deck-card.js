// ==============================
// orbit-deck-card.js
// ==============================

import { LitElement, html } from "lit";
import { registerOrbitCard } from "../common/helpers/card-registration.js";
import { CARD_VERSIONS } from "../version.js";
import { computeFullColor } from "../common/helpers/colors.js";
import {
  getDeckItemPadding,
  isDeckItemPaddingForced,
  shouldApplyDeckItemPadding,
  shouldStripChildPaddingConfig,
} from "../common/helpers/deck-padding.js";
import {
  clearDoubleTapTimer,
  handleAction,
  handleDoubleTapAction,
  handleTapAction,
  isActionEnabled,
  navigate,
} from "../common/helpers/actions.js";
import {
  LONG_PRESS_DELAY,
  cancelLongPress,
  finishLongPress,
  startLongPress,
} from "../common/helpers/long-press.js";
import { deckCardStyles } from "./deck/styles/deck-card-styles.js";
import { DECK_PREVIEW_SELECTED_INDEX } from "../editors/deck-card-editor.js";

import "../editors/deck-card-editor.js";

class OrbitDeckCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: { type: Object },
      _deckCards: { state: true },
      _selectedIndex: { state: true },
    };
  }

  constructor() {
    super();
    this._config = {};
    this._deckCards = [];
    this._selectedIndex = 0;
    this._cardHelpers = null;
    this._cardBuildKey = "";
    this._defaultSelectionKey = "";
    this._paddingApplyKey = "";
    this._overlayGeometryFrame = null;
    this._overlayGeometryObserver = null;
    this._overlayObservedTargets = new Set();
    this._overlayGeometryToken = 0;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearOverlayGeometryObserver();
  }

  static getConfigElement() {
    return document.createElement("orbit-deck-card-editor");
  }

  static getStubConfig() {
    return {
      type: "custom:orbit-deck-card",
      layout: "wrap",
      decks: [],
    };
  }

  getLayoutOptions() {
    const items = getDeckItems(this._config);
    const count = Math.max(items.length, 1);
    const columns = this._getColumnCount(count);

    return {
      grid_columns: Math.max(1, columns * 2),
      grid_min_columns: 1,
      grid_rows: "auto",
    };
  }

  setConfig(config) {
    const layout = ["tabs", "overlay"].includes(config?.layout)
      ? config.layout
      : "wrap";

    this._config = {
      ...config,
      layout,
    };

    const decks = getDeckItems(this._config);
    const defaultSelectionKey = getDefaultSelectionKey(decks);
    const defaultIndex = getDefaultDeckIndex(decks);

    if (Number.isInteger(config?.[DECK_PREVIEW_SELECTED_INDEX])) {
      this._selectedIndex = Math.min(
        Math.max(0, config[DECK_PREVIEW_SELECTED_INDEX]),
        Math.max(0, decks.length - 1)
      );
    } else if (defaultSelectionKey !== this._defaultSelectionKey) {
      this._selectedIndex = defaultIndex;
      this._defaultSelectionKey = defaultSelectionKey;
    } else {
      this._selectedIndex = Math.min(
        this._selectedIndex || 0,
        Math.max(0, decks.length - 1)
      );
    }

    this._scheduleCardBuild();
  }

  updated(changedProps) {
    if (changedProps.has("hass")) {
      this._deckCards.forEach((entry) => {
        if (entry.element) {
          entry.element.hass = this.hass;
        }
      });
    }

    if (changedProps.has("_deckCards") || changedProps.has("_config")) {
      this._applyDeckPaddingToEntries();
      this._bindDeckItemActionListeners();
    }

    if (this._config?.layout === "overlay") {
      this._scheduleOverlayGeometrySync();
    } else {
      this._clearOverlayGeometryObserver();
    }
  }

  _scheduleOverlayGeometrySync() {
    if (this._overlayGeometryFrame !== null) {
      cancelAnimationFrame(this._overlayGeometryFrame);
    }

    const token = ++this._overlayGeometryToken;
    this._overlayGeometryFrame = requestAnimationFrame(() => {
      this._overlayGeometryFrame = null;
      this._syncOverlayGeometry(token);
    });
  }

  async _syncOverlayGeometry(token) {
    if (this._config?.layout !== "overlay") return;

    const overlay = this.renderRoot.querySelector(".deck-overlay");
    const items = [...this.renderRoot.querySelectorAll(".deck-overlay-item")];

    if (!overlay || !items.length) return;

    await Promise.all(
      this._deckCards.slice(1).map((entry) =>
        entry?.element?.updateComplete instanceof Promise
          ? entry.element.updateComplete.catch(() => {})
          : Promise.resolve()
      )
    );

    if (token !== this._overlayGeometryToken) return;

    const availableWidth = overlay.clientWidth;

    items.forEach((item) => {
      const content = item.querySelector(".deck-overlay-content");
      if (!content) return;

      const isBadge = item.classList.contains("overlay-badge");

      item.style.width = isBadge ? "max-content" : `${availableWidth}px`;
      item.style.height = "auto";
      item.style.overflow = "visible";
      content.style.width = isBadge ? "max-content" : "100%";
      content.style.height = "auto";
      content.style.transform = "none";
    });

    await nextAnimationFrame();

    if (token !== this._overlayGeometryToken) return;

    items.forEach((item) => this._applyOverlayItemGeometry(item));
    this._observeOverlayGeometry(overlay, items);
  }

  _applyOverlayItemGeometry(item) {
    const entryIndex = Number(item.dataset.deckIndex);
    const entry = Number.isInteger(entryIndex)
      ? this._deckCards[entryIndex]
      : null;
    const content = item.querySelector(".deck-overlay-content");

    if (!entry || !content) return;

    const naturalRect = content.getBoundingClientRect();
    const naturalWidth = naturalRect.width;
    const naturalHeight = naturalRect.height;

    if (naturalWidth <= 0 || naturalHeight <= 0) return;

    const attributes = entry.item?.attributes || {};
    const isBadge = getDeckItemKind(entry.item) === "badge";
    const configuredWidth = normalizeOverlayDimension(attributes.width);
    const configuredHeight = normalizeOverlayDimension(attributes.height);
    const isCrop = getOverlayFit(entry.item) === "crop";
    const geometry = getOverlayGeometry(
      naturalWidth,
      naturalHeight,
      configuredWidth,
      configuredHeight,
      isCrop
    );

    item.style.width = `${geometry.width}px`;
    item.style.height = `${geometry.height}px`;
    item.style.overflow = isCrop ? "hidden" : "visible";
    content.style.width = isBadge ? "max-content" : `${naturalWidth}px`;
    content.style.height = "auto";
    content.style.transform = isCrop
      ? "none"
      : `scale(${geometry.scaleX}, ${geometry.scaleY})`;
    item.dataset.naturalWidth = String(naturalWidth);
    item.dataset.naturalHeight = String(naturalHeight);
  }

  _observeOverlayGeometry(overlay, items) {
    if (!window.ResizeObserver) return;

    if (!this._overlayGeometryObserver) {
      this._overlayGeometryObserver = new ResizeObserver(() => {
        this._scheduleOverlayGeometrySync();
      });
    }

    const targets = new Set([overlay]);
    items.forEach((item) => {
      const content = item.querySelector(".deck-overlay-content");
      if (content) targets.add(content);
    });

    this._overlayObservedTargets.forEach((target) => {
      if (!targets.has(target)) this._overlayGeometryObserver.unobserve(target);
    });
    targets.forEach((target) => {
      if (!this._overlayObservedTargets.has(target)) {
        this._overlayGeometryObserver.observe(target);
      }
    });
    this._overlayObservedTargets = targets;
  }

  _clearOverlayGeometryObserver() {
    this._overlayGeometryToken += 1;

    if (this._overlayGeometryFrame !== null) {
      cancelAnimationFrame(this._overlayGeometryFrame);
      this._overlayGeometryFrame = null;
    }

    this._overlayGeometryObserver?.disconnect();
    this._overlayObservedTargets.clear();
  }

  _getColumnCount(count) {
    if (["tabs", "overlay"].includes(this._config?.layout)) {
      return 1;
    }

    return Math.max(
      1,
      Math.min(count, Number(this._config?.items_per_row) || 1)
    );
  }

  async _scheduleCardBuild() {
    const decks = getDeckItems(this._config);
    const buildKey = JSON.stringify(
      decks.map((item) => ({
        kind: getDeckItemKind(item),
        config: getDeckItemRenderConfig(item),
      }))
    );

    if (buildKey === this._cardBuildKey) {
      this._deckCards = this._deckCards.map((entry, index) => ({
        ...entry,
        item: decks[index],
        index,
      }));
      return;
    }

    this._cardBuildKey = buildKey;
    this._deckCards = decks.map((item, index) => ({ item, index }));

    const helpers = await this._loadCardHelpers();
    const entries = decks.map((item, index) =>
      this._createDeckEntry(item, helpers, index)
    );

    if (buildKey === this._cardBuildKey) {
      this._deckCards = entries;
    }
  }

  async _loadCardHelpers() {
    if (!this._cardHelpers && window.loadCardHelpers) {
      this._cardHelpers = await window.loadCardHelpers();
    }

    return this._cardHelpers;
  }

  _createDeckEntry(item, helpers, index) {
    const kind = getDeckItemKind(item);
    const childConfig = getDeckItemRenderConfig(item);

    if (!childConfig.type) {
      return {
        item,
        index,
        error: `No ${kind} type configured`,
      };
    }

    try {
      const element = kind === "badge"
        ? helpers.createBadgeElement(childConfig)
        : helpers.createCardElement(childConfig);
      element.hass = this.hass;
      element.addEventListener(
        "ll-rebuild",
        () => this._scheduleCardBuild(),
        { once: true }
      );

      return {
        item,
        index,
        kind,
        element,
      };
    } catch (err) {
      return {
        item,
        index,
        error: err?.message || "Unable to create card",
      };
    }
  }

  _selectTab(index) {
    this._selectedIndex = index;
  }

  get _LONG_PRESS_DELAY() {
    return LONG_PRESS_DELAY;
  }

  _handleAction(actionConfig, entityId = null) {
    return handleAction.call(this, actionConfig, entityId);
  }

  _navigate(path) {
    return navigate.call(this, path);
  }

  _clearDoubleTapTimer() {
    return clearDoubleTapTimer.call(this);
  }

  _startLongPress(ev, entityId, longPressAction) {
    return startLongPress.call(this, ev, entityId, longPressAction);
  }

  _cancelLongPress() {
    return cancelLongPress.call(this);
  }

  _finishLongPress(ev) {
    return finishLongPress.call(this, ev);
  }

  _getDeckEntryFromEventTarget(target) {
    const index = Number(target?.dataset?.deckIndex);

    if (!Number.isInteger(index)) return null;

    return this._deckCards[index] || null;
  }

  _bindDeckItemActionListeners() {
    this.renderRoot.querySelectorAll(".deck-item-interaction").forEach((el) => {
      if (el._orbitDeckActionHost === this) return;

      const listeners = {
        pointerdown: (ev) => this._handleDeckItemPointerDown(
          ev,
          this._getDeckEntryFromEventTarget(el)
        ),
        click: (ev) => this._handleDeckItemClick(
          ev,
          this._getDeckEntryFromEventTarget(el)
        ),
        dblclick: (ev) => this._handleDeckItemDoubleClick(
          ev,
          this._getDeckEntryFromEventTarget(el)
        ),
        pointerup: (ev) => this._finishLongPress(ev),
        pointerleave: () => this._cancelLongPress(),
        pointercancel: () => this._cancelLongPress(),
      };

      el.addEventListener("pointerdown", listeners.pointerdown, {
        capture: true,
      });
      el.addEventListener("click", listeners.click, { capture: true });
      el.addEventListener("dblclick", listeners.dblclick, { capture: true });
      el.addEventListener("pointerup", listeners.pointerup, {
        capture: true,
      });
      el.addEventListener("pointerleave", listeners.pointerleave);
      el.addEventListener("pointercancel", listeners.pointercancel);
      el._orbitDeckActionHost = this;
    });
  }

  _handleDeckItemPointerDown(ev, entry) {
    if (!hasDeckItemActions(entry?.item)) return;

    ev.stopPropagation();

    const holdAction = getDeckItemAction(entry?.item, "hold_action");

    if (!isActionEnabled(holdAction)) return;

    return this._startLongPress(
      ev,
      getDeckItemEntity(entry.item),
      holdAction
    );
  }

  _handleDeckItemClick(ev, entry) {
    if (this._longPressTriggered) {
      this._longPressTriggered = false;
      return;
    }

    const tapAction = getDeckItemAction(entry?.item, "tap_action");
    const doubleTapAction = getDeckItemAction(
      entry?.item,
      "double_tap_action"
    );

    if (!isActionEnabled(tapAction) && !isActionEnabled(doubleTapAction)) {
      return;
    }

    handleTapAction.call(
      this,
      ev,
      getDeckItemEntity(entry.item),
      tapAction || { action: "none" },
      doubleTapAction
    );
  }

  _handleDeckItemDoubleClick(ev, entry) {
    const doubleTapAction = getDeckItemAction(
      entry?.item,
      "double_tap_action"
    );

    if (!isActionEnabled(doubleTapAction)) return;

    handleDoubleTapAction.call(
      this,
      ev,
      getDeckItemEntity(entry.item),
      doubleTapAction
    );
  }

  _renderInteractiveDeckEntry(entry) {
    const hasActions = hasDeckItemActions(entry?.item);

    return html`
      <div
        class="deck-item-interaction ${hasActions ? "has-actions" : ""}"
        data-deck-index=${entry?.index ?? ""}
      >
        ${this._renderDeckEntry(entry)}
      </div>
    `;
  }

  _renderDeckEntry(entry) {
    if (entry?.element) {
      return entry.element;
    }

    return html`
      <ha-card class="deck-error-card">
        <div class="deck-error-title">Configuration error</div>
        <div>${entry?.error || "No card configured"}</div>
      </ha-card>
    `;
  }

  _applyDeckPaddingToEntries() {
    const paddingApplyKey = getDeckPaddingApplyKey(this._deckCards);

    if (paddingApplyKey === this._paddingApplyKey) return;

    this._paddingApplyKey = paddingApplyKey;
    this._deckCards.forEach((entry) => this._applyDeckCardPadding(entry));
  }

  _applyDeckCardPadding(entry, attempt = 0) {
    const element = entry?.element;

    if (!element) return;

    const padding = getDeckItemPadding(entry.item);
    const shouldApplyPadding = shouldApplyDeckItemPadding(entry.item);
    const waitForRender =
      element.updateComplete instanceof Promise
        ? element.updateComplete
        : Promise.resolve();

    waitForRender
      .then(() => new Promise((resolve) => requestAnimationFrame(resolve)))
      .then(() => {
        const cardElement = getCardElement(element);
        const wrapperElement = getDeckItemWrapper(this.renderRoot, entry.index);

        if (!cardElement && !wrapperElement) return;
        if (shouldApplyPadding && !cardElement && attempt < 10) {
          window.setTimeout(
            () => this._applyDeckCardPadding(entry, attempt + 1),
            50
          );
        }

        if (
          !shouldApplyPadding &&
          !cardElement?._orbitDeckPaddingApplied &&
          !wrapperElement?._orbitDeckPaddingApplied
        ) {
          if (cardElement) disconnectDeckPaddingObserver(cardElement);
          return;
        }

        if (wrapperElement) applyPaddingTarget(wrapperElement, padding, shouldApplyPadding);
        if (cardElement) applyPaddingTarget(cardElement, padding, shouldApplyPadding);

        if (shouldApplyPadding && cardElement) {
          connectDeckPaddingObserver(cardElement, padding);
          requestAnimationFrame(() => {
            if (wrapperElement) applyPaddingTarget(wrapperElement, padding, true);
            applyPaddingTarget(cardElement, padding, true);
          });
        } else {
          if (cardElement) disconnectDeckPaddingObserver(cardElement);
        }
      })
      .catch(() => {});
  }

  _renderWrap(decks) {
    const columns = this._getColumnCount(decks.length || 1);
    const rows = chunkItems(this._deckCards, columns);

    return html`
      <ha-card
        class="deck-card wrap ${decks.length > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
        style="--deck-columns:${columns};"
      >
        <div class="deck-wrap">
          ${rows.map((row) => html`
            <div class="deck-row">
              ${row.map((entry) => html`
                <div class="deck-item">
                  ${this._renderInteractiveDeckEntry(entry)}
                </div>
              `)}
              ${renderRowSpacers(row.length, columns)}
            </div>
          `)}
        </div>
      </ha-card>
    `;
  }

  _renderTabs(decks) {
    const selectedIndex = Math.min(
      this._selectedIndex || 0,
      Math.max(0, decks.length - 1)
    );
    const selectedEntry = this._deckCards[selectedIndex];
    const tabWidthMode = getTabWidthMode(this._config);
    const tabStyles = getTabStyleVariables(this._config);

    return html`
      <ha-card
        class="deck-card tabs tab-width-${tabWidthMode} ${this._config?.tab_divider === false
          ? "hide-tab-dividers"
          : ""}"
        style=${tabStyles}
      >
        <div class="deck-tabs" role="tablist">
          ${decks.map((item, index) => html`
            <button
              type="button"
              class="deck-tab ${index === selectedIndex ? "active" : ""}"
              role="tab"
              aria-selected=${index === selectedIndex ? "true" : "false"}
              style=${tabWidthMode === "custom"
                ? `--orbit-deck-tab-width:${item.attributes?.width || "120px"};`
                : ""}
              @click=${() => this._selectTab(index)}
            >
              ${item.attributes?.icon
                ? html`<ha-icon .icon=${item.attributes.icon}></ha-icon>`
                : ""}
              <span>${item.attributes?.name || item.attributes?.label || `Card ${index + 1}`}</span>
            </button>
          `)}
        </div>
        <div class="deck-tab-content">
          ${this._renderInteractiveDeckEntry(selectedEntry)}
        </div>
      </ha-card>
    `;
  }

  _renderOverlay() {
    const mainEntry = this._deckCards[0];
    const overlayEntries = this._deckCards.slice(1);

    return html`
      <ha-card class="deck-card overlay">
        <div class="deck-overlay">
          <div class="deck-overlay-main deck-item">
            ${this._renderInteractiveDeckEntry(mainEntry)}
          </div>

          ${overlayEntries.map((entry, index) => html`
            <div
              class="deck-overlay-item deck-item ${getOverlayFit(entry.item)} ${
                entry.item?.attributes?.transparent_background === true
                  ? "transparent-background"
                  : ""
              } overlay-${
                entry.kind || getDeckItemKind(entry.item)
              }"
              data-deck-index=${entry.index}
              style=${getOverlayItemStyle(entry.item, index)}
            >
              <div class="deck-overlay-content">
                ${this._renderInteractiveDeckEntry(entry)}
              </div>
            </div>
          `)}
        </div>
      </ha-card>
    `;
  }

  render() {
    const decks = getDeckItems(this._config);

    if (!decks.length) {
      return html`
        <ha-card class="deck-card empty">
          <div>Add card</div>
        </ha-card>
      `;
    }

    if (this._config?.layout === "tabs") {
      return this._renderTabs(decks);
    }

    if (this._config?.layout === "overlay") {
      return this._renderOverlay();
    }

    return this._renderWrap(decks);
  }

  static styles = deckCardStyles;
}

function getDeckItems(config = {}) {
  return Array.isArray(config?.decks)
    ? config.decks.map((item) => item?.badge
      ? {
          attributes: item?.attributes || {},
          badge: item.badge || {},
        }
      : {
          attributes: item?.attributes || {},
          card: item?.card || {},
        })
    : [];
}

function getOverlayItemStyle(item = {}, index = 0) {
  const attributes = item?.attributes || {};
  const left = normalizeOverlayNumber(attributes.left, 0);
  const top = normalizeOverlayNumber(attributes.top, 0);
  const declarations = [
    `--orbit-deck-overlay-left:${left}px`,
    `--orbit-deck-overlay-top:${top}px`,
    `--orbit-deck-overlay-z-index:${index + 1}`,
  ];

  return `${declarations.join(";")};`;
}

function normalizeOverlayNumber(value, fallback) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeOverlayDimension(value) {
  const number = normalizeOverlayNumber(value, null);
  return number === null ? null : Math.max(0, number);
}

function getOverlayFit(item = {}) {
  return item?.attributes?.fit === "crop" ? "crop" : "resize";
}

function getOverlayGeometry(
  naturalWidth,
  naturalHeight,
  configuredWidth,
  configuredHeight,
  isCrop
) {
  if (isCrop) {
    return {
      width: configuredWidth ?? naturalWidth,
      height: configuredHeight ?? naturalHeight,
      scaleX: 1,
      scaleY: 1,
    };
  }

  if (configuredWidth === null && configuredHeight === null) {
    return {
      width: naturalWidth,
      height: naturalHeight,
      scaleX: 1,
      scaleY: 1,
    };
  }

  if (configuredWidth !== null && configuredHeight === null) {
    const scale = configuredWidth / naturalWidth;
    return {
      width: configuredWidth,
      height: naturalHeight * scale,
      scaleX: scale,
      scaleY: scale,
    };
  }

  if (configuredWidth === null && configuredHeight !== null) {
    const scale = configuredHeight / naturalHeight;
    return {
      width: naturalWidth * scale,
      height: configuredHeight,
      scaleX: scale,
      scaleY: scale,
    };
  }

  return {
    width: configuredWidth,
    height: configuredHeight,
    scaleX: configuredWidth / naturalWidth,
    scaleY: configuredHeight / naturalHeight,
  };
}

function nextAnimationFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function hasDeckItemActions(item = {}) {
  return [
    getDeckItemAction(item, "tap_action"),
    getDeckItemAction(item, "hold_action"),
    getDeckItemAction(item, "double_tap_action"),
  ].some(isActionEnabled);
}

function getDeckItemAction(item = {}, key) {
  const child = getDeckItemConfig(item);
  const action =
    item?.attributes?.[key] ||
    child?.[key];

  return action?.action ? action : null;
}

function getDeckItemEntity(item = {}) {
  const child = getDeckItemConfig(item);

  return (
    item?.attributes?.entity ||
    getActionEntity(item?.attributes?.tap_action) ||
    getActionEntity(item?.attributes?.hold_action) ||
    getActionEntity(item?.attributes?.double_tap_action) ||
    getActionEntity(child?.tap_action) ||
    getActionEntity(child?.hold_action) ||
    getActionEntity(child?.double_tap_action) ||
    child?.entity ||
    null
  );
}

function getDeckItemRenderConfig(item = {}) {
  const child = getDeckItemConfig(item);
  const renderChild = shouldStripChildPaddingConfig(item)
    ? removeChildPaddingConfig(child)
    : child;

  if (!hasDeckItemActions(item)) {
    return renderChild;
  }

  const {
    tap_action,
    hold_action,
    double_tap_action,
    ...renderConfig
  } = renderChild;

  return renderConfig;
}

function getDeckItemKind(item = {}) {
  return item?.badge ? "badge" : "card";
}

function getDeckItemConfig(item = {}) {
  return item?.badge || item?.card || {};
}

function removeChildPaddingConfig(value) {
  if (Array.isArray(value)) {
    return value.map((item) => removeChildPaddingConfig(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.entries(value).reduce((result, [key, itemValue]) => {
    if (key.toLowerCase().includes("padding")) {
      return result;
    }

    result[key] = removeChildPaddingConfig(itemValue);

    return result;
  }, {});
}

function getActionEntity(actionConfig) {
  return actionConfig?.entity || actionConfig?.entity_id || null;
}

function getDefaultDeckIndex(decks = []) {
  return Math.max(
    0,
    decks.findIndex((item) => item.attributes?.default)
  );
}

function getDefaultSelectionKey(decks = []) {
  return decks
    .map((item, index) => item.attributes?.default ? index : "")
    .join(":");
}

function getTabWidthMode(config = {}) {
  return ["equal", "dynamic", "custom"].includes(config?.tab_width_mode)
    ? config.tab_width_mode
    : "equal";
}

function getTabStyleVariables(config = {}) {
  return [
    config.tab_font_size
      ? `--orbit-deck-tab-font-size:${config.tab_font_size};`
      : "",
    colorVariable("--orbit-deck-tab-color", config.tab_color),
    colorVariable("--orbit-deck-tab-active-color", config.tab_active_color),
    colorVariable("--orbit-deck-tab-background-color", config.tab_background_color),
  ].filter(Boolean).join("");
}

function colorVariable(name, color) {
  return color
    ? `${name}:${computeFullColor(color)};`
    : "";
}

function chunkItems(items, size = 1) {
  const chunkSize = Math.max(1, size);
  const rows = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    rows.push(items.slice(index, index + chunkSize));
  }

  return rows;
}

function renderRowSpacers(itemCount, columnCount) {
  return Array.from({ length: Math.max(0, columnCount - itemCount) }, () => html`
    <div class="deck-spacer"></div>
  `);
}

function getDeckPaddingApplyKey(entries = []) {
  return entries.map((entry) => {
    if (!entry?.element) {
      return `${entry?.index ?? ""}:none`;
    }

    const padding = getDeckItemPadding(entry.item);
    const forcePadding = isDeckItemPaddingForced(entry.item);
    const activePadding = shouldApplyDeckItemPadding(entry.item);

    return [
      entry.index,
      entry.kind || getDeckItemKind(entry.item),
      getDeckItemConfig(entry.item)?.type || "",
      forcePadding ? "force" : "child",
      activePadding ? padding.top : "",
      activePadding ? padding.right : "",
      activePadding ? padding.bottom : "",
      activePadding ? padding.left : "",
    ].join(":");
  }).join("|");
}

function getDeckItemWrapper(root, index) {
  return root?.querySelector?.(`.deck-item-interaction[data-deck-index="${index}"]`);
}

function getCardElement(element) {
  if (element.localName === "ha-card") return element;

  return findCardElement(element.shadowRoot || element);
}

function findCardElement(root, seen = new WeakSet()) {
  if (!root || seen.has(root)) return null;

  seen.add(root);

  if (root.localName === "ha-card") return root;

  const direct = root.querySelector?.("ha-card");

  if (direct) return direct;

  const children = root.querySelectorAll?.("*") || [];

  for (const child of children) {
    const found = findCardElement(child.shadowRoot || child, seen);

    if (found) return found;
  }

  return null;
}

function applyPaddingTarget(element, padding, applied) {
  applyPaddingStyles(element, padding);
  element._orbitDeckPaddingApplied = applied;
}

function applyPaddingStyles(element, padding) {
  setPaddingStyle(element, "padding-top", padding.top);
  setPaddingStyle(element, "padding-right", padding.right);
  setPaddingStyle(element, "padding-bottom", padding.bottom);
  setPaddingStyle(element, "padding-left", padding.left);
}

function setPaddingStyle(element, property, value) {
  if (value) {
    if (
      element.style.getPropertyValue(property) !== value ||
      element.style.getPropertyPriority(property) !== "important"
    ) {
      element.style.setProperty(property, value, "important");
    }
  } else {
    element.style.removeProperty(property);
  }
}

function connectDeckPaddingObserver(element, padding) {
  element._orbitDeckPadding = padding;

  if (element._orbitDeckPaddingObserver) return;

  element._orbitDeckPaddingObserver = new MutationObserver(() => {
    if (!element._orbitDeckPadding) return;

    applyPaddingStyles(element, element._orbitDeckPadding);
  });

  element._orbitDeckPaddingObserver.observe(element, {
    attributes: true,
    attributeFilter: ["style"],
  });
}

function disconnectDeckPaddingObserver(element) {
  element._orbitDeckPadding = null;
  element._orbitDeckPaddingObserver?.disconnect();
  element._orbitDeckPaddingObserver = null;
}

registerOrbitCard({
  tag: "orbit-deck-card",
  cardClass: OrbitDeckCard,
  name: "Orbit Deck Card",
  description: "Wrap or tab any Lovelace cards",
  version: CARD_VERSIONS.deck,
});
