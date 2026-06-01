import { css } from "lit";

export const RoomCardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    background: var(--card-background-color, #1a1a1a);
    border-radius: 24px;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease;
    container-type: size;
  }

  ha-card:active {
    transform: scale(0.98);
  }

  .container {
    --button-area-width: clamp(46px, 23.5cqw, 210px);
    padding: clamp(14px, 2cqw, 24px);
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;