import { css } from "lit";

export const StatusCardLayoutStyles = css`
  ha-card {
    aspect-ratio: 3 / 1;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 1 / 1;
  }

  .status-container {
    overflow: hidden;
  }

  .status-circle {
    position: absolute;
    left: -8%;
    top: 18%;
    width: 34%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    pointer-events: auto;
    touch-action: manipulation;
    z-index: 3;
  }

  .status-circle .main-icon {
    --mdc-icon-size: 45%;
  }

  .status-circle .main-image-icon {
    width: 45%;
    height: 45%;
  }

  .status-container .content {
    justify-content: center;
    padding-left: 31%;
    pointer-events: none;
  }

  .status-container .status {
    font-size: clamp(16px, 8cqw, 32px);
  }

  .status-container.mode-icon_only .status-circle {
    left: -9%;
    top: auto;
    bottom: -8%;
    width: 88%;
    transform: none;
  }

  .status-container.mode-icon_only .status-circle .main-icon {
    --mdc-icon-size: 58%;
  }

  .status-container.mode-icon_only .status-circle .main-image-icon {
    width: 58%;
    height: 58%;
  }

  .status-badge {
    position: absolute;
    top: 5%;
    right: 5%;
    min-width: clamp(20px, 36cqw, 80px);
    height: clamp(20px, 36cqw, 80px);
    padding: 0 clamp(3px, 7cqw, 18px);
    border-radius: 999px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(17px, 23cqw, 52px);
    font-weight: bold;
    line-height: 1;
    white-space: nowrap;
    z-index: 4;
    pointer-events: none;
  }

  .status-badge[hidden] {
    display: none;
  }
`;
