import { css } from "lit";

export const statusBadgeStyles = css`
  .card-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
    width: 16px;
    height: 16px;
    border-radius: var(--ha-border-radius-md);
    background-color: var(--tile-badge-background-color);
    transition: background-color 280ms ease-in-out;
    box-sizing: border-box;
    user-select: none;
  }

  .card-badge[role="button"] {
    cursor: pointer;
  }

  .card-badge:focus-visible {
    outline: 2px solid var(--tile-badge-background-color);
    outline-offset: 2px;
  }

  .card-badge > * {
    color: var(--tile-badge-icon-color);
  }

  .card-badge .image-icon {
    width: 12px;
    height: 12px;
    color: var(--tile-badge-icon-color);
  }

  .image-icon {
    width: var(--ha-badge-icon-size, 18px);
    height: var(--ha-badge-icon-size, 18px);
    display: block;
    line-height: 0;
    color: var(--icon-color, var(--badge-color));
  }

  :host([heading-badge]) .image-icon {
    width: 18px;
    height: 18px;
  }

  :host([heading-badge]) .entity-picture {
    width: 18px;
    height: 18px;
    border-radius: var(--ha-border-radius-circle);
    object-fit: cover;
  }

  :host([heading-badge]) ha-state-icon {
    --mdc-icon-size: 18px;
  }

  .image-icon svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .template-state {
    white-space: pre-line;
  }

`;
