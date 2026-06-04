
import { css } from "lit";
export const iconStyles = css`
.color-row {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
}

.color-row > input {
  flex: 1;
}

.color-preview {
  position: relative;
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  overflow: hidden;
}

.color-popover {
  position: absolute;
  z-index: 20;
  top: calc(100% + 8px);
  right: 0;
  width: min(280px, 100%);
  padding: 10px;
  border-radius: 12px;
  background: var(--card-background-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.color-tabs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}

.color-tabs button,
.theme-color-option {
  border: 0;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  cursor: pointer;
}

.color-tabs button {
  position: relative;
  padding: 7px 8px;
  font-size: 12px;
  overflow: hidden;
}

.color-tabs button.active {
  background: rgba(130, 177, 255, 0.22);
  color: #82b1ff;
}

.native-color-picker {
  display: block;
  width: 100%;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
}

.tab-color-picker {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.theme-colors {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  max-height: 230px;
  overflow: auto;
}

.theme-color-option {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  padding: 7px;
  font-size: 11px;
  text-align: left;
}

.theme-color-option span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-color-swatch {
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.icon-input-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-input-row input {
  flex: 1;
}

.icon-preview {
  width: 42px;
  height: 42px;
  min-width: 42px;
  border-radius: 10px;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.preview-image-stack {
  position: relative;
  width: 24px;
  height: 24px;
  display: block;
}

.icon-preview .preview-image,
.icon-preview .preview-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.icon-preview .preview-image {
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.icon-preview .preview-svg {
  color: white;
  display: flex;
  background: #000;
}

.icon-preview .preview-svg svg {
  width: 100%;
  height: 100%;
}

.icon-preview ha-icon {
  --mdc-icon-size: 24px;
}
`;
