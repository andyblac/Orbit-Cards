import { css } from "lit";

export const currentActivityDialogStyles = css`
  .current-activity-dialog {
    --ha-dialog-width-sm: 640px;
    --mdc-dialog-min-width: min(640px, calc(100vw - 32px));
    --mdc-dialog-max-width: min(640px, calc(100vw - 32px));
    --mdc-dialog-min-height: 0px;
    --ha-dialog-min-height: 0px;
    --ha-bottom-sheet-height: auto;
  }

  .current-activity-dialog-content {
    min-width: 0;
    height: min(
      var(--current-activity-height, 140px),
      calc(100dvh - 128px)
    );
    max-height: calc(100dvh - 128px);
    padding: 0 var(--ha-space-4, 16px) var(--ha-space-4, 16px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .current-activity-scope-selector {
    width: 180px;
  }

  .current-activity-dialog-content > hui-logbook-card,
  .current-activity-dialog-content > ha-card {
    display: block;
    height: calc(100% + 32px);
    max-height: calc(100dvh - 96px);
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
    .current-activity-scope-selector {
      width: 156px;
    }

    .current-activity-dialog-content {
      padding-inline: 0;
    }
  }
`;
