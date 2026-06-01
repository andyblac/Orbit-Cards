
import { css } from "lit";
export const actionStyles = css`
.inline-field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.inline-label {
  width: 80px;
  min-width: 80px;

  font-size: 12px;
  opacity: 0.7;

  text-transform: lowercase;
}

.inline-field input {
  flex: 1;
}
`;
