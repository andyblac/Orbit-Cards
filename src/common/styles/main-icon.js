import { css } from "lit";

export const MainIconStyles = css`
  .main-icon {
    --orbit-main-icon-size: 45%;
    --mdc-icon-size: var(--orbit-main-icon-size);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  ha-state-icon.main-icon {
    width: var(--orbit-main-icon-size);
    height: var(--orbit-main-icon-size);
    --mdc-icon-size: 100%;
  }

  .main-image-icon {
    width: 45%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    position: relative;
  }

  .main-image-icon svg,
  .main-image-icon img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .main-image-icon img {
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.8;
  }

  .main-icon-badge-anchor {
    position: relative;
    width: 45%;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-icon-badge-anchor .main-icon {
    --orbit-main-icon-size: 100%;
  }

  .main-icon-badge-anchor ha-state-icon.main-icon,
  .main-icon-badge-anchor .main-image-icon {
    width: 100%;
    height: 100%;
  }

  .entity-unavailable-badge {
    --tile-badge-background-color: var(--orange-color);
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(22%, -22%);
    pointer-events: none;
    z-index: 10;
  }

  .entity-unavailable-badge.entity-missing-badge {
    --tile-badge-background-color: var(--error-color);
  }
`;
