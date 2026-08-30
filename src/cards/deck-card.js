// ==============================
// orbit-deck-card.js
// ==============================

import { LitElement, html } from "lit";
import { registerOrbitCard } from "../common/helpers/card-registration.js";
import { localize } from "../common/localize.js";
import { CARD_VERSIONS } from "../version.js";
import {
  getDeckItemPadding,
  shouldApplyDeckItemPadding,
} from "../common/helpers/deck-padding.js";
import {
  migrateDeckCardConfig,
} from "../common/helpers/config-migration.js";
import {
  handleDoubleTapAction,
  handleTapAction,
  isActionEnabled,
} from "../common/helpers/actions.js";
import { withCommonCardInteractions } from "../common/helpers/card-interactions.js";
import {
  disconnectTemplateSubscriptions,
  getColorTemplateEntries,
  syncTemplateSubscriptions,
} from "../common/helpers/templates.js";
import {
  getDeckItems,
  getDeckItemAction,
  getDeckItemEntity,
  getDeckItemKind,
  getDeckItemRenderConfig,
  getDefaultDeckIndex,
  getDefaultSelectionKey,
  hasDeckItemActions,
} from "./deck/items.js";
import {
  chunkItems,
  getOverlayFit,
  getOverlayGeometry,
  getOverlayItemStyle,
  getTabStyleVariables,
  getTabWidthMode,
  normalizeOverlayDimension,
  renderRowSpacers,
} from "./deck/layout.js";
import {
  applyDeckCardSurface,
  applyPaddingTarget,
  connectDeckPaddingObserver,
  disconnectDeckCardSurfaceObserver,
  disconnectDeckPaddingObserver,
  getCardElements,
  getDeckItemWrapper,
  getDeckPaddingApplyKey,
  shouldFlattenDeckCardSurface,
} from "./deck/surface.js";
import { deckCardStyles } from "./deck/styles/deck-card-styles.js";
import { DECK_PREVIEW_SELECTED_INDEX } from "../editors/deck-card-editor.js";

const DECK_INTERACTION_EVENTS = [
  "pointerdown",
  "click",
  "dblclick",
  "pointerup",
  "pointerleave",
  "pointercancel",
];

class OrbitDeckCard extends withCommonCardInteractions(LitElement) {
  static get properties() {
    return {
      hass: {},
      preview: { type: Boolean },
      _config: { type: Object },
      _deckCards: { state: true },
      _selectedIndex: { state: true },
      _templateRevision: { state: true },
    };
  }

  constructor() {
    super();
    this._config = {};
    this.preview = false;
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
    this._deckEntryGeneration = 0;
    this._deckInteractionListener = (event) =>
      this._handleDeckInteractionEvent(event);
  }

  connectedCallback() {
    super.connectedCallback();
    this._bindDeckItemActionListeners();
    this._paddingApplyKey = "";
    this.requestUpdate();
  }

  disconnectedCallback() {
    disconnectTemplateSubscriptions.call(this);
    this._cancelLongPress();
    this._clearDoubleTapTimer();
    this._clearOverlayGeometryObserver();
    this._disconnectDeckEntryObservers();
    this._unbindDeckItemActionListeners();
    super.disconnectedCallback();
  }

