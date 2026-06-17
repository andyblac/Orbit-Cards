
import { css } from "lit";
export const sectionStyles = css`
.section {
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 14px;

  border-radius: 14px;

  background: var(--orbit-editor-surface);
  border: 1px solid var(--orbit-editor-border);
}

.sub-section {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-bottom: 12px;
  margin-bottom: 12px;

  border-bottom: 1px solid var(--orbit-editor-border);
}

.sub-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.curve-divider {
  height: 1px;

  margin: 4px 0 6px 0;

  background: var(--orbit-editor-border);
}
`;
