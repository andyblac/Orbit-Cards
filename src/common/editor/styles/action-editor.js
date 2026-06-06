import { css } from "lit";

export const actionEditorStyles = css`
.action-tabs {
  display: flex;
  align-items: end;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  margin-bottom: 12px;
  overflow-x: auto;
}

.action-group-options {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.action-wrap-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 1;
}

.action-wrap-toggle input {
  width: auto;
  margin: 0;
}

.action-tab,
.action-tab-add {
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

.action-tab.active {
  color: var(--primary-color);
  opacity: 1;
  border-bottom: 3px solid var(--primary-color);
}

.action-tab-add {
  margin-left: auto;
  font-size: 24px;
  opacity: 0.9;
}

.action-editor-tools {
  display: flex;
  gap: 8px;
  margin-left: auto;
  justify-content: flex-end;
}

.action-domain-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0 0 10px;
}

.action-domain-filters button {
  min-height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 7px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.04);
  color: inherit;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.action-domain-filters button.active {
  border-color: var(--primary-color);
  background: color-mix(
    in srgb,
    var(--primary-color) 18%,
    transparent
  );
  color: var(--primary-color);
}

.action-tool-button {
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

.action-tool-button:disabled {
  opacity: 0.35;
  cursor: default;
}

.action-tool-button ha-icon {
  --mdc-icon-size: 22px;
}
`;
