import { css } from "lit";

import { CardHeaderStyles } from "../../../common/styles/header.js";
import { CardShellStyles } from "../../../common/styles/card-shell.js";
import { MainIconStyles } from "../../../common/styles/main-icon.js";

export const statusCardStyles = [
  CardHeaderStyles,
  CardShellStyles,
  MainIconStyles,
  css`
  ha-card {
    aspect-ratio: 3 / 1;
    border-radius: 15px;
  }

  ha-card.mode-icon_only {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped {
    aspect-ratio: auto;
    container-type: inline-size;
  }

  ha-card.mode-icon_only.grouped.separate-cards {
    background: transparent;
    border: none;
    box-shadow: none;
    overflow: visible;
  }

  ha-card.mode-person {
    aspect-ratio: 3 / 1;
  }

  .status-container {
    --status-circle-color: rgba(var(--color-theme),0.05);
    --status-icon-color: rgba(var(--color-theme),0.4);
    --status-name-color: rgb(var(--color-theme));
    --status-text-color: rgb(var(--color-theme));
    overflow: hidden;
  }

  .status-circle {
    background: var(--status-circle-color);
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
    touch-action: manipulation;
    z-index: 3;
  }

  .status-circle .main-icon {
    --mdc-icon-size: 45%;
    color: var(--status-icon-color);
  }

  .status-circle .main-image-icon {
    width: 45%;
    height: 45%;
    color: var(--status-icon-color);
  }

  .status-container .content {
    justify-content: center;
    padding-left: 31%;
    pointer-events: none;
  }

  .status-container .status {
    color: var(--status-text-color);
    font-size: clamp(16px, 8cqw, 32px);
  }

  .status-container .card-name {
    color: var(--status-name-color);
  }

  .status-container.mode-icon_only .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
    transform: none;
  }

  .status-container.mode-icon_only.grouped {
    display: block;
    height: auto;
    overflow: visible;
    padding: 0;
  }

  .status-icon-grid {
    display: flex;
    flex-direction: column;
    gap: clamp(4px, 2cqw, 10px);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .status-container.mode-icon_only.grouped .status-icon-grid {
    height: auto;
  }

  .status-icon-row {
    display: flex;
    gap: clamp(4px, 2cqw, 10px);
    width: 100%;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-grid {
    gap: clamp(5px, 1.4cqw, 8px);
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-row {
    gap: clamp(5px, 1.4cqw, 8px);
  }

  .status-icon-item {
    container-type: size;
    cursor: pointer;
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .status-icon-spacer {
    flex: 1 1 0;
    min-width: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .status-container.mode-icon_only.grouped .status-icon-item {
    aspect-ratio: 0.94 / 1;
  }

  .status-container.mode-icon_only.grouped .status-icon-spacer {
    aspect-ratio: 0.94 / 1;
  }

  ha-card.mode-icon_only.grouped.separate-cards .status-icon-item {
    border-radius: 15px;
    overflow: hidden;
  }

  .status-icon-item .status-circle {
    left: -12%;
    top: auto;
    bottom: -12%;
    width: 82%;
  }

  .status-container.mode-icon_only .status-circle .main-icon {
    --mdc-icon-size: 54%;
  }

  .status-container.mode-icon_only .status-circle .main-image-icon {
    width: 54%;
    height: 54%;
  }

  .status-container.mode-person .status-circle {
    overflow: visible;
  }

  .status-container.mode-person .person-main-icon {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .status-container.mode-person .person-picture,
  .status-container.mode-person .person-fallback-icon {
    width: 100%;
    height: 100%;
  }

  .status-container.mode-person .person-picture {
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  .status-container.mode-person .person-fallback-icon {
    --mdc-icon-size: 100%;
    color: var(--status-icon-color);
  }

  .person-badge {
    --person-badge-size: clamp(16px, 18%, 40px);
    --person-badge-ring: clamp(2px, 0.55cqw, 4px);
    position: absolute;
    width: var(--person-badge-size);
    height: var(--person-badge-size);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 var(--person-badge-ring) var(--ha-card-background, var(--card-background-color));
    transform: translate(-50%, -50%);
    z-index: 5;
    pointer-events: none;
  }

  .person-badge.clickable {
    pointer-events: auto;
    cursor: pointer;
  }

  .person-badge-icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .person-badge ha-icon {
    --mdc-icon-size: 92%;
    width: 92%;
    height: 92%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: none;
    color: var(--primary-background-color);
  }

  .person-badge-zone {
    left: 37%;
    top: 4%;
    z-index: 6;
  }

  .person-badge-zone ha-icon {
    transform: none;
  }

  .person-badge-battery-1 {
    left: 69%;
    top: 4%;
  }

  .person-badge-battery-2 {
    left: 91%;
    top: 22%;
  }

  .status-badge {
    background: var(--status-circle-color);
    color: var(--status-icon-color);
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
`,
];
