import { css } from "lit";

export const deckCardStyles = css`
  ha-card.deck-card {
    border-radius: var(--ha-card-border-radius, 15px);
    overflow: visible;
  }

  ha-card.deck-card.wrap.separate-cards {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  ha-card.deck-card.overlay {
    background: transparent;
    border: none;
    box-shadow: none;
  }

  ha-card.deck-card.wrap:not(.separate-cards) .deck-item,
  ha-card.deck-card.wrap:not(.separate-cards) .deck-item > *,
  ha-card.deck-card.wrap:not(.separate-cards) .deck-item-interaction > * {
    --ha-card-background: transparent;
    --ha-card-box-shadow: none;
    --ha-card-border-width: 0;
    --ha-card-border-color: transparent;
    --ha-card-border-radius: 0;
    background: transparent;
    border: none;
    box-shadow: none;
  }

  .deck-card.empty {
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
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
  }

  .deck-overlay-main {
    position: relative;
    z-index: 0;
  }

  .deck-overlay-group {
    position: absolute;
    z-index: 1;
    display: flex;
    gap: var(--orbit-deck-gap, 8px);
    pointer-events: none;
  }

  .deck-overlay-top,
  .deck-overlay-bottom {
    inset-inline: var(--orbit-deck-gap, 8px);
    justify-content: center;
    align-items: center;
  }

  .deck-overlay-top {
    top: var(--orbit-deck-gap, 8px);
  }

  .deck-overlay-bottom {
    bottom: var(--orbit-deck-gap, 8px);
  }

  .deck-overlay-left,
  .deck-overlay-right {
    top: var(--orbit-deck-gap, 8px);
    bottom: var(--orbit-deck-gap, 8px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .deck-overlay-left {
    inset-inline-start: var(--orbit-deck-gap, 8px);
  }

  .deck-overlay-right {
    inset-inline-end: var(--orbit-deck-gap, 8px);
  }

  .deck-overlay-item {
    flex: 0 0 auto;
    width: var(--orbit-deck-overlay-width, 64px);
    height: var(--orbit-deck-overlay-height, 64px);
    pointer-events: auto;
  }

  .deck-overlay-item .deck-item-interaction,
  .deck-overlay-item .deck-item-interaction > * {
    width: 100%;
    height: 100%;
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
`;
