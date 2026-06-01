
import { css } from "lit";
export const iconStyles = css`
.color-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.color-row input {
  flex: 1;
}

.color-preview {
  width: 28px;
  height: 28px;
  border-radius: 8px;
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

.icon-preview img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.icon-preview ha-icon {
  --mdc-icon-size: 24px;
}

.preview-image {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.preview-image {
  width: 24px;
  height: 24px;
  object-fit: contain;
}
`;
