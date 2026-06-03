import { css } from "lit";

import { CardShellStyles } from "../../../common/styles/card-shell.js";
import { MainIconStyles } from "../../../common/styles/main-icon.js";

export const actionCardStyles = [
  CardShellStyles,
  MainIconStyles,
  css`
    ha-card {
      aspect-ratio: var(--action-count, 1) / 1;
    }

    .action-container {
      display: grid;
      grid-template-columns: repeat(var(--action-count, 1), minmax(0, 1fr));
      align-items: center;
      gap: clamp(4px, 2cqw, 10px);
      padding: 0;
    }

    .action-button {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }

    .action-circle {
      width: min(84%, 84cqh);
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background: var(--action-card-background, rgba(var(--color-theme),0.05));
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      pointer-events: none;
    }

    .action-button.running .action-circle {
      background: color-mix(
        in srgb,
        var(--action-card-background, rgba(var(--color-theme),0.05)) 70%,
        var(--action-icon-color, currentColor)
      );
    }

    .action-circle .main-icon,
    .action-circle .main-image-icon {
      color: var(--action-icon-color);
    }

    .action-circle .main-icon {
      --mdc-icon-size: 58%;
    }

    .action-circle .main-image-icon {
      width: 58%;
      height: 58%;
    }
  `,
];
