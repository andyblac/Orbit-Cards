import { css } from "lit";

export const StatusCardLayoutStyles = css`
  ha-card {
    aspect-ratio: 3 / 1;
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
    font-size: clamp(16px, 6.7cqw, 26px);
  }
`;
