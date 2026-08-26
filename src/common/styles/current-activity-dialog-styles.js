import { css } from "lit";

export const currentActivityDialogStyles = css`
  .current-activity-dialog {
    --ha-dialog-width-sm: 640px;
    --mdc-dialog-min-width: min(640px, calc(100vw - 32px));
    --mdc-dialog-max-width: min(640px, calc(100vw - 32px));
    --ha-dialog-min-height: min(85vh, 960px);
    --ha-bottom-sheet-height: min(90vh, 960px);
  }

  .current-activity-dialog-content {
    min-width: 0;
    height: min(75vh, 840px);
    max-height: min(75vh, 840px);
    padding: 0 var(--ha-space-4, 16px) var(--ha-space-4, 16px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .current-activity-dialog-content > hui-logbook-card,
  .current-activity-dialog-content > ha-card {
    display: block;
    height: calc(100% + 32px);
    margin-top: -32px;
    --ha-card-border-width: 0;
    --ha-card-box-shadow: none;
    --ha-card-background: transparent;
  }

  .current-activity-dialog-message {
    display: grid;
    min-height: 120px;
    place-items: center;
    color: var(--secondary-text-color);
    text-align: center;
  }

  @media (max-width: 600px) {
    .current-activity-dialog-content {
      padding-inline: 0;
    }
  }
`;
