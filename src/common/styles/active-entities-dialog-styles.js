import { css } from "lit";

export const activeEntitiesDialogStyles = css`
  ha-adaptive-dialog {
    --ha-dialog-min-height: auto;
    --ha-bottom-sheet-height: auto;
  }

  .active-entities-dialog-content {
    min-width: 0;
    padding: 0 var(--ha-space-4, 16px);
  }

  .active-entity-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--ha-space-3, 12px);
    min-height: 52px;
    padding: 6px 0;
  }

  .active-entity-row::before {
    position: absolute;
    top: 0;
    right: -12px;
    left: -12px;
    border-top: 1px solid var(--divider-color);
    content: "";
    pointer-events: none;
  }

  .active-entity-row > ha-state-icon,
  .active-entity-row > ha-icon {
    flex: 0 0 auto;
    margin: 12px;
    transform: translateX(-4px);
  }

  .active-entity-row ha-state-icon,
  .active-entity-row ha-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    line-height: 0;
    --mdc-icon-size: 36px;
  }

  .active-entity-control-button {
    display: grid;
    flex: 0 0 auto;
    width: 48px;
    height: 48px;
    margin: 6px;
    padding: 0;
    transform: translateX(-4px);
    place-items: center;
    border: 0;
    border-radius: 50%;
    outline: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .active-entity-device-button {
    width: 36px;
    height: 36px;
    margin: 12px;
    transform: translateX(-4px);
  }

  .active-entity-control-button ha-state-icon,
  .active-entity-control-button ha-icon {
    pointer-events: none;
  }

  .active-entity-control-button:focus-visible,
  .active-entity-control-button:hover {
    background: var(--secondary-background-color);
  }

  .active-entity-info {
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    flex-direction: column;
    gap: 1px;
    padding: 4px 0;
    border: 0;
    outline: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: start;
    cursor: pointer;
  }

  .active-entity-info:focus-visible {
    border-radius: var(--ha-border-radius-md);
    background: var(--secondary-background-color);
  }

  .active-entity-name {
    overflow: hidden;
    color: var(--primary-text-color);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .active-entity-area,
  .active-entity-state-line {
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
  }

  .active-entity-area {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .active-entity-state-line {
    display: flex;
    align-items: baseline;
    gap: 5px;
  }

  .active-entity-state-line state-display {
    color: var(--secondary-text-color);
    font-size: var(--ha-font-size-s, 12px);
  }

  .active-entities-empty {
    padding: var(--ha-space-5, 20px) 0;
    color: var(--secondary-text-color);
    text-align: center;
  }

  .active-entities-confirmation-text {
    margin: 0;
    color: var(--primary-text-color);
  }

  .active-entities-confirmation-title {
    margin: inherit;
    padding: 0 var(--ha-space-2, 8px);
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
`;
