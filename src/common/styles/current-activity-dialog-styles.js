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
      calc(100dvh - 216px)
    );
    max-height: calc(100dvh - 216px);
    padding: 0 var(--ha-space-4, 16px) var(--ha-space-4, 16px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .current-activity-scope-selector {
    width: 180px;
  }

  .current-activity-date-browser {
    display: flex;
    padding: 0 var(--ha-space-4, 16px) var(--ha-space-3, 12px);
  }

  .current-activity-date-browser ha-date-range-picker {
    width: 100%;
  }

  .current-activity-dialog-content > ha-logbook {
    display: block;
    height: 100%;
    max-height: calc(100dvh - 216px);
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

    .current-activity-date-browser {
      padding-inline: 0;
    }
  }

  @media (max-width: 870px), (max-height: 500px) {
    .current-activity-dialog {
      --ha-bottom-sheet-height: min(
        90dvh,
        calc(
          100dvh - max(var(--safe-area-inset-top, 0px), 48px)
        )
      );
      --ha-bottom-sheet-max-height: var(--ha-bottom-sheet-height);
      --dialog-content-padding: 0;
    }

    .current-activity-dialog-content {
      flex: 1 1 auto;
      min-height: 0;
      height: auto;
      max-height: none;
    }

    .current-activity-dialog-content > ha-logbook {
      min-height: 0;
      max-height: none;
    }
  }
`;