  willUpdate(changedProps) {
    if (changedProps.has("_config") || changedProps.has("hass")) {
      syncTemplateSubscriptions.call(
        this,
        getColorTemplateEntries(this._config)
      );
    }
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
    const migrated = migrateDeckCardConfig(config || {});
    const layout = ["tabs", "overlay"].includes(migrated.config?.layout)
      ? migrated.config.layout
      : "wrap";

    this._config = {
      ...migrated.config,
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
    if (changedProps.has("hass") || changedProps.has("preview")) {
      this._deckCards.forEach((entry) => {
        if (entry.element) {
          if (changedProps.has("hass")) {
            entry.element.hass = this.hass;
          }
          if (changedProps.has("preview")) {
            entry.element.preview = this.preview;
            entry.element.editMode = this.preview;
          }
        }
      });
    }

    if (changedProps.has("_deckCards") || changedProps.has("_config")) {
      this._applyDeckPaddingToEntries();
    }

    if (this._config?.layout === "overlay") {
      if (changedProps.has("_deckCards") || changedProps.has("_config")) {
        this._scheduleOverlayGeometrySync();
      }
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

      content.style.width = isBadge ? "max-content" : `${availableWidth}px`;
      content.style.height = "auto";
    });

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

    const naturalWidth = content.offsetWidth;
    const naturalHeight = content.offsetHeight;

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
      decks.map((item, index) => ({
        kind: getDeckItemKind(item),
        config: getDeckItemRenderConfig(
          item,
          shouldFlattenDeckCardSurface(this._config, item, index)
        ),
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
    this._disconnectDeckEntryObservers();
    this._deckCards = decks.map((item, index) => ({ item, index }));

    const helpers = await this._loadCardHelpers();
    const entries = decks.map((item, index) =>
      this._createDeckEntry(
        item,
        helpers,
        index,
        shouldFlattenDeckCardSurface(this._config, item, index)
      )
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

  _createDeckEntry(item, helpers, index, flattenSurfaces = false) {
    const kind = getDeckItemKind(item);
    const childConfig = getDeckItemRenderConfig(item, flattenSurfaces);

    if (!childConfig.type) {
      return {
        item,
        index,
        error: `No ${kind} type configured`,
      };
    }

    try {
      const usesNativeVisibility =
        this._config?.layout !== "overlay" &&
        Array.isArray(childConfig.visibility) &&
        childConfig.visibility.length > 0;
      const element = usesNativeVisibility
        ? this._createVisibilityAwareElement(kind, childConfig)
        : kind === "badge"
          ? helpers.createBadgeElement(childConfig)
          : helpers.createCardElement(childConfig);
      element.hass = this.hass;
      element.preview = this.preview;
      element.editMode = this.preview;
      element.addEventListener(
        "ll-rebuild",
        () => this._scheduleCardBuild(),
        { once: true }
      );

      const entry = {
        item,
        index,
        kind,
        element,
        visible: !element.hidden,
      };

      if (usesNativeVisibility) {
        const eventName = kind === "badge"
          ? "badge-visibility-changed"
          : "card-visibility-changed";

        element.addEventListener(eventName, (ev) => {
          ev.stopPropagation();
          const visible = ev.detail?.value !== false && !element.hidden;
          const currentEntry = this._deckCards.find(
            (candidate) => candidate.element === element
          ) || entry;

          if (currentEntry.visible === visible) return;

          currentEntry.visible = visible;
          this.requestUpdate();
          this.updateComplete.then(() => {
            if (visible) this._applyDeckCardPadding(currentEntry);
          });
        });
        element.load();
      }

      return entry;
    } catch (err) {
      return {
        item,
        index,
        error: err?.message || "Unable to create card",
      };
    }
  }

  _createVisibilityAwareElement(kind, config) {
    const element = document.createElement(
      kind === "badge" ? "hui-badge" : "hui-card"
    );

    element.hass = this.hass;
    element.preview = this.preview;
    element.editMode = this.preview;
    element.config = config;

    return element;
  }

  _disconnectDeckEntryObservers(entries = this._deckCards) {
    this._deckEntryGeneration += 1;

    entries.forEach((entry) => {
      const element = entry?.element;

      if (!element) return;

      const observedElements = new Set([element, ...getCardElements(element)]);
      observedElements.forEach((observedElement) => {
        disconnectDeckCardSurfaceObserver(observedElement);
        disconnectDeckPaddingObserver(observedElement);
      });
    });
  }

  _isDeckEntryActive(entry, generation) {
    return this.isConnected &&
      generation === this._deckEntryGeneration &&
      this._deckCards.includes(entry);
  }

  _selectTab(index) {
    this._selectedIndex = index;
  }

  _getDeckEntryFromEventTarget(target) {
    const index = Number(target?.dataset?.deckIndex);

    if (!Number.isInteger(index)) return null;

    return this._deckCards[index] || null;
  }

  _bindDeckItemActionListeners() {
    DECK_INTERACTION_EVENTS.forEach((eventName) => {
      this.renderRoot.addEventListener(
        eventName,
        this._deckInteractionListener,
        true
      );
    });
  }

  _unbindDeckItemActionListeners() {
    DECK_INTERACTION_EVENTS.forEach((eventName) => {
      this.renderRoot.removeEventListener(
        eventName,
        this._deckInteractionListener,
        true
      );
    });
  }

  _handleDeckInteractionEvent(event) {
    const target = event.composedPath().find((element) =>
      element?.classList?.contains("deck-item-interaction") &&
      element.getRootNode() === this.renderRoot
    );

    if (!target) return;

    const entry = this._getDeckEntryFromEventTarget(target);

    if (event.type === "pointerdown") {
      this._handleDeckItemPointerDown(event, entry);
    } else if (event.type === "click") {
      this._handleDeckItemClick(event, entry);
    } else if (event.type === "dblclick") {
      this._handleDeckItemDoubleClick(event, entry);
    } else if (event.type === "pointerup") {
      this._finishLongPress(event);
    } else if (event.type === "pointercancel") {
      this._cancelLongPress();
    } else if (event.type === "pointerleave" && event.target === target) {
      this._cancelLongPress();
    }
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
    const transparentBackground = shouldFlattenDeckCardSurface(
      this._config,
      entry?.item,
      entry?.index
    );
    const previewSelectedIndex =
      this._config?.[DECK_PREVIEW_SELECTED_INDEX];
    const isPreviewSelected =
      Number.isInteger(previewSelectedIndex) &&
      previewSelectedIndex === entry?.index;

    return html`
      <div
        class="deck-item-interaction ${hasActions ? "has-actions" : ""} ${
          transparentBackground ? "transparent-background" : ""
        } ${isPreviewSelected ? "orbit-editor-preview-selected" : ""}"
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
        <div class="deck-error-title">${this._t("Configuration error")}</div>
        <div>${entry?.error || "No card configured"}</div>
      </ha-card>
    `;
  }

  _applyDeckPaddingToEntries() {
    const surfaceKey = this._deckCards
      .map((entry) => shouldFlattenDeckCardSurface(
        this._config,
        entry.item,
        entry.index
      ) ? "flat" : "native")
      .join(":");
    const paddingApplyKey = `${getDeckPaddingApplyKey(this._deckCards)}|surface:${surfaceKey}`;

    if (paddingApplyKey === this._paddingApplyKey) return;

    this._paddingApplyKey = paddingApplyKey;
    this._deckCards.forEach((entry) => this._applyDeckCardPadding(entry));
  }

  _applyDeckCardPadding(entry, attempt = 0) {
    const element = entry?.element;

    if (!element) return;

    const generation = this._deckEntryGeneration;
    const padding = getDeckItemPadding(entry.item);
    const shouldApplyPadding = shouldApplyDeckItemPadding(entry.item);
    const waitForRender =
      element.updateComplete instanceof Promise
        ? element.updateComplete
        : Promise.resolve();

    waitForRender
      .then(() => new Promise((resolve) => requestAnimationFrame(resolve)))
      .then(() => {
        if (!this._isDeckEntryActive(entry, generation)) return;

        const cardElements = getCardElements(element);
        const cardElement = cardElements[0] || null;
        const wrapperElement = getDeckItemWrapper(this.renderRoot, entry.index);
        const flattenSurface = shouldFlattenDeckCardSurface(
          this._config,
          entry.item,
          entry.index
        );

        if (!cardElement && !wrapperElement) return;
        if ((shouldApplyPadding || flattenSurface) && !cardElement && attempt < 10) {
          window.setTimeout(
            () => this._applyDeckCardPadding(entry, attempt + 1),
            50
          );
        }

        applyDeckCardSurface(element, flattenSurface);
        cardElements.forEach((card) => applyDeckCardSurface(card, flattenSurface));

        if (
          !shouldApplyPadding &&
          !cardElement?._orbitDeckPaddingApplied &&
          !wrapperElement?._orbitDeckPaddingApplied
        ) {
          if (cardElement) disconnectDeckPaddingObserver(cardElement);
          return;
        }

        // Apply item padding to the embedded card only. Applying the same
        // padding to its interaction wrapper compounds the offset (for
        // example, 5px on the wrapper plus 5px on the card becomes 10px).
        if (wrapperElement) applyPaddingTarget(wrapperElement, padding, false);
        if (cardElement) applyPaddingTarget(cardElement, padding, shouldApplyPadding);

        if (shouldApplyPadding && cardElement) {
          connectDeckPaddingObserver(cardElement, padding);
          requestAnimationFrame(() => {
            if (!this._isDeckEntryActive(entry, generation)) return;

            if (wrapperElement) applyPaddingTarget(wrapperElement, padding, false);
            applyPaddingTarget(cardElement, padding, true);
          });
        } else {
          if (cardElement) disconnectDeckPaddingObserver(cardElement);
        }
      })
      .catch(() => {});
  }

  _renderWrap(decks) {
    const visibleEntries = this._getVisibleDeckEntries();
    const hiddenEntries = this._deckCards.filter(
      (entry) => entry.visible === false
    );
    const columns = this._getColumnCount(visibleEntries.length || 1);
    const rows = chunkItems(visibleEntries, columns);

    return html`
      <ha-card
        class="deck-card wrap ${decks.length > 1 && this._config?.separate_cards ? "separate-cards" : ""}"
        style="--deck-columns:${columns};"
      >
        <div class="deck-wrap">
          ${rows.map((row) => html`
            <div class="deck-row">
              ${row.map((entry) => {
                const isPreviewSelected =
                  this._config?.[DECK_PREVIEW_SELECTED_INDEX] === entry.index;
                const previewWidth = isPreviewSelected
                  ? getDeckEditorPreviewWidth(entry, columns)
                  : "";

                return html`
                  <div
                    class="deck-item ${previewWidth
                      ? "orbit-editor-preview-resized"
                      : ""}"
                    style=${previewWidth
                      ? `--orbit-editor-preview-width:${previewWidth};`
                      : ""}
                  >
                    ${this._renderInteractiveDeckEntry(entry)}
                  </div>
                `;
              })}
              ${renderRowSpacers(row.length, columns)}
            </div>
          `)}
        </div>
        ${this._renderVisibilityObservers(hiddenEntries)}
      </ha-card>
    `;
  }

  _renderTabs(decks) {
    const configuredIndex = Math.min(
      this._selectedIndex || 0,
      Math.max(0, decks.length - 1)
    );
    const visibleEntries = this._getVisibleDeckEntries();
    const selectedEntry = visibleEntries.find(
      (entry) => entry.index === configuredIndex
    ) || visibleEntries[0];
    const selectedIndex = selectedEntry?.index ?? configuredIndex;
    const observerEntries = this._deckCards.filter(
      (entry) => entry !== selectedEntry
    );
    const tabWidthMode = getTabWidthMode(this._config);
    const tabStyles = getTabStyleVariables.call(this, this._config);

    return html`
      <ha-card
        class="deck-card tabs tab-width-${tabWidthMode} ${this._config?.tab_divider === false
          ? "hide-tab-dividers"
          : ""}"
        style=${tabStyles}
      >
        <div class="deck-tabs" role="tablist">
          ${visibleEntries.map((entry) => html`
            <button
              type="button"
              class="deck-tab ${entry.index === selectedIndex ? "active" : ""}"
              role="tab"
              aria-selected=${entry.index === selectedIndex ? "true" : "false"}
              style=${tabWidthMode === "custom"
                ? `--orbit-deck-tab-width:${entry.item.attributes?.width || "120px"};`
                : ""}
              @click=${() => this._selectTab(entry.index)}
            >
              ${entry.item.attributes?.icon
                ? html`<ha-icon .icon=${entry.item.attributes.icon}></ha-icon>`
                : ""}
              <span>${entry.item.attributes?.name || entry.item.attributes?.label || `Card ${entry.index + 1}`}</span>
            </button>
          `)}
        </div>
        <div class="deck-tab-content">
          ${selectedEntry
            ? this._renderInteractiveDeckEntry(selectedEntry)
            : ""}
        </div>
        ${this._renderVisibilityObservers(observerEntries)}
      </ha-card>
    `;
  }

  _getVisibleDeckEntries() {
    return this._deckCards.filter((entry) => entry.visible !== false);
  }

  _renderVisibilityObservers(entries) {
    if (!entries.length) return "";

    return html`
      <div class="deck-visibility-observers" aria-hidden="true">
        ${entries.map((entry) => this._renderDeckEntry(entry))}
      </div>
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

  _t(key, replacements) {
    return localize(this.hass, key, replacements);
  }

  render() {
    const decks = getDeckItems(this._config);

    if (!decks.length) {
      return html`
        <ha-card class="deck-card empty">
          <div class="deck-empty-preview">
            <div class="deck-empty-illustration" aria-hidden="true">
              <span class="deck-empty-tile deck-empty-tile-main">
                <span class="deck-empty-orbit"></span>
                <span class="deck-empty-line"></span>
                <span class="deck-empty-line short"></span>
              </span>
              <span class="deck-empty-tile deck-empty-tile-top">
                <span class="deck-empty-dot"></span>
                <span class="deck-empty-line"></span>
              </span>
              <span class="deck-empty-tile deck-empty-tile-bottom">
                <span class="deck-empty-dot"></span>
                <span class="deck-empty-line short"></span>
              </span>
            </div>
            <div class="deck-empty-copy">
              <div class="deck-empty-title">${this._t("Add card")}</div>
              <div class="deck-empty-modes">
                ${this._t("Wrap")} · ${this._t("Tabs")} ·
                ${this._t("Overlay")}
              </div>
            </div>
          </div>
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

function getDeckEditorPreviewWidth(entry, deckColumns) {
  const childConfig = getDeckItemRenderConfig(entry?.item);
  const configuredColumns = childConfig?.grid_options?.columns;
  let columns = configuredColumns === "full"
    ? 12
    : Number(configuredColumns);

  if (!Number.isFinite(columns) || columns <= 0) {
    try {
      columns = Number(entry?.element?.getLayoutOptions?.()?.grid_columns);
    } catch (_error) {
      columns = 0;
    }
  }

  if (!Number.isFinite(columns) || columns <= 0) {
    columns = 6;
  }

  const normalWidth =
    Math.min(12, Math.max(1, columns)) / 12 * 100;
  const slotWidth = 100 / Math.max(1, Number(deckColumns) || 1);

  return normalWidth > slotWidth + 0.01
    ? `${normalWidth}%`
    : "";
}


registerOrbitCard({
  tag: "orbit-deck-card",
  cardClass: OrbitDeckCard,
  name: "Orbit Deck Card",
  description: "Wrap or tab any Lovelace cards",
  version: CARD_VERSIONS.deck,
});
