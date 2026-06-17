
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

.editor-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 36px;
  font-size: 12px;
  opacity: 0.9;
}

.editor-toggle-row span {
  opacity: 0.78;
}

input,
select {
  width: 100%;

  padding: 10px 12px;

  border: 1px solid var(--orbit-editor-border);
  border-radius: 10px;

  background: var(--orbit-editor-control);
  color: inherit;

  outline: none;
  box-sizing: border-box;
}

.editor-note {
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--orbit-editor-control);
  border: 1px solid var(--orbit-editor-border);
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
