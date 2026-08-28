import { css } from "lit";
import { EditorPreviewSelectionStyles } from "../../../common/styles/editor-preview-selection.js";

export const deckCardStyles = [
  EditorPreviewSelectionStyles,
  css`
  ha-card.deck-card {
    border-radius: var(--ha-card-border-radius, 15px);
    overflow: visible;
  }

  ha-card.deck-card.wrap.separate-cards {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
  }

  ha-card.deck-card.overlay {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border: none;
    box-shadow: none;
  }

  .deck-item-interaction.transparent-background,
  .deck-item-interaction.transparent-background > * {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-color: transparent;
    box-shadow: none;
  }

  .deck-card.empty {
    min-height: 132px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .deck-empty-preview {
    width: min(100%, 360px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .deck-empty-illustration {
    width: 132px;
    height: 76px;
    flex: 0 0 auto;
    display: grid;
    grid-template-columns: 1.45fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 6px;
    transform: rotate(-2deg);
  }

  .deck-empty-tile {
    min-width: 0;
    padding: 9px;
    border: 1px solid color-mix(
      in srgb,
      var(--primary-color) 28%,
      var(--divider-color)
    );
    border-radius: 10px;
    background: color-mix(
      in srgb,
      var(--primary-color) 9%,
      var(--card-background-color)
    );
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
  }

  .deck-empty-tile-main {
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }

  .deck-empty-tile-top,
  .deck-empty-tile-bottom {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .deck-empty-orbit {
    width: 26px;
    height: 26px;
    border: 3px solid var(--primary-color);
    border-radius: 50%;
    position: relative;
    box-sizing: border-box;
  }

  .deck-empty-orbit::after {
    content: "";
    position: absolute;
    width: 7px;
    height: 7px;
    inset-inline-end: -5px;
    top: 1px;
    border-radius: 50%;
    background: var(--primary-color);
    box-shadow: 0 0 0 2px var(--card-background-color);
  }

  .deck-empty-dot {
    width: 11px;
    height: 11px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: var(--primary-color);
    opacity: 0.82;
  }

  .deck-empty-line {
    width: 100%;
    height: 5px;
    border-radius: 999px;
    background: var(--primary-text-color);
    opacity: 0.28;
  }

  .deck-empty-line.short {
    width: 64%;
  }

  .deck-empty-copy {
    min-width: 0;
  }

  .deck-empty-title {
    color: var(--primary-text-color);
    font-size: var(--ha-font-size-l, 16px);
    font-weight: var(--ha-font-weight-medium, 500);
    line-height: 1.35;
  }

  .deck-empty-modes {
    margin-top: 5px;
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
    line-height: 1.4;
    white-space: nowrap;
  }

  @media (max-width: 360px) {
    .deck-empty-preview {
      gap: 16px;
    }

    .deck-empty-illustration {
      width: 108px;
      height: 68px;
    }
  }

  .deck-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--orbit-deck-gap, 8px);
    padding: var(--orbit-deck-padding, 0);
  }

  .deck-row {
    display: flex;
    gap: var(--orbit-deck-gap, 8px);
    width: 100%;
  }

  .deck-item,
  .deck-spacer {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-item.orbit-editor-preview-resized {
    flex: 0 0 var(--orbit-editor-preview-width, 50%);
  }

  .deck-row:has(.orbit-editor-preview-resized) {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .deck-item.orbit-editor-preview-resized >
    .deck-item-interaction.orbit-editor-preview-selected {
    height: auto;
    width: 100%;
  }

  .deck-item-interaction {
    display: block;
    height: 100%;
  }

  .deck-item-interaction.has-actions {
    cursor: pointer;
  }

  .deck-spacer {
    visibility: hidden;
    pointer-events: none;
  }

  .deck-visibility-observers {
    display: none !important;
  }

  .deck-tabs {
    display: flex;
    align-items: end;
    gap: 4px;
    border-bottom: none;
    box-shadow: inset 0 -2px 0 var(--divider-color);
    background: var(--orbit-deck-tab-background-color, transparent);
    overflow-x: auto;
  }

  .deck-tab {
    position: relative;
    min-width: 72px;
    min-height: 44px;
    border: none;
    border-bottom: 3px solid transparent;
    background: transparent;
    color: var(--orbit-deck-tab-color, inherit);
    padding: 0 12px;
    font: inherit;
    font-size: var(--orbit-deck-tab-font-size, var(--ha-font-size-m, 14px));
    font-weight: var(--ha-font-weight-medium, 500);
    opacity: 0.62;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  }

  .deck-card.tabs:not(.hide-tab-dividers) .deck-tab + .deck-tab::before {
    content: "";
    position: absolute;
    inset-inline-start: -3px;
    top: 8px;
    bottom: 0;
    width: 2px;
    background: var(--divider-color);
    pointer-events: none;
  }

  .deck-card.tabs.tab-width-equal .deck-tab {
    flex: 1 1 0;
    min-width: 0;
  }

  .deck-card.tabs.tab-width-dynamic .deck-tab {
    flex: 0 0 auto;
  }

  .deck-card.tabs.tab-width-custom .deck-tab {
    flex: 0 0 var(--orbit-deck-tab-width, 120px);
    min-width: var(--orbit-deck-tab-width, 120px);
  }

  .deck-tab.active {
    color: var(--orbit-deck-tab-active-color, var(--primary-color));
    border-bottom-color: var(--orbit-deck-tab-active-color, var(--primary-color));
    opacity: 1;
  }

  .deck-tab ha-icon {
    --mdc-icon-size: 20px;
  }

  .deck-tab-content {
    padding-top: var(--orbit-deck-gap, 8px);
  }

  .deck-overlay {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 15px);
  }

  .deck-overlay-main {
    position: relative;
    z-index: 0;
  }

  .deck-overlay-item {
    position: absolute;
    inset-inline-start: var(--orbit-deck-overlay-left, 0);
    top: var(--orbit-deck-overlay-top, 0);
    z-index: var(--orbit-deck-overlay-z-index, 1);
    flex: 0 0 auto;
    pointer-events: auto;
  }

  .deck-overlay-item.overlay-card {
    width: 100%;
  }

  .deck-overlay-item.overlay-badge {
    width: max-content;
  }

  .deck-overlay-content {
    display: block;
    transform-origin: top left;
  }

  .deck-overlay-item .deck-item-interaction {
    height: auto;
  }

  .deck-overlay-item.transparent-background,
  .deck-overlay-item.transparent-background .deck-overlay-content,
  .deck-overlay-item.transparent-background .deck-item-interaction,
  .deck-overlay-item.transparent-background .deck-item-interaction > * {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-width: 0;
    border-color: transparent;
    box-shadow: none;
  }

  .deck-error-card {
    padding: 16px;
    background: color-mix(in srgb, var(--error-color) 14%, transparent);
    color: var(--primary-text-color);
  }

  .deck-error-title {
    font-weight: var(--ha-font-weight-bold, 700);
    margin-bottom: 8px;
  }
`,
];
