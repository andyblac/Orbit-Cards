
import { css } from "lit";
export const fieldStyles = css`
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  opacity: 0.7;
}

input,
select {
  width: 100%;

  padding: 10px 12px;

  border: none;
  border-radius: 10px;

  background: var(--card-background-color);
  color: inherit;

  outline: none;
  box-sizing: border-box;
}

.editor-note {
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: inherit;
  font-size: 12px;
  line-height: 1.4;
  opacity: 0.72;
}

.editor-note code {
  display: block;
  margin-top: 4px;
  font-family: monospace;
  white-space: normal;
  overflow-wrap: anywhere;
}
`;
