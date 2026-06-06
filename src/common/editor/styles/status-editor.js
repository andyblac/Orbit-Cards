import { css } from "lit";

export const statusEditorStyles = css`
.status-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.status-wrap-toggle input {
  width: auto;
  margin: 0;
}

.status-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.status-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  margin-bottom: 12px;
  overflow-x: auto;
}

.status-tab,
.status-tab-add {
  border: none;
  background: transparent;
  color: inherit;
  min-width: 44px;
  height: 42px;
  padding: 0 12px;
  font: inherit;
  font-weight: 700;
  opacity: 0.6;
  cursor: pointer;
}

.status-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.status-tab-add {
  margin-left: auto;
  font-size: 24px;
  opacity: 0.9;
}

.status-editor-tools {
  display: flex;
  gap: 8px;
  margin-left: auto;
  justify-content: flex-end;
}

.status-tool-button {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: var(--card-background-color);
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.status-tool-button:disabled {
  opacity: 0.35;
  cursor: default;
}

.status-tool-button ha-icon {
  --mdc-icon-size: 22px;
}
`;
